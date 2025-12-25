import React, { useState } from 'react'
import Navbar from './shared/Navbar'
import { Avatar, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Contact, Mail, Pen } from 'lucide-react'
import { Badge } from './ui/badge'
import { Label } from './ui/label'
import AppliedJobTable from './AppliedJobTable'
import UpdateProfileDialog from './UpdateProfileDialog'
import { useSelector } from 'react-redux'
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs'

const isResume = true;

const Profile = () => {
    useGetAppliedJobs();
    const [open, setOpen] = useState(false);
    const { user } = useSelector(store => store.auth);

    return (
        <div className="bg-gray-50 min-h-screen">
            <Navbar />

            {/* Profile Card */}
            <div className="max-w-4xl mx-auto my-6 p-6 bg-white shadow-lg rounded-xl border border-gray-200">
                <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-6">
                    {/* Left: Avatar and Info */}
                    <div className="flex items-center gap-5 w-full md:w-auto">
                        <Avatar className="h-28 w-28 ring-2 ring-blue-500">
                            <AvatarImage src={user?.profile?.profilePhoto} alt="profile" />
                        </Avatar>
                        <div>
                            <h1 className="font-semibold text-2xl text-gray-800">{user?.fullname}</h1>
                            <p className="text-gray-600 mt-1">{user?.profile?.bio}</p>
                        </div>
                    </div>

                    {/* Right: Edit Button */}
                    <Button
                        onClick={() => setOpen(true)}
                        variant="outline"
                        className="flex items-center gap-2 border-blue-500 text-blue-500 hover:bg-blue-50"
                    >
                        <Pen /> Edit Profile
                    </Button>
                </div>

                {/* Contact Info */}
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
                    <div className="flex items-center gap-3">
                        <Mail className="text-blue-500" />
                        <span>{user?.email}</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <Contact className="text-blue-500" />
                        <span>{user?.phoneNumber}</span>
                    </div>
                </div>

                {/* Skills */}
                <div className="mt-6">
                    <h2 className="text-gray-800 font-semibold mb-2">Skills</h2>
                    <div className="flex flex-wrap gap-2">
                        {user?.profile?.skills?.length
                            ? user.profile.skills.map((item, index) => (
                                <Badge key={index} className="bg-blue-100 text-blue-700 font-medium hover:bg-blue-200 hover:text-blue-700">
                                    {item}
                                </Badge>
                            ))
                            : <span className="text-gray-400">NA</span>
                        }
                    </div>
                </div>

                {/* Resume */}
                <div className="mt-6">
                    <Label className="text-md font-semibold mb-1 block">Resume</Label>
                    {isResume ? (
                        <a
                            target="_blank"
                            rel="noreferrer"
                            href={user?.profile?.resume}
                            className="text-blue-600 hover:underline"
                        >
                            {user?.profile?.resumeOriginalName}
                        </a>
                    ) : (
                        <span className="text-gray-400">NA</span>
                    )}
                </div>
            </div>

            {/* Applied Jobs Section */}
            <div className="max-w-4xl mx-auto mt-8 bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <h1 className="font-bold text-xl text-gray-800 mb-5 border-b border-gray-200 pb-2">Applied Jobs</h1>
                <AppliedJobTable />
            </div>

            {/* Update Profile Dialog */}
            <UpdateProfileDialog open={open} setOpen={setOpen} />
        </div>
    )
}

export default Profile
