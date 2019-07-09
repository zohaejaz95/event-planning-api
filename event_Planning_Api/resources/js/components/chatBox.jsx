import React, { Component } from "react";
import { Avatar, Button, Col, Row, Input, message } from "antd";
import {
    sendMsgCust,
    sendMsgNGO,
    getCustChat,
    getNGOChat
} from "./chatFunctions";

const { TextArea } = Input;
class ChatBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chat: [],
            name: "",
            ngo: false,
            venN: false,
            venC: false,
            cust: false,
            msg: "",
            my: false
        };
    }
    componentWillMount() {
        this.setState({
            chat: this.props.chat
        });
        var sender = "";
        var receiver = "";
        sender = this.props.sender;
        receiver = this.props.receiver;
        if (sender == "ngo") {
            this.setState({
                ngo: true,
                venN: false,
                venC: false,
                cust: false,
                name: this.props.data.vendor_name
            });
        } else if (sender == "customer") {
            this.setState({
                ngo: false,
                venN: false,
                venC: false,
                cust: true,
                name: this.props.data.vendor_name
            });
        } else if (sender == "vendor") {
            if (receiver == "ngo") {
                this.setState({
                    ngo: false,
                    venN: true,
                    venC: false,
                    cust: false,
                    name: this.props.data.ngo_name
                });
            } else {
                this.setState({
                    ngo: false,
                    venN: false,
                    venC: true,
                    cust: false,
                    name:
                        this.props.data.first_name +
                        " " +
                        this.props.data.last_name
                });
            }
        }
    }
    getText(e) {
        console.log(e.target.value);
        this.setState({
            msg: e.target.value
        });
    }
    sendMsg() {
        var sender = this.props.sender;
        var receiver = this.props.receiver;
        var req = {
            convo_id: this.props.data.id,
            message: this.state.msg
        };
        if (sender == "ngo") {
            sendMsgNGO(req).then(res => {
                if (res) {
                    getNGOChat(this.props.data.id).then(res => {
                        if (res) {
                            console.log(res.data);
                            this.setState({
                                chat: res.data
                            });
                        }
                    });
                } else {
                    message.warning("Try Sending Again!");
                }
            });
        } else if (sender == "customer") {
            sendMsgCust(req).then(res => {
                if (res) {
                    getCustChat(this.props.data.id).then(res => {
                        if (res) {
                            console.log(res.data);
                            this.setState({
                                chat: res.data
                            });
                        }
                    });
                } else {
                    message.warning("Try Sending Again!");
                }
            });
        } else if (sender == "vendor") {
            if (receiver == "ngo") {
                sendMsgNGO(req).then(res => {
                    if (res) {
                        getNGOChat(this.props.data.id).then(res => {
                            if (res) {
                                console.log(res.data);
                                this.setState({
                                    chat: res.data
                                });
                            }
                        });
                    } else {
                        message.warning("Try Sending Again!");
                    }
                });
            } else {
                sendMsgCust(req).then(res => {
                    if (res) {
                        getCustChat(this.props.data.id).then(res => {
                            if (res) {
                                console.log(res.data);
                                this.setState({
                                    chat: res.data
                                });
                            } else {
                                message.warning("Cant Update!");
                            }
                        });
                    } else {
                        message.warning("Try Sending Again!");
                    }
                });
            }
        }
    }
    messages(item) {
        var sender = this.props.sender;
        var receiver = this.props.receiver;
        if (item.sender == sender) {
            this.setState({
                my: true
            });
        } else {
            this.setState({
                my: true
            });
        }
    }
    render() {
        return (
            <div>
                <br />
                <Row>
                    <Col span={1} offset={1}>
                        <Avatar icon="user" />
                    </Col>
                    <Col span={5} offset={1}>
                        <h4>{this.state.name}</h4>
                    </Col>
                    {/* <Col span={1} offset={18}>
                        <Button type="danger">
                            <Icon type="delete" />
                        </Button>
                    </Col> */}
                </Row>

                <hr />
                <div style={{ height: 400 }}>
                    {this.state.chat.map((data, i) => (
                        <div key={i}>
                            <Row>
                                <Col span={22} offset={1}>
                                    <div>
                                        <small>{data.sender}</small>
                                        <br />
                                        <p
                                            style={{
                                                backgroundColor: "#f8eee7",
                                                fontSize: 16,
                                                float: "left"
                                            }}
                                        >
                                            {data.message}
                                        </p>
                                    </div>
                                </Col>
                            </Row>
                            <br />
                        </div>
                    ))}
                </div>

                <Row>
                    <Col span={20} offset={1}>
                        <TextArea
                            rows={1}
                            placeholder="Type Message"
                            onChange={this.getText.bind(this)}
                        />
                    </Col>
                    <Col span={2}>
                        <Button
                            type="primary"
                            onClick={this.sendMsg.bind(this)}
                        >
                            Send
                        </Button>
                    </Col>
                </Row>
                <br />
            </div>
        );
    }
}

export default ChatBox;
