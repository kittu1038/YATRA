import { createContext, useContext, useReducer, useEffect, useCallback } from 'react';
import { tripsAPI } from '../services/api.js';
import toast from 'react-hot-toast';

const TripContext = createContext(null);

const STORAGE_KEY = 'yatra_active_trip_state_v2';

const defaultState = {
  activeTripId: null,
  tripTitle: 'My Indian Journey',
  selectedDestinations: [],
  selectedStays: [],
  selectedFoods: [],
  budget: {
    target: 25000,
    transit: 5000,
    stay: 9000,
    food: 6000,
    activities: 2500,
    misc: 2500,
    total: 25000,
    groupSize: 2,
    days: 4,
    currency: 'INR',
  },
  route: {
    stops: [],
    mode: 'train',
    totalDistanceKm: 0,
    estimatedCost: 0,
  },
  itinerary: null,
  expenses: [],
  packingList: [
    { id: '1', item: 'Aadhaar / Passport & Gov ID', isPacked: true, category: 'Documents' },
    { id: '2', item: 'Temple scarves / head coverings', isPacked: false, category: 'Clothing' },
    { id: '3', item: 'Thermal layers & woollen socks', isPacked: false, category: 'Clothing' },
    { id: '4', item: 'Emergency cash & UPI enabled phone', isPacked: true, category: 'Finance' },
    { id: '5', item: 'Altitude & motion sickness tablets', isPacked: false, category: 'Health' },
    { id: '6', item: '20,000mAh Power bank & spare cables', isPacked: false, category: 'Electronics' },
  ],
  isDirty: false,
};

function loadInitialState() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      return {
        ...defaultState,
        ...parsed,
        budget: {
          ...defaultState.budget,
          ...(parsed?.budget || {}),
        },
        route: {
          ...defaultState.route,
          ...(parsed?.route || {}),
        },
        expenses: Array.isArray(parsed?.expenses) ? parsed.expenses : defaultState.expenses,
        packingList: Array.isArray(parsed?.packingList) ? parsed.packingList : defaultState.packingList,
        selectedDestinations: Array.isArray(parsed?.selectedDestinations) ? parsed.selectedDestinations : [],
        selectedStays: Array.isArray(parsed?.selectedStays) ? parsed.selectedStays : [],
        selectedFoods: Array.isArray(parsed?.selectedFoods) ? parsed.selectedFoods : [],
      };
    }
  } catch (err) {
    console.error('Failed to parse saved trip state:', err);
  }
  return defaultState;
}

function calculateDeterministicBudget(state) {
  const days = Math.max(1, state?.budget?.days || 1);
  const groupSize = Math.max(1, state?.budget?.groupSize || 1);

  // Calculate stay cost from selected stays or fallback
  let stayDaily = 0;
  const stays = state?.selectedStays || [];
  if (stays.length > 0) {
    const avgStay = stays.reduce((sum, s) => sum + (s?.priceRange?.min || 1500), 0) / stays.length;
    stayDaily = avgStay;
  } else {
    stayDaily = 2200;
  }
  const totalStay = Math.round(stayDaily * days * Math.ceil(groupSize / 2));

  // Transit estimate
  let transit = state?.route?.estimatedCost || 3500;
  if (transit <= 0) {
    transit = Math.round(1800 * groupSize);
  }

  // Food estimate
  const foodPerPersonDay = 750;
  const totalFood = Math.round(foodPerPersonDay * days * groupSize);

  // Activities entry fees & guides
  const activities = Math.round(600 * days * groupSize);

  // 10% misc buffer
  const subtotal = transit + totalStay + totalFood + activities;
  const misc = Math.round(subtotal * 0.10);
  const total = subtotal + misc;

  return {
    ...(state?.budget || defaultState.budget),
    transit,
    stay: totalStay,
    food: totalFood,
    activities,
    misc,
    total,
  };
}

