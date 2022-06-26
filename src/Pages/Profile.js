import React from "react"
import { firestore, storage } from "../config"
import { Button, Input, Label, InputGroup, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap"
import Loading from "../Components/Loading"
import "./Profile.css"
import { Chapters, totalQuestions, totalTopics } from "../Data Files/IT"
import { ChaptersA, totalQuestionsA, totalTopicsA } from "../Data Files/Core"
import { ChaptersDA, totalQuestionsDA, totalTopicsDA } from "../Data Files/Digital ASIC Engineer"
import PreparationLayout from "../Components/Profile/PreparationLayout"
import { encryptStorage } from "../Components/Encryption"
import Footer from "../Components/Footer/Footer"

class Profile extends React.Component {
    constructor() {
        super()
        this.state = {
            user: {},
            newRole: "IT",
            alert: "",
            error: "",
            profilePicture: null,
            isLoading: false,
            uploadedPicture: ""
        }
    }
    componentDidMount() {
        this.setState({ isLoading: true })
        const idNo = localStorage.getItem("IDNumber")
        firestore.collection("users").doc(idNo).get().then((document) => {
            this.setState({ user: document.data(), uploadedPicture: document.data().uploadedPicture, isLoading: false })
        }).catch(() => {
            this.setState({ error: "Some error occurred. Please try again" })
            setTimeout(() => {
                this.setState({ error: "" })
            }, 3000)
        })
    }
    render() {
        const onChange = (event) => {
            const { name, value } = event.target
            this.setState({ [name]: value })
        }
        const onRoleSubmit = () => {
            this.setState({ isLoading: true, isModal: false })
            const idNo = localStorage.getItem("IDNumber")
            let exists = true
            firestore.collection(this.state.newRole).doc(idNo).get().then(document => {
                exists = document.exists
                if (!exists && this.state.newRole === "IT") {
                    firestore.collection(this.state.newRole).doc(idNo).set({
                        totalQuestions: totalQuestions,
                        totalTopics: totalTopics,
                        totalChapters: Chapters.length,
                        completedQuestions: 0,
                        completedTopics: 0,
                        completedChapters: 0,
                        chapters: Chapters
                    }).then(() => {
                        firestore.collection("users").doc(idNo).update({
                            role: this.state.newRole
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
                else if (!exists && this.state.newRole === "Core") {
                    firestore.collection(this.state.newRole).doc(idNo).set({
                        totalQuestions: totalQuestionsA,
                        totalTopics: totalTopicsA,
                        totalChapters: ChaptersA.length,
                        completedQuestions: 0,
                        completedTopics: 0,
                        completedChapters: 0,
                        chapters: ChaptersA
                    }).then(() => {
                        firestore.collection("users").doc(idNo).update({
                            role: this.state.newRole
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
                else if (!exists && this.state.newRole === "Digital ASIC Engineer") {
                    firestore.collection(this.state.newRole).doc(idNo).set({
                        totalQuestions: totalQuestionsDA,
                        totalTopics: totalTopicsDA,
                        totalChapters: ChaptersDA.length,
                        completedQuestions: 0,
                        completedTopics: 0,
                        completedChapters: 0,
                        chapters: ChaptersDA
                    }).then(() => {
                        firestore.collection("users").doc(idNo).update({
                            role: this.state.newRole
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
                    firestore.collection("users").doc(idNo).update({
                        role: this.state.newRole
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
                }
            }).catch(() => {
                this.setState({ error: "Some error occurred. Please try again" })
                setTimeout(() => {
                    this.setState({ error: "" })
                }, 3000)
            })
        }
        const fileChange = (event) => {
            this.setState({ profilePicture: event.target.files[0] })
        }
        const storePicture = () => {
            this.setState({ isLoading: true })
            const { profilePicture } = this.state
            storage.ref(`/images/${profilePicture.name}`).put(profilePicture).on("state_changed", () => {
            }, null, () => {
                storage.ref("images").child(profilePicture.name).getDownloadURL().then(url => {
                    this.setState({ uploadedPicture: url }, () => {
                        const user = localStorage.getItem("IDNumber")
                        firestore.collection("users").doc(user).update({
                            uploadedPicture: this.state.uploadedPicture
                        }).then(() => {
                            this.setState({ isLoading: false, alert: "Image has been uploaded" })
                            setTimeout(() => {
                                this.setState({ alert: "" })
                            }, 3000)
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
            })
        }
        const disabled = !(this.state.profilePicture)
        return (
            <div>
                {this.state.isLoading ? <Loading /> :
                    <div style={{ display: "flex", flexDirection: "column", margin: "30px" }}>
                        <div style={{ fontSize: "15px", color: "#F93154", marginBottom: "10px", textAlign: "center" }}>
                            {this.state.error}
                        </div>
                        <div style={{ fontSize: "15px", color: "#00B74A", marginBottom: "10px", textAlign: "center" }}>
                            {this.state.alert}
                        </div>
                        <div style={{ color: "grey" }}>
                            PROFILE
                            <div style={{ width: "100%", height: "5px", backgroundColor: "grey", borderRadius: "5px" }}></div>
                        </div>
                        <div className="changeFlex" style={{ display: "flex", margin: "10px 10px 10px 0px", justifyContent: "space-between" }}>
                            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                                {this.state.uploadedPicture ? <img alt="profilePicture" style={{ width: "200px", heigh: "200px", borderRadius: "200px" }} src={this.state.uploadedPicture} />
                                    : <i className="fa fa-user-circle" style={{ fontSize: "200px", color: "grey" }}></i>}
                                <Input id="fileInput" onChange={fileChange} name="profilePicture" style={{ width: "200px", marginTop: "10px" }} type="file" />
                                <Button disabled={disabled} onClick={storePicture} type="file" color="success" style={{ marginTop: "10px", width: "200px" }}> UPLOAD PHOTO</Button>
                            </div>
                            <div style={{ display: "flex", flexWrap: "wrap", width: "60%" }}>
                                <div style={{ margin: "5px" }}>
                                    <Label style={{ margin: "0px" }}>Name</Label>
                                    <Input value={this.state.user.name} disabled={true} style={{ marginBottom: "10px", width: "max-content" }} />
                                </div>
                                <div style={{ margin: "5px" }}>
                                    <Label style={{ margin: "0px" }}>Email Id</Label>
                                    <Input value={this.state.user.emailId} disabled={true} style={{ marginBottom: "10px", width: "max-content" }} />
                                </div>
                                <div style={{ margin: "5px" }}>
                                    <Label style={{ margin: "0px" }}>ID Number</Label>
                                    <Input value={this.state.user.idNo} disabled={true} style={{ marginBottom: "10px", width: "max-content" }} />
                                </div>
                                <div style={{ margin: "5px" }}>
                                    <Label style={{ margin: "0px" }}>Branch</Label>
                                    <Input value={this.state.user.branch} disabled={true} style={{ marginBottom: "10px", width: "max-content" }} />
                                </div>
                                <div style={{ margin: "5px" }}>
                                    <Label style={{ margin: "0px" }}>Role</Label>
                                    <InputGroup>
                                        <Input disabled={true} value={this.state.user.role} name="role" />
                                        <Button onClick={() => { this.setState({ isModal: true }) }}>
                                            <i className="fa fa-pencil"></i>
                                        </Button>
                                    </InputGroup>
                                </div>
                            </div>
                        </div>
                        <PreparationLayout />
                    </div>}
                <Modal isOpen={this.state.isModal}>
                    <ModalHeader toggle={() => this.setState({ isModal: false })}>
                        CHOOSE YOUR ROLE
                    </ModalHeader>
                    <ModalBody>
                        <Label>
                            Choose your role
                        </Label>
                        <Input onChange={onChange} value={this.state.newRole} name="newRole" type="select">
                            <option value="IT">
                                IT
                            </option>
                            <option value="Core">
                                ET CORE
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
                <Footer />
            </div>
        )
    }
}

export default Profile