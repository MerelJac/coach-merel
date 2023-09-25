import { React } from "react";

const logout = () => {
    // destroy stored token
    localStorage.clear()
    // return to login page
    window.location.href = '/login';
}
export const AccountInfo = () => {
    return (
        <>
        <button onClick={logout}>Log Out</button>
        </>
    )
}