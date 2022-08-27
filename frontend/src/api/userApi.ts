import { IUser } from "../types/userTypes";
import axiosClient from "./axiosClient";

const userApi = {
    register(payload: IUser): Promise<IUser> {
        const url = '/user/register';
        return axiosClient.post(url, payload)
    },
    login(payload: IUser): Promise<IUser> {
        const url = '/user/login';
        return axiosClient.post(url, payload);
    }
}

export default userApi