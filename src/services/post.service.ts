import { PostModel } from "@/types";
import { get } from "./api.service";

export const fetchPosts = async (): Promise<PostModel[]> => {
    return await get("posts");
};
