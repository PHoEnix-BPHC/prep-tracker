import React from "react"
import CS from "../Assets/CS.jpg"

class ComingSoon extends React.Component {
    render() {
        return (
            <div style={{ display: "flex", justifyContent: "center" }}>
                <img src={CS} style={{ width: "250px", marginTop: "40px" }} alt="Coming Soon" />
            </div>
        )
    }
}

export default ComingSoon