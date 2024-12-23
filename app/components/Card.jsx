import React, { useRef, useContext } from "react";
import Link from "next/link";
// import NewsContext from
import { useNews } from "../NewsContext"; // Import your NewsContext

const Card = ({ photo_url, title, item }) => {
  const cardRef = useRef(null);
  const glowRef = useRef(null);
  const contentRef = useRef(null);
  
  // Access setSelectedNews from the context
  const { setSelectedNews } = useNews();

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
    glow.style.backgroundImage = `
      radial-gradient(
        circle at ${x}px ${y}px,
        #ffffff44,
        #0000000f
      )
    `;
  };

  const handleClick = () => {
    console.log(item);
    setSelectedNews(item); // Store the selected item in the context
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

  return (
    <div className="bg-transparent flex items-center justify-center overflow-hidden">
      <div
        ref={cardRef}
        className="tilt-card w-80 h-96 bg-gradient-to-br from-gray-900 via-black to-gray-800 rounded-2xl shadow-xl relative cursor-pointer transition-all duration-300 ease-out hover:scale-105 group overflow-hidden"
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
          <div>
            <img src={photo_url} alt={title} />
          </div>
          <div className="space-y-4 text-white">
            <p>{title}</p>
            <Link href={`/full-news`}>
              <button
                className="block w-full py-2 bg-gradient-to-br from-gray-900 via-black to-gray-800 rounded-lg font-semibold transform transition hover:scale-105 active:scale-95 text-blue-600 text-center"
                onClick={handleClick} // On click, set the selected news
              >
                More...
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
