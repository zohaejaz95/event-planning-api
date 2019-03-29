import React, { Component } from "react";
//import Inbox from "./inbox";
import ChatBox from "./chatBox";
import { Row, Col, Menu, Icon } from "antd";

class Messages extends Component {
    constructor() {
        super();
        this.state = {
            data: [
                {
                    title: "Zoha"
                },
                {
                    title: "Umer"
                },
                {
                    title: "Zaeem"
                },
                {
                    title: "Asad"
                },
                {
                    title: "Mishal"
                }
            ]
        };
    }

    render() {
        return (
            <div>
                <Row>
                    <Col span={17} push={6} offset={1}>
                        <ChatBox />
                    </Col>
                    <Col span={6} pull={18}>
                        <div>
                            <br />
                            <h4>Inbox</h4>
                            <hr />
                            <Menu
                                defaultSelectedKeys={["0"]}
                                mode="inline"
                                theme="light"
                                style={{ height: 720 }}
                            >
                                {this.state.data.map((data, i) => (
                                    <Menu.Item key={i}>
                                        <Icon type="calendar" />
                                        {data.title}
                                    </Menu.Item>
                                ))}
                            </Menu>
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Messages;
