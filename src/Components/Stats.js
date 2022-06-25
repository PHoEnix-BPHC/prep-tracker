import React from "react";
import Moment from "react-moment"
import { firestore } from "../config"
import { CircularProgressbarWithChildren } from "react-circular-progressbar"
import Loading from "./Loading";
import { encryptStorage } from "./Encryption";


class Stats extends React.Component {
    constructor() {
        super()
        this.state = {
            isLoading: false,
            error: "",
            totalUsers: 0,
            yourRank: 1,
            daysOfUsage: null
        }
    }
    componentDidMount() {
        this.setState({ isLoading: true })
        const user = localStorage.getItem("IDNumber")
        firestore.collection("users").doc(user).get().then(Document => {
            const role = Document.data().role
            let time = {
                seconds: Document.data().createdAt.seconds,
                nanoseconds: Document.data().createdAt.nanoseconds
            }
            const fireBaseTime = new Date(
                time.seconds * 1000 + time.nanoseconds / 1000000,
            )
            this.setState({ daysOfUsage: fireBaseTime })
            firestore.collection(role).doc(user).get().then(Doc => {
                const yourTotal = Doc.data().completedQuestions
                const year = user.substring(0, 4)
                firestore.collection(role).get().then(Snapshot => {
                    Snapshot.forEach(doc => {
                        if ((doc.data().completedQuestions > yourTotal && doc.id !== user) && year === doc.id.substring(0, 4))
                            this.setState({ yourRank: this.state.yourRank + 1 })
                    })
                    firestore.collection("users").get().then(Snapshot => {
                        var total = 0
                        Snapshot.forEach(document => {
                            if (document.id.substring(0, 4) === year)
                                total += 1
                        })
                        this.setState({ totalUsers: total, isLoading: false })
                    }).catch(() => {
                        this.setState({ error: "Some error occurred. Please try again" })
                        setTimeout(() => {
                            this.setState({ error: "" })
                        }, 3000)
                    })
                }).catch(() => {
                    this.setState({ error: "Some error occurred. Please try again" })
                    setTimeout(() => {
                        this.setState({ error: "" })
                    }, 3000)
                })
            }).catch(() => {
                this.setState({ error: "Some error occurred. Please try again" })
                setTimeout(() => {
                    this.setState({ error: "" })
                }, 3000)
            })
        }).catch(() => {
            this.setState({ error: "Some error occurred. Please try again" })
            setTimeout(() => {
                this.setState({ error: "" })
            }, 3000)
        })
    }
    render() {
        return (
            <div>
                {this.state.isLoading ? <Loading /> : <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                    <div style={{ fontSize: "15px", color: "#F93154", marginBottom: "10px", textAlign: "center" }}>
                        {this.state.error}
                    </div>
                    <div style={{ display: "flex", textAlign: "center", width: "max-content", height: "max-content", padding: "20px", letterSpacing: "5px", fontSize: "20px", margin: "20px 0px 0px 30px", backgroundColor: "rgba(0,0,0,0.1)" }}>
                        YOUR STATS
                    </div>
                    <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}>
                        <div style={{ width: "250px", margin: "30px", textAlign: "center", fontSize: "25px" }}>
                            <CircularProgressbarWithChildren value={1} maxValue={1}>
                                {this.state.totalUsers} <br />
                                USERS
                            </CircularProgressbarWithChildren>
                        </div>
                        {/* <div style={{ width: "250px", margin: "30px", textAlign: "center", fontSize: "25px" }}>
                            <CircularProgressbarWithChildren value={1} maxValue={1}>
                                {this.state.yourRank} <br />
                                YOUR RANK
                            </CircularProgressbarWithChildren>
                        </div> */}
                        <div style={{ width: "250px", margin: "30px", textAlign: "center", fontSize: "25px" }}>
                            <CircularProgressbarWithChildren value={1} maxValue={1}>
                                <Moment unit="days" diff={this.state.daysOfUsage}>{new Date()}</Moment>
                                TOTAL DAYS
                            </CircularProgressbarWithChildren>
                        </div>
                    </div>
                </div>}
            </div>
        )
    }
}

export default Stats