import React from "react";
// TODO should include user info eventally

const returnHome = () => {
    window.location.href = '/'
} 

const accountInfo = () => {
    window.location.href = '/account-info'
}
export const Header = (props) => {
    return (
        <>
        <div className="header">
            <h1 onClick={returnHome}>Title<span className="bold">Title</span></h1>
            <p onClick={accountInfo}>User</p>
        </div>
        </>
    )
}