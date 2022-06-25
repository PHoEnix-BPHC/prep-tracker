import React from "react"
import { Link, Navigate } from "react-router-dom"
import { firestore } from "../config"
import { CardBody, Card, CardTitle, CardSubtitle, Input, Button, ModalHeader, ModalBody, Modal, ModalFooter } from "reactstrap"
import bcrypt from "bcryptjs"
import emailjs from "@emailjs/browser"
import Loading from "./Loading"
import { encryptStorage } from "./Encryption"


class Login extends React.Component {
    constructor() {
        super()
        this.state = {
            emailId: "",
            password: "",
            error: "",
            alert: "",
            user: "",
            newPassword: "",
            sentOtp: 0,
            otp: "",
            isModal: false,
            isLoading: false,
            isLoader: false
        }
    }
    componentDidMount() {
        const user = encryptStorage.getItem("IDNumber")
        this.setState({ user: user })
    }
    render() {
        var disabled = !((this.state.password) && (this.state.emailId))
        var disabled1 = !(this.state.newPassword && this.state.otp)
        const onChange = event => {
            const { value, name } = event.target
            this.setState({ [name]: value })
        }
        const onSubmitNewPassword = () => {
            if (this.state.sentOtp === parseInt(this.state.otp)) {
                firestore.collection("users").where("emailId", "==", this.state.emailId).get().then(Snapshot => {
                    Snapshot.forEach(document => {
                        var hashed_password = null
                        bcrypt.genSalt().then((Salt) => {
                            bcrypt.hash(this.state.newPassword, Salt).then((hash) => {
                                hashed_password = hash
                                firestore.collection("users").doc(document.id).update({
                                    password: hashed_password
                                }).then(() => {
                                    this.setState({ alert: "Password changed successfully", isModal: false })
                                    setTimeout(() => {
                                        this.setState({ alert: "" })
                                    }, 3000)
                                }).catch(() => {
                                    this.setState({ error: "Some error occurred. Please try again", isLoading: false })
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
                        }).catch(() => {
                            this.setState({ error: "Some error occurred. Please try again" })
                            setTimeout(() => {
                                this.setState({ error: "" })
                            }, 3000)
                        })
                    })
                })
            }
            else {
                this.setState({ error: "Incorrect OTP", isLoading: false })
                setTimeout(() => {
                    this.setState({ error: "" })
                }, 3000)
            }
        }
        const otpSend = () => {
            this.setState({ isLoader: true })
            firestore.collection("users").where("emailId", "==", this.state.emailId).get().then(Snapshot => {
                if (Snapshot.docs.length === 0) {
                    this.setState({ error: "Please create an account.", isLoading: false })
                    setTimeout(() => {
                        this.setState({ error: "" })
                    }, 3000)
                }
                else {
                    const otp = Math.floor(Math.pow(10, 7) + Math.random() * (Math.pow(10, 8) - Math.pow(10, 7) - 1))
                    let templateData = {
                        message: otp,
                        subject: "PrepTracker: Reset Password OTP",
                        to_email: this.state.emailId
                    }
                    this.setState({ sentOtp: otp })
                    emailjs.send("service_5pv3mpn", "template_jki55jo", templateData, "9g9Bw98vTOCj1_nV4").then(() => {
                        this.setState({ alert: "OTP has been sent to your email", isLoader: false })
                        setTimeout(() => {
                            this.setState({ alert: "" })
                        }, 3000)
                    }).catch(() => {
                        this.setState({ error: "Some error has occurred. Please try again later", isLoader: false })
                        setTimeout(() => {
                            this.setState({ error: "" })
                        }, 3000)
                    })
                }
            })
        }
        const onSubmit = () => {
            this.setState({ isLoading: true })
            firestore.collection("users").where("emailId", "==", this.state.emailId).get().then(allDocuments => {
                if (allDocuments.docs.length === 0) {
                    this.setState({ error: "Please create an account.", isLoading: false })
                    setTimeout(() => {
                        this.setState({ error: "" })
                    }, 3000)
                }
                else {
                    allDocuments.forEach(document => {
                        bcrypt.compare(this.state.password, document.data().password).then(result => {
                            if (result) {
                                encryptStorage.setItem("IDNumber", document.data().idNo)
                                this.setState({ alert: "Login Successful. Redirecting..", isLoading: false })
                                setTimeout(() => {
                                    this.setState({ alert: "" })
                                }, 3000)
                                window.location.reload()
                            }
                            else {
                                this.setState({ error: "Incorrect Password", isLoading: false })
                                setTimeout(() => {
                                    this.setState({ error: "" })
                                }, 3000)
                            }
                        }).catch(() => {
                            this.setState({ error: "Some error has occurred. Please try again later", isLoading: false })
                            setTimeout(() => {
                                this.setState({ error: "" })
                            }, 3000)
                        })
                    })
                }
            }).catch((err) => {
                console.log(err.message);
                this.setState({ error: "Some error has occurred. Please try again later", isLoading: false })
                setTimeout(() => {
                    this.setState({ error: "" })
                }, 3000)
            })
        }
        if (this.state.user)
            return <Navigate to="/dashboard" />
        else return (
            <div style={{ display: "flex", justifyContent: "center", textAlign: "center", margin: "10px" }}>
                {this.state.isLoading ? <Loading /> : <Card style={{ width: "300px" }}>
                    <CardBody>
                        <CardTitle tag="h4">
                            LOGIN
                        </CardTitle>
                        <CardSubtitle style={{ cursor: "pointer", display: "flex", justifyContent: "center", marginBottom: "20px" }}>
                            Create an account?
                            <Link to="/signup" style={{ cursor: "pointer", marginLeft: "5px", color: "black", textDecoration: "none" }}>
                                Click Here
                            </Link>
                        </CardSubtitle>
                        <Input onChange={onChange} placeholder="Enter your email id" name="emailId" value={this.state.emailId} style={{ marginBottom: "10px" }} type="email" />
                        <Input onChange={onChange} placeholder="Enter your password" name="password" value={this.state.password} style={{ marginBottom: "10px" }} type="password" />
                        <div onClick={() => this.setState({ isModal: !this.state.isModal })} style={{ marginTop: "10px", cursor: "pointer", textAlign: "right" }}>
                            Forgot Password?
                        </div>
                        <div style={{ fontSize: "15px", color: "#F93154", marginBottom: "10px" }}>
                            {this.state.error}
                        </div>
                        <div style={{ fontSize: "15px", color: "#00B74A", marginBottom: "10px" }}>
                            {this.state.alert}
                        </div>
                        <Button onClick={onSubmit} id="login" disabled={disabled} color="success">
                            LOGIN
                        </Button>
                    </CardBody>
                </Card>}
                <Modal isOpen={this.state.isModal} toggle={() => this.setState({ isModal: !this.state.isModal })}>
                    <ModalHeader toggle={() => this.setState({ isModal: false })} >
                        RESET PASSWORD
                    </ModalHeader>
                    <ModalBody>
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
                            <Input onChange={onChange} placeholder="Enter your email id" name="emailId" value={this.state.emailId} style={{ width: "70%" }} type="email" />
                            {this.state.isLoader ? <Loading /> : <div onClick={otpSend} style={{ cursor: "pointer", alignSelf: "center" }}>
                                REQUEST OTP
                            </div>}
                        </div>
                        <Input onChange={onChange} placeholder="Enter the OTP" name="otp" value={this.state.otp} style={{ marginBottom: "10px" }} type="text" />
                        <Input onChange={onChange} placeholder="Enter your new password" name="newPassword" value={this.state.newPassword} style={{ marginBottom: "10px" }} type="password" />
                        <div style={{ fontSize: "15px", color: "#F93154", marginBottom: "10px", textAlign: "center" }}>
                            {this.state.error}
                        </div>
                        <div style={{ fontSize: "15px", color: "#00B74A", marginBottom: "10px", textAlign: "center" }}>
                            {this.state.alert}
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={onSubmitNewPassword} disabled={disabled1} color="success">
                            LOGIN
                        </Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}

export default Login