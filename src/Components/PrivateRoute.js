import React from "react";
import { Navigate } from "react-router-dom"
import { ls } from "./Encryption";

class PrivateRoute extends React.Component {
    render() {
        const user = ls.get("IDNumber")
        if (user) return this.props.children
        else return <Navigate to="/prep-tracker/login" />
    }
}

export default PrivateRoute