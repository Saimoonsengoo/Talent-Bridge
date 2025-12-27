import React, { useEffect, useState } from "react";
import axios from "axios";
import { USER_API_END_POINT, COMPANY_API_END_POINT, JOB_API_END_POINT } from "@/utils/constant";
import {
    UsersIcon,
    BriefcaseIcon,
    BuildingOffice2Icon,
    ClipboardDocumentListIcon,
    ArrowRightOnRectangleIcon
} from '@heroicons/react/24/outline';
import ConfirmModal from "../shared/ConfirmModal";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '@/redux/authSlice';

const AdminDashboard = () => {
    const [stats, setStats] = useState({ users: 0, companies: 0, jobs: 0, applications: 0 });
    const [recentUsers, setRecentUsers] = useState([]);
    const [recentJobs, setRecentJobs] = useState([]);
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDashboard = async () => {
            try {
                const [usersRes, companiesRes, jobsRes] = await Promise.all([
                    axios.get(`${USER_API_END_POINT}/get`, { withCredentials: true }),
                    axios.get(`${COMPANY_API_END_POINT}/getall`, { withCredentials: true }),
                    axios.get(`${JOB_API_END_POINT}/get`, { withCredentials: true }),
                ]);

                setStats({
                    users: usersRes.data.users.length,
                    companies: companiesRes.data.companies.length,
                    jobs: jobsRes.data.jobs.length,
                    applications: jobsRes.data.jobs.reduce((acc, job) => acc + (job.applications?.length || 0), 0),
                });

                setRecentUsers(usersRes.data.users.slice(-5).reverse());
                setRecentJobs(jobsRes.data.jobs.slice(-5).reverse());
            } catch (err) {
                console.error(err);
            }
        };

        fetchDashboard();
    }, []);

    const statCards = [
        { title: "Total Users", value: stats.users, icon: <UsersIcon className="w-7 h-7 text-slate-600" /> },
        { title: "Companies", value: stats.companies, icon: <BuildingOffice2Icon className="w-7 h-7 text-slate-600" /> },
        { title: "Jobs Posted", value: stats.jobs, icon: <BriefcaseIcon className="w-7 h-7 text-slate-600" /> },
        { title: "Applications", value: stats.applications, icon: <ClipboardDocumentListIcon className="w-7 h-7 text-slate-600" /> },
    ];

    const handleLogoutClick = () => setIsLogoutModalOpen(true);

    const confirmLogout = async () => {
        try {
            await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
            dispatch(setUser(null));
            localStorage.removeItem("token");
            toast.success("Logged out successfully");
            navigate("/", { replace: true });
        } catch (err) {
            toast.error(err.response?.data?.message || "Logout failed");
        } finally {
            setIsLogoutModalOpen(false);
        }
    };

    const cancelLogout = () => setIsLogoutModalOpen(false);

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-semibold text-slate-800">
                    Admin Dashboard
                </h1>

                <button
                    onClick={handleLogoutClick}
                    className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-red-600 transition"
                >
                    <ArrowRightOnRectangleIcon className="w-5 h-5" />
                    Logout
                </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {statCards.map((card, index) => (
                    <div
                        key={index}
                        className="bg-white border border-gray-200 rounded-lg p-5 flex justify-between items-center"
                    >
                        <div>
                            <p className="text-sm text-gray-500">{card.title}</p>
                            <h2 className="text-2xl font-semibold text-slate-800">{card.value}</h2>
                        </div>
                        {card.icon}
                    </div>
                ))}
            </div>

            {/* Recent Lists */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white border border-gray-200 rounded-lg p-5">
                    <h2 className="text-lg font-semibold text-slate-700 mb-4">Recent Users</h2>
                    <ul className="divide-y">
                        {recentUsers.map(user => (
                            <li key={user._id} className="flex justify-between py-3 text-sm">
                                <span className="text-slate-700">{user.fullname}</span>
                                <span className="text-gray-400 capitalize">{user.role}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-5">
                    <h2 className="text-lg font-semibold text-slate-700 mb-4">Recent Jobs</h2>
                    <ul className="divide-y">
                        {recentJobs.map(job => (
                            <li key={job._id} className="flex justify-between py-3 text-sm">
                                <span className="text-slate-700">{job.title}</span>
                                <span className="text-gray-400">{job.companyName}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <ConfirmModal
                isOpen={isLogoutModalOpen}
                title="Logout Confirmation"
                message="Are you sure you want to logout?"
                onConfirm={confirmLogout}
                onCancel={cancelLogout}
            />
        </div>
    );
};

export default AdminDashboard;