function tripReducer(state, action) {
  let newState;
  switch (action.type) {
    case 'SET_TITLE':
      newState = { ...state, tripTitle: action.payload, isDirty: true };
      break;

    case 'ADD_DESTINATION': {
      const currentDests = state?.selectedDestinations || [];
      if (currentDests.find(d => d?._id === action.payload?._id || d?.slug === action.payload?.slug)) {
        return state;
      }
      const updatedDests = [...currentDests, action.payload];
      const newStops = updatedDests.map(d => ({
        name: d?.name || '',
        slug: d?.slug || '',
        coordinates: d?.coordinates || null,
      }));
      newState = {
        ...state,
        selectedDestinations: updatedDests,
        route: { ...(state?.route || defaultState.route), stops: newStops },
        budget: { ...(state?.budget || defaultState.budget), days: Math.max(updatedDests.length * 2, state?.budget?.days || 4) },
        isDirty: true,
      };
      newState.budget = calculateDeterministicBudget(newState);
      break;
    }

    case 'REMOVE_DESTINATION': {
      const updatedDests = (state?.selectedDestinations || []).filter(
        d => d?._id !== action.payload && d?.slug !== action.payload
      );
      const newStops = updatedDests.map(d => ({
        name: d?.name || '',
        slug: d?.slug || '',
        coordinates: d?.coordinates || null,
      }));
      newState = {
        ...state,
        selectedDestinations: updatedDests,
        route: { ...(state?.route || defaultState.route), stops: newStops },
        isDirty: true,
      };
      newState.budget = calculateDeterministicBudget(newState);
      break;
    }

    case 'ADD_STAY': {
      const currentStays = state?.selectedStays || [];
      if (currentStays.find(s => s?._id === action.payload?._id || s?.slug === action.payload?.slug)) {
        return state;
      }
      newState = {
        ...state,
        selectedStays: [...currentStays, action.payload],
        isDirty: true,
      };
      newState.budget = calculateDeterministicBudget(newState);
      break;
    }

    case 'REMOVE_STAY': {
      newState = {
        ...state,
        selectedStays: (state?.selectedStays || []).filter(
          s => s?._id !== action.payload && s?.slug !== action.payload
        ),
        isDirty: true,
      };
      newState.budget = calculateDeterministicBudget(newState);
      break;
    }

    case 'SET_BUDGET': {
      newState = {
        ...state,
        budget: { ...(state?.budget || defaultState.budget), ...action.payload },
        isDirty: true,
      };
      newState.budget = calculateDeterministicBudget(newState);
      break;
    }

    case 'SET_ROUTE': {
      newState = {
        ...state,
        route: { ...(state?.route || defaultState.route), ...action.payload },
        isDirty: true,
      };
      newState.budget = calculateDeterministicBudget(newState);
      break;
    }

    case 'SET_ITINERARY':
      newState = { ...state, itinerary: action.payload, isDirty: true };
      break;

    case 'REORDER_ACTIVITIES': {
      const { dayIndex, newActivities } = action.payload;
      if (!state?.itinerary?.days?.[dayIndex]) return state;
      const updatedDays = [...state.itinerary.days];
      updatedDays[dayIndex] = {
        ...updatedDays[dayIndex],
        activities: newActivities,
      };
      newState = {
        ...state,
        itinerary: { ...state.itinerary, days: updatedDays },
        isDirty: true,
      };
      break;
    }

    case 'ADD_EXPENSE': {
      const currentExpenses = Array.isArray(state?.expenses) ? state.expenses : [];
      const newExpenses = [action.payload, ...currentExpenses];
      newState = { ...state, expenses: newExpenses, isDirty: true };
      break;
    }

    case 'DELETE_EXPENSE': {
      const currentExpenses = Array.isArray(state?.expenses) ? state.expenses : [];
      const newExpenses = currentExpenses.filter(e => (e?._id || e?.id) !== action.payload);
      newState = { ...state, expenses: newExpenses, isDirty: true };
      break;
    }

    case 'TOGGLE_PACKING_ITEM': {
      const currentPacking = Array.isArray(state?.packingList) ? state.packingList : defaultState.packingList;
      const updated = currentPacking.map(item =>
        item.id === action.payload ? { ...item, isPacked: !item.isPacked } : item
      );
      newState = { ...state, packingList: updated, isDirty: true };
      break;
    }

    case 'ADD_PACKING_ITEM': {
      const currentPacking = Array.isArray(state?.packingList) ? state.packingList : defaultState.packingList;
      const newItem = {
        id: String(Date.now()),
        item: action.payload.item,
        isPacked: false,
        category: action.payload.category || 'General',
      };
      newState = { ...state, packingList: [...currentPacking, newItem], isDirty: true };
      break;
    }

    case 'LOAD_TRIP':
      return { ...state, ...action.payload, isDirty: false };

    case 'RESET_TRIP':
      newState = defaultState;
      break;

    default:
      return state;
  }

  return newState;
}

