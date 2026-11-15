import { generateItinerary } from '../services/aiService.js';
import { success } from '../utils/apiResponse.js';

export async function createItinerary(req, res, next) {
  try {
    const { destinations = ['Jaipur'], days = 3, budget = 20000, groupSize = 1, preferences = {} } = req.body;
    const itinerary = await generateItinerary({
      destinations: Array.isArray(destinations) ? destinations : [destinations],
      days: Number(days),
      budget: Number(budget),
      groupSize: Number(groupSize),
      preferences,
    });
    success(res, { itinerary }, 'Itinerary generated successfully');
  } catch (err) {
    next(err);
  }
}

export async function modifyItinerary(req, res, next) {
  try {
    const { currentItinerary, instruction } = req.body;
    // Apply modification deterministically or with AI
    let updated = { ...currentItinerary };
    if (instruction === 'cheaper') {
      // Scale down budget by 20%
      if (updated.budget) {
        Object.keys(updated.budget).forEach(key => {
          if (typeof updated.budget[key] === 'number') {
            updated.budget[key] = Math.round(updated.budget[key] * 0.8);
          }
        });
      }
      if (Array.isArray(updated.days)) {
        updated.days.forEach(day => {
          day.activities?.forEach(act => {
            if (act.cost) act.cost = Math.round(act.cost * 0.8);
          });
          day.notes = (day.notes || '') + ' (Budget-optimized: selected lower-cost local transit & authentic street dhabas)';
        });
      }
    } else if (instruction === 'rain') {
      if (Array.isArray(updated.days)) {
        updated.days.forEach(day => {
          day.activities?.forEach(act => {
            if (act.type === 'sightseeing') {
              act.title = 'Indoor Heritage Museum / Palace Gallery';
              act.description = 'Rain-friendly cultural exploration of historic royal artifacts and exhibits';
            }
          });
          day.weatherNote = 'Rain contingency activated: Indoor monuments and cozy indoor cafes prioritized';
        });
      }
    } else if (instruction === 'photography') {
      if (Array.isArray(updated.days)) {
        updated.days.forEach(day => {
          day.activities?.unshift({
            time: '05:45',
            title: 'Golden Hour Architectural Photography',
            description: 'Uncrowded dawn lighting, symmetry angles, long exposures on historical facades',
            type: 'activity',
            cost: 0,
            duration: 90,
          });
          day.notes = (day.notes || '') + ' (Photography director: carry polarizing filters & wide-angle lens)';
        });
      }
    }

    success(res, { itinerary: updated }, 'Itinerary updated');
  } catch (err) {
    next(err);
  }
}
