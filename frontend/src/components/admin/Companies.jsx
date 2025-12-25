import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import CompaniesTable from './CompaniesTable'
import { useNavigate } from 'react-router-dom'
import useGetAllCompanies from '@/hooks/useGetAllCompanies'
import { useDispatch } from 'react-redux'
import { setSearchCompanyByText } from '@/redux/companySlice'

const Companies = () => {
    useGetAllCompanies()
    const [input, setInput] = useState("")
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setSearchCompanyByText(input))
    }, [input])

    return (
        <div className="min-h-screen bg-blue-50">
            <Navbar />
            <div className="max-w-6xl mx-auto my-10 px-4">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
                    <Input
                        className="w-full md:w-1/3 border border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                        placeholder="Filter by name"
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <Button
                        onClick={() => navigate("/admin/companies/create")}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg shadow"
                    >
                        New Company
                    </Button>
                </div>

                <div className="bg-white border border-gray-200 rounded-2xl shadow-md p-4">
                    <CompaniesTable />
                </div>
            </div>
        </div>
    )
}

export default Companies
