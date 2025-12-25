import React from 'react'
import LatestJobCards from './LatestJobCards'
import { useSelector } from 'react-redux' 

const LatestJobs = () => {
    const { allJobs } = useSelector(store => store.job)

    return (
        <section className="bg-gray-50 py-20">
            <div className="max-w-7xl mx-auto px-6">
                
                {/* Section Header */}
                <div className="mb-10 text-center md:text-left">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                        Latest & Top <span className="text-blue-600">Job Openings</span>
                    </h1>
                    <p className="mt-3 text-gray-600 max-w-2xl">
                        Explore newly posted job opportunities from trusted companies across Myanmar.
                    </p>
                </div>

                {/* Jobs Grid */}
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {
                        allJobs.length <= 0 ? (
                            <div className="col-span-full text-center py-16 text-gray-500">
                                No job openings available at the moment.
                            </div>
                        ) : (
                            allJobs
                                ?.slice(0, 6)
                                .map((job) => (
                                    <LatestJobCards key={job._id} job={job} />
                                ))
                        )
                    }
                </div>
            </div>
        </section>
    )
}

export default LatestJobs
