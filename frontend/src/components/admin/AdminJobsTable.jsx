import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, Eye, MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const AdminJobsTable = () => { 
    const { allAdminJobs, searchJobByText } = useSelector(store => store.job)
    const [filterJobs, setFilterJobs] = useState(allAdminJobs)
    const navigate = useNavigate()

    useEffect(() => { 
        const filteredJobs = allAdminJobs.filter((job) => {
            if (!searchJobByText) return true
            return job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) || 
                   job?.company?.name?.toLowerCase().includes(searchJobByText.toLowerCase())
        })
        setFilterJobs(filteredJobs)
    }, [allAdminJobs, searchJobByText])

    return (
        <div className="overflow-x-auto">
            <Table className="min-w-full bg-white shadow-lg rounded-xl border border-gray-200">
                <TableHeader className="bg-blue-50">
                    <TableRow>
                        <TableHead className="text-left text-blue-700 uppercase text-sm tracking-wide">Company</TableHead>
                        <TableHead className="text-left text-blue-700 uppercase text-sm tracking-wide">Role</TableHead>
                        <TableHead className="text-left text-blue-700 uppercase text-sm tracking-wide">Date</TableHead>
                        <TableHead className="text-right text-blue-700 uppercase text-sm tracking-wide">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filterJobs?.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={4} className="text-center py-6 text-gray-500">
                                No jobs found.
                            </TableCell>
                        </TableRow>
                    ) : (
                        filterJobs?.map((job) => (
                            <TableRow 
                                key={job._id} 
                                className="hover:bg-blue-50 transition cursor-pointer"
                            >
                                <TableCell className="font-semibold text-gray-800">{job?.company?.name}</TableCell>
                                <TableCell className="text-gray-700">{job?.title}</TableCell>
                                <TableCell className="text-gray-600">{job?.createdAt.split("T")[0]}</TableCell>
                                <TableCell className="text-right">
                                    <Popover>
                                        <PopoverTrigger className="inline-flex items-center">
                                            <MoreHorizontal className="text-gray-500 hover:text-blue-600 transition" />
                                        </PopoverTrigger>
                                        <PopoverContent className="w-36 shadow-lg border border-gray-200 rounded-lg p-2">
                                            <div 
                                                onClick={() => navigate(`/admin/companies/${job._id}`)} 
                                                className='flex items-center gap-2 w-fit cursor-pointer px-2 py-1 hover:bg-blue-50 rounded transition'
                                            >
                                                <Edit2 className='w-4 text-blue-600' />
                                                <span className='text-gray-700 text-sm'>Edit</span>
                                            </div>
                                            <div 
                                                onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)} 
                                                className='flex items-center gap-2 w-fit cursor-pointer px-2 py-1 mt-1 hover:bg-blue-50 rounded transition'
                                            >
                                                <Eye className='w-4 text-blue-600'/>
                                                <span className='text-gray-700 text-sm'>Applicants</span>
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    )
}

export default AdminJobsTable
