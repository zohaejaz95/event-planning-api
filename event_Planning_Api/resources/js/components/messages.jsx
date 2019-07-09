import React, { Component } from "react";
//import Inbox from "./inbox";
import {
    getNgoToVendor,
    getVendorToNgo,
    getCustToVendor,
    getVendorToCust,
    getCustChat,
    getNGOChat,
    getunReadCust,
    getunReadNGO,
    changeStatusNGO,
    changeStatusCust
} from "./chatFunctions";
import ChatBox from "./chatBox";
import { Row, Col, Menu, Icon, Badge } from "antd";
// var sender = "";
// var receiver = "";
var count = 0;
function getValueCust(item) {
    //console.log(item.id);

    getunReadCust(item.id).then(res => {
        if (res) {
            console.log(res.length);
            count = parseInt(res.length, 10);
            //return count;
        }
    });
    return count;
}
function getValueNGO(item) {
    //console.log(item.id);
    getunReadNGO(item.id).then(res => {
        if (res) {
            console.log(res.length);
            count = parseInt(res.length, 10);
            return 3;
        }
    });
    return count;
}
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
            sel: [],
            unread: [],
            show: true
        };
        this.custChat = this.custChat.bind(this);
        this.ngoChat = this.ngoChat.bind(this);
        this.ngoUnread = this.ngoUnread.bind(this);
        this.custUnread = this.custUnread.bind(this);
    }
    custUnread(c_id) {
        if (this.state.show) {
            getunReadCust(c_id).then(res => {
                if (res) {
                    this.setState({
                        unread: res,
                        show: false
                    });
                }
            });
        }
    }
    ngoUnread(c_id) {
        if (this.state.show) {
            getunReadNGO(c_id).then(res => {
                if (res) {
                    this.setState({
                        unread: res,
                        show: false
                    });
                }
            });
        }
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
                for (var i = 0; i < this.state.unread.length; i++) {
                    var val = this.state.unread[i];
                    changeStatusNGO(val.id).then(res => {
                        if (res) {
                            console.log("Marked as Read!");
                        }
                    });
                }
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
                for (var i = 0; i < this.state.unread.length; i++) {
                    var val = this.state.unread[i];
                    changeStatusCust(val.id).then(res => {
                        if (res) {
                            console.log("Marked as Read!");
                        }
                    });
                }
            }
        });
    }

    render() {
        var ngoget = item => {
            if (this.state.show) {
                this.ngoUnread(item.id);
                return this.state.unread.length;
            } else {
                return this.state.unread.length;
            }
        };
        var custget = item => {
            if (this.state.show) {
                this.custUnread(item.id);
                return this.state.unread.length;
            } else {
                return this.state.unread.length;
            }
        };
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
                            <Badge count={ngoget(data)}>
                                <Icon type="user" />
                                {data.vendor_name + "  "}
                            </Badge>
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
                            <Badge count={custget(data)}>
                                <Icon type="user" />
                                {data.vendor_name}
                            </Badge>
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
                            <Badge count={ngoget(data)}>
                                <Icon type="user" />
                                {data.ngo_name}
                            </Badge>
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
                            <Badge count={custget(data)}>
                                <Icon type="user" />
                                {data.first_name + " " + data.last_name}
                            </Badge>
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
