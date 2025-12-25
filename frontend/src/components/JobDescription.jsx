import React, { useEffect, useState } from 'react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant'
import { setSingleJob } from '@/redux/jobSlice'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'sonner'

const JobDescription = () => {
    const { singleJob } = useSelector(store => store.job)
    const { user } = useSelector(store => store.auth)

    const isIntiallyApplied =
        singleJob?.applications?.some(application => application.applicant === user?._id) || false

    const [isApplied, setIsApplied] = useState(isIntiallyApplied)

    const params = useParams()
    const jobId = params.id
    const dispatch = useDispatch()

    const applyJobHandler = async () => {
        try {
            const res = await axios.get(
                `${APPLICATION_API_END_POINT}/apply/${jobId}`,
                { withCredentials: true }
            )

            if (res.data.success) {
                setIsApplied(true)
                const updatedSingleJob = {
                    ...singleJob,
                    applications: [...singleJob.applications, { applicant: user?._id }]
                }
                dispatch(setSingleJob(updatedSingleJob))
                toast.success(res.data.message)
            }
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }

    useEffect(() => {
        const fetchSingleJob = async () => {
            try {
                const res = await axios.get(
                    `${JOB_API_END_POINT}/get/${jobId}`,
                    { withCredentials: true }
                )
                if (res.data.success) {
                    dispatch(setSingleJob(res.data.job))
                    setIsApplied(
                        res.data.job.applications.some(
                            application => application.applicant === user?._id
                        )
                    )
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchSingleJob()
    }, [jobId, dispatch, user?._id])

    return (
        <section className="bg-gray-50 py-10">
            <div className="max-w-7xl mx-auto px-6">

                {/* Header Card */}
                <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm mb-8">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

                        {/* Title + Tags */}
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">
                                {singleJob?.title}
                            </h1>

                            <div className="flex flex-wrap items-center gap-2 mt-4">
                                <Badge variant="ghost" className="bg-blue-50 text-blue-600 font-medium">
                                    {singleJob?.postion} Positions
                                </Badge>
                                <Badge variant="ghost" className="bg-gray-100 text-gray-700 font-medium">
                                    {singleJob?.jobType}
                                </Badge>
                                <Badge variant="ghost" className="bg-green-50 text-green-600 font-medium">
                                    {singleJob?.salary} MMK
                                </Badge>
                            </div>
                        </div>

                        {/* Apply Button */}
                        <Button
                            onClick={isApplied ? null : applyJobHandler}
                            disabled={isApplied}
                            className={`px-6 py-2 rounded-lg font-medium ${
                                isApplied
                                    ? 'bg-gray-400 cursor-not-allowed'
                                    : 'bg-blue-600 hover:bg-blue-700'
                            }`}
                        >
                            {isApplied ? 'Already Applied' : 'Apply Now'}
                        </Button>
                    </div>
                </div>

                {/* Description Section */}
                <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                    <h2 className="text-lg font-semibold text-gray-900 border-b pb-3 mb-6">
                        Job Details
                    </h2>

                    <div className="space-y-3 text-sm text-gray-700">
                        <p>
                            <span className="font-semibold text-gray-900">Role:</span>
                            <span className="ml-3">{singleJob?.title}</span>
                        </p>

                        <p>
                            <span className="font-semibold text-gray-900">Location:</span>
                            <span className="ml-3">{singleJob?.location}</span>
                        </p>

                        <p>
                            <span className="font-semibold text-gray-900">Description:</span>
                            <span className="ml-3">{singleJob?.description}</span>
                        </p>

                        <p>
                            <span className="font-semibold text-gray-900">Experience:</span>
                            <span className="ml-3">{singleJob?.experienceLevel} yrs</span>
                        </p>

                        <p>
                            <span className="font-semibold text-gray-900">Salary:</span>
                            <span className="ml-3">{singleJob?.salary} MMK</span>
                        </p>

                        <p>
                            <span className="font-semibold text-gray-900">Total Applicants:</span>
                            <span className="ml-3">{singleJob?.applications?.length}</span>
                        </p>

                        <p>
                            <span className="font-semibold text-gray-900">Posted Date:</span>
                            <span className="ml-3">
                                {singleJob?.createdAt?.split("T")[0]}
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default JobDescription
