import { fetchWeatherData } from '../utils/util';
import Image from 'next/image';


const capitalizeFirstLetter = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

// This is now an async server component
export default async function WeatherPage({ params }: { params: { location: string } }) {
  const location = params.location;

  // Fetch weather data dynamically
  const weatherData = await fetchWeatherData(location);

  if (!weatherData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen w-full text-black">
        <h1 className="text-4xl font-bold mb-4">Error</h1>
        <p className="text-lg mb-8">Unable to fetch weather data for {location}</p>
      </div>
    );
  }

  const { temp_c, temp_f, humidity, condition } = weatherData.current;
  const weatherIcon = `https:${condition.icon}`;

  return (
    <div className="flex items-center justify-center min-h-screen w-full">
      <main className="text-center">
        <h1 className="text-7xl font-bold mb-6 gradient-text">WeatherGPT</h1>
        <p className="text-3xl mb-12 font-bold reverse-gradient-tex">Weather information for {capitalizeFirstLetter(location)}</p>

        <div className="flex justify-center items-center space-x-6 mb-4">
          <div className="flex flex-col items-center mr-36">
              <div className="flex items-center justify-center w-24 h-24 bg-gray-600 rounded-full mb-6 shadow-lg">
                <span className="text-white text-4xl font-bold zoom-effect">▲</span>
              </div>
              <h3 className="text-xl font-medium text-gray-400">Your Location</h3>
              <p className="text-4xl font-bold">{capitalizeFirstLetter(location)}</p>
          </div>
          <div className="flex flex-col items-center mr-48">
            <div className="flex items-center justify-center w-24 h-24 bg-gray-600 rounded-full mb-6 shadow-lg">
              <Image src={weatherIcon} width={96} height={96} className="zoom-effect" alt={`Weather icon for ${location}`} />
            </div>
            <h3 className="text-xl font-medium text-gray-400">Current Temperature</h3>
            <p className="text-4xl font-bold">
              {temp_c}°C / {temp_f}°F
            </p>
          </div>
        </div>
        <div className="mt-8">
          <h3 className="text-xl font-medium text-gray-400">Humidity</h3>
          <p className="text-4xl font-bold">{humidity}%</p>
        </div>
      </main>
    </div>
  );
}
