import React from "react"
import { Bar, BarChart, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts"
import { firestore } from "../../config"
import Loading from "../Loading"
import { ls } from "../Encryption";

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
        this.setState({ isLoading: true })
        const user = ls.get("IDNumber")
        firestore.collection("users").doc(user).get().then(doc => {
            let obj = []
            this.setState({ role: doc.data().role }, () => {
                if (this.state.role === "IT") {
                    obj = [
                        { name: "Chapter 1", students: 0 },
                        { name: "Chapter 2", students: 0 },
                        { name: "Chapter 3", students: 0 },
                        { name: "Chapter 4", students: 0 },
                        { name: "Chapter 5", students: 0 }
                    ]
                }
                else if (this.state.role === "Core") {
                    obj = [
                        { name: "Chapter 1", students: 0 },
                        { name: "Chapter 2", students: 0 },
                        { name: "Chapter 3", students: 0 },
                        { name: "Chapter 4", students: 0 },
                        { name: "Chapter 5", students: 0 },
                        { name: "Chapter 6", students: 0 },
                        { name: "Chapter 7", students: 0 }
                    ]
                }
                firestore.collection(this.state.role).get().then(Snapshot => {
                    Snapshot.forEach(document => {
                        document.data().chapters.map((eachChapter, i) => {
                            if (eachChapter.value) {
                                obj[i].students += 1
                            }
                        })
                    })
                    this.setState({ isLoading: false, data: obj })
                }).catch(() => {
                    this.setState({ error: "Some error occurred. Please try again", isLoading: false })
                    setTimeout(() => {
                        this.setState({ error: "" })
                    }, 3000)
                })
            }).catch(() => {
                this.setState({ error: "Some error occurred. Please try again", isLoading: false })
                setTimeout(() => {
                    this.setState({ error: "" })
                }, 3000)
            })
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