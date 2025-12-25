import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const CompaniesTable = () => {
    const { companies, searchCompanyByText } = useSelector(store => store.company)
    const [filterCompany, setFilterCompany] = useState(companies)
    const navigate = useNavigate()

    useEffect(() => {
        const filteredCompany = companies?.filter((company) => {
            if (!searchCompanyByText) return true
            return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase())
        })
        setFilterCompany(filteredCompany)
    }, [companies, searchCompanyByText])

    return (
        <div className="overflow-x-auto">
            <Table className="min-w-full bg-white shadow-lg rounded-xl border border-gray-200">
                <TableHeader className="bg-blue-50">
                    <TableRow>
                        <TableHead className="text-left text-blue-700 uppercase text-sm tracking-wide">Logo</TableHead>
                        <TableHead className="text-left text-blue-700 uppercase text-sm tracking-wide">Name</TableHead>
                        <TableHead className="text-left text-blue-700 uppercase text-sm tracking-wide">Date</TableHead>
                        <TableHead className="text-right text-blue-700 uppercase text-sm tracking-wide">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filterCompany?.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={4} className="text-center py-6 text-gray-500">
                                No companies found.
                            </TableCell>
                        </TableRow>
                    ) : (
                        filterCompany?.map((company) => (
                            <TableRow key={company._id} className="hover:bg-blue-50 transition">
                                <TableCell>
                                    <Avatar className="h-10 w-10">
                                        <AvatarImage src={company.logo} alt={company.name} />
                                    </Avatar>
                                </TableCell>
                                <TableCell className="font-medium text-gray-800">{company.name}</TableCell>
                                <TableCell className="text-gray-600">{company.createdAt.split("T")[0]}</TableCell>
                                <TableCell className="text-right">
                                    <Popover>
                                        <PopoverTrigger className="inline-flex cursor-pointer">
                                            <MoreHorizontal className="text-gray-500 hover:text-blue-600 transition" />
                                        </PopoverTrigger>
                                        <PopoverContent className="w-36 shadow-lg border border-gray-200 rounded-lg p-2">
                                            <div
                                                onClick={() => navigate(`/admin/companies/${company._id}`)}
                                                className="flex items-center gap-2 px-2 py-1 w-fit cursor-pointer text-gray-700 hover:bg-blue-50 rounded transition"
                                            >
                                                <Edit2 className="w-4" />
                                                <span>Edit</span>
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

export default CompaniesTable
