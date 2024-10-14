'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import './globals.css';

export default function HomePage() {
  const [location, setLocation] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (location) {
      router.push(`/${encodeURIComponent(location)}`);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-black">
      <main className="text-center">
        <h1 className="text-4xl font-bold mb-6">Welcome to WeatherGPT</h1>
        <p className="text-lg mb-8">Enter a location to get the weather information</p>

        {/* Form to Input Location */}
        <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto">
          <input
            type="text"
            className="w-full p-3 border border-gray-300 rounded-md"
            placeholder="Enter location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <button
            type="submit"
            className="mt-4 w-full p-3 bg-blue-600 text-white rounded-md hover:bg-blue-500"
          >
            Get Weather
          </button>
        </form>
      </main>
    </div>
  );
}