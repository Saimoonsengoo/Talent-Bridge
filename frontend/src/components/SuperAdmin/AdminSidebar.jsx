import React from "react";
import { NavLink } from "react-router-dom";
import {
    HomeIcon,
    UsersIcon,
    BuildingOffice2Icon,
    BriefcaseIcon
} from "@heroicons/react/24/outline";

const menuItems = [
    { name: "Dashboard", path: "/superadmin/dashboard", icon: <HomeIcon className="w-5 h-5" /> },
    { name: "Users", path: "/superadmin/users", icon: <UsersIcon className="w-5 h-5" /> },
    { name: "Companies", path: "/superadmin/companies", icon: <BuildingOffice2Icon className="w-5 h-5" /> },
    { name: "Jobs", path: "/superadmin/jobs", icon: <BriefcaseIcon className="w-5 h-5" /> },
];

const AdminSidebar = () => {
    return (
        <aside className="w-64 bg-slate-900 text-slate-200 h-screen sticky top-0">
            <div className="p-6 flex flex-col h-full">
                <h2 className="text-xl font-semibold mb-8 tracking-wide">
                    Admin Panel
                </h2>

                <nav className="flex flex-col gap-1">
                    {menuItems.map(item => (
                        <NavLink
                            key={item.name}
                            to={item.path}
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-4 py-3 rounded-md text-sm transition
                 ${isActive
                                    ? "bg-slate-800 text-white"
                                    : "hover:bg-slate-800 text-slate-300"}`
                            }
                        >
                            {item.icon}
                            {item.name}
                        </NavLink>
                    ))}
                </nav>

                <div className="mt-auto text-xs text-slate-500">
                    © 2025 Job Portal
                </div>
            </div>
        </aside>
    );
};

export default AdminSidebar;
