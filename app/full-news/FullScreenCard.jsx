import React, { useRef } from "react";

const FullScreenCard = ({item }) => {
  const cardRef = useRef(null);
  const glowRef = useRef(null);
  const contentRef = useRef(null);

  // Access setSelectedNews from the context

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    const glow = glowRef.current;
    const content = contentRef.current;

    if (!card || !glow || !content) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const percentX = (x - centerX) / centerX;
    const percentY = -((y - centerY) / centerY);

    card.style.transform = `perspective(1000px) rotateY(${percentX * 10}deg) rotateX(${percentY * 10}deg)`;
    content.style.transform = `translateZ(50px)`;
    glow.style.opacity = "1";
    glow.style.backgroundImage = `radial-gradient(circle at ${x}px ${y}px, #ffffff44, #0000000f)`;
  };


  const handleMouseLeave = () => {
    const card = cardRef.current;
    const glow = glowRef.current;
    const content = contentRef.current;

    if (!card || !glow || !content) return;

    card.style.transform = "perspective(1000px) rotateY(0deg) rotateX(0deg)";
    content.style.transform = "translateZ(0px)";
    glow.style.opacity = "0";
  };

  const dateFormat = (isoDate) => {
    const date = new Date(isoDate); // Convert the ISO string to a Date object
    
    // Use toLocaleString() to format it to a readable string
    const formattedDate = date.toLocaleString("en-US", {
      weekday: "long", // Full weekday name
      year: "numeric",
      month: "long", // Full month name
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true, // 12-hour format with AM/PM
    });
  
    return formattedDate; // Return the formatted date
  };
  
  return (
    <div className="bg-transparent flex items-center justify-center overflow-hidden m-8">
        {console.log(item)}
      <div
        ref={cardRef}
        className="tilt-card w-full h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 rounded-2xl shadow-xl relative cursor-pointer transition-all duration-300 ease-out hover:scale-105 group overflow-hidden m-8"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-500 via-transparent to-yellow-500 opacity-0 group-hover:opacity-20 rounded-2xl blur-xl transition-all duration-500"></div>
        {/* Moving Sparkle Border */}
        <div className="absolute inset-0 rounded-2xl border-[3px] animate-sparkle"></div>

        <div
          ref={glowRef}
          className="glow opacity-0 transition-opacity duration-300 absolute w-full h-full top-0 left-0 rounded-2xl"
        ></div>
        <div
          ref={contentRef}
          className="tilt-card-content p-6 flex flex-col h-full justify-between relative z-10"
        >
          <div className="m-4">
            <img src={item?.photo_url} alt={item?.title} className="w-full h-96 rounded-lg" />
            <div className="text-white mt-1">
            <h1 className="text-3xl font-bold">{item?.title}</h1>
          </div>
          <div>
            <p>Source Name : {item?.source_name}</p>
            <p>News Link : <a href={item?.link}>{item?.link}</a></p>
          </div>
          <div>
            <div>
            date : {dateFormat(item?.
published_datetime_utc)
}  :: </div>
            {item?.snippet}
          </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default FullScreenCard;
