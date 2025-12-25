import React from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { Avatar, AvatarImage } from '../ui/avatar'
import { LogOut, User2 } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner'

const Navbar = () => {
    const { user } = useSelector(store => store.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true })
            if (res.data.success) {
                dispatch(setUser(null))
                navigate("/")
                toast.success(res.data.message)
            }
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }

    return (
        <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                
                {/* Logo */}
                <Link to="/" className="flex items-center gap-1">
                    <h1 className="text-2xl font-bold text-gray-800">
                        Talent
                        <span className="text-blue-600">Bridge</span>
                    </h1>
                </Link>

                {/* Navigation */}
                <div className="flex items-center gap-10">
                    <ul className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
                        {
                            user && user.role === 'recruiter' ? (
                                <>
                                    <li>
                                        <Link className="hover:text-blue-600 transition" to="/admin/companies">
                                            Companies
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className="hover:text-blue-600 transition" to="/admin/jobs">
                                            Jobs
                                        </Link>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li>
                                        <Link className="hover:text-blue-600 transition" to="/">
                                            Home
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className="hover:text-blue-600 transition" to="/jobs">
                                            Jobs
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className="hover:text-blue-600 transition" to="/browse">
                                            Browse
                                        </Link>
                                    </li>
                                </>
                            )
                        }
                    </ul>

                    {/* Auth Buttons / Profile */}
                    {
                        !user ? (
                            <div className="flex items-center gap-3">
                                <Link to="/login">
                                    <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
                                        Login
                                    </Button>
                                </Link>
                                <Link to="/signup">
                                    <Button className="bg-blue-600 hover:bg-blue-700">
                                        Sign Up
                                    </Button>
                                </Link>
                            </div>
                        ) : (
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Avatar className="cursor-pointer border border-gray-300">
                                        <AvatarImage src={user?.profile?.profilePhoto} alt="Profile Photo" />
                                    </Avatar>
                                </PopoverTrigger>

                                <PopoverContent className="w-80 p-4">
                                    <div className="space-y-4">
                                        
                                        {/* User Info */}
                                        <div className="flex items-center gap-3">
                                            <Avatar>
                                                <AvatarImage src={user?.profile?.profilePhoto} />
                                            </Avatar>
                                            <div>
                                                <h4 className="font-semibold text-gray-800">
                                                    {user?.fullname}
                                                </h4>
                                                <p className="text-sm text-gray-500">
                                                    {user?.profile?.bio}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Actions */}
                                        <div className="flex flex-col gap-2 text-sm">
                                            {
                                                user && user.role === 'student' && (
                                                    <Link
                                                        to="/profile"
                                                        className="flex items-center gap-2 px-2 py-2 rounded-md hover:bg-gray-100 text-gray-700"
                                                    >
                                                        <User2 size={18} />
                                                        View Profile
                                                    </Link>
                                                )
                                            }

                                            <button
                                                onClick={logoutHandler}
                                                className="flex items-center gap-2 px-2 py-2 rounded-md hover:bg-red-50 text-red-600"
                                            >
                                                <LogOut size={18} />
                                                Logout
                                            </button>
                                        </div>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        )
                    }
                </div>
            </div>
        </header>
    )
}

export default Navbar
