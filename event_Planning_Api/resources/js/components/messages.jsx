import React, { Component } from "react";
//import Inbox from "./inbox";
import {
    getNgoToVendor,
    getVendorToNgo,
    getCustToVendor,
    getVendorToCust
} from "./chatFunctions";
import ChatBox from "./chatBox";
import { Row, Col, Menu, Icon } from "antd";
// var sender = "";
// var receiver = "";

class Messages extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ngo: false,
            venN: false,
            venC: false,
            cust: false,
            data: []
        };
        this.venCustChat = this.venCustChat.bind(this);
        this.venNgoChat = this.venNgoChat.bind(this);
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

    venCustChat() {}
    venNgoChat() {}
    ngoChat() {}
    custChat() {}
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
                        <Menu.Item
                            key={i}
                            onClick={() => this.venNgoChat(data)}
                        >
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
                        <Menu.Item
                            key={i}
                            onClick={() => this.venCustChat(data)}
                        >
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
                        <ChatBox data={this.state.data} />
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
