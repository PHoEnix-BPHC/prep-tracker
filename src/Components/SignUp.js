import React from "react"
import bcrypt from "bcryptjs"
import { Link, Navigate } from "react-router-dom"
import { firestore } from "../config"
import firebase from "../config"
import { Chapters, totalQuestions, totalTopics } from "../Data Files/IT"
import { ChaptersDA, totalQuestionsDA, totalTopicsDA } from "../Data Files/Digital ASIC Engineer"
import { ChaptersA, totalQuestionsA, totalTopicsA } from "../Data Files/Core"
import { CardBody, Card, CardTitle, CardSubtitle, Input, Button, Modal, ModalHeader, ModalFooter, Label, ModalBody } from "reactstrap"
import Loading from "../Components/Loading"

class SignUp extends React.Component {
    constructor() {
        super()
        this.state = {
            name: "",
            branch: "",
            emailId: "",
            password: "",
            confirmPassword: "",
            error: "",
            user: "",
            alert: "",
            role: "IT",
            isModal: false,
            isLoading: false
        }
    }
    componentDidMount() {
        const user = localStorage.getItem("IDNumber")
        this.setState({ user: user })
    }
    render() {
        var disabled = !(this.state.branch !== "NA" && this.state.emailId && this.state.name && this.state.password) || !(this.state.confirmPassword === this.state.password)
        const onSubmit = async () => {
            this.setState({ isLoading: true })
            const emailexp = new RegExp("^(f20)[0-2][0-9][0-9]{4}@hyderabad.bits-pilani.ac.in")
            if (!emailexp.test(this.state.emailId)) {
                this.setState({ error: "Please enter a valid BITS email id", isLoading: false })
                setTimeout(() => {
                    this.setState({ error: "" })
                }, 3000)
            }
            else {
                var code = ""
                var year = ""
                var id = ""
                if (this.state.branch === "ECE")
                    code = "AA"
                else if (this.state.branch === "EEE")
                    code = "A3"
                else
                    code = "A8"
                year = this.state.emailId.substring(1, 5)
                id = this.state.emailId.substring(5, 9)
                var idNo = year + code + "PS" + id + "H"
                var hashed_password = null
                try {
                    const salt = await bcrypt.genSalt()
                    hashed_password = await bcrypt.hash(this.state.password, salt)
                }
                catch (err) {
                    this.setState({ error: "Some error occurred. Please try again" })
                    setTimeout(() => {
                        this.setState({ error: "" })
                    }, 3000)
                }
                firestore.collection("users").doc(idNo).set({
                    year: year,
                    name: this.state.name,
                    branch: this.state.branch,
                    emailId: this.state.emailId,
                    password: hashed_password,
                    idNo: idNo,
                    uploadedPicture: "",
                    preparationLayout: "cardLayout",
                    role: "",
                    createdAt: firebase.firestore.FieldValue.serverTimestamp()
                }).then(() => {
                    localStorage.setItem("IDNumber", idNo)
                    this.setState({ alert: "Account created!! Redirecting...", isLoading: false, isModal: true })
                    setTimeout(() => {
                        this.setState({ alert: "" })
                    }, 3000)
                }).catch(err => {
                    this.setState({ error: err.message, isLoading: false })
                    setTimeout(() => {
                        this.setState({ error: "" })
                    }, 3000)
                })
            }
        }
        const onRoleSubmit = () => {
            this.setState({ isLoading: true, isModal: false })
            const idNo = localStorage.getItem("IDNumber")
            if (this.state.role === "IT") {
                firestore.collection(this.state.role).doc(idNo).set({
                    totalQuestions: totalQuestions,
                    totalTopics: totalTopics,
                    totalChapters: Chapters.length,
                    completedQuestions: 0,
                    completedTopics: 0,
                    completedChapters: 0,
                    chapters: Chapters
                }).then(() => {
                    firestore.collection("users").doc(idNo).update({
                        role: this.state.role
                    }).then(() => {
                        this.setState({ alert: "Redirecting...", isLoading: false, isModal: false })
                        setTimeout(() => {
                            this.setState({ alert: "" })
                        }, 3000)
                        window.location.reload()
                    }).catch(err => {
                        this.setState({ error: err.message, isLoading: false })
                        setTimeout(() => {
                            this.setState({ error: "" })
                        }, 3000)
                    })
                }).catch(err => {
                    this.setState({ error: err.message, isLoading: false })
                    setTimeout(() => {
                        this.setState({ error: "" })
                    }, 3000)

                })
            }
            else if (this.state.role === "Core") {
                firestore.collection(this.state.role).doc(idNo).set({
                    totalQuestions: totalQuestionsA,
                    totalTopics: totalTopicsA,
                    totalChapters: ChaptersA.length,
                    completedQuestions: 0,
                    completedTopics: 0,
                    completedChapters: 0,
                    chapters: ChaptersA
                }).then(() => {
                    firestore.collection("users").doc(idNo).update({
                        role: this.state.role
                    }).then(() => {
                        this.setState({ alert: "Redirecting...", isLoading: false, isModal: false })
                        setTimeout(() => {
                            this.setState({ alert: "" })
                        }, 3000)
                        window.location.reload()
                    }).catch(err => {
                        this.setState({ error: err.message, isLoading: false })
                        setTimeout(() => {
                            this.setState({ error: "" })
                        }, 3000)
                    })
                }).catch(err => {
                    this.setState({ error: err.message, isLoading: false })
                    setTimeout(() => {
                        this.setState({ error: "" })
                    }, 3000)

                })
            }
            else {
                firestore.collection(this.state.role).doc(idNo).set({
                    totalQuestions: totalQuestionsDA,
                    totalTopics: totalTopicsDA,
                    totalChapters: ChaptersDA.length,
                    completedQuestions: 0,
                    completedTopics: 0,
                    completedChapters: 0,
                    chapters: ChaptersDA
                }).then(() => {
                    firestore.collection("users").doc(idNo).update({
                        role: this.state.role
                    }).then(() => {
                        this.setState({ alert: "Redirecting...", isLoading: false, isModal: false })
                        setTimeout(() => {
                            this.setState({ alert: "" })
                        }, 3000)
                        window.location.reload()
                    }).catch(err => {
                        this.setState({ error: err.message, isLoading: false })
                        setTimeout(() => {
                            this.setState({ error: "" })
                        }, 3000)
                    })
                }).catch(err => {
                    this.setState({ error: err.message, isLoading: false })
                    setTimeout(() => {
                        this.setState({ error: "" })
                    }, 3000)

                })
            }
        }
        const onChange = event => {
            const { value, name } = event.target
            this.setState({ [name]: value }, () => console.log(this.state))
        }
        if (this.state.user)
            return <Navigate to="/dashboard" />
        else return (
            <div style={{ display: "flex", justifyContent: "center", textAlign: "center", margin: "10px" }}>
                {this.state.isLoading ? <Loading /> :
                    <Card style={{ width: "300px" }}>
                        <CardBody>
                            <CardTitle tag="h4">
                                SIGN UP
                            </CardTitle>
                            <CardSubtitle style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
                                Already Registered?
                                <Link to="/login" style={{ cursor: "pointer", marginLeft: "5px", color: "black", textDecoration: "none" }}>
                                    Log In
                                </Link>
                            </CardSubtitle>
                            <Input onChange={onChange} placeholder="Enter your name" name="name" value={this.state.name} style={{ marginBottom: "10px" }} />
                            <Input onChange={onChange} placeholder="Enter your email id" name="emailId" value={this.state.emailId} style={{ marginBottom: "10px" }} type="email" />
                            <Input onChange={onChange} placeholder="Choose your branch" name="branch" value={this.state.branch} style={{ marginBottom: "10px" }} type="select">
                                <option value="NA">
                                    Choose your branch
                                </option>
                                <option value="ECE">
                                    Electronics & Communication
                                </option>
                                <option value="EEE">
                                    Electronics & Electrical
                                </option>
                                <option value="ENI">
                                    Electronics & Instrumentation
                                </option>
                            </Input>
                            <Input onChange={onChange} placeholder="Enter your password" name="password" value={this.state.password} style={{ marginBottom: "10px" }} type="password" />
                            <Input onChange={onChange} placeholder="Confirm your password" name="confirmPassword" value={this.state.confirmPassword} style={{ marginBottom: "10px" }} type="password" />
                            <div style={{ fontSize: "15px", color: "#F93154", marginBottom: "10px" }}>
                                {this.state.error}
                            </div>
                            <div style={{ fontSize: "15px", color: "#00B74A", marginBottom: "10px" }}>
                                {this.state.alert}
                            </div>
                            <Button onClick={onSubmit} disabled={disabled} color="success">
                                CREATE ACCOUNT
                            </Button>
                        </CardBody>
                    </Card>}
                <Modal isOpen={this.state.isModal}>
                    <ModalHeader toggle={() => this.setState({ isModal: false })}>
                        CHOOSE YOUR ROLE
                    </ModalHeader>
                    <ModalBody>
                        <Label>
                            Choose your role
                        </Label>
                        <Input onChange={onChange} value={this.state.role} name="role" type="select">
                            <option value="IT">
                                IT
                            </option>
                            <option value="Core">
                                CORE
                            </option>
                            {/* <option vale="Digital ASIC Engineer">
                                Digital ASIC Engineer
                            </option> */}
                        </Input>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="success" onClick={onRoleSubmit}>
                            CONFIRM
                        </Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}

export default SignUp