import { ReactNode } from 'react';
import "./globals.css";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>WeatherGPT</title>
        <meta name="description" content="Get weather information for any location using WeatherGPT." />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className="bg-gray-100 min-h-screen flex flex-col">
        {/* Header */}
        <header className="bg-white shadow-md p-4">
          <div className="container mx-auto">
            <h1 className="text-3xl font-bold">WeatherGPT</h1>
            <p className="text-gray-600">Powered by Next.js and Vercel</p>
          </div>
        </header>
        {/* Main Content */}
        <main className="flex-grow flex flex-col items-center justify-center w-full">{children}</main>
        {/* Footer */}
        <footer className="bg-white shadow-inner p-4 mt-auto text-center">
          <div className="container mx-auto">
            <p className="text-gray-500 text-sm">
              Built with <a href="https://nextjs.org" className="text-blue-600">Next.js</a> and hosted on <a href="https://vercel.com" className="text-blue-600">Vercel</a>.
            </p>
            <p className="text-gray-500 text-xs">
              © {new Date().getFullYear()} WeatherGPT
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}