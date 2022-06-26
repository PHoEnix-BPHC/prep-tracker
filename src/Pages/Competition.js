import React from "react"
import ComingSoon from "../Components/ComingSoon"
import ChapterWise from "../Components/Competition/ChapterWise"
import Footer from "../Components/Footer/Footer"
import Loading from "../Components/Loading"

class Competition extends React.Component {

    constructor() {
        super()
        this.state = {
            isLoading: false
        }
    }
    render() {
        return (
            <div>
                {this.state.isLoading ? <Loading /> :
                    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                        {/* <div style={{ textAlign: "center", width: "max-content", height: "max-content", padding: "20px", letterSpacing: "5px", fontSize: "20px", margin: "20px 0px 0px 30px", backgroundColor: "rgba(0,0,0, 0.1)" }}>
                            YOUR PERFORMANCE
                        </div>
                        <div style={{ textAlign: "center", width: "max-content", height: "max-content", padding: "20px", letterSpacing: "5px", fontSize: "20px", margin: "20px 0px 0px 30px", backgroundColor: "rgba(0,0,0, 0.1)" }}>
                            CHAPTER WISE ANALYSIS
                        </div>
                        <ChapterWise />
                        <div style={{ textAlign: "center", width: "max-content", height: "max-content", padding: "20px", letterSpacing: "5px", fontSize: "20px", margin: "20px 0px 0px 30px", backgroundColor: "rgba(0,0,0, 0.1)" }}>
                            TOPIC WISE ANALYSIS
                        </div>
                        <div style={{ textAlign: "center", width: "max-content", height: "max-content", padding: "20px", letterSpacing: "5px", fontSize: "20px", margin: "20px 0px 0px 30px", backgroundColor: "rgba(0,0,0, 0.1)" }}>
                            QUESTION WISE ANALYSIS
                        </div> */}
                        <ComingSoon />
                    </div>
                }
                <Footer />
            </div>
        )
    }
}

export default Competition