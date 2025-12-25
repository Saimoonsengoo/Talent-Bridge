import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useSelector } from 'react-redux'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import axios from 'axios'
import { JOB_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
import { Loader2 } from 'lucide-react'

const PostJob = () => {
    const [input, setInput] = useState({
        title: "",
        description: "",
        requirements: "",
        salary: "",
        location: "",
        jobType: "",
        experience: "",
        position: 0,
        companyId: ""
    })
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const { companies } = useSelector(store => store.company)

    const changeEventHandler = (e) => setInput({ ...input, [e.target.name]: e.target.value })
    const selectChangeHandler = (value) => {
        const selectedCompany = companies.find((c) => c.name.toLowerCase() === value)
        setInput({ ...input, companyId: selectedCompany._id })
    }

    const submitHandler = async (e) => {
        e.preventDefault()
        try {
            setLoading(true)
            const res = await axios.post(`${JOB_API_END_POINT}/post`, input, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            })
            if (res.data.success) {
                toast.success(res.data.message)
                navigate("/admin/jobs")
            }
        } catch (error) {
            toast.error(error.response.data.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-blue-50">
            <Navbar />
            <div className="flex items-center justify-center w-full mt-10 px-4">
                <form 
                    onSubmit={submitHandler} 
                    className="p-8 max-w-4xl w-full bg-white border border-gray-200 rounded-2xl shadow-lg"
                >
                    <h1 className="text-2xl font-bold text-blue-700 mb-6 text-center">Post a New Job</h1>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <Label className="text-blue-700 font-medium">Title</Label>
                            <Input 
                                type="text" name="title" value={input.title} 
                                onChange={changeEventHandler} 
                                className="my-1 focus-visible:ring-0 focus-visible:ring-offset-0"
                            />
                        </div>
                        <div>
                            <Label className="text-blue-700 font-medium">Description</Label>
                            <Input 
                                type="text" name="description" value={input.description} 
                                onChange={changeEventHandler} 
                                className="my-1 focus-visible:ring-0 focus-visible:ring-offset-0"
                            />
                        </div>
                        <div>
                            <Label className="text-blue-700 font-medium">Requirements</Label>
                            <Input 
                                type="text" name="requirements" value={input.requirements} 
                                onChange={changeEventHandler} 
                                className="my-1 focus-visible:ring-0 focus-visible:ring-offset-0"
                            />
                        </div>
                        <div>
                            <Label className="text-blue-700 font-medium">Salary</Label>
                            <Input 
                                type="text" name="salary" value={input.salary} 
                                onChange={changeEventHandler} 
                                className="my-1 focus-visible:ring-0 focus-visible:ring-offset-0"
                            />
                        </div>
                        <div>
                            <Label className="text-blue-700 font-medium">Location</Label>
                            <Input 
                                type="text" name="location" value={input.location} 
                                onChange={changeEventHandler} 
                                className="my-1 focus-visible:ring-0 focus-visible:ring-offset-0"
                            />
                        </div>
                        <div>
                            <Label className="text-blue-700 font-medium">Job Type</Label>
                            <Input 
                                type="text" name="jobType" value={input.jobType} 
                                onChange={changeEventHandler} 
                                className="my-1 focus-visible:ring-0 focus-visible:ring-offset-0"
                            />
                        </div>
                        <div>
                            <Label className="text-blue-700 font-medium">Experience Level</Label>
                            <Input 
                                type="text" name="experience" value={input.experience} 
                                onChange={changeEventHandler} 
                                className="my-1 focus-visible:ring-0 focus-visible:ring-offset-0"
                            />
                        </div>
                        <div>
                            <Label className="text-blue-700 font-medium">No of Positions</Label>
                            <Input 
                                type="number" name="position" value={input.position} 
                                onChange={changeEventHandler} 
                                className="my-1 focus-visible:ring-0 focus-visible:ring-offset-0"
                            />
                        </div>
                        <div className="md:col-span-2">
                            {companies.length > 0 ? (
                                <Select onValueChange={selectChangeHandler}>
                                    <SelectTrigger className="w-full md:w-[250px] mt-2">
                                        <SelectValue placeholder="Select a Company" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            {companies.map((company) => (
                                                <SelectItem key={company._id} value={company.name.toLowerCase()}>
                                                    {company.name}
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            ) : (
                                <p className="text-red-600 font-semibold mt-2 text-sm">
                                    *Please register a company first before posting a job.
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="mt-6">
                        {loading ? (
                            <Button className="w-full flex justify-center items-center gap-2 py-3">
                                <Loader2 className="animate-spin h-5 w-5" />
                                Posting...
                            </Button>
                        ) : (
                            <Button type="submit" className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white">
                                Post New Job
                            </Button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    )
}

export default PostJob
