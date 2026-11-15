import { AppError } from '../middleware/errorHandler.js';

export async function generateItinerary({ destinations, days, budget, groupSize, preferences }) {
  const hasApiKey = !!process.env.GEMINI_API_KEY || !!process.env.OPENAI_API_KEY;

  if (hasApiKey) {
    return await generateWithAI({ destinations, days, budget, groupSize, preferences });
  }
  return generateDeterministicItinerary({ destinations, days, budget, groupSize });
}

async function generateWithAI(params) {
  if (process.env.GEMINI_API_KEY) {
    return generateWithGemini(params);
  }
  return generateWithOpenAI(params);
}

async function generateWithGemini({ destinations, days, budget, groupSize, preferences }) {
  const { GoogleGenerativeAI } = await import('@google/generative-ai').catch(() => {
    throw new AppError('Gemini SDK not installed. Run: npm install @google/generative-ai', 500);
  });

  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

  const prompt = buildItineraryPrompt({ destinations, days, budget, groupSize, preferences });
  const result = await model.generateContent(prompt);
  const text = result.response.text();
  return parseAIResponse(text);
}

async function generateWithOpenAI({ destinations, days, budget, groupSize, preferences }) {
  const OpenAI = (await import('openai').catch(() => {
    throw new AppError('OpenAI SDK not installed. Run: npm install openai', 500);
  })).default;

  const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  const prompt = buildItineraryPrompt({ destinations, days, budget, groupSize, preferences });

  const response = await client.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [{ role: 'user', content: prompt }],
    response_format: { type: 'json_object' },
  });

  return JSON.parse(response.choices[0].message.content);
}

function buildItineraryPrompt({ destinations, days, budget, groupSize, preferences }) {
  return `You are YATRA, an Indian travel planner. Create a detailed ${days}-day itinerary for ${groupSize} person(s) visiting ${destinations.join(', ')}.

Budget: ₹${budget} total (₹${Math.round(budget / groupSize)} per person)
Preferences: ${JSON.stringify(preferences)}

Return ONLY valid JSON in this exact format:
{
  "title": "Trip title",
  "days": [
    {
      "day": 1,
      "title": "Day title",
      "location": "City name",
      "activities": [
        {
          "time": "09:00",
          "title": "Activity name",
          "description": "Brief description",
          "type": "sightseeing|food|travel|activity|rest",
          "cost": 500,
          "duration": 120
        }
      ],
      "notes": "Day notes",
      "outfitSuggestion": "What to wear",
      "weatherNote": "Expected weather"
    }
  ],
  "budget": {
    "transit": 0,
    "stay": 0,
    "food": 0,
    "activities": 0,
    "misc": 0,
    "total": 0
  },
  "packingList": ["item1", "item2"]
}

Use real Indian destinations, authentic prices in INR, and practical local advice.`;
}

function generateDeterministicItinerary({ destinations, days, budget, groupSize }) {
  const perPersonBudget = budget / groupSize;
  const dailyBudget = perPersonBudget / days;

  const dayPlans = Array.from({ length: days }, (_, i) => ({
    day: i + 1,
    title: `Day ${i + 1} — ${destinations[Math.min(i, destinations.length - 1)] || 'Exploration'}`,
    location: destinations[Math.min(i, destinations.length - 1)] || destinations[0],
    activities: [
      {
        time: '07:00',
        title: 'Breakfast at local dhaba',
        description: 'Start the day with authentic local cuisine',
        type: 'food',
        cost: Math.round(dailyBudget * 0.1 * groupSize),
        duration: 60,
      },
      {
        time: '09:00',
        title: 'Morning sightseeing',
        description: 'Explore the main attractions',
        type: 'sightseeing',
        cost: Math.round(dailyBudget * 0.2 * groupSize),
        duration: 180,
      },
      {
        time: '13:00',
        title: 'Lunch',
        description: 'Regional lunch at a recommended restaurant',
        type: 'food',
        cost: Math.round(dailyBudget * 0.15 * groupSize),
        duration: 60,
      },
      {
        time: '15:00',
        title: 'Afternoon exploration',
        description: 'Visit local markets and secondary attractions',
        type: 'activity',
        cost: Math.round(dailyBudget * 0.15 * groupSize),
        duration: 120,
      },
      {
        time: '19:00',
        title: 'Dinner',
        description: 'Evening dinner at a popular local spot',
        type: 'food',
        cost: Math.round(dailyBudget * 0.15 * groupSize),
        duration: 60,
      },
    ],
    notes: `Budget for today: ₹${Math.round(dailyBudget * groupSize)} for ${groupSize} person(s)`,
    outfitSuggestion: 'Comfortable walking shoes, light layers',
    weatherNote: 'Check local forecast before heading out',
  }));

  const transitCost = Math.round(budget * 0.25);
  const stayCost = Math.round(budget * 0.3);
  const foodCost = Math.round(budget * 0.25);
  const activitiesCost = Math.round(budget * 0.1);
  const miscCost = Math.round(budget * 0.1);

  return {
    title: `${days}-Day ${destinations.slice(0, 2).join(' & ')} Adventure`,
    days: dayPlans,
    budget: {
      transit: transitCost,
      stay: stayCost,
      food: foodCost,
      activities: activitiesCost,
      misc: miscCost,
      total: transitCost + stayCost + foodCost + activitiesCost + miscCost,
    },
    packingList: [
      'Government ID proof',
      'First-aid kit',
      'Power bank',
      'Comfortable walking shoes',
      'Light rain jacket',
      'Reusable water bottle',
      'Offline maps downloaded',
      'Emergency cash',
    ],
  };
}

function parseAIResponse(text) {
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new AppError('AI returned invalid response format', 500);
  return JSON.parse(jsonMatch[0]);
}
