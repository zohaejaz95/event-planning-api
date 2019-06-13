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
                pict =
                    "../../../../storage/app/public/vendor/logos/" + fields[10];
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
        var Logo = {
            width: "100%",
            backgroundImage: `url(${pict})`,
            backgroundPosition: "center",
            backgroundRepeat: "no - repeat",
            backgroundSize: "cover"
        };
        return (
            <div className="contents ">
                <Row>
                    <Col span={4}>
                        <div style={Logo} />
                        {/* <img className="avatar-uploader" src={Avatar} alt="" /> */}
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
                        <h6>Locations:</h6>
                        {this.state.locations.map((con, i) => (
                            <div key={i}>
                                <p>
                                    {i + 1}. City: {con.city}
                                </p>
                                <p>Address: {con.address}</p>
                            </div>
                        ))}
                        <h6>Category:</h6>
                        {this.state.category.map((con, i) => (
                            <div key={i}>
                                <p>{con.category}</p>
                            </div>
                        ))}
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