export function TripProvider({ children }) {
  const [state, dispatch] = useReducer(tripReducer, defaultState);

  // Load from local storage safely after initial mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === 'object') {
          dispatch({
            type: 'LOAD_TRIP',
            payload: {
              ...defaultState,
              ...parsed,
              budget: { ...defaultState.budget, ...(parsed?.budget || {}) },
              route: { ...defaultState.route, ...(parsed?.route || {}) },
              expenses: Array.isArray(parsed?.expenses) ? parsed.expenses : defaultState.expenses,
              packingList: Array.isArray(parsed?.packingList) ? parsed.packingList : defaultState.packingList,
              selectedDestinations: Array.isArray(parsed?.selectedDestinations) ? parsed.selectedDestinations : [],
              selectedStays: Array.isArray(parsed?.selectedStays) ? parsed.selectedStays : [],
              selectedFoods: Array.isArray(parsed?.selectedFoods) ? parsed.selectedFoods : [],
            },
          });
        }
      }
    } catch (e) {
      console.warn('Could not load saved trip:', e);
    }
  }, []);

  // Sync to local storage
  useEffect(() => {
    if (!state) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (err) {
      console.error('Failed to sync trip to localStorage:', err);
    }
  }, [state]);

  const setTitle = useCallback((title) => dispatch({ type: 'SET_TITLE', payload: title }), []);
  const addDestination = useCallback((dest) => {
    dispatch({ type: 'ADD_DESTINATION', payload: dest });
    toast.success(`Added ${dest?.name || 'Destination'} to trip`);
  }, []);
  const removeDestination = useCallback((id) => {
    dispatch({ type: 'REMOVE_DESTINATION', payload: id });
    toast('Removed from trip');
  }, []);
  const addStay = useCallback((stay) => {
    dispatch({ type: 'ADD_STAY', payload: stay });
    toast.success(`Added ${stay?.name || 'Stay'} to itinerary`);
  }, []);
  const removeStay = useCallback((id) => {
    dispatch({ type: 'REMOVE_STAY', payload: id });
  }, []);
  const setBudget = useCallback((data) => dispatch({ type: 'SET_BUDGET', payload: data }), []);
  const setRoute = useCallback((data) => dispatch({ type: 'SET_ROUTE', payload: data }), []);
  const setItinerary = useCallback((data) => dispatch({ type: 'SET_ITINERARY', payload: data }), []);
  const reorderActivities = useCallback((dayIndex, newActivities) => {
    dispatch({ type: 'REORDER_ACTIVITIES', payload: { dayIndex, newActivities } });
  }, []);
  const addExpense = useCallback((expense) => {
    dispatch({ type: 'ADD_EXPENSE', payload: { ...expense, id: String(Date.now()), date: new Date() } });
    toast.success('Expense recorded');
  }, []);
  const deleteExpense = useCallback((id) => {
    dispatch({ type: 'DELETE_EXPENSE', payload: id });
    toast('Expense removed');
  }, []);
  const togglePackingItem = useCallback((id) => dispatch({ type: 'TOGGLE_PACKING_ITEM', payload: id }), []);
  const addPackingItem = useCallback((item, category) => {
    dispatch({ type: 'ADD_PACKING_ITEM', payload: { item, category } });
  }, []);
  const resetTrip = useCallback(() => {
    dispatch({ type: 'RESET_TRIP' });
    toast('Trip state reset');
  }, []);

  const totalSpent = (state?.expenses || []).reduce((sum, e) => sum + Number(e?.amount || 0), 0);
  const targetCap = state?.budget?.target || state?.budget?.total || 25000;
  const remainingBudget = Math.max(0, targetCap - totalSpent);

  return (
    <TripContext.Provider
      value={{
        ...state,
        budget: state?.budget || defaultState.budget,
        route: state?.route || defaultState.route,
        selectedDestinations: state?.selectedDestinations || [],
        selectedStays: state?.selectedStays || [],
        selectedFoods: state?.selectedFoods || [],
        expenses: state?.expenses || [],
        packingList: state?.packingList || defaultState.packingList,
        totalSpent,
        remainingBudget,
        setTitle,
        addDestination,
        removeDestination,
        addStay,
        removeStay,
        setBudget,
        setRoute,
        setItinerary,
        reorderActivities,
        addExpense,
        deleteExpense,
        togglePackingItem,
        addPackingItem,
        resetTrip,
      }}
    >
      {children}
    </TripContext.Provider>
  );
}

export const useTrip = () => {
  const ctx = useContext(TripContext);
  if (!ctx) throw new Error('useTrip must be used inside TripProvider');
  return ctx;
};
