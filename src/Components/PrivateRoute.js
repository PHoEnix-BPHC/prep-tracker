import React from "react";
import { Navigate } from "react-router-dom"
import { encryptStorage } from "./Encryption"

class PrivateRoute extends React.Component {
    render() {
        const user = encryptStorage.getItem("IDNumber")
        if (user) return this.props.children
        else return <Navigate to="/login" />
    }
}

export default PrivateRoute