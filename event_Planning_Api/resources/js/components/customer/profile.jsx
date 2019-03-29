import React, { Component } from "react";
import { Statistic, Card, Row, Col, Icon } from "antd";

//import ProfilePic from "../profilePic";

import Avatar from "../../images/avatar.jpg";
//import { Layout } from "antd";
//import { Link } from "react-router-dom";

//import CustNavBar from "../custNavBar";
//import Customer from "../customer";

//const { Content } = Layout;

class CustProfile extends Component {
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
                        <h4>My name</h4>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Iste ipsam doloribus mollitia minima a enim
                            sit, aliquid amet temporibus eum autem recusandae
                            culpa vel perspiciatis dolorem repellendus similique
                            deleniti laudantium?
                        </p>
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

export default CustProfile;
