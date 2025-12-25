import React from 'react'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'
import { Avatar, AvatarImage } from './ui/avatar'

const LatestJobCards = ({ job }) => {
    const navigate = useNavigate()

    return (
        <div
            onClick={() => navigate(`/description/${job._id}`)}
            className="group relative p-6 rounded-xl border border-gray-200 bg-white cursor-pointer 
                       transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
        >
            {/* Company Header */}
            <div className="flex items-center gap-4">
                <Avatar className="h-12 w-12 border border-gray-200">
                    <AvatarImage src={job?.company?.logo} />
                </Avatar>

                <div className="flex-1">
                    <h1 className="font-semibold text-base text-gray-900 group-hover:text-blue-600 transition">
                        {job?.company?.name}
                    </h1>
                    <p className="text-xs text-gray-500">
                        Myanmar
                    </p>
                </div>
            </div>

            {/* Job Details */}
            <div className="mt-4">
                <h2 className="font-bold text-lg text-gray-900 line-clamp-1 group-hover:text-blue-700 transition">
                    {job?.title}
                </h2>
                <p className="mt-1 text-sm text-gray-600 line-clamp-2">
                    {job?.description}
                </p>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-5">
                <Badge
                    variant="ghost"
                    className="bg-blue-50 text-blue-600 font-medium"
                >
                    {job?.position} Positions
                </Badge>

                <Badge
                    variant="ghost"
                    className="bg-gray-100 text-gray-700 font-medium"
                >
                    {job?.jobType}
                </Badge>

                <Badge
                    variant="ghost"
                    className="bg-green-50 text-green-600 font-medium"
                >
                    {job?.salary} MMK
                </Badge>
            </div>

            {/* Hover Accent */}
            <span className="absolute inset-x-0 bottom-0 h-1 bg-blue-600 rounded-b-xl scale-x-0 
                             group-hover:scale-x-100 transition-transform origin-left" />
        </div>
    )
}

export default LatestJobCards
