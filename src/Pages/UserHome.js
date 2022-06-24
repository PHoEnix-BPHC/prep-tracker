import React from "react"
import Prep from "../Assets/Prep.png"
import Footer from "../Components/Footer/Footer"

class UserHome extends React.Component {
    render() {
        return (
            <div>
                <div style={{ margin: "50px 10px 50px 20px", display: "flex", justifyContent: "center", flexDirection: "column" }}>
                    <img style={{ width: "300px", height: "80%", alignSelf: "center", marginBottom: "20px" }} src={Prep} alt="Preparation" />
                    <div style={{ textAlign: "center" }}>
                        PREPARE FOR YOUR CORE PLACEMENTS RIGHT AWAY !
                    </div>
                </div>
                <Footer />
            </div>
        )
    }
}

export default UserHome