import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button' 
import { useNavigate } from 'react-router-dom' 
import { useDispatch } from 'react-redux' 
import AdminJobsTable from './AdminJobsTable'
import useGetAllAdminJobs from '@/hooks/useGetAllAdminJobs'
import { setSearchJobByText } from '@/redux/jobSlice'

const AdminJobs = () => {
  useGetAllAdminJobs()
  const [input, setInput] = useState("")
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setSearchJobByText(input))
  }, [input])

  return (
    <div className="bg-blue-50 min-h-screen">
      <Navbar />

      {/* Page Container */}
      <div className="max-w-6xl mx-auto my-10 px-4 md:px-0">

        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
          <Input
            className="w-full md:w-1/2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-500"
            placeholder="Filter by name, role"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />

          <Button
            onClick={() => navigate("/admin/jobs/create")}
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-6 py-2 shadow-md transition"
          >
            New Job
          </Button>
        </div>

        {/* Table Card */}
        <div className="bg-white shadow-lg rounded-2xl border border-gray-200 p-6">
          <h1 className="text-xl font-semibold text-gray-800 mb-4 border-b border-gray-200 pb-2">All Jobs</h1>
          <AdminJobsTable />
        </div>
      </div>
    </div>
  )
}

export default AdminJobs
