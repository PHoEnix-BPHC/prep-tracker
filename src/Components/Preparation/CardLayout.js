import React from "react"
import Loading from "../Loading"
import { Button } from "reactstrap"
import { firestore } from "../../config"
import "./CardLayout.css"
import { Chapters } from "../../Data Files/IT"
import Topic from "./Topic"
import { ls } from "../Encryption";

class CardLayout extends React.Component {
    constructor() {
        super()
        this.state = {
            isLoading: false,
            error: "",
            chapters: Chapters,
            role: "",
            currentChapter: 0,
            currentTopic: 0
        }
    }
    componentDidMount() {
        this.setState({ isLoading: true })
        const user = ls.get("IDNumber")
        firestore.collection("users").doc(user).get().then(Document => {
            this.setState({ role: Document.data().role }, () => {
                firestore.collection(this.state.role).doc(user).get().then(doc => {
                    this.setState({ chapters: doc.data().chapters }, () => {
                        this.setState({ isLoading: false })
                    })
                }).catch(() => {
                    this.setState({ error: "Some error occurred. Please try again" })
                    setTimeout(() => {
                        this.setState({ error: "" })
                    }, 3000)
                })
            })
        }).catch(() => {
            this.setState({ error: "Some error occurred. Please try again" })
            setTimeout(() => {
                this.setState({ error: "" })
            }, 3000)
        })
    }
    render() {
        const chapterTopics = (id) => {
            this.setState({ currentChapter: id })
        }
        return (
            <div>
                {this.state.isLoading ? <Loading /> : <div className="changeFlex" style={{ display: "flex", justifyContent: "center" }}>
                    <div style={{ fontSize: "15px", color: "#F93154", marginBottom: "10px", textAlign: "center" }}>
                        {this.state.error}
                    </div>
                    <div style={{ backgroundColor: "rgba(211,211,211, 0.2)", height: "max-content", width: "200px", borderRadius: "8px", padding: "20px", textAlign: "center", margin: "10px" }}>
                        CHAPTERS
                        <div>
                            {this.state.chapters.map((eachChapter, index) => {
                                return (
                                    <Button id={eachChapter.name} onClick={() => chapterTopics(index)} color="danger" style={{ margin: "5px", width: "150px", display: "flex", justifyContent: "space-between" }} >
                                        Chapter {index + 1}
                                        {eachChapter.value ? <i style={{ alignSelf: "center" }} className="fa fa-check-circle-o"></i> :
                                            <i style={{ alignSelf: "center" }} className="fa fa-question-circle-o"></i>}
                                    </Button>
                                )
                            })}
                        </div>
                    </div>
                    <div style={{ backgroundColor: "rgba(211,211,211, 0.2)", height: "max-height", borderRadius: "8px", padding: "20px", textAlign: "center", margin: "10px" }}>
                        Chapter {this.state.currentChapter + 1}: {this.state.chapters[this.state.currentChapter].name}
                        <div style={{ display: "flex", height: "363px", flexWrap: "wrap", margin: "20px", overflow: "scroll", justifyContent: "center" }}>
                            {this.state.chapters[this.state.currentChapter].topics.map((eachTopic, index) => {
                                return (
                                    <Topic chapter={this.state.currentChapter}
                                        chaptersList={this.state.chapters} index={index} eachTopic={eachTopic} />
                                )
                            })}
                        </div>
                    </div>
                </div>}
            </div>
        )
    }
}

export default CardLayout