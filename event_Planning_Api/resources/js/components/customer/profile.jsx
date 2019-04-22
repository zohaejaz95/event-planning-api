import React, { Component } from "react";
import { Statistic, Card, Row, Col, Icon } from "antd";
import { customerProfile } from "./customerFunction";
import Avatar from "../../images/avatar.jpg";
const profileData = JSON.parse(localStorage.getItem("usertoken"));
//import {customerProfile} from "../userFunction";
class CustProfile extends Component {
    constructor() {
        super();
        this.state = {
            email: localStorage.getItem("email"),
            profile: []
        };
    }
    componentDidMount() {
        customerProfile().then(res => {
            if (res) {
                console.log(res.data[0]);
                localStorage.setItem("profile", JSON.stringify(res.data[0]));
                this.setState({
                    profile: JSON.parse(localStorage.getItem("profile"))
                });
            }
        });
    }
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
                        <h4>
                            {this.state.profile.first_name +
                                " " +
                                this.state.profile.last_name}
                        </h4>
                        <h6>{this.state.profile.username}</h6>
                        <p>Email: {profileData.email}</p>
                        <p>Contact: {this.state.profile.contact}</p>
                        <p>Address: {this.state.profile.address}</p>
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
