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
                <br />
                <br />
                <Row>
                    <Col span={4}>
                        {/* <div style={Logo} /> */}
                        <img className="avatar-uploader" src={pict} alt="" />
                    </Col>
                    <Col span={19} offset={1}>
                        <table className="table table-striped ">
                            <tbody>
                                <tr>
                                    <th>Organization Name</th>
                                    <td>{this.state.ngo.ngo_name}</td>
                                </tr>
                                <tr>
                                    <th>Email</th>
                                    <td>{this.state.ngo.email}</td>
                                </tr>
                                <tr>
                                    <th>Contact</th>
                                    <td>{"+" + this.state.ngo.contact}</td>
                                </tr>
                                <tr>
                                    <th>Purpose</th>
                                    <td>{this.state.ngo.purpose}</td>
                                </tr>
                            </tbody>
                        </table>
                    </Col>
                </Row>
                <div style={{ height: 160 }} />
                {/* <br />
                <h4 className="text-to-center">Event Progress</h4> */}
                <br />
<<<<<<< HEAD
=======
                <h4 className="text-to-center">Event Progress</h4>
                <br />
>>>>>>> 066393187258e23258bf1087bc4ea49b014e8227
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
