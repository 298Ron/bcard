import axios from "axios";
import User from "../interfaces/User";
import { errorMsg } from "./feedbacksService";

let api: string = `${process.env.REACT_APP_API}/users`;

// login
export function checkUser(userToCheck: any) {
    return axios.get(
        `${api}?email=${userToCheck.email}&password=${userToCheck.password}`
    )
}
// login
export function CheckEmail(userToCheck: any) {
    return axios.get(
        `${api}?email=${userToCheck.email}`
    )
}
// register
export function addUser(userToAdd: User) {
    return axios.post(api, userToAdd);
}


// get user by email
export function getUserByEmail(email: string) {
    return axios.get(`${api}?email=${email}`)
}
// get user by email
export function getUserById(id: number) {
    return axios.get(`${api}?id=${id}`)
}
// update user info
export function updateUser(updatedUser: User, id: number) {
    return axios.put(`${api}/${id}`, updatedUser)
}