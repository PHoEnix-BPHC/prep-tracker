import React from "react"
import { Button, ModalBody, ModalHeader, Modal, Progress, Alert, Input } from "reactstrap"
import { Chapters } from "../../Data Files/IT"
import { firestore } from "../../config"
import Loading from "../Loading"
import "./CardListLayout.css"
import { chapterCompleteCheck, calculateChapterCompletion, calculateTopicCompletion, calculateQuestionCompletion } from "../Functions"


class CardListLayout extends React.Component {
    constructor() {
        super()
        this.state = {
            isLoading: false,
            alert: "",
            chapters: Chapters,
            currentChapter: 0,
            currentTopic: 0,
            error: "",
            role: "",
            isModal: false
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
            this.setState({ currentChapter: id, isModal: false })
        }
        const topicQuestions = (id) => {
            this.setState({ currentTopic: id })
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
        const checkBoxChange = (index) => {
            let temp = this.state.chapters
            temp[this.state.currentChapter].topics[this.state.currentTopic].questions[index].value = !temp[this.state.currentChapter].topics[this.state.currentTopic].questions[index].value
            this.setState({ chapters: temp })
        }
        return (
            <div style={{ display: "flex" }}>
                {this.state.isLoading ? <Loading /> :
                    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignSelf: "center" }}>
                        <div style={{ fontSize: "15px", color: "#F93154", marginBottom: "10px", textAlign: "center" }}>
                            {this.state.error}
                        </div>
                        <div style={{ fontSize: "15px", color: "#00B74A", marginBottom: "10px", textAlign: "center" }}>
                            {this.state.alert}
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", margin: "10px" }}>
                            <Button onClick={() => { this.setState({ isModal: true }) }} style={{ width: "max-content", padding: "10px", alignSelf: "center", marginBottom: "10px" }} color="danger">
                                CHAPTERS
                            </Button>
                            <Button onClick={saveProgress} style={{ width: "max-content", padding: "10px", alignSelf: "center", marginBottom: "10px" }} color="success">
                                SAVE PROGRESS
                            </Button>
                        </div>
                        <div className="changeFlex" style={{ display: "flex", justifyContent: "center" }}>
                            <div className="widthStyle" style={{ backgroundColor: "rgba(211,211,211, 0.2)", height: "max-height", borderRadius: "8px", padding: "20px", textAlign: "center", margin: "10px" }}>
                                TOPICS IN CHAPTER {this.state.currentChapter + 1}
                                <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                                    <div style={{ display: "flex", height: "363px", flexWrap: "wrap", margin: "20px", overflow: "scroll" }}>
                                        {this.state.chapters[this.state.currentChapter].topics.map((eachTopic, index) => {
                                            return (
                                                <div style={{ width: "250px", height: "125px", borderRadius: "8px", boxShadow: "0px 0px 6px rgba(211,211,211, 0.2)", backgroundColor: "white", padding: "10px", margin: "5px" }}>
                                                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                                                        <h5 style={{ textAlign: "left", height: "65px", alignSelf: "center" }}>
                                                            {eachTopic.name}
                                                        </h5>
                                                        <div onClick={() => topicQuestions(index)} style={{ cursor: "pointer" }}>
                                                            VIEW
                                                        </div>
                                                    </div>
                                                    <Progress style={{ height: "7px" }} value={eachTopic.completed} max={eachTopic.total} />
                                                    <div style={{ color: "grey", textAlign: "left" }}>
                                                        {eachTopic.completed}/{eachTopic.total} questions
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>
                            <div className="widthStyle" style={{ backgroundColor: "rgba(211,211,211, 0.2)", height: "max-height", borderRadius: "8px", padding: "20px", margin: "10px" }}>
                                <div style={{ textAlign: "center" }}>
                                    QUESTIONS IN TOPIC {this.state.currentTopic + 1}
                                </div>
                                <div style={{ display: "flex", flexDirection: "column" }}>
                                    {this.state.chapters[this.state.currentChapter].topics[this.state.currentTopic].questions.map((eachQuestion, index) => {
                                        return (
                                            <Alert color="warning" style={{ margin: "5px", display: "flex", justifyContent: "space-between" }} id={index}>
                                                <div style={{ display: "flex", width: "30%" }}>
                                                    <Input style={{ marginRight: "5px" }} onChange={() => checkBoxChange(index)} checked={this.state.chapters[this.state.currentChapter].topics[this.state.currentTopic].questions[index].value} type="checkbox" />
                                                    Question {index + 1} <br />
                                                </div>
                                                <div style={{ width: "90%", textAlign: "right" }}>
                                                    {eachQuestion.name}
                                                </div>
                                            </Alert>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>}
                <Modal isOpen={this.state.isModal} toggle={() => this.setState({ isModal: !this.state.isModal })}>
                    <ModalHeader toggle={() => this.setState({ isModal: false })} >
                        CHAPTER LIST
                    </ModalHeader>
                    <ModalBody>
                        <div>
                            {this.state.chapters.map((eachChapter, index) => {
                                return (
                                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                                        <div id={eachChapter.name} style={{ margin: "10px", width: "max-width", display: "flex", justifyContent: "space-between" }} >
                                            {eachChapter.value ? <i style={{ alignSelf: "center", color: "black", marginRight: "5px" }} className="fa fa-check-circle-o"></i> :
                                                <i style={{ alignSelf: "center", marginRight: "5px" }} className="fa fa-question-circle-o"></i>}
                                            {eachChapter.name}
                                        </div>
                                        <div onClick={() => chapterTopics(index)} style={{ alignSelf: "center", cursor: "pointer", color: "blue" }}>
                                            SELECT
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}

export default CardListLayout