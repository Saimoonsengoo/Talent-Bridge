import React from 'react'
import { Button } from './ui/button'
import { Bookmark } from 'lucide-react'
import { Avatar, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'

const Job = ({ job }) => {
    const navigate = useNavigate()

    const daysAgoFunction = (mongodbTime) => {
        const createdAt = new Date(mongodbTime)
        const currentTime = new Date()
        const timeDifference = currentTime - createdAt
        return Math.floor(timeDifference / (1000 * 24 * 60 * 60))
    }

    return (
        <div className="group p-6 rounded-xl bg-white border border-gray-200 
                        transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
            
            {/* Top Row */}
            <div className="flex items-center justify-between mb-4">
                <p className="text-xs text-gray-500">
                    {daysAgoFunction(job?.createdAt) === 0
                        ? "Today"
                        : `${daysAgoFunction(job?.createdAt)} days ago`}
                </p>

                <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full hover:bg-blue-50 hover:text-blue-600"
                >
                    <Bookmark className="w-4 h-4" />
                </Button>
            </div>

            {/* Company Info */}
            <div className="flex items-center gap-3 mb-4">
                <Avatar className="h-12 w-12 border border-gray-200">
                    <AvatarImage src={job?.company?.logo} />
                </Avatar>

                <div>
                    <h1 className="font-semibold text-base text-gray-900 group-hover:text-blue-600 transition">
                        {job?.company?.name}
                    </h1>
                    <p className="text-xs text-gray-500">
                        Myanmar
                    </p>
                </div>
            </div>

            {/* Job Content */}
            <div className="mb-4">
                <h1 className="font-bold text-lg text-gray-900 line-clamp-1">
                    {job?.title}
                </h1>
                <p className="mt-1 text-sm text-gray-600 line-clamp-2">
                    {job?.description}
                </p>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-5">
                <Badge variant="ghost" className="bg-blue-50 text-blue-600 font-medium">
                    {job?.position} Positions
                </Badge>

                <Badge variant="ghost" className="bg-gray-100 text-gray-700 font-medium">
                    {job?.jobType}
                </Badge>

                <Badge variant="ghost" className="bg-green-50 text-green-600 font-medium">
                    {job?.salary} MMK
                </Badge>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
                <Button
                    onClick={() => navigate(`/description/${job?._id}`)}
                    variant="outline"
                    className="flex-1 border-blue-600 text-blue-600 hover:bg-blue-50"
                >
                    View Details
                </Button>

                <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
                    Save Job
                </Button>
            </div>

            {/* Bottom Accent */}
            <span className="absolute inset-x-0 bottom-0 h-1 bg-blue-600 rounded-b-xl 
                             scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
        </div>
    )
}

export default Job
