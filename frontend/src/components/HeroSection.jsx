import React, { useState } from 'react'
import { Button } from './ui/button'
import { Search } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice'
import { useNavigate } from 'react-router-dom'

const HeroSection = () => {
    const [query, setQuery] = useState("")
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const searchJobHandler = () => {
        if (!query.trim()) return
        dispatch(setSearchedQuery(query))
        navigate("/browse")
    }

    return (
        <section className="relative bg-gradient-to-b from-blue-50 to-white overflow-hidden">
            {/* Decorative shapes */}
            <div className="absolute -top-20 -left-32 w-96 h-96 bg-blue-100 rounded-full opacity-40 blur-3xl"></div>
            <div className="absolute -bottom-24 -right-32 w-96 h-96 bg-blue-200 rounded-full opacity-30 blur-3xl"></div>

            <div className="relative max-w-7xl mx-auto px-6 py-28 text-center">
                
                {/* Badge */}
                <span className="inline-block mb-6 px-6 py-2 rounded-full bg-blue-100 text-blue-600 text-sm font-semibold tracking-wide">
                    Myanmar’s Trusted Job Portal
                </span>

                {/* Heading */}
                <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
                    Find Your <span className="text-blue-600">Dream Job</span> Effortlessly
                </h1>

                {/* Subtitle */}
                <p className="mt-4 text-gray-600 max-w-xl mx-auto text-md md:text-lg">
                    Explore thousands of opportunities across Myanmar. Apply easily, get discovered, and take your career to the next level.
                </p>

                {/* Search Box */}
                <div className="mt-10 flex items-center w-full max-w-lg mx-auto bg-white border border-gray-200 rounded-full shadow-lg overflow-hidden transition hover:shadow-xl">
                    <input
                        type="text"
                        placeholder="Job title, skill, or company"
                        onChange={(e) => setQuery(e.target.value)}
                        className="flex-1 px-6 py-4 text-gray-700 placeholder-gray-400 text-sm md:text-base outline-none"
                        onKeyDown={(e) => e.key === 'Enter' && searchJobHandler()}
                    />

                    <Button
                        onClick={searchJobHandler}
                        className="h-full px-6 rounded-none rounded-r-full bg-blue-600 hover:bg-blue-700 transition flex items-center justify-center"
                    >
                        <Search className="w-5 h-10 text-white" />
                    </Button>
                </div>

                {/* Popular Searches */}
                <div className="mt-6 flex flex-wrap justify-center gap-3 text-sm md:text-base">
                    <span className="text-gray-500 font-medium">Popular:</span>
                    {["Frontend Developer", "Backend Developer", "UI/UX Designer"].map((job, idx) => (
                        <span key={idx} className="px-4 py-1 bg-gray-100 rounded-full text-gray-600 cursor-pointer hover:bg-blue-50 hover:text-blue-600 transition">
                            {job}
                        </span>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default HeroSection
