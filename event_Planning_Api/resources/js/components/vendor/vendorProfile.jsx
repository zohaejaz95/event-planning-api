import React, { Component } from "react";
import { Row, Col } from "antd";
import { vendorProfile, getCategory, getLocation } from "./vendorFunctions";
//import Upload from "./upload";
//import Cate from "../../images/cate.jpg";
var pict = "";
import Avatar from "../../images/avatar.jpg";
//const profileData = JSON.parse(localStorage.getItem("usertoken"));
class VendorProfile extends Component {
    constructor() {
        super();
        this.state = {
            //email: localStorage.getItem("email"),
            profile: [],
            locations: [],
            category: [],
            pic_name: ""
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
                console.log(res.data[0]);
                var arr = "";
                arr = res.data[0];
                var pic = arr.logo;
                var fields = pic.split("\\");
                console.log(fields[10]);
                console.log(pic);
                this.setState({
                    pic_name: fields[10]
                });
                pict = require(`../../../../storage/app/public/vendor/logos/` +
                    fields[10]);
            }
        });
        getCategory().then(resp => {
            if (resp) {
                console.log(resp);
                this.setState({
                    category: resp
                });
            }
        });
        getLocation().then(response => {
            if (response) {
                console.log(response);
                this.setState({
                    locations: response
                });
            }
        });
    }
    render() {
        // var Logo = {
        //     width: "100%",
        //     backgroundImage: `url(${pict})`,
        //     backgroundPosition: "center",
        //     backgroundRepeat: "no - repeat",
        //     backgroundSize: "cover"
        // };
        return (
            <div className="contents ">
                <Row>
                    <Col span={4}>
                        {/* <div style={Logo} /> */}
                        <img className="avatar-uploader" src={pict} alt="" />
                    </Col>
                    <Col span={19} offset={1} style={{ padding: "30px" }}>
                        <h4>{this.state.profile.vendor_name}</h4>
                        <table
                            className="table table-striped "
                            style={{ width: "100%" }}
                        >
                            <tbody>
                                <tr>
                                    <th>Email</th>
                                    <td>{this.state.profile.email}</td>
                                </tr>
                                <tr>
                                    <th>Website</th>
                                    <td>{this.state.profile.website}</td>
                                </tr>
                                <tr>
                                    <th>Contact</th>
                                    <td>{this.state.profile.contact}</td>
                                </tr>
                                <tr>
                                    <th>Locations</th>
                                    <td>
                                        {this.state.locations.map((con, i) => (
                                            <div key={i}>
                                                {i + 1}. City: {con.city}
                                                <br />
                                                Address: {con.address}
                                                <br />
                                            </div>
                                        ))}
                                    </td>
                                </tr>
                                <tr>
                                    <th>Category/ies</th>

                                    {this.state.category.map((con, i) => (
                                        <td key={i}>{con.category}</td>
                                    ))}
                                </tr>
                                <tr>
                                    <th>Description</th>
                                    <td>{this.state.profile.description}</td>
                                </tr>
                            </tbody>
                        </table>
                    </Col>
                </Row>
                <br />
            </div>
        );
    }
}

export default VendorProfile;
