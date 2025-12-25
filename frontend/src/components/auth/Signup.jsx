import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { RadioGroup } from '../ui/radio-group'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '@/redux/authSlice'
import { Loader2 } from 'lucide-react'

const Signup = () => {
    const [input, setInput] = useState({
        fullname: "",
        email: "",
        phoneNumber: "",
        password: "",
        role: "",
        file: ""
    });

    const { loading, user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const changeFileHandler = (e) => {
        setInput({ ...input, file: e.target.files?.[0] });
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("password", input.password);
        formData.append("role", input.role);
        if (input.file) formData.append("file", input.file);

        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
                headers: { 'Content-Type': "multipart/form-data" },
                withCredentials: true,
            });
            if (res.data.success) {
                navigate("/login");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        } finally {
            dispatch(setLoading(false));
        }
    }

    useEffect(() => {
        if (user) navigate("/");
    }, [user]);

    return (
        <div className="bg-blue-50 min-h-screen">
            <Navbar />
            <div className='flex items-center justify-center px-4 py-16'>
                <form 
                    onSubmit={submitHandler} 
                    className='w-full max-w-md bg-white p-8 rounded-2xl shadow-lg border border-gray-200'
                >
                    <h1 className='text-2xl font-bold text-gray-800 mb-6 text-center'>Sign Up</h1>

                    <div className='mb-4'>
                        <Label>Full Name</Label>
                        <Input
                            type="text"
                            value={input.fullname}
                            name="fullname"
                            onChange={changeEventHandler}
                            placeholder="John Doe"
                            className="mt-1"
                        />
                    </div>

                    <div className='mb-4'>
                        <Label>Email</Label>
                        <Input
                            type="email"
                            value={input.email}
                            name="email"
                            onChange={changeEventHandler}
                            placeholder="you@example.com"
                            className="mt-1"
                        />
                    </div>

                    <div className='mb-4'>
                        <Label>Phone Number</Label>
                        <Input
                            type="text"
                            value={input.phoneNumber}
                            name="phoneNumber"
                            onChange={changeEventHandler}
                            placeholder="09xxxxxxxx"
                            className="mt-1"
                        />
                    </div>

                    <div className='mb-4'>
                        <Label>Password</Label>
                        <Input
                            type="password"
                            value={input.password}
                            name="password"
                            onChange={changeEventHandler}
                            placeholder="********"
                            className="mt-1"
                        />
                    </div>

                    <RadioGroup className="flex items-center gap-6 mb-4">
                        <div className="flex items-center space-x-2">
                            <Input
                                type="radio"
                                name="role"
                                value="student"
                                checked={input.role === 'student'}
                                onChange={changeEventHandler}
                                className="cursor-pointer"
                            />
                            <Label>Student</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Input
                                type="radio"
                                name="role"
                                value="recruiter"
                                checked={input.role === 'recruiter'}
                                onChange={changeEventHandler}
                                className="cursor-pointer"
                            />
                            <Label>Recruiter</Label>
                        </div>
                    </RadioGroup>

                    <div className='mb-4'>
                        <Label>Profile Image</Label>
                        <Input
                            accept="image/*"
                            type="file"
                            onChange={changeFileHandler}
                            className="mt-1 cursor-pointer"
                        />
                    </div>

                    {loading ? (
                        <Button className="w-full py-3 flex justify-center items-center gap-2" disabled>
                            <Loader2 className='animate-spin w-5 h-5' />
                            Please wait
                        </Button>
                    ) : (
                        <Button type="submit" className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-md transition">
                            Sign Up
                        </Button>
                    )}

                    <p className='text-sm text-center text-gray-500 mt-4'>
                        Already have an account?{' '}
                        <Link to="/login" className='text-blue-600 hover:underline'>
                            Login
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default Signup
