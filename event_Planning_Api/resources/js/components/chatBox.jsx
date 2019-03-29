import React, { Component } from "react";
import { Avatar, Button, Icon, Col, Row, Input } from "antd";

const { TextArea } = Input;
class ChatBox extends Component {
    render() {
        return (
            <div>
                <br />
                <Row>
                    <Col span={1} offset={1}>
                        <Avatar icon="user" />
                    </Col>
                    <Col span={1} offset={1}>
                        <h4>Zoha</h4>
                    </Col>
                    <Col span={1} offset={18}>
                        <Button type="danger">
                            <Icon type="delete" />
                        </Button>
                    </Col>
                </Row>

                <hr />
                <Row style={{ height: 700 }}>
                    <Col span={22} offset={1}>
                        <p
                            style={{
                                backgroundColor: "#D3D3D3",
                                fontSize: 16,
                                float: "left"
                            }}
                        >
                            hi, how are you?
                        </p>
                        <br />
                        <p
                            style={{
                                backgroundColor: "#A9A9A9",
                                fontSize: 16,
                                float: "right"
                            }}
                        >
                            hi, I am fine. You?
                        </p>
                    </Col>
                </Row>
                <Row>
                    <Col span={20} offset={1}>
                        <TextArea rows={1} placeholder="Type Message" />
                    </Col>
                    <Col span={2}>
                        <Button type="primary">Send</Button>
                    </Col>
                </Row>
                <br />
            </div>
        );
    }
}

export default ChatBox;
