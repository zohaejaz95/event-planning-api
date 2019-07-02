import React, { Component } from "react";
import { Statistic, Card, Row, Col, Icon } from "antd";
import { ngoProfile } from "./ngoFunctions";
//import imagesdj from "../../../../storage/app/public/ngo/profile_pics/"
//import Avatar from "../../images/avatar.jpg";
var pict;
class NGOProfile extends Component {
    constructor() {
        super();
        this.state = {
            ngo: [],
            pic_name: ""
        };
    }
    componentWillMount() {
        ngoProfile().then(res => {
            if (res) {
                this.setState({
                    ngo: res.data[0]
                });
                console.log(res.data[0]);
                var arr = "";
                arr = res.data[0];
                var pic = arr.profile_pic;
                var fields = pic.split("\\");
                console.log(fields[10]);
                console.log(pic);
                this.setState({
                    pic_name: fields[10]
                });
                pict = require(`../../../../storage/app/public/ngo/profile_pics/` +
                    fields[10]);
            }
        });
    }

    render() {
        var Logo = {
            width: "100%",
            backgroundImage: `url(${"../../../../storage/app/public/ngo/profile_pics/" +
                this.state.pic_name})`,
            backgroundPosition: "center",
            backgroundRepeat: "no - repeat",
            backgroundSize: "cover"
        };
        return (
            <div className="contents ">
                <Row>
                    <Col span={4}>
                        {/* <div style={Logo} /> */}
                        <img className="avatar-uploader" src={pict} alt="" />
                    </Col>
                    <Col
                        span={19}
                        offset={1}
                        style={{ background: "#ECECEC", padding: "30px" }}
                    >
                        <h4>{this.state.ngo.ngo_name}</h4>
                        <p>Email: {this.state.ngo.email}</p>
                        <p>Contact: {"+" + this.state.ngo.contact}</p>
                        <p>Purpose: {this.state.ngo.purpose}</p>
                    </Col>
                </Row>
                <br />
                <h4 className="text-to-center">Event Progress</h4>
                <br />
                {/* <div style={{ background: "#ECECEC", padding: "30px" }}>
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

export default NGOProfile;
