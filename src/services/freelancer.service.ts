import { get } from "./api.service";
import { FreelancerModel } from "@/types";

export const fetchFreelancers = async (): Promise<FreelancerModel[]> => {
    return await get("users");
};
