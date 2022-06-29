import React from "react";
import { Button, Label, Input, FormGroup } from "reactstrap";
import Loading from "../Loading"
import CardLayout from "../../Assets/CardLayout.png"
import ListLayout from "../../Assets/ListLayout.png"
import CardListLayout from "../../Assets/CardListLayout.png"
import { firestore } from "../../config";
import { ls } from "../Encryption";

class PreparationLayout extends React.Component {
    constructor() {
        super()
        this.state = {
            isLoading: false,
            alert: "",
            error: "",
            newLayout: ""
        }
    }
    componentDidMount() {
        this.setState({ isLoading: true })
        const user = ls.get("IDNumber")
        firestore.collection("users").doc(user).get().then(document => {
            this.setState({ newLayout: document.data().preparationLayout, isLoading: false })
        }).catch(() => {
            this.setState({ error: "Some error occurred. Please try again" })
            setTimeout(() => {
                this.setState({ error: "" })
            }, 3000)
        })
    }
    render() {
        const onSave = () => {
            this.setState({ isLoading: true })
            const idNo = ls.get("IDNumber")
            firestore.collection("users").doc(idNo).update({
                preparationLayout: this.state.newLayout
            }).then(() => {
                this.setState({ isLoading: false, alert: "Layout updated successfully" })
                setTimeout(() => {
                    this.setState({ alert: "" })
                }, 3000)
            }).catch(() => {
                this.setState({ error: "Some error occurred. Please try again" })
                setTimeout(() => {
                    this.setState({ error: "" })
                }, 3000)
            })
        }
        const onChange = event => {
            const { value } = event.target
            this.setState({ newLayout: value })
        }
        return (
            <div style={{ marginTop: "30px" }}> {
                this.state.isLoading ? <Loading /> : <div>
                    <div style={{ fontSize: "15px", color: "#F93154", marginBottom: "10px", textAlign: "center" }}>
                        {this.state.error}
                    </div>
                    <div style={{ fontSize: "15px", color: "#00B74A", marginBottom: "10px", textAlign: "center" }}>
                        {this.state.alert}
                    </div>
                    <span style={{ color: "grey" }}>PREPARATION LAYOUT</span>
                    <div style={{ width: "100%", height: "5px", backgroundColor: "grey", borderRadius: "5px", marginBottom: "10px" }}></div>
                    <div style={{ display: "flex", flexWrap: "wrap" }}>
                        <div>
                            <FormGroup style={{ margin: "10px" }} check>
                                <Input onChange={onChange} checked={this.state.newLayout === "cardLayout"} value="cardLayout" name="cardLayout" type="radio" />
                                <Label style={{ marginLeft: "5px" }} check>
                                    Card Layout <br />
                                    <img style={{ width: "250px", height: "200px" }} src={CardLayout} alt="cardLayout" />
                                </Label>
                            </FormGroup>
                        </div>
                        <div>
                            <FormGroup style={{ margin: "10px" }} check>
                                <Input onChange={onChange} checked={this.state.newLayout === "listLayout"} value="listLayout" name="listLayout" type="radio" />
                                <Label style={{ marginLeft: "5px" }} check>
                                    List Layout <br />
                                    <img style={{ width: "250px" }} src={ListLayout} alt="cardLayout" />
                                </Label>
                            </FormGroup>
                        </div>
                        <div>
                            <FormGroup style={{ margin: "10px" }} check>
                                <Input onChange={onChange} checked={this.state.newLayout === "cardListLayout"} value="cardListLayout" name="cardListLayout" type="radio" />
                                <Label style={{ marginLeft: "5px" }} check>
                                    CardList Layout <br />
                                    <img style={{ width: "250px" }} src={CardListLayout} alt="cardLayout" />
                                </Label>
                            </FormGroup>
                        </div>
                    </div>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <Button onClick={onSave} color="success">
                            SAVE LAYOUT
                        </Button>
                    </div>
                </div>
            }
            </div>
        )
    }
}

export default PreparationLayout