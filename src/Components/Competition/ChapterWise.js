import { encryptStorage } from "../Encryption"
import React from "react"
import { Bar, BarChart, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts"
import { firestore } from "../../config"
import Loading from "../Loading"

class ChapterWise extends React.Component {
    constructor() {
        super()
        this.state = {
            isLoading: false,
            alert: "",
            error: "",
            role: "",
            data: []
        }
    }
    componentDidMount() {
        this.setState({ isLoading: false })
        const user = localStorage.getItem("IDNumber")
        firestore.collection("users").doc(user).get().then(doc => {
            this.setState({ role: doc.data().role }, () => {
                if (this.state.role === "IT") {
                    this.setState({
                        data: [
                            { name: "Chapter 1", students: 0 },
                            { name: "Chapter 2", students: 0 },
                            { name: "Chapter 3", students: 0 },
                            { name: "Chapter 4", students: 0 },
                            { name: "Chapter 5", students: 0 }
                        ]
                    })
                }
                else if (this.state.role === "Core") {
                    this.setState({
                        data: [
                            { name: "Chapter 1", students: 0 },
                            { name: "Chapter 2", students: 0 },
                            { name: "Chapter 3", students: 0 },
                            { name: "Chapter 4", students: 0 },
                            { name: "Chapter 5", students: 0 }
                        ]
                    })
                }
                else {
                    this.setState({
                        data: [
                            { name: "Chapter 1", students: 0 },
                            { name: "Chapter 2", students: 0 },
                            { name: "Chapter 3", students: 0 },
                            { name: "Chapter 4", students: 0 },
                            { name: "Chapter 5", students: 0 }
                        ]
                    })
                }
            })
            firestore.collection(this.state.role).get().then(Snapshot => {
                Snapshot.forEach(document => {
                    document.data().chapters.map((eachChapter, i) => {
                        if (eachChapter.value) {
                            this.state.data[i].students = this.state.data[i].students + 1
                        }
                    })
                })
                this.setState({ isLoading: false })
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
            <div style={{ display: "flex", justifyContent: "center", margin: "20px" }}>
                {this.state.isLoading ? <Loading /> : <BarChart width={1000} height={400} data={this.state.data}>
                    <CartesianGrid strokeDasharray="16 16" />
                    <Bar dataKey="students" fill="#8884d8" />
                    <XAxis dataKey="name" />
                    <Tooltip />
                    <YAxis dataKey="students" />
                </BarChart>}

            </div>
        )
    }
}

export default ChapterWise