import React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import { Button } from './ui/button';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchedQuery } from '@/redux/jobSlice';

const category = [
    "Frontend Developer",
    "Backend Developer",
    "Data Science",
    "Graphic Designer",
    "FullStack Developer"
];

const CategoryCarousel = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = (query) => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    };

    return (
        <div className="relative max-w-4xl mx-auto my-6 px-4">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4 text-center">Popular Categories</h2>
            <Carousel className="w-full">
                <CarouselContent className="flex gap-3">
                    {category.map((cat, index) => (
                        <CarouselItem key={index} className="flex-none w-40 md:w-52">
                            <Button
                                onClick={() => searchJobHandler(cat)}
                                variant="outline"
                                className="w-full rounded-full px-4 py-2 text-sm md:text-base hover:bg-blue-50 hover:border-blue-400 transition"
                            >
                                {cat}
                            </Button>
                        </CarouselItem>
                    ))}
                </CarouselContent>

                {/* Custom Navigation */}
                <div className="absolute top-1/2 transform -translate-y-1/2 left-0">
                    <CarouselPrevious className="bg-white shadow-md rounded-full p-2 hover:bg-blue-50 transition" />
                </div>
                <div className="absolute top-1/2 transform -translate-y-1/2 right-0">
                    <CarouselNext className="bg-white shadow-md rounded-full p-2 hover:bg-blue-50 transition" />
                </div>
            </Carousel>
        </div>
    );
};

export default CategoryCarousel;
