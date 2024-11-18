"use client";

import React, { useState, useEffect } from "react";
import { AnimatedBackground } from "animated-backgrounds";
import Card from "./components/Card";
import Navbar from "./components/Navbar";
import axios from "axios";

function Main() {
  const [items, setItems] = useState([]); // State to store fetched items
  const [loading, setLoading] = useState(true); // State to handle loading state
  const [error, setError] = useState(null); // State to handle errors

  useEffect(() => {
    // Fetch data when the component mounts
    const fetchData = async () => {
      const options = {
        method: "GET",
        url: "https://real-time-news-data.p.rapidapi.com/top-headlines",
        params: {
          limit: "500",
          country: "US",
          lang: "en",
        },
        headers: {
          "x-rapidapi-key": process.env.NEXT_PUBLIC_API_KEY,
          "x-rapidapi-host": "real-time-news-data.p.rapidapi.com",
        },
      };

      try {
        const response = await axios.request(options);
        console.log(response.data.data)
        // Assuming response.data contains an array of news items, update the state
        setItems(response.data.data || []); // Adjust based on actual API response structure
        setLoading(false); // Data fetched, stop loading
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to fetch data");
        setLoading(false); // Stop loading even on error
      }
    };

    fetchData(); // Call the fetch function
  }, []); // Empty dependency array to run only once when the component mounts

  return (
    <>
      <div>
        <AnimatedBackground
          animationName="starryNight"
          blendMode="luminosity" // Optional: Add blend mode for visual effects
        />
      </div>
      <div className="min-h-screen">
        <div className="fixed top-0 z-[99999] w-full mb-8">
          <Navbar />
        </div>

        <div className="p-4 mt-16">
          {/* Show loading or error state if data is still being fetched */}
          {loading ? (
            <div className="text-white text-center">Loading...</div>
          ) : error ? (
            <div className="text-red-500 text-center">{error}</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-6">
                {/* {console.log(items)} */}
              {items.map((item, index) => (
                <div key={index} className="flex justify-center">
                   {/* { console.log(item.link)}
                   {console.log(item.title)} */}
                  <Card title={item?.title} photo_url={item?.photo_url} description={item?.description} item={item} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Main;
