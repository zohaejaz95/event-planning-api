import React, { Component } from "react";
import { Row, Col } from "antd";
import { vendorProfile, getCategory, getLocation } from "./vendorFunctions";
//import Upload from "./upload";
//import Cate from "../../images/cate.jpg";
import Avatar from "../../images/avatar.jpg";
//const profileData = JSON.parse(localStorage.getItem("usertoken"));

class VendorProfile extends Component {
    constructor() {
        super();
        this.state = {
            //email: localStorage.getItem("email"),
            profile: [],
            locations: [],
            category: []
        };
    }
    componentDidMount() {
        vendorProfile().then(res => {
            if (res) {
                console.log(res.data[0]);
                localStorage.setItem("profile", JSON.stringify(res.data[0]));
                this.setState({
                    profile: JSON.parse(localStorage.getItem("profile"))
                });
            }
        });
        getCategory().then(res => {
            if (res) {
                console.log(res.data[0]);
                this.setState({
                    category: res.data
                });
            }
        });
        getLocation().then(res => {
            if (res) {
                console.log(res.data[0]);
                this.setState({
                    locations: res.data
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
                        <h4>{this.state.profile.vendor_name}</h4>
                        <h6>Email:</h6> {this.state.profile.email}
                        <h6>Website:</h6> {this.state.profile.website}
                        <h6>Contact:</h6> {this.state.profile.contact}
                        <h6>City/ies:</h6>
                        <h6>Category:</h6>
                        <h6>Payment Methods:</h6>
                        <h6>Description:</h6>
                        <p>{this.state.profile.description}</p>
                    </Col>
                </Row>
                <br />
            </div>
        );
    }
}

export default VendorProfile;
