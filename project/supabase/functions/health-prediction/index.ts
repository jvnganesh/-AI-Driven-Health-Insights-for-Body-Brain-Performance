import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'npm:@supabase/supabase-js';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

interface PredictionInput {
  Age: number;
  "Sleep Hours": number;
  "Work Hours per Week": number;
  "Screen Time per Day (Hours)": number;
  "Social Interaction Score": number;
  "Happiness Score": number;
  Gender: string;
  "Exercise Level": string;
  "Diet Type": string;
  "Stress Level": string;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const input: PredictionInput = await req.json();

    // Here we would normally use the ML models, but since we can't load Python models,
    // we'll implement a simplified rule-based system
    const mentalHealthRisk = calculateMentalHealthRisk(input);
    const exercises = recommendExercises(input);
    const equipment = recommendEquipment(input);
    const diet = recommendDiet(input);

    return new Response(
      JSON.stringify({
        mentalHealth: {
          risk: mentalHealthRisk,
          message: mentalHealthRisk > 0.5 ? "Potential mental health concerns detected" : "No significant mental health concerns detected"
        },
        recommendations: {
          exercises,
          equipment,
          diet
        }
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});

function calculateMentalHealthRisk(input: PredictionInput): number {
  let riskScore = 0;
  
  // Sleep impact
  if (input["Sleep Hours"] < 6) riskScore += 0.2;
  if (input["Sleep Hours"] > 9) riskScore += 0.1;
  
  // Work hours impact
  if (input["Work Hours per Week"] > 50) riskScore += 0.15;
  
  // Screen time impact
  if (input["Screen Time per Day (Hours)"] > 8) riskScore += 0.15;
  
  // Social interaction impact
  if (input["Social Interaction Score"] < 5) riskScore += 0.2;
  
  // Happiness score impact
  if (input["Happiness Score"] < 5) riskScore += 0.3;
  
  return Math.min(riskScore, 1);
}

function recommendExercises(input: PredictionInput): string[] {
  const exercises = [];
  
  if (input["Exercise Level"] === "Low") {
    exercises.push(
      "Walking for 30 minutes daily",
      "Basic stretching exercises",
      "Light yoga poses",
      "Gentle swimming"
    );
  } else if (input["Exercise Level"] === "Moderate") {
    exercises.push(
      "30-minute jogging sessions",
      "Bodyweight exercises",
      "Intermediate yoga",
      "Cycling"
    );
  } else {
    exercises.push(
      "High-intensity interval training",
      "Advanced strength training",
      "Long-distance running",
      "CrossFit-style workouts"
    );
  }
  
  return exercises;
}

function recommendEquipment(input: PredictionInput): string[] {
  const equipment = ["Comfortable athletic shoes"];
  
  if (input["Exercise Level"] === "Low") {
    equipment.push(
      "Yoga mat",
      "Light resistance bands",
      "Small hand weights (2-5 lbs)"
    );
  } else if (input["Exercise Level"] === "Moderate") {
    equipment.push(
      "Adjustable dumbbells",
      "Resistance bands set",
      "Foam roller",
      "Jump rope"
    );
  } else {
    equipment.push(
      "Olympic barbell set",
      "Power rack",
      "Kettlebells",
      "Medicine balls"
    );
  }
  
  return equipment;
}

function recommendDiet(input: PredictionInput): {
  meals: string[];
  supplements: string[];
  hydration: string;
} {
  const recommendations = {
    meals: [],
    supplements: [],
    hydration: "Drink 8-10 glasses of water daily"
  };
  
  switch (input["Diet Type"]) {
    case "Vegetarian":
      recommendations.meals = [
        "Quinoa bowl with roasted vegetables",
        "Greek yogurt with fruits and nuts",
        "Lentil curry with brown rice",
        "Vegetable stir-fry with tofu"
      ];
      recommendations.supplements = ["Vitamin B12", "Iron", "Vitamin D"];
      break;
      
    case "Vegan":
      recommendations.meals = [
        "Overnight oats with plant-based milk",
        "Buddha bowl with chickpeas",
        "Black bean and sweet potato tacos",
        "Mushroom and pea protein pasta"
      ];
      recommendations.supplements = ["Vitamin B12", "Vitamin D", "Iron", "Omega-3"];
      break;
      
    case "Keto":
      recommendations.meals = [
        "Eggs and avocado breakfast",
        "Grilled chicken with cauliflower rice",
        "Salmon with asparagus",
        "Nuts and cheese snacks"
      ];
      recommendations.supplements = ["Magnesium", "Omega-3", "Potassium"];
      break;
      
    default:
      recommendations.meals = [
        "Oatmeal with fruits and nuts",
        "Grilled chicken salad",
        "Fish with quinoa and vegetables",
        "Greek yogurt with berries"
      ];
      recommendations.supplements = ["Multivitamin", "Omega-3"];
  }
  
  return recommendations;
}