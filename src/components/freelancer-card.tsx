"use client";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { AppDispatch, RootState } from "@/store";
import { getPosts } from "@/store/post.slice";
import { setFinishedJobCount } from "@/store/freelancer.slice";
import { PostModel } from "@/types";
import { FreelancerModel } from "@/types";

interface FreelancerCardProps {
    freelancer: FreelancerModel;
}

const FreelancerCard = ({ freelancer }: FreelancerCardProps) => {
    const dispatch = useDispatch<AppDispatch>();
    const posts = useSelector((state: RootState) => state.posts.posts);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        if (!posts.length) {
            dispatch(getPosts());
        } else {
            setJobCount();
            setLoading(false);
        }
    }, [dispatch, freelancer.id, posts]);

    const setJobCount = () => {
        const freelancerPosts = posts.filter(
            (post: PostModel) => post.userId === freelancer.id
        );
        const finishedJobCount = freelancerPosts.length;
        dispatch(
            setFinishedJobCount({
                freelancerId: freelancer.id,
                jobCount: finishedJobCount,
            })
        );
    }

    const freelancerPosts = posts.filter(
        (post: PostModel) => post.userId === freelancer.id
    );
    const finishedJobCount = freelancerPosts.length;

    return (
        <div className="p-4 border rounded-md shadow-md flex items-center space-x-4">
            <div className="flex-grow">
                <h2 className="text-xl font-semibold">{freelancer.name}</h2>
                <p>{freelancer.email}</p>
                <p>{freelancer.phone}</p>
                <p>{freelancer.address.city}</p>
                <p>Finished Jobs: {loading ? "Loading..." : finishedJobCount}</p>
            </div>

            <div className="flex-shrink-0">
                <img
                    src="/assets/images/img.jpg"
                    alt={freelancer.name}
                    className="w-24 h-24 object-cover rounded-full"
                />
            </div>
        </div>
    );
};

export default FreelancerCard;
