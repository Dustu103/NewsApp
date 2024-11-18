"use client";
import React, { useEffect, useState } from "react";
import { useNews } from "../NewsContext"; // Import the custom hook
import { AnimatedBackground } from "animated-backgrounds";
import FullScreenCard from "./FullScreenCard";


const FullNews = () => {
  const { selectedNews } = useNews(); // Get selected news from context
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!selectedNews) {
      setLoading(true); // Set loading if no news is selected yet
    } else {
      setLoading(false); // Set loading false once the news is available
    }
  }, [selectedNews,]);

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  // if (!selectedNews) {
  //   return <div>No news selected</div>;
  // }

  return (
    <>
    <div>
        <AnimatedBackground
          animationName="starryNight"
          blendMode="luminosity" // Optional: Add blend mode for visual effects
        />
      </div>
      <div>
      {console.log(JSON.stringify(selectedNews))}
      {/* {console.log((selectedNews))} */}
      <FullScreenCard item={selectedNews}/>
      finally
    </div>
    </>
    
    
  );
};

export default FullNews;
