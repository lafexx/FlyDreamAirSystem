import React from 'react'
import { useState } from "react";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";

type CarouselProps = {
  children: React.ReactNode;
  label: string;
  itemsPerPage?: number;
};

const Carousel = ({ children, label, itemsPerPage = 3 }: CarouselProps) => {
    const childArray = React.Children.toArray(children);
    const [startIndex, setStartIndex] = useState(0);    
    const totalPages = Math.ceil(childArray.length / itemsPerPage); 

    const handlePrev = () => {
        setStartIndex((prev) => (prev - itemsPerPage + childArray.length) % childArray.length);
    };  

    const handleNext = () => {
        setStartIndex((prev) => (prev + itemsPerPage) % childArray.length);
    };  

    const visibleItems = childArray.slice(startIndex, startIndex + itemsPerPage).concat(startIndex + itemsPerPage > childArray.length
        ? childArray.slice(0, (startIndex + itemsPerPage) % childArray.length)
        : []
    );  

    const currentPage = Math.floor(startIndex / itemsPerPage);  

    return (
        <div className="w-full p-4 space-y-4">
            <h1 className="text-2xl text-neutral-700">{label}</h1>
            <div className="grid grid-rows-1 grid-cols-[auto_1fr_auto] items-center">
                <button
                  onClick={handlePrev}
                  className="cursor-pointer text-neutral-600 hover:text-neutral-800 text-4xl duration-200 ease-linear"
                >
                    <BiChevronLeft />
                </button> 

                <div className="flex justify-center space-x-4 overflow-hidden">
                  {visibleItems.map((child, idx) => (
                    <div key={idx} className="min-w-[200px]">
                      {child}
                    </div>
                  ))}
                </div>  

                <button
                  onClick={handleNext}
                  className="cursor-pointer text-neutral-600 hover:text-neutral-800 text-4xl duration-200 ease-linear"
                >
                    <BiChevronRight />
                </button>
            </div>  

            <div className="flex justify-center space-x-2 mt-2">
                {Array.from({ length: totalPages }).map((_, idx) => (
                    <span key={idx} className={`h-2 w-2 rounded-full ${
                            idx === currentPage ? "bg-neutral-700" : "bg-neutral-300"
                      }`}
                    />
                ))}
            </div>
        </div>
    );
};

export default Carousel;
