import React from "react"
import { Button, Card, Input, Label, Modal, ModalBody, ModalHeader, Alert, CardBody, CardTitle, CardSubtitle, Badge } from "reactstrap"
import Loading from "../Components/Loading"
import { firestore, storage } from "../config"
import Moment from "react-moment"
import Footer from "../Components/Footer/Footer"

class Jobs extends React.Component {
    constructor() {
        super()
        this.state = {
            isLoading: false,
            alert: "",
            error: "",
            nameCompany: "",
            role: "",
            type: "NA",
            deadline: "",
            currentMode: "link",
            jobDescription: "",
            proof: "",
            uploadedProof: "",
            uploadedJD: "",
            link: "",
            message: "",
            isModal: false,
            allJobs: []
        }
    }
    componentDidMount() {
        this.setState({ isLoading: true })
        firestore.collection("jobs").where("isVerified", "==", true).get().then(Snapshot => {
            let temp = []
            Snapshot.forEach(document => {
                temp.push(document.data())
            })
            this.setState({ allJobs: temp, isLoading: false }, () => { console.log(this.state.allJobs) })
        }).catch(() => {
            this.setState({ error: "Some error occured. Please try again later.", isLoading: false })
            setTimeout(() => {
                this.setState({ error: "" })
            }, 3000)
        })
    }
    render() {
        const onSubmit = () => {
            this.setState({ isModal: false, isLoading: true })
            firestore.collection("jobs").doc().set({
                name: this.state.nameCompany,
                role: this.state.role,
                type: this.state.type,
                deadline: this.state.deadline,
                link: this.state.link,
                isVerified: false,
                mode: this.state.currentMode,
                message: this.state.message
            }).then(() => {
                this.setState({ alert: "Your opportunity will be live after verification.", isLoading: false })
                setTimeout(() => {
                    this.setState({ alert: "" })
                }, 3000)
            }).catch(() => {
                this.setState({ error: "Some error occurred. Please try again", isLoading: false })
                setTimeout(() => {
                    this.setState({ error: "" })
                }, 3000)
            })
        }
        const onEmailSubmit = () => {
            this.setState({ isModal: false, isLoading: true })
            const { jobDescription, proof } = this.state
            storage.ref(`/proofs/${proof.name}`).put(proof).on("state_changed", () => {
            }, null, () => {
                storage.ref("proofs").child(proof.name).getDownloadURL().then(url => {
                    this.setState({ uploadedProof: url }, () => {

                        storage.ref(`/JDs/${jobDescription.name}`).put(jobDescription).on("state_changed", () => {

                        }, null, () => {
                            storage.ref("JDs").child(jobDescription.name).getDownloadURL().then(url1 => {
                                this.setState({ uploadedJD: url1 }, () => {
                                    firestore.collection("jobs").doc().set({
                                        name: this.state.nameCompany,
                                        role: this.state.role,
                                        type: this.state.type,
                                        deadline: this.state.deadline,
                                        link: this.state.link,
                                        isVerified: false,
                                        jd: this.state.uploadedJD,
                                        proof: this.state.uploadedProof,
                                        mode: this.state.currentMode
                                    }).then(() => {
                                        this.setState({ alert: "Your opportunity will be live after verification.", isLoading: false })
                                        setTimeout(() => {
                                            this.setState({ alert: "" })
                                        }, 3000)
                                    }).catch(() => {
                                        this.setState({ error: "Some error occurred. Please try again", isLoading: false })
                                        setTimeout(() => {
                                            this.setState({ error: "" })
                                        }, 3000)
                                    })
                                })
                            }).catch(() => {
                                this.setState({ error: "Some error occurred. Please try again", isLoading: false })
                                setTimeout(() => {
                                    this.setState({ error: "" })
                                }, 3000)
                            })

                        })
                    })
                }).catch(() => {
                    this.setState({ error: "Some error occurred. Please try again" })
                    setTimeout(() => {
                        this.setState({ error: "" })
                    }, 3000)
                }).catch(() => {
                    this.setState({ error: "Some error occurred. Please try again" })
                    setTimeout(() => {
                        this.setState({ error: "" })
                    }, 3000)
                })
            })
        }
        const onChange = (event) => {
            const { name, value } = event.target
            this.setState({ [name]: value })
        }
        var disabled = !(this.state.deadline && this.state.nameCompany && this.state.role && this.state.link && this.state.type !== "NA")
        var disabled1 = !(this.state.deadline && this.state.nameCompany && this.state.role && this.state.link && this.state.type !== "NA" && this.state.jobDescription && this.state.proof)
        return (
            <div>
                {this.state.isLoading ? <Loading /> : <div>
                    <div style={{ fontSize: "15px", color: "#F93154", marginBottom: "10px", textAlign: "center" }}>
                        {this.state.error}
                    </div>
                    <div style={{ fontSize: "15px", color: "#00B74A", marginBottom: "10px", textAlign: "center" }}>
                        {this.state.alert}
                    </div>
                    <div style={{ textAlign: "right", marginRight: "30px" }}>
                        <Button onClick={() => { this.setState({ isModal: true }) }} color="success">
                            LIST AN OPPORTUNITY
                        </Button>
                    </div>
                    {this.state.allJobs.length === 0 ?
                        <div style={{ textAlign: "center", marginTop: "10px", color: "rgba(0,0,0,0.2)" }}>
                            There are no off campus opportunities currently
                        </div> :
                        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
                            {this.state.allJobs.map(eachJob => {
                                return (
                                    <div>
                                        {console.log(new Date().toLocaleDateString(), eachJob.deadline)}
                                        {true ?
                                            <Card style={{ margin: "30px", width: "275px" }}>
                                                <CardBody>
                                                    <CardTitle tag="h4">
                                                        {eachJob.name}
                                                    </CardTitle>
                                                    <CardSubtitle style={{ color: "rgba(0,0,0,0.3)" }}>
                                                        {eachJob.role}
                                                    </CardSubtitle>
                                                    <div style={{ marginTop: "0px" }}>
                                                        <Badge color="warning">
                                                            {eachJob.type === "Intern3" ? "3 Months Internship" : <div>{eachJob.type === "Intern6" ? "6 Months Internship" : "Full Time"}</div>}
                                                        </Badge>
                                                    </div>
                                                    <div>
                                                        DEADLINE: <Moment format="D MMM HH:MM " >{eachJob.deadline}</Moment> hrs
                                                    </div>
                                                    {eachJob.message ? <Alert style={{ textAlign: "left" }} color="warning">
                                                        {eachJob.message}
                                                    </Alert> : null}

                                                    <div style={{ marginTop: "20px", display: "flex", justifyContent: "center" }}>
                                                        {eachJob.mode === "link" ? <div>
                                                            <Button color="success">
                                                                <a style={{ textDecoration: "none", color: "white" }} href={eachJob.link} target="_blank">APPLY NOW</a>
                                                            </Button>
                                                        </div> : <Button color="success">
                                                            <a style={{ textDecoration: "none", color: "white" }} href={`mailto: ${eachJob.link}`} target="_blank">APPLY NOW</a>
                                                        </Button>}
                                                        {eachJob.mode === "referral" ? <div>
                                                            <Button>
                                                                <a style={{ textDecoration: "none", color: "white" }} href={eachJob.jd} target="_blank">JOB DESCRIPTION</a>
                                                            </Button>
                                                        </div> : null}
                                                    </div>
                                                </CardBody>
                                            </Card> : null
                                        }
                                    </div>
                                )
                            })}
                        </div>
                    }
                </div>
                }
                <Modal isOpen={this.state.isModal} toggle={() => { this.setState({ isModal: !this.state.isModal }) }} >
                    <ModalHeader toggle={() => { this.setState({ isModal: false }) }}>
                        LIST AN OPPORTUNITY
                    </ModalHeader>
                    <ModalBody>
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
                            <div style={{ display: "flex" }}>
                                <Input onChange={() => { this.setState({ currentMode: "link" }) }} checked={this.state.currentMode === "link"} type="radio" style={{ marginRight: "10px" }} />
                                Company Portal
                            </div>
                            <div style={{ display: "flex" }}>
                                <Input onChange={() => { this.setState({ currentMode: "referral" }) }} checked={this.state.currentMode === "referral"} type="radio" style={{ marginRight: "10px" }} />
                                Email Referral
                            </div>
                        </div>
                        {this.state.currentMode === "link" ?
                            <div style={{ marginBottom: "10px" }}>
                                <Input onChange={onChange} value={this.state.nameCompany} name="nameCompany" placeholder="Name of the Company" style={{ marginBottom: "10px" }} />
                                <Input onChange={onChange} value={this.state.role} name="role" placeholder="Role offered" style={{ marginBottom: "10px" }} />
                                <Input onChange={onChange} value={this.state.type} name="type" style={{ marginBottom: "10px" }} type="select">
                                    <option value="NA">
                                        Select the type of the role
                                    </option>
                                    <option value="Intern3">
                                        3 Months Internship
                                    </option>
                                    <option value="Intern6">
                                        6 Months Internship
                                    </option>
                                    <option value="Full Time">
                                        Full Time
                                    </option>
                                </Input>
                                <Input onChange={onChange} value={this.state.link} name="link" placeholder="Enter the link for applying" style={{ marginBottom: "10px" }} />
                                <Label>
                                    Deadline to apply
                                </Label>
                                <Input onChange={onChange} value={this.state.deadline} name="deadline" type="datetime-local" style={{ marginBottom: "10px" }} />
                                <div style={{ textAlign: "center" }}>
                                    <Button disabled={disabled} onClick={onSubmit} color="success" >
                                        SUBMIT
                                    </Button>
                                </div>
                            </div> :
                            <div>
                                <Alert style={{ fontSize: "10px" }} color="warning">
                                    Please enter a valid proof, otherwise your post would be rejected
                                </Alert>
                                <Input onChange={onChange} value={this.state.nameCompany} name="nameCompany" placeholder="Name of the Company" style={{ marginBottom: "10px" }} />
                                <Input onChange={onChange} value={this.state.role} name="role" placeholder="Role offered" style={{ marginBottom: "10px" }} />
                                <Input onChange={onChange} value={this.state.type} name="type" style={{ marginBottom: "10px" }} type="select">
                                    <option value="NA">
                                        Select the type of the role
                                    </option>
                                    <option value="Intern3">
                                        3 Months Internship
                                    </option>
                                    <option value="Intern6">
                                        6 Months Internship
                                    </option>
                                    <option value="Full Time">
                                        Full Time
                                    </option>
                                </Input>
                                <Input onChange={onChange} value={this.state.link} name="link" placeholder="Enter the Email ID for applying" style={{ marginBottom: "10px" }} />
                                <Input onChange={onChange} value={this.state.message} name="message" placeholder="Any Special Message for the candidates" style={{ marginBottom: "10px" }} type="textarea" />
                                <Label>
                                    Deadline to apply
                                </Label>
                                <Input onChange={onChange} value={this.state.deadline} name="deadline" type="datetime-local" style={{ marginBottom: "10px" }} />
                                <Label>
                                    Job Description
                                </Label>
                                <Input id="fileInput" onChange={(event) => this.setState({ jobDescription: event.target.files[0] })} name="jobDescription" style={{ marginBottom: "10px" }} type="file" />
                                <Label>
                                    Proof for Verification
                                </Label>
                                <Input id="fileInput" onChange={(event) => { this.setState({ proof: event.target.files[0] }) }} name="proof" style={{ marginBottom: "10px" }} type="file" />
                                <div style={{ textAlign: "center" }}>
                                    <Button disabled={disabled1} onClick={onEmailSubmit} color="success" >
                                        SUBMIT
                                    </Button>
                                </div>
                            </div>}
                    </ModalBody>
                </Modal>
                <div style={{ marginTop: "300px" }}>

                </div>
                <Footer />
            </div>
        )
    }
}

export default Jobs