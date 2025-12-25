import React, { useEffect, useState } from 'react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'
import { useDispatch } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice'

const fitlerData = [
    {
        fitlerType: "Location",
        array: ["Yangon", "Mandalay", "Naypyidaw", "Bago", "Mawlamyine"]
    },
    {
        fitlerType: "Industry",
        array: ["Frontend Developer", "Backend Developer", "Full Stack Developer", "UI/UX Designer"]
    },
    {
        fitlerType: "Salary",
        array: ["300,000 - 600,000 MMK", "600,000 - 1,000,000 MMK", "1,000,000+ MMK"]
    },
]

const FilterCard = () => {
    const [selectedValue, setSelectedValue] = useState('')
    const dispatch = useDispatch()

    const changeHandler = (value) => {
        setSelectedValue(value)
    }

    useEffect(() => {
        dispatch(setSearchedQuery(selectedValue))
    }, [selectedValue])

    return (
        <div className="w-full bg-white rounded-xl border border-gray-200 shadow-sm p-5">
            
            {/* Header */}
            <h1 className="font-semibold text-lg text-gray-800">
                Filter Jobs
            </h1>
            <p className="text-sm text-gray-500 mb-3">
                Refine your job search
            </p>

            <hr className="mb-4" />

            <RadioGroup value={selectedValue} onValueChange={changeHandler}>
                {
                    fitlerData.map((data, index) => (
                        <div key={index} className="mb-5">
                            
                            {/* Section Title */}
                            <h2 className="text-sm font-semibold text-blue-600 mb-3 uppercase tracking-wide">
                                {data.fitlerType}
                            </h2>

                            {/* Options */}
                            <div className="space-y-2">
                                {
                                    data.array.map((item, idx) => {
                                        const itemId = `id${index}-${idx}`
                                        return (
                                            <div
                                                key={itemId}
                                                className="flex items-center gap-2 rounded-md px-2 py-1 hover:bg-blue-50 transition"
                                            >
                                                <RadioGroupItem
                                                    value={item}
                                                    id={itemId}
                                                    className="text-blue-600"
                                                />
                                                <Label
                                                    htmlFor={itemId}
                                                    className="text-sm text-gray-700 cursor-pointer"
                                                >
                                                    {item}
                                                </Label>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    ))
                }
            </RadioGroup>
        </div>
    )
}

export default FilterCard
