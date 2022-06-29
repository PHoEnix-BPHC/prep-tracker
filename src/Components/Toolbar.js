import React from "react"
import { Navbar, NavItem, Nav, Collapse, NavbarBrand, NavbarToggler, NavLink } from "reactstrap"
import Logo from "../Assets/Logo.png"
import { ls } from "../Components/Encryption"

class Toolbar extends React.Component {
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
                    <NavbarBrand href="/prep-tracker/dashboard">
                        <img src={Logo} style={{ width: "40px" }} alt="logo" />
                        PREPTRACKER
                    </NavbarBrand>
                    <NavbarToggler onClick={() => { this.setState({ visible: !this.state.visible }) }} />
                    <Collapse isOpen={this.state.visible} navbar>
                        <Nav className="me-auto" navbar>
                            <NavItem>
                                <NavLink href="/prep-tracker/dashboard">
                                    Dashboard
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/prep-tracker/preparation">
                                    Preparation
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/prep-tracker/competition">
                                    Competition
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/prep-tracker/jobs">
                                    Jobs
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/prep-tracker/profile">
                                    My Profile
                                </NavLink>
                            </NavItem>
                        </Nav>
                        <NavLink to="/prep-tracker/signup" onClick={() => { window.location.reload(); ls.remove("IDNumber") }} style={{ color: "whitesmoke", cursor: "pointer", margin: "0px" }}>
                            <i className="fa fa-power-off" style={{ marginRight: "5px" }}></i>
                            LOGOUT
                        </NavLink>
                    </Collapse>
                </Navbar>
            </div >
        )
    }
}

export default Toolbar