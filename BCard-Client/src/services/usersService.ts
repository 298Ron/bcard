import axios from "axios";
import User from "../interfaces/User";
import jwt_decode from "jwt-decode";
let api: string = `${process.env.REACT_APP_API}/users`;

// login
export function checkUser(userToCheck: any) {
    return axios.post(
        `${api}/login`, userToCheck
    )
}
// Login
export function CheckEmail(userToCheck: any) {
    return axios.post(
        `${api}/email`, userToCheck
    )
}
// Register
export function addUser(userToAdd: User) {
    return axios.post(`${api}`, userToAdd);
}
//Get user details
export function getUserDetails() {
    return axios.get(`${api}`,
        { headers: { Authorization: JSON.parse(sessionStorage.getItem("token") as string).token } });
}
// Get user by id
export function getUserById(id: number) {
    return axios.get(`${api}/${id}`)
}
// Update user info
export function updateUser(updatedUser: User, id: number) {
    return axios.put(`${api}/${id}`, updatedUser,
        { headers: { Authorization: JSON.parse(sessionStorage.getItem("token") as string).token } })
}
// Delete User
export function deleteUserById(userId: string) {
    return axios.delete(`${api}/${userId}`,
        { headers: { Authorization: JSON.parse(sessionStorage.getItem("token") as string).token } });
}
// Get user token details from local storage
export function getTokenDetails() {

    let token = JSON.parse(sessionStorage.getItem("token") as string
    ).token;
    return jwt_decode(token)
}