import axios from 'axios';

export async function fetchWeatherData(location: string) {
  const apiKey = process.env.WEATHER_API_KEY;
  const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}&aqi=no`;

  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return null;
  }
}

  export async function generateWeatherDescription(weatherData: any) {
    const openaiApiKey = process.env.OPENAI_API_KEY;
    const prompt = `
      The current weather for ${weatherData.location.name}, ${weatherData.location.region} is:
      - Temperature: ${weatherData.current.temp_c}°C (${weatherData.current.temp_f}°F)
      - Condition: ${weatherData.current.condition.text}
      - Humidity: ${weatherData.current.humidity}%
      
      Write a friendly description of the weather.
    `;
  
    try {
      const response = await axios.post(
        "https://api.openai.com/v1/completions",
        {
          model: "text-davinci-003",
          prompt: prompt,
          max_tokens: 100,
          temperature: 0.7,
        },
        {
          headers: {
            Authorization: `Bearer ${openaiApiKey}`,
            "Content-Type": "application/json",
          },
        }
      );
  
      return response.data.choices[0].text.trim();
    } catch (error) {
      console.error("Error generating OpenAI response:", error);
      throw new Error("Failed to generate OpenAI description");
    }
  }