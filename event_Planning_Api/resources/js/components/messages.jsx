import React, { Component } from "react";
//import Inbox from "./inbox";
import {
    getNgoToVendor,
    getVendorToNgo,
    getCustToVendor,
    getVendorToCust,
    getCustChat,
    getNGOChat
} from "./chatFunctions";
import ChatBox from "./chatBox";
import { Row, Col, Menu, Icon } from "antd";
// var sender = "";
// var receiver = "";

class Messages extends Component {
    constructor(props) {
        super(props);
        this.state = {
            display: false,
            ngo: false,
            venN: false,
            venC: false,
            cust: false,
            chat: [],
            data: [],
            sel: []
        };
        this.custChat = this.custChat.bind(this);
        this.ngoChat = this.ngoChat.bind(this);
    }
    componentWillMount() {
        var sender = "";
        var receiver = "";
        sender = this.props.sender;
        receiver = this.props.receiver;
        if (sender == "ngo") {
            getNgoToVendor().then(res => {
                if (res) {
                    this.setState({
                        ngo: true,
                        venN: false,
                        venC: false,
                        cust: false,
                        data: res.data
                    });
                    console.log(res);
                }
            });
        } else if (sender == "customer") {
            getCustToVendor().then(res => {
                if (res) {
                    this.setState({
                        ngo: false,
                        venN: false,
                        venC: false,
                        cust: true,
                        data: res.data
                    });
                    console.log(res);
                }
            });
        } else if (sender == "vendor") {
            if (receiver == "ngo") {
                getVendorToNgo().then(res => {
                    if (res) {
                        this.setState({
                            ngo: false,
                            venN: true,
                            venC: false,
                            cust: false,
                            data: res.data
                        });
                        console.log(res);
                    }
                });
            } else {
                getVendorToCust().then(res => {
                    if (res) {
                        this.setState({
                            ngo: false,
                            venN: false,
                            venC: true,
                            cust: false,
                            data: res.data
                        });
                        console.log(res);
                    }
                });
            }
        }
    }
    ngoChat(item) {
        this.setState({
            sel: item,
            display: false
        });
        getNGOChat(item.id).then(res => {
            if (res) {
                console.log(res.data);
                this.setState({
                    chat: res.data,
                    display: true
                });
            }
        });
    }
    custChat(item) {
        this.setState({
            sel: item,
            display: false
        });
        getCustChat(item.id).then(res => {
            if (res) {
                console.log(res.data);
                this.setState({
                    chat: res.data,
                    display: true
                });
            }
        });
    }

    render() {
        const ngoDisplay = (
            <div>
                <Menu
                    defaultSelectedKeys={["0"]}
                    mode="inline"
                    theme="light"
                    style={{ height: 440 }}
                >
                    {this.state.data.map((data, i) => (
                        <Menu.Item key={i} onClick={() => this.ngoChat(data)}>
                            <Icon type="user" />
                            {data.vendor_name}
                        </Menu.Item>
                    ))}
                </Menu>
            </div>
        );
        const custDisplay = (
            <div>
                <Menu
                    defaultSelectedKeys={["0"]}
                    mode="inline"
                    theme="light"
                    style={{ height: 440 }}
                >
                    {this.state.data.map((data, i) => (
                        <Menu.Item key={i} onClick={() => this.custChat(data)}>
                            <Icon type="user" />
                            {data.vendor_name}
                        </Menu.Item>
                    ))}
                </Menu>
            </div>
        );
        const ngoVenDisplay = (
            <div>
                <Menu
                    defaultSelectedKeys={["0"]}
                    mode="inline"
                    theme="light"
                    style={{ height: 440 }}
                >
                    {this.state.data.map((data, i) => (
                        <Menu.Item key={i} onClick={() => this.ngoChat(data)}>
                            <Icon type="user" />
                            {data.ngo_name}
                        </Menu.Item>
                    ))}
                </Menu>
            </div>
        );
        const custVenDisplay = (
            <div>
                <Menu
                    defaultSelectedKeys={["0"]}
                    mode="inline"
                    theme="light"
                    style={{ height: 440 }}
                >
                    {this.state.data.map((data, i) => (
                        <Menu.Item key={i} onClick={() => this.custChat(data)}>
                            <Icon type="user" />
                            {data.first_name + " " + data.last_name}
                        </Menu.Item>
                    ))}
                </Menu>
            </div>
        );
        return (
            <div>
                <Row>
                    <Col span={17} push={6} offset={1}>
                        {this.state.display ? (
                            <ChatBox
                                data={this.state.sel}
                                chat={this.state.chat}
                                sender={this.props.sender}
                                receiver={this.props.receiver}
                            />
                        ) : (
                            <div className="text-to-center">
                                <br />
                                <br />
                                <br />
                                <h6>Select a chat to display.</h6>
                            </div>
                        )}
                    </Col>
                    <Col span={6} pull={18}>
                        <div>
                            <br />
                            <h4>Inbox</h4>
                            <hr />
                            {this.state.ngo ? (
                                ngoDisplay
                            ) : this.state.venN ? (
                                ngoVenDisplay
                            ) : this.state.cust ? (
                                custDisplay
                            ) : this.state.venC ? (
                                custVenDisplay
                            ) : (
                                <div />
                            )}
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Messages;
