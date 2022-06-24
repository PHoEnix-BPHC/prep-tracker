import React from "react"
import { Navbar, NavItem, Nav, Collapse, NavbarBrand, NavbarToggler, NavLink } from "reactstrap"

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
                    <NavbarBrand href="/dashboard">
                        PREPTRACKER
                    </NavbarBrand>
                    <NavbarToggler onClick={() => { this.setState({ visible: !this.state.visible }) }} />
                    <Collapse isOpen={this.state.visible} navbar>
                        <Nav className="me-auto" navbar>
                            <NavItem>
                                <NavLink href="/dashboard">
                                    Dashboard
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/preparation">
                                    Preparation
                                </NavLink>
                            </NavItem>
                            {/* <NavItem>
                                <NavLink href="/competition">
                                    Competition
                                </NavLink>
                            </NavItem> */}
                            <NavItem>
                                <NavLink href="/profile">
                                    My Profile
                                </NavLink>
                            </NavItem>
                        </Nav>
                        <NavLink to="/signup" onClick={() => { window.location.reload(); localStorage.removeItem("IDNumber") }} style={{ color: "whitesmoke", cursor: "pointer", margin: "0px" }}>
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