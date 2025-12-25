import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Button } from '../ui/button'
import { ArrowLeft, Loader2 } from 'lucide-react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import axios from 'axios'
import { COMPANY_API_END_POINT } from '@/utils/constant'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { useSelector } from 'react-redux'
import useGetCompanyById from '@/hooks/useGetCompanyById'

const CompanySetup = () => {
    const params = useParams()
    useGetCompanyById(params.id)
    const [input, setInput] = useState({
        name: "",
        description: "",
        website: "",
        location: "",
        file: null
    })
    const { singleCompany } = useSelector(store => store.company)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const changeEventHandler = (e) => setInput({ ...input, [e.target.name]: e.target.value })
    const changeFileHandler = (e) => setInput({ ...input, file: e.target.files?.[0] })

    const submitHandler = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append("name", input.name)
        formData.append("description", input.description)
        formData.append("website", input.website)
        formData.append("location", input.location)
        if (input.file) formData.append("file", input.file)

        try {
            setLoading(true)
            const res = await axios.put(`${COMPANY_API_END_POINT}/update/${params.id}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
                withCredentials: true
            })
            if (res.data.success) {
                toast.success(res.data.message)
                navigate("/admin/companies")
            }
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        setInput({
            name: singleCompany.name || "",
            description: singleCompany.description || "",
            website: singleCompany.website || "",
            location: singleCompany.location || "",
            file: singleCompany.file || null
        })
    }, [singleCompany])

    return (
        <div className="min-h-screen bg-blue-50">
            <Navbar />
            <div className="max-w-3xl mx-auto mt-10 bg-white rounded-2xl shadow-lg p-8">
                <div className="flex items-center gap-5 mb-6">
                    <Button 
                        onClick={() => navigate("/admin/companies")} 
                        variant="outline" 
                        className="flex items-center gap-2 text-gray-600 hover:text-blue-600"
                    >
                        <ArrowLeft />
                        <span>Back</span>
                    </Button>
                    <h1 className="text-2xl font-bold text-blue-700">Company Setup</h1>
                </div>

                <form onSubmit={submitHandler} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <Label className="text-blue-700 font-medium">Company Name</Label>
                            <Input type="text" name="name" value={input.name} onChange={changeEventHandler} />
                        </div>
                        <div>
                            <Label className="text-blue-700 font-medium">Description</Label>
                            <Input type="text" name="description" value={input.description} onChange={changeEventHandler} />
                        </div>
                        <div>
                            <Label className="text-blue-700 font-medium">Website</Label>
                            <Input type="text" name="website" value={input.website} onChange={changeEventHandler} />
                        </div>
                        <div>
                            <Label className="text-blue-700 font-medium">Location</Label>
                            <Input type="text" name="location" value={input.location} onChange={changeEventHandler} />
                        </div>
                        <div className="md:col-span-2">
                            <Label className="text-blue-700 font-medium">Logo</Label>
                            <Input type="file" accept="image/*" onChange={changeFileHandler} />
                        </div>
                    </div>

                    {loading ? (
                        <Button className="w-full py-3 flex justify-center items-center gap-2">
                            <Loader2 className="animate-spin h-5 w-5" />
                            Please wait
                        </Button>
                    ) : (
                        <Button type="submit" className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white">
                            Update
                        </Button>
                    )}
                </form>
            </div>
        </div>
    )
}

export default CompanySetup
