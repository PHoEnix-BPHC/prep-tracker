import React from "react";
import { Navigate } from "react-router-dom"

class PrivateRoute extends React.Component {
    render() {
        const user = localStorage.getItem("IDNumber")
        if (user) return this.props.children
        else return <Navigate to="/login" />
    }
}

export default PrivateRoute