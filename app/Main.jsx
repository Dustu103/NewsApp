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
  const[search,setSearch]=useState('')  //State to handle search

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
          <div className="mb-4">
          
<form class="max-w-md mx-auto">   
    <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
    <div class="relative">
        <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
        </div>
        <input type="search" id="default-search" class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search News..." onChange={(e) => setSearch(e.target.value)} />
        
    </div>
</form>

        </div>
          {loading ? (
            <div className="text-white text-center">Loading...</div>
          ) : error ? (
            <div className="text-red-500 text-center">{error}</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-6">
                {/* {console.log(items)} */}
              {items.filter((item)=>{return search.toLowerCase()===''?item: item.title.toLowerCase().includes(search.toLowerCase())
            }).map((item, index) => (
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
