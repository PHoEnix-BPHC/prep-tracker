import React from "react"
import { Button, Input } from "reactstrap"
import { firestore } from "../../config"
import { chapterCompleteCheck, calculateTopicCompletion, calculateChapterCompletion, calculateQuestionCompletion } from "../Functions"
import { Chapters } from "../../Data Files/IT"
import Loading from "../Loading"

class ListLayout extends React.Component {
    constructor() {
        super()
        this.state = {
            isLoading: false,
            alert: "",
            chapters: Chapters,
            role: "",
            currentChapter: 0,
            currentTopic: 0,
            error: ""
        }
    }
    componentDidMount() {
        this.setState({ isLoading: true })
        const user = localStorage.getItem("IDNumber")
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
        const topicQuestions = (id) => {
            this.setState({ currentTopic: id })
        }
        const checkBoxChange = (index) => {
            let temp = this.state.chapters
            temp[this.state.currentChapter].topics[this.state.currentTopic].questions[index].value = !temp[this.state.currentChapter].topics[this.state.currentTopic].questions[index].value
            this.setState({ chapters: temp })
        }
        const saveProgress = () => {
            this.setState({ isLoading: true })
            const user = localStorage.getItem("IDNumber")
            const chapterList = chapterCompleteCheck(this.state.chapters)
            const topics = calculateTopicCompletion(chapterList)
            const questions = calculateQuestionCompletion(chapterList)
            const chapters = calculateChapterCompletion(chapterList)
            firestore.collection(this.state.role).doc(user).update({
                chapters: chapterList,
                completedTopics: topics,
                completedQuestions: questions,
                completedChapters: chapters
            }).then(() => {
                this.setState({ isLoading: false, alert: "Progress has been saved" })
                setTimeout(() => {
                    this.setState({ alert: "" })
                }, 3000)
                window.location.reload()
            }).catch(() => {
                this.setState({ error: "Some error occurred. Please try again" })
                setTimeout(() => {
                    this.setState({ error: "" })
                }, 3000)
            })
        }
        return (
            <div style={{ display: "flex", flexDirection: "column" }}>
                {this.state.isLoading ? <Loading /> : <div style={{ display: "flex", flexDirection: "column" }}>
                    <div style={{ fontSize: "15px", color: "#F93154", marginBottom: "10px", textAlign: "center" }}>
                        {this.state.error}
                    </div>
                    <div style={{ fontSize: "15px", color: "#00B74A", marginBottom: "10px", textAlign: "center" }}>
                        {this.state.alert}
                    </div>
                    <Button onClick={saveProgress} style={{ width: "max-content", padding: "10px", alignSelf: "center", marginBottom: "10px" }} color="success">
                        SAVE PROGRESS
                    </Button>
                    <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
                        <div style={{ backgroundColor: "rgba(211,211,211, 0.2)", height: "max-height", width: "300px", borderRadius: "8px", padding: "20px", textAlign: "center", margin: "10px" }}>
                            CHAPTERS
                            <div>
                                {this.state.chapters.map((eachChapter, index) => {
                                    return (
                                        <div id={eachChapter.name} style={{ margin: "10px", width: "250px", display: "flex", justifyContent: "space-between" }} >
                                            <div style={{ display: "flex" }}>
                                                {eachChapter.value ? <i style={{ alignSelf: "center", marginRight: "5px", color: "black" }} className="fa fa-check-circle-o"></i> :
                                                    <i style={{ alignSelf: "center", marginRight: "5px" }} className="fa fa-question-circle-o"></i>}
                                                <div style={{ width: "200px", textAlign: "left" }}>
                                                    {eachChapter.name}
                                                </div>
                                            </div>
                                            <div onClick={() => chapterTopics(index)} style={{ cursor: "pointer", color: "blue" }}>
                                                View
                                            </div>

                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                        <div style={{ backgroundColor: "rgba(211,211,211, 0.2)", height: "max-height", width: "300px", borderRadius: "8px", padding: "20px", textAlign: "center", margin: "10px" }}>
                            TOPICS IN CHAPTER {this.state.currentChapter + 1}
                            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                                {this.state.chapters[this.state.currentChapter].topics.map((eachTopic, index) => {
                                    return (
                                        <div id={eachTopic.name} color="danger" style={{ margin: "10px", width: "250px", display: "flex", justifyContent: "space-between" }} >
                                            <div style={{ display: "flex" }}>
                                                {eachTopic.value ? <i style={{ alignSelf: "center", marginRight: "5px", color: "black" }} className="fa fa-check-circle-o"></i> :
                                                    <i style={{ alignSelf: "center", marginRight: "5px" }} className="fa fa-question-circle-o"></i>}
                                                <div style={{ width: "175px", textAlign: "left" }}>
                                                    {eachTopic.name}
                                                </div>
                                            </div>
                                            <div onClick={() => topicQuestions(index)} style={{ cursor: "pointer", color: "blue" }}>
                                                Study
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                        <div style={{ backgroundColor: "rgba(211,211,211, 0.2)", height: "max-height", width: "300px", borderRadius: "8px", padding: "20px", textAlign: "center", margin: "10px" }}>
                            QUESTIONS IN TOPIC {this.state.currentTopic + 1}
                            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                                <div style={{ margin: "5px" }}>
                                    TICK AND SAVE PROGRESS
                                </div>
                                {this.state.chapters[this.state.currentChapter].topics[this.state.currentTopic].questions.map((eachQuestion, index) => {
                                    return (
                                        <div id={eachQuestion.name} color="danger" style={{ margin: "10px", width: "300px", display: "flex", justifyContent: "space-between" }} >
                                            <div style={{ width: "250px", textAlign: "left" }}>
                                                <Input style={{ marginRight: "5px" }} onChange={() => checkBoxChange(index)} checked={this.state.chapters[this.state.currentChapter].topics[this.state.currentTopic].questions[index].value} type="checkbox" />
                                                {eachQuestion.name}
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>}
            </div>
        )
    }
}

export default ListLayout