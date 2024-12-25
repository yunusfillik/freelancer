import { get } from "./api.service";
import { CommentModel } from "@/types";

export const fetchComments = async (): Promise<CommentModel[]> => {
    return await get("comments");
};
