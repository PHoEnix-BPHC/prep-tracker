import React from "react"
import { Toast, ToastHeader, ToastBody } from "reactstrap"
import Footer from "../Components/Footer/Footer"

class FAQs extends React.Component {
    render() {
        return (
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <div style={{ textAlign: "center", marginTop: "15px" }}>
                    FREQUENTLY ASKED QUESTIONS
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
                    <div style={{ width: "325px" }} className="p-3 my-2 rounded">
                        <Toast>
                            <ToastHeader>
                                What is PrepTracker?
                            </ToastHeader>
                            <ToastBody>
                                PrepTracker is the BPHC's first career preparation and guidance platform where you can prepare for your placements,
                                off campus internships, higher degree & many more.
                            </ToastBody>
                        </Toast>
                    </div>
                    <div style={{ width: "325px" }} className="p-3 my-2 rounded">
                        <Toast>
                            <ToastHeader>
                                What roles can I prepare for?
                            </ToastHeader>
                            <ToastBody>
                                You can prepare for Core sector and IT sector. Finance sector will be added soon.
                                Core sector here refers to Electronics, i.e. ECE, EEE and ENI branch.
                            </ToastBody>
                        </Toast>
                    </div>
                    <div style={{ width: "325px" }} className="p-3 my-2 rounded">
                        <Toast>
                            <ToastHeader>
                                Am I eligible to use it?
                            </ToastHeader>
                            <ToastBody>
                                Yes you are eligible to use it if you are student on BITS Pilani Hyderabad Campus.
                                It will be very helpful for you if you are planning to go in ET Core and IT sector.
                            </ToastBody>
                        </Toast>
                    </div>
                    <div style={{ width: "325px" }} className="p-3 my-2 rounded">
                        <Toast>
                            <ToastHeader>
                                What is Users on the Dashboard?
                            </ToastHeader>
                            <ToastBody>
                                It means the total number of students who have registered to our platform.
                                It shows the total students of that particular batch of the user, not all batches.
                            </ToastBody>
                        </Toast>
                    </div>
                    <div style={{ width: "325px" }} className="p-3 my-2 rounded">
                        <Toast>
                            <ToastHeader>
                                What is Total Days on the Dashboard?
                            </ToastHeader>
                            <ToastBody>
                                It shows the number of days since you have joined this platform,
                                ie. the number of days which have passed since you have created your account.
                                This helps to analyse your progress.
                            </ToastBody>
                        </Toast>
                    </div>
                    <div style={{ width: "325px" }} className="p-3 my-2 rounded">
                        <Toast>
                            <ToastHeader>
                                Can I change my role in between?
                            </ToastHeader>
                            <ToastBody>
                                Yes you can change your role from My Profile section.
                                You can switch back to that role again later.
                                You will start your previous role from where you left.
                                You won't have to start again.
                            </ToastBody>
                        </Toast>
                    </div>
                    <div style={{ width: "325px" }} className="p-3 my-2 rounded">
                        <Toast>
                            <ToastHeader>
                                I don't like the Preparation Layout
                            </ToastHeader>
                            <ToastBody>
                                We provide you with 3 Layout options for your Preparation Tab.
                                You can change the layout from My Profile section. You can choose your comfortable Layout.
                            </ToastBody>
                        </Toast>
                    </div>
                    <div style={{ width: "325px" }} className="p-3 my-2 rounded">
                        <Toast>
                            <ToastHeader>
                                I want to explore Off Campus Opportunities
                            </ToastHeader>
                            <ToastBody>
                                Off Campus Opportunities are available in the Jobs section.
                                Here you can list as well as apply for internships and full time roles.
                            </ToastBody>
                        </Toast>
                    </div>
                    <div style={{ width: "325px" }} className="p-3 my-2 rounded">
                        <Toast>
                            <ToastHeader>
                                The browser shows that the website is dangerous
                            </ToastHeader>
                            <ToastBody>
                                The website is completely safe. Since we don't have the SSL certificate currently Google is showing that.
                                It will disappear after sometime.
                            </ToastBody>
                        </Toast>
                    </div>
                </div>
                <Footer />
            </div>
        )
    }
}

export default FAQs