import React from "react"
import { Progress } from "reactstrap"
import Loading from "../Components/Loading"
import { CircularProgressbarWithChildren } from "react-circular-progressbar"
import { firestore } from "../config"
import CountUp from "react-countup"
import Stats from "../Components/Stats"
import { encryptStorage } from "../Components/Encryption"
import Footer from "../Components/Footer/Footer"

class Home extends React.Component {
    constructor() {
        super()
        this.state = {
            total: 0,
            progress: {},
            role: "",
            error: "",
            isLoading: false
        }
    }
    componentDidMount() {
        this.setState({ isLoading: true })
        const idNo = localStorage.getItem("IDNumber")
        firestore.collection("users").doc(idNo).get().then(document => {
            this.setState({ role: document.data().role }, () => {
                firestore.collection(this.state.role).doc(idNo).get().then((document) => {
                    this.setState({ total: document.data().completedQuestions / document.data().totalQuestions * 100, progress: document.data(), isLoading: false })
                }).catch(() => {
                    this.setState({ error: "Some error occurred. Please try again" })
                    setTimeout(() => {
                        this.setState({ error: "" })
                    }, 3000)
                })
            })
        }).then(() => {
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
                {this.state.isLoading ? <Loading /> : <div style={{ margin: "10px", display: "flex", justifyContent: "center", flexDirection: "column" }}>
                    <div style={{ fontSize: "15px", color: "#F93154", marginBottom: "10px", textAlign: "center" }}>
                        {this.state.error}
                    </div>
                    <div style={{ display: "flex" }}>
                        <Progress max={100} style={{ width: "88%", alignSelf: "center", marginRight: "10px" }} animated color="success" striped value={this.state.total} />
                        {Math.round(this.state.total)}% completed
                    </div>
                    <div>
                        {this.state.total === 0 ?
                            <div style={{ color: "grey" }}>
                                NOT STARTED YET
                            </div> : this.state.total <= 35 ?
                                <div style={{ color: "#FFA900" }}>
                                    BEGINNER
                                </div> : this.state.total <= 60 ?
                                    <div style={{ color: "#39C0ED" }}>
                                        INTERMEDIATE
                                    </div> : <div style={{ color: "#00B74A" }}>
                                        ADVANCED
                                    </div>
                        }
                    </div>
                    <div style={{ textAlign: "center", width: "max-content", height: "max-content", padding: "20px", letterSpacing: "5px", fontSize: "20px", margin: "20px 0px 0px 30px", backgroundColor: "rgba(0,0,0, 0.1)" }}>
                        YOUR PROGRESS
                    </div>
                    <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}>
                        <div style={{ margin: "30px", textAlign: "center" }}>
                            <CircularProgressbarWithChildren value={this.state.progress.completedQuestions} maxValue={this.state.progress.totalQuestions}>
                                <div>
                                    <CountUp end={this.state.progress.completedQuestions} duration={2}>
                                        {this.state.progress.completedQuestions}</CountUp>/{this.state.progress.totalQuestions}</div> <br />
                                QUESTIONS COMPLETED
                            </CircularProgressbarWithChildren>
                        </div>
                        <div style={{ margin: "30px", textAlign: "center" }}>
                            <CircularProgressbarWithChildren value={this.state.progress.completedTopics} maxValue={this.state.progress.totalTopics}>
                                <div>
                                    <CountUp end={this.state.progress.completedTopics} duration={2}>
                                        {this.state.progress.completedTopics}</CountUp>/{this.state.progress.totalTopics}</div> <br />
                                TOPICS COMPLETED
                            </CircularProgressbarWithChildren>
                        </div>
                        <div style={{ margin: "30px", textAlign: "center" }}>
                            <CircularProgressbarWithChildren value={this.state.progress.completedChapters} maxValue={this.state.progress.totalChapters}>
                                <div>
                                    <CountUp end={this.state.progress.completedChapters} duration={2}>
                                        {this.state.progress.completedChapters}</CountUp>/{this.state.progress.totalChapters}</div> <br />
                                CHAPTERS COMPLETED
                            </CircularProgressbarWithChildren>
                        </div>
                    </div>
                    <Stats />
                </div>}
                <Footer />
            </div>
        )
    }
}

export default Home