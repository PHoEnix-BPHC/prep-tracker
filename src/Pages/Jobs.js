import React from "react"
import { Card } from "reactstrap"
import ComingSoon from "../Components/ComingSoon"
import Loading from "../Components/Loading"
import { firestore } from "../config"

class Jobs extends React.Component {
    constructor() {
        super()
        this.state = {
            isLoading: false,
            alert: "",
            error: "",
            allJobs: []
        }
    }
    componentDidMount() {
        this.setState({ isLoading: true })
        firestore.collection("jobs").where("isVerified", "==", true).get().then(Snapshot => {
            let temp = []
            Snapshot.forEach(document => {

            })
            this.setState({ isLoading: false })
        }).catch(() => {

        })
    }
    render() {
        return (
            <div>
                {this.state.isLoading ? <Loading /> : <div>
                    {/* <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
                        {this.state.allJobs.length === 0 ?
                            <div style={{ display: "flex", textAlign: "center", marginTop: "10px", color: "rgba(0,0,0,0.2)" }}>
                                There are no job offers currently
                            </div> :
                            <Card>

                            </Card>
                        }
                    </div> */}
                    <ComingSoon />
                </div>}
            </div>
        )
    }
}

export default Jobs