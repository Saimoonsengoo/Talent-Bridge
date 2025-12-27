import React, { useState, useEffect } from "react";
import axios from "axios";
import { JOB_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { TrashIcon } from "@heroicons/react/24/outline";
import ConfirmModal from "../shared/ConfirmModal";

const AdminJobs = () => {
    const [jobs, setJobs] = useState([]);
    const [deleteJobId, setDeleteJobId] = useState(null);

    const fetchJobs = async () => {
        try {
            const res = await axios.get(`${JOB_API_END_POINT}/get`, { withCredentials: true });
            setJobs(res.data.jobs);
        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to fetch jobs");
        }
    };

    const deleteJob = async () => {
        try {
            await axios.delete(`${JOB_API_END_POINT}/${deleteJobId}`, { withCredentials: true });
            toast.success("Job deleted");
            fetchJobs();
        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to delete job");
        } finally {
            setDeleteJobId(null);
        }
    };

    useEffect(() => {
        fetchJobs();
    }, []);

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-semibold text-slate-800">Jobs</h1>

            <div className="bg-white border border-gray-200 rounded-lg overflow-x-auto">
                <table className="w-full text-sm">
                    <thead className="bg-gray-50 border-b">
                        <tr className="text-slate-800 uppercase text-sm tracking-wide font-semibold">
                            <th className="p-4 text-left">Job Title</th>
                            <th className="p-4 text-left">Location</th>
                            <th className="p-4 text-left">Job Type</th>
                            <th className="p-4 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {jobs.map(job => (
                            <tr key={job._id} className="border-b hover:bg-gray-50">
                                <td className="p-4">{job.title}</td>
                                <td className="p-4">{job.location}</td>
                                <td className="p-4 capitalize">{job.jobType}</td>
                                <td className="p-4">
                                    <button
                                        onClick={() => setDeleteJobId(job._id)}
                                        className="inline-flex items-center gap-1 px-3 py-1 rounded-md border border-red-500 text-red-600 hover:bg-red-50"
                                    >
                                        <TrashIcon className="w-4 h-4" />
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}

                        {jobs.length === 0 && (
                            <tr>
                                <td colSpan={4} className="p-6 text-center text-gray-400">
                                    No jobs found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <ConfirmModal
                isOpen={!!deleteJobId}
                title="Delete Job"
                message="Are you sure you want to delete this job?"
                onConfirm={deleteJob}
                onCancel={() => setDeleteJobId(null)}
            />
        </div>
    );
};

export default AdminJobs;
