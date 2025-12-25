import React from 'react';
import { Lightbulb, BookOpen, Users } from 'lucide-react';
import { Button } from './ui/button';

const tips = [
  {
    icon: <Lightbulb className="w-8 h-8 text-blue-600" />,
    title: "Resume Optimization",
    description: "Learn how to create a professional resume that stands out to employers."
  },
  {
    icon: <BookOpen className="w-8 h-8 text-blue-600" />,
    title: "Interview Preparation",
    description: "Master common interview questions and techniques to impress recruiters."
  },
  {
    icon: <Users className="w-8 h-8 text-blue-600" />,
    title: "Networking Tips",
    description: "Build meaningful connections and grow your professional network effectively."
  }
];

const CareerTips = () => {
  return (
    <section className="bg-blue-50 py-20">
      <div className="max-w-7xl mx-auto px-6 text-center">
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Career Tips & Guidance
        </h2>
        <p className="text-gray-600 mb-10">
          Improve your chances of landing your dream job with expert advice and actionable tips.
        </p>

        {/* Tips Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {tips.map((tip, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition cursor-pointer">
              <div className="flex justify-center mb-4">
                {tip.icon}
              </div>
              <h3 className="font-semibold text-xl mb-2">{tip.title}</h3>
              <p className="text-gray-600">{tip.description}</p>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <Button
          className="mt-10 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full shadow-md transition"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          Explore More Tips
        </Button>
      </div>
    </section>
  );
};

export default CareerTips;
