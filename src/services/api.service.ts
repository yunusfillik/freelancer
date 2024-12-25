import { APIUrlTypes } from "@/types";
import axios from "axios";

const API_BASE_URL = "https://jsonplaceholder.typicode.com";

export const get = async (api: APIUrlTypes) => {
    const response = await axios.get(`${API_BASE_URL}/${api}`);
    return response.data;
}
