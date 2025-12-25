import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { COMPANY_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useDispatch } from 'react-redux'
import { setSingleCompany } from '@/redux/companySlice'

const CompanyCreate = () => {
    const navigate = useNavigate()
    const [companyName, setCompanyName] = useState()
    const dispatch = useDispatch()

    const registerNewCompany = async () => {
        try {
            const res = await axios.post(`${COMPANY_API_END_POINT}/register`, { companyName }, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            })
            if (res?.data?.success) {
                dispatch(setSingleCompany(res.data.company))
                toast.success(res.data.message)
                const companyId = res?.data?.company?._id
                navigate(`/admin/companies/${companyId}`)
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="min-h-screen bg-blue-50">
            <Navbar />
            <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-2xl p-10 mt-10">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-blue-700 mb-2">Your Company Name</h1>
                    <p className="text-gray-500">
                        Enter the name of your company. You can update it later if needed.
                    </p>
                </div>

                <div className="mb-6">
                    <Label className="text-blue-700 font-medium">Company Name</Label>
                    <Input
                        type="text"
                        className="mt-2"
                        placeholder="JobHunt, Microsoft etc."
                        onChange={(e) => setCompanyName(e.target.value)}
                    />
                </div>

                <div className="flex items-center gap-4">
                    <Button 
                        variant="outline" 
                        className="text-blue-700 border-blue-700 hover:bg-blue-50" 
                        onClick={() => navigate("/admin/companies")}
                    >
                        Cancel
                    </Button>
                    <Button 
                        className="bg-blue-600 hover:bg-blue-700 text-white"
                        onClick={registerNewCompany}
                    >
                        Continue
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default CompanyCreate
