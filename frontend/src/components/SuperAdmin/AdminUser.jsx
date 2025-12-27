import React, { useEffect, useState } from "react";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { LockClosedIcon, LockOpenIcon, TrashIcon } from "@heroicons/react/24/outline";

const AdminUsers = () => {
    const [users, setUsers] = useState([]);

    const fetchUsers = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/get`, { withCredentials: true });
            setUsers(res.data.users);
        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to fetch users");
        }
    };

    const toggleLock = async (id) => {
        try {
            await axios.put(`${USER_API_END_POINT}/admin/user/${id}/lock`, {}, { withCredentials: true });
            toast.success("User lock status changed");
            fetchUsers();
        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to change lock status");
        }
    };

    const deleteUser = async (id) => {
        try {
            await axios.delete(`${USER_API_END_POINT}/admin/user/${id}`, { withCredentials: true });
            toast.success("User deleted");
            fetchUsers();
        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to delete user");
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-semibold text-slate-800">Users</h1>

            <div className="bg-white border border-gray-200 rounded-lg overflow-x-auto">
                <table className="w-full text-sm">
                    <thead className="bg-gray-50 border-b">
                        <tr className="text-slate-800 uppercase text-sm tracking-wide font-semibold">
                            <th className="p-4 text-left">Full Name</th>
                            <th className="p-4 text-left">Email</th>
                            <th className="p-4 text-left">Role</th>
                            <th className="p-4 text-left">Status</th>
                            <th className="p-4 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(u => (
                            <tr key={u._id} className="border-b hover:bg-gray-50">
                                <td className="p-4">{u.fullname}</td>
                                <td className="p-4">{u.email}</td>
                                <td className="p-4 capitalize">{u.role}</td>
                                <td className="p-4">
                                    <span
                                        className={`px-2 py-1 rounded text-xs font-medium ${u.isLocked
                                                ? "bg-red-100 text-red-600"
                                                : "bg-green-100 text-green-600"
                                            }`}
                                    >
                                        {u.isLocked ? "Locked" : "Active"}
                                    </span>
                                </td>
                                <td className="p-4 flex gap-2">
                                    <button
                                        onClick={() => toggleLock(u._id)}
                                        className="inline-flex items-center gap-1 px-3 py-1 rounded-md border border-gray-300 hover:bg-gray-100"
                                    >
                                        {u.isLocked ? (
                                            <LockOpenIcon className="w-4 h-4" />
                                        ) : (
                                            <LockClosedIcon className="w-4 h-4" />
                                        )}
                                        {u.isLocked ? "Unlock" : "Lock"}
                                    </button>

                                    <button
                                        onClick={() => deleteUser(u._id)}
                                        className="inline-flex items-center gap-1 px-3 py-1 rounded-md border border-red-500 text-red-600 hover:bg-red-50"
                                    >
                                        <TrashIcon className="w-4 h-4" />
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}

                        {users.length === 0 && (
                            <tr>
                                <td colSpan={5} className="p-6 text-center text-gray-400">
                                    No users found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminUsers;
