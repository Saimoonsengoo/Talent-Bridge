import React, { useState, useEffect } from "react";
import axios from "axios";
import { COMPANY_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { TrashIcon } from "@heroicons/react/24/outline";
import ConfirmModal from "../shared/ConfirmModal";

const AdminCompanies = () => {
    const [companies, setCompanies] = useState([]);
    const [selectedCompanyId, setSelectedCompanyId] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const fetchCompanies = async () => {
        try {
            const res = await axios.get(`${COMPANY_API_END_POINT}/getall`, { withCredentials: true });
            setCompanies(res.data.companies);
        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to fetch companies");
        }
    };

    const handleDeleteClick = (id) => {
        setSelectedCompanyId(id);
        setIsModalOpen(true);
    };

    const confirmDelete = async () => {
        try {
            await axios.delete(`${COMPANY_API_END_POINT}/${selectedCompanyId}`, { withCredentials: true });
            toast.success("Company deleted");
            fetchCompanies();
        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to delete company");
        } finally {
            setIsModalOpen(false);
            setSelectedCompanyId(null);
        }
    };

    const cancelDelete = () => {
        setIsModalOpen(false);
        setSelectedCompanyId(null);
    };

    useEffect(() => {
        fetchCompanies();
    }, []);

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-semibold text-slate-800">Companies</h1>

            <div className="bg-white border border-gray-200 rounded-lg overflow-x-auto">
                <table className="w-full text-sm">
                    <thead className="bg-gray-50 border-b">
                        <tr className="text-slate-800 uppercase text-sm tracking-wide font-semibold">
                            <th className="p-4 text-left font-medium">Name</th>
                            <th className="p-4 text-left font-medium">Location</th>
                            <th className="p-4 text-left font-medium">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {companies.map(c => (
                            <tr key={c._id} className="border-b hover:bg-gray-50">
                                <td className="p-4">{c.name}</td>
                                <td className="p-4">{c.location}</td>
                                <td className="p-4">
                                    <button
                                        onClick={() => handleDeleteClick(c._id)}
                                        className="inline-flex items-center gap-1 text-red-600 border border-red-500 px-3 py-1 rounded-md hover:bg-red-50 transition"
                                    >
                                        <TrashIcon className="w-4 h-4" />
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}

                        {companies.length === 0 && (
                            <tr>
                                <td colSpan={3} className="p-6 text-center text-gray-400">
                                    No companies found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <ConfirmModal
                isOpen={isModalOpen}
                title="Delete Company"
                message="Are you sure you want to delete this company?"
                onConfirm={confirmDelete}
                onCancel={cancelDelete}
            />
        </div>
    );
};

export default AdminCompanies;
