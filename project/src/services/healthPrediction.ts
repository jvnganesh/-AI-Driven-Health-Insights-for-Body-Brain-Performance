import { supabase } from '../lib/supabase';

export interface HealthPredictionInput {
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

export interface HealthPredictionResponse {
  mentalHealth: {
    risk: number;
    message: string;
  };
  recommendations: {
    exercises: string[];
    equipment: string[];
    diet: {
      meals: string[];
      supplements: string[];
      hydration: string;
    };
  };
}

export async function getHealthPredictions(input: HealthPredictionInput): Promise<HealthPredictionResponse> {
  try {
    const { data, error } = await supabase.functions.invoke('health-prediction', {
      body: JSON.stringify(input),
    });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error getting health predictions:', error);
    throw error;
  }
}