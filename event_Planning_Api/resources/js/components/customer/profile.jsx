import React, { Component } from "react";
import { Statistic, Card, Row, Col, Icon } from "antd";
import { customerProfile } from "./customerFunction";
//import Avatar from "../../images/avatar.jpg";
const profileData = JSON.parse(localStorage.getItem("usertoken"));
//import {customerProfile} from "../userFunction";
//import imagessf from "../../../../storage/app/public/customer/profile_pics/1561390943_IMG-20161104-WA0015.jpg";
//var pictur;
class CustProfile extends Component {
    constructor() {
        super();
        this.state = {
            email: localStorage.getItem("email"),
            profile: [],
            pic_name: "",
            pictur: ""
        };
    }
    componentDidMount() {
        customerProfile().then(res => {
            if (res) {
                //console.log(res.data[0]);
                localStorage.setItem("profile", JSON.stringify(res.data[0]));
                this.setState({
                    profile: JSON.parse(localStorage.getItem("profile"))
                });
                var arr = [];
                arr = res.data[0];
                var pic = arr.profile_pic;
                var fields = pic.split("\\");
                //console.log(fields[10]);
                //console.log(pic);
                this.setState({
                    pic_name: fields[10]
                });
                this.setState({
                    pictur: require(`../../../../storage/app/public/customer/profile_pics/` +
                        fields[10])
                });
                //pictur = require(`../../../../storage/app/public/customer/profile_pics/` + fields[10]);
                //console.log(pict);
            }
        });
    }
    render() {
        return (
            <div className="contents " style={{ minHeight: 440 }}>
                <Row>
                    <Col span={4}>
                        <img
                            className="avatar-uploader"
                            src={this.state.pictur}
                            alt={this.state.pic_name}
                        />
                    </Col>
                    <Col span={19} offset={1} style={{ padding: "30px" }}>
                        <table className="table table-striped ">
                            <tbody>
                                <tr>
                                    <th>Name</th>
                                    <td>
                                        {this.state.profile.first_name +
                                            " " +
                                            this.state.profile.last_name}
                                    </td>
                                </tr>
                                <tr>
                                    <th>Username</th>
                                    <td>{this.state.profile.username}</td>
                                </tr>
                                <tr>
                                    <th>Email</th>
                                    <td>{profileData.email}</td>
                                </tr>
                                <tr>
                                    <th>Contact</th>
                                    <td>{this.state.profile.contact}</td>
                                </tr>
                                <tr>
                                    <th>Address</th>
                                    <td>{this.state.profile.address}</td>
                                </tr>
                            </tbody>
                        </table>
                    </Col>
                </Row>
                <br />
                {/* <h4 className="text-to-center">Event Progress</h4> */}

                {/* <div style={{ background: "#EEE1EE", padding: "30px" }}>
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
                </div> */}
            </div>
        );
    }
}

export default CustProfile;
