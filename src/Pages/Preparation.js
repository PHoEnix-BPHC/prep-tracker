import React from "react"
import { encryptStorage } from "../Components/Encryption"
import Loading from "../Components/Loading"
import CardLayout from "../Components/Preparation/CardLayout"
import CardListLayout from "../Components/Preparation/CardListLayout"
import ListLayout from "../Components/Preparation/ListLayout"
import { firestore } from "../config"

class Preparation extends React.Component {
    constructor() {
        super()
        this.state = {
            isLoading: false,
            error: "",
            currentLayout: ""
        }
    }
    componentDidMount() {
        this.setState({ isLoading: true })
        const user = localStorage.getItem("IDNumber")
        firestore.collection("users").doc(user).get().then(Document => {
            this.setState({ currentLayout: Document.data().preparationLayout, isLoading: false })
        }).catch(() => {
            this.setState({ error: "Some error occurred. Please try again" })
            setTimeout(() => {
                this.setState({ error: "" })
            }, 3000)
        })
    }
    render() {
        return (
            <div style={{ display: "flex", justifyContent: "center" }}>
                {this.state.isLoading ? <Loading /> : <div>
                    <div style={{ fontSize: "15px", color: "#F93154", marginBottom: "10px", textAlign: "center" }}>
                        {this.state.error}
                    </div>
                    {this.state.currentLayout === "cardLayout" ? <CardLayout /> : <div>
                        {this.state.currentLayout === "listLayout" ? <ListLayout /> : <CardListLayout />}
                    </div>}
                </div>}
            </div >
        )
    }
}

export default Preparation