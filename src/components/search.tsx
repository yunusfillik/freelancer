"use client";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setSearchFilters } from "@/store/freelancer.slice";

const SearchComponent = () => {
    const dispatch = useDispatch();
    const [name, setName] = useState<string>("");
    const [minJobs, setMinJobs] = useState<number | "">("");
    const [maxJobs, setMaxJobs] = useState<number | "">("");

    useEffect(() => {
        dispatch(
            setSearchFilters({
                name,
                minJobs: minJobs !== "" ? minJobs : undefined,
                maxJobs: maxJobs !== "" ? maxJobs : undefined,
            })
        );
    }, [name, minJobs, maxJobs, dispatch]);

    const handleSearch = () => {
        dispatch(
            setSearchFilters({
                name,
                minJobs: minJobs !== "" ? minJobs : undefined,
                maxJobs: maxJobs !== "" ? maxJobs : undefined,
            })
        );
    };



    return (
        <div className="mb-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Name Search */}
                <input
                    type="text"
                    placeholder="Search by name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="p-2 border rounded"
                />

                {/* Job Count Search */}
                <input
                    type="number"
                    placeholder="Min jobs"
                    value={minJobs}
                    onChange={(e) => setMinJobs(Number(e.target.value) || "")}
                    className="p-2 border rounded"
                />
                <input
                    type="number"
                    placeholder="Max jobs"
                    value={maxJobs}
                    onChange={(e) => setMaxJobs(Number(e.target.value) || "")}
                    className="p-2 border rounded"
                />
            </div>
        </div>
    );
};

export default SearchComponent;
