"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CarouselProps {
  images: string[];
}

export const Carousel: React.FC<CarouselProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!images || images.length === 0) return null;

  const prevImage = (e: any) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextImage = (e: any) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative w-full h-44 overflow-hidden rounded-md bg-white flex items-center justify-center group">
      <img
        src={images[currentIndex]}
        alt={`image-${currentIndex}`}
        className="h-full w-full object-contain"
      />

      {images.length > 1 && (
        <>
          {/* Previous Button */}
          <Button
            size="icon"
            variant="ghost"
            className="absolute left-1 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={(e) => prevImage(e)}
          >
            <ChevronLeft size={20} />
          </Button>

          {/* Next Button */}
          <Button
            size="icon"
            variant="ghost"
            className="absolute right-1 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={(e) => nextImage(e)}
          >
            <ChevronRight size={20} />
          </Button>

          {/* Dots */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            {images.map((_, index) => (
              <span
                key={index}
                className={`w-2 h-2 rounded-full ${
                  index === currentIndex ? "bg-green-600" : "bg-gray-300"
                }`}
              ></span>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
