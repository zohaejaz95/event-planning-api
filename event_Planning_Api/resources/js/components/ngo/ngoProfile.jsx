import React, { Component } from "react";
import { Statistic, Card, Row, Col, Icon } from "antd";

import Avatar from "../../images/avatar.jpg";

class NGOProfile extends Component {
    render() {
        return (
            <div className="contents ">
                <Row>
                    <Col span={4}>
                        <img className="avatar-uploader" src={Avatar} alt="" />
                    </Col>
                    <Col
                        span={19}
                        offset={1}
                        style={{ background: "#ECECEC", padding: "30px" }}
                    >
                        <h4>Customer name</h4>
                        <p>Email: </p>
                        <p>Contact:</p>
                        <p>Address: </p>
                    </Col>
                </Row>
                <br />
                <h4 className="text-to-center">Event Progress</h4>
                <br />
                <div style={{ background: "#ECECEC", padding: "30px" }}>
                    <Row gutter={16}>
                        <Col span={8}>
                            <Card>
                                <Statistic
                                    title="Progress"
                                    value={11.28}
                                    precision={2}
                                    valueStyle={{ color: "#3f8600" }}
                                    prefix={<Icon type="arrow-up" />}
                                    suffix="%"
                                />
                            </Card>
                            <h6 className="text-to-center">Event Name</h6>
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }
}

export default NGOProfile;
