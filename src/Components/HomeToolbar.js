import React from "react"
import { Navbar, NavbarBrand, NavLink } from "reactstrap"
import Logo from "../Assets/Logo.png"

class HomeToolbar extends React.Component {
    constructor() {
        super()
        this.state = {
            visible: false
        }
    }
    render() {
        return (
            <div>
                <Navbar color="danger" expand="md" dark>
                    <NavbarBrand href="/prep-tracker">
                        <img src={Logo} style={{ width: "40px" }} alt="logo" />
                        PREPTRACKER
                    </NavbarBrand>
                    <NavLink href="/prep-tracker/login" style={{ color: "whitesmoke", cursor: "pointer", margin: "0px" }}>
                        SIGNUP/LOGIN
                    </NavLink>
                </Navbar>
            </div >
        )
    }
}

export default HomeToolbar