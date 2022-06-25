import React from "react"
import { Button, Modal, ModalHeader, ModalBody, Alert, Input } from "reactstrap"
import Loading from "../Loading"
import { firestore } from "../../config"
import { calculateChapterCompletion, calculateTopicCompletion, calculateQuestionCompletion, chapterCompleteCheck } from "../Functions"
import { Chapters } from "../../Data Files/IT"
import { encryptStorage } from "../Encryption"

class Topic extends React.Component {
    constructor() {
        super()
        this.state = {
            isLoading: false,
            error: "",
            alert: "",
            role: "",
            isModal: false,
            chapters: Chapters
        }
    }
    componentDidMount() {
        this.setState({ isLoading: true })
        const user = encryptStorage.getItem("IDNumber")
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
        const checkBoxChange = (index) => {
            let temp = this.props.chaptersList
            temp[this.props.chapter].topics[this.props.index].questions[index].value = !temp[this.props.chapter].topics[this.props.index].questions[index].value
            this.setState({ chapters: temp })
        }
        const saveProgress = () => {
            this.setState({ isModal: false })
            const user = encryptStorage.getItem("IDNumber")
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
                this.setState({ alert: "Progress has been saved" })
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
            <div style={{ width: "250px", height: "max-content", borderRadius: "8px", boxShadow: "0px 0px 6px rgba(0,0,0,0.3)", backgroundColor: "white", padding: "10px", margin: "5px" }}>
                {this.state.isLoading ? <Loading /> :
                    <div>
                        <div style={{ fontSize: "15px", color: "#F93154", marginBottom: "10px", textAlign: "center" }}>
                            {this.state.error}
                        </div>
                        <div style={{ fontSize: "15px", color: "#00B74A", marginBottom: "10px", textAlign: "center" }}>
                            {this.state.alert}
                        </div>
                        {this.props.eachTopic.value ? <div style={{ height: "5px", width: "225px", backgroundColor: "#00B74A", borderRadius: "8px" }}>

                        </div> : <div style={{ height: "5px", width: "225px", backgroundColor: "#F93154", borderRadius: "8px" }}>

                        </div>}
                        <div style={{ display: "flex" }}>
                            {this.props.eachTopic.value ? <div style={{ borderRadius: "50px", width: "50px", height: "50px", display: "flex", justifyContent: "center" }}>
                                <i style={{ alignSelf: "center", color: "#00B74A", fontSize: "20px" }} className="fa fa-check" ></i>
                            </div> : <div style={{ borderRadius: "50px", width: "50px", height: "50px", backgroundColor: "rgba (255, 0,0,0.3)", display: "flex", justifyContent: "center" }}>
                                <i style={{ alignSelf: "center", color: "#F93154", fontSize: "20px" }} className="fa fa-question" ></i>
                            </div>}
                            <h5 style={{ textAlign: "left", alignSelf: "center", marginLeft: "5px" }}>
                                {this.props.eachTopic.name}
                            </h5>
                        </div>
                        <div style={{ textAlign: "left", marginLeft: "55px", marginBottom: "5px" }}>
                            {this.props.eachTopic.total} Total Questions <br />
                            {this.props.eachTopic.completed} Completed <br />
                            {this.props.eachTopic.total - this.props.eachTopic.completed} Incomplete
                        </div>
                        <Button onClick={() => { this.setState({ isModal: true }) }} color="success">
                            VIEW ALL
                        </Button>
                    </div>}

                <Modal isOpen={this.state.isModal} toggle={() => { this.setState({ isModal: !this.state.isModal }) }}>
                    <ModalHeader toggle={() => { this.setState({ isModal: false }) }}>
                        QUESTIONS
                    </ModalHeader>
                    <ModalBody>
                        <div style={{ margin: "5px" }}>
                            TICK THE CHECKBOX IF YOU HAVE COMPLETED THE QUESTIONS
                        </div>
                        {this.props.eachTopic.questions.map((eachQuestion, index) => {
                            return (
                                <Alert color="warning" style={{ margin: "5px" }} id={index}>
                                    <div style={{ display: "flex" }}>
                                        <Input name={eachQuestion.name} style={{ marginRight: "5px" }} onChange={() => checkBoxChange(index)} checked={this.props.chaptersList[this.props.chapter].topics[this.props.index].questions[index].value} type="checkbox" />
                                        Question {index + 1} <br />
                                    </div>
                                    {eachQuestion.name}
                                </Alert>
                            )
                        })}
                        <Button onClick={saveProgress} style={{ margin: "10px 5px 5px 5px" }} color="success">
                            SAVE PROGRESS
                        </Button>
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}

export default Topic