import React from "react"
import "./Footer.css"

class Footer extends React.Component {
    render() {
        return (
            <div className="bg-danger" style={{ display: "flex", height: "max-content", flexDirection: "column" }}>
                <div className="footer-container">
                    <div className="footer-spacing">
                        <div className="footer-heading">
                            ABOUT PREPTRACKER
                        </div>
                        <div className="footer-content" style={{ textAlign: "center", color: "white", marginTop: "10px" }}>
                            PREPTRACKER helps you to prepare for your career in whatever field you want to. You can compete with your friends and improve based on daily targets.
                        </div>
                    </div>
                    <div className="footer-line">
                        <div style={{ height: "100px", border: "0.3px solid black" }}>

                        </div>
                    </div>
                    <div className="footer-spacing">
                        <div className="footer-heading">
                            UPCOMING FEATURES
                        </div>
                        <div className="footer-content" style={{ textAlign: "center", color: "white", marginTop: "10px" }}>
                            <div>OFF CAMPUS INTERNSHIP PROCESS</div>
                            <div>FINANCE PREPARATION</div>
                            <div>GATE EXAM PREPARATION</div>
                            <div>PSUs </div>
                            <div>HIGHER STUDIES GUIDANCE</div>
                        </div>
                    </div>
                    <div className="footer-line">
                        <div style={{ height: "100px", border: "0.1px solid black" }}>

                        </div>
                    </div>
                    <div className="footer-spacing">
                        <div className="footer-heading">
                            CONTACT US
                        </div>
                        <div className="footer-content" style={{ color: "white", marginTop: "20px" }}>
                            <a href="mailto: phoenix@hyderabad.bits-pilani.ac.in" style={{ textDecoration: "none", color: "white" }}><b>EMAIL: </b>phoenix@hyderabad.bits-pilani.ac.in</a>
                            <div style={{ marginTop: "20px" }}><b>VENUE: </b>BITS Pilani, Hyderabad Campus, Hyderabad 500078, Telangana</div>
                        </div>
                    </div>
                </div>
                <div style={{ textAlign: "center" }}>
                    COPYRIGHT &copy; 2022. All Rights Reserved by PHoEnix Association
                </div>
            </div>
        )
    }
}

export default Footer