import React from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import { toast } from 'sonner'
import { APPLICATION_API_END_POINT } from '@/utils/constant'
import axios from 'axios'

const shortlistingStatus = ["Accepted", "Rejected"]

const ApplicantsTable = () => {
    const { applicants } = useSelector(store => store.application)

    const statusHandler = async (status, id) => {
        try {
            axios.defaults.withCredentials = true
            const res = await axios.post(`${APPLICATION_API_END_POINT}/status/${id}/update`, { status })
            if (res.data.success) {
                toast.success(res.data.message)
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong")
        }
    }

    return (
        <div className="overflow-x-auto">
            <Table className="min-w-full bg-white shadow-lg rounded-xl border border-gray-200">
                <TableHeader className="bg-blue-50">
                    <TableRow>
                        <TableHead className="text-left text-blue-700 uppercase text-sm tracking-wide">Full Name</TableHead>
                        <TableHead className="text-left text-blue-700 uppercase text-sm tracking-wide">Email</TableHead>
                        <TableHead className="text-left text-blue-700 uppercase text-sm tracking-wide">Contact</TableHead>
                        <TableHead className="text-left text-blue-700 uppercase text-sm tracking-wide">Resume</TableHead>
                        <TableHead className="text-left text-blue-700 uppercase text-sm tracking-wide">Date</TableHead>
                        <TableHead className="text-right text-blue-700 uppercase text-sm tracking-wide">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {applicants?.applications?.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={6} className="text-center py-6 text-gray-500">
                                No applicants found.
                            </TableCell>
                        </TableRow>
                    ) : (
                        applicants?.applications?.map((item) => (
                            <TableRow key={item._id} className="hover:bg-blue-50 transition">
                                <TableCell className="font-medium text-gray-800">{item?.applicant?.fullname}</TableCell>
                                <TableCell className="text-gray-700">{item?.applicant?.email}</TableCell>
                                <TableCell className="text-gray-700">{item?.applicant?.phoneNumber}</TableCell>
                                <TableCell>
                                    {item?.applicant?.profile?.resume ? (
                                        <a
                                            className="text-blue-600 hover:underline"
                                            href={item?.applicant?.profile?.resume}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            {item?.applicant?.profile?.resumeOriginalName}
                                        </a>
                                    ) : (
                                        <span className="text-gray-400">NA</span>
                                    )}
                                </TableCell>
                                <TableCell className="text-gray-600">{item?.applicant?.createdAt.split("T")[0]}</TableCell>
                                <TableCell className="text-right">
                                    <Popover>
                                        <PopoverTrigger className="inline-flex items-center cursor-pointer">
                                            <MoreHorizontal className="text-gray-500 hover:text-blue-600 transition" />
                                        </PopoverTrigger>
                                        <PopoverContent className="w-36 shadow-lg border border-gray-200 rounded-lg p-2">
                                            {shortlistingStatus.map((status, index) => (
                                                <div
                                                    key={index}
                                                    onClick={() => statusHandler(status, item?._id)}
                                                    className="flex items-center gap-2 px-2 py-1 w-fit cursor-pointer text-gray-700 hover:bg-blue-50 rounded transition"
                                                >
                                                    <span>{status}</span>
                                                </div>
                                            ))}
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

export default ApplicantsTable
