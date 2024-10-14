import type { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';
import { fetchWeatherData } from '../utils/util'; 

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, 
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { location, prompt } = req.body;

  if (!location) {
    return res.status(400).json({ error: 'Location is required' });
  }

  try {
    const weatherData = await fetchWeatherData(location);

    if (!prompt) {
      // If no prompt is provided, just return the weather data
      return res.status(200).json(weatherData);
    }

    // If a prompt is provided, generate a GPT response using the weather data
    const weatherInfo = `The current weather in ${weatherData.location} is ${weatherData.condition} with a temperature of ${weatherData.temperatureC}°C (${weatherData.temperatureF}°F) and a humidity of ${weatherData.humidity}%.`;

    const gptResponse = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: `${prompt}\n\nWeather info: ${weatherInfo}` }],
      max_tokens: 100,
    });

    // Return the GPT-generated response along with weather data
    return res.status(200).json({
      weather: weatherData,
      gptResponse: gptResponse.choices[0].message.content,
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Error fetching weather or GPT response' });
  }
}
