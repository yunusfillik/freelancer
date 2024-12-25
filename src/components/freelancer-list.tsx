"use client";
import { AppDispatch, RootState } from "@/store";
import { getFreelancers, setFreelancers } from "@/store/freelancer.slice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "@/store/post.slice";
import { getComments } from "@/store/comment.slice";
import FreelancerCard from "./freelancer-card";
import SearchComponent from "./search";

const FreelancerList = () => {
    const dispatch = useDispatch<AppDispatch>();
    const posts = useSelector((state: RootState) => state.posts.posts);
    const comments = useSelector((state: RootState) => state.comments.comments);
    const { freelancers, filteredFreelancers, loading, error } = useSelector(
        (state: RootState) => state.freelancers
    );

    useEffect(() => {
        !freelancers?.length && dispatch(getFreelancers());
        !posts?.length && dispatch(getPosts());
        !comments?.length && dispatch(getComments());
        console.log(freelancers)
        setFreelancers(freelancers);
    }, [dispatch]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <>
            <SearchComponent />
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {filteredFreelancers.map((freelancer) => (
                    <FreelancerCard key={freelancer.id} freelancer={freelancer} />
                ))}
            </div>
        </>

    );
};

export default FreelancerList;
