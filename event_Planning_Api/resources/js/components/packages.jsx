import React, { Component } from "react";
import ReactPlayer from "react-player";
import Order from "./order";
import texture from "../images/texture.jpg";
import backgrnd from "../images/background.jpg";
import Footer from "./footer";
import {
    vendorIDProfile,
    getPayment,
    getAllPackages
} from "./vendor/vendorFunctions";
import PackageDetails from "./vendor/packageDetails";
import { Card, Col, Row, Button, Icon, Popover } from "antd";
var pict = [];
class Package extends Component {
    constructor() {
        super();
        this.state = {
            pack: false,
            vendor: [],
            display: false,
            show: [],
            package: []
        };
        this.getPackage = this.getPackage.bind(this);
        this.toggleDetails = this.toggleDetails.bind(this);
        this.togglePackageDetail = this.togglePackageDetail.bind(this);
    }
    toggleDetails() {
        this.setState({
            pack: true,
            display: false
        });
    }
    togglePackageDetail(item) {
        this.setState({
            pack: false,
            display: true,
            show: item
        });
        this.state.order.id = item.package_id;
        this.state.order.type = "package";
        vendorIDProfile(item.vendor_id).then(res => {
            if (res) {
                this.setState({
                    vendor: res
                });
                console.log(res);
                var arr = "";
                arr = res;
                var pic = arr.logo;
                var fields = pic.split("\\");
                console.log(fields[10]);
                console.log(pic);

                pict = require(`../../../storage/app/public/vendor/logos/` +
                    fields[10]);
            }
        });
        getPayment(item.vendor_id).then(res => {
            if (res) {
                this.setState({
                    payment: res
                });
                console.log(res);
            }
        });
    }
    getPackage() {
        getAllPackages().then(res => {
            if (res) {
                console.log(res.data);
                const lists = JSON.stringify(res.data);
                const elist = JSON.parse(lists);
                this.setState({
                    package: elist,
                    pack: true,
                    display: false
                });
                this.state.order.type = "package";
            }
        });
    }
    componentWillMount() {
        if (this.props.location.state.package) {
            this.setState({
                display: true,
                show: this.props.location.state.package
            });
        } else {
            this.setState({
                display: false
            });
        }
        this.getPackage();
    }
    render() {
        const { Meta } = Card;
        const cardLayout = {
            labelcol: {
                xs: { span: 24 },
                sm: { span: 4 }
            },
            wrappercol: {
                xs: { span: 24 },
                sm: { span: 4 }
            }
        };

        const mainDiv = {
            position: " relative",
            textAlign: "center",
            color: "white"
        };
        const paraStyle = {
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)"
        };
        const content = (
            <div>
                <p>{"Contact: " + this.state.vendor.contact}</p>
                <p>{"Email  : " + this.state.vendor.email}</p>
            </div>
        );
        const packageList = (
            <div>
                <div style={mainDiv}>
                    <img
                        src={backgrnd}
                        alt={texture}
                        style={{ maxHeight: "200px", width: "100%" }}
                    />
                    <div style={paraStyle}>
                        <h3 style={{ color: "white" }}>Packages</h3>
                    </div>
                </div>
                <br />
                <Row type="flex" justify="center">
                    {this.state.package.map((pack, i) => (
                        <Col {...cardLayout} className="m-4" key={i}>
                            <Card
                                hoverable
                                style={{ width: 240 }}
                                // cover={<img alt="example" src={photography} />}
                                key={i}
                                onClick={() => this.togglePackageDetail(pack)}
                            >
                                <div style={{ height: 125 }}>
                                    <ReactPlayer
                                        url={pack.videos}
                                        style={{ width: 195, height: 100 }}
                                    />
                                </div>
                                <Meta title={pack.name} />
                            </Card>
                        </Col>
                    ))}
                </Row>
                <Button type="primary">Previous</Button>
                <Button type="primary">Next</Button>
            </div>
        );
        const packageDetail = (
            <div>
                <br />
                <br />

                <Row type="flex">
                    <Col span={21} offset={1}>
                        <Row type="flex">
                            <Col span={5}>
                                <Button
                                    type="primary"
                                    onClick={this.toggleDetails.bind(this)}
                                    className="text-to-left"
                                >
                                    <Icon type="left-circle" />
                                    Back
                                </Button>
                                <br />
                                <br />
                            </Col>
                        </Row>
                        <Row type="flex">
                            <Col span={2}>
                                <img
                                    className="avatar-uploader"
                                    src={pict}
                                    alt="Avatar"
                                />
                            </Col>
                            <Col span={10}>
                                <h4
                                    className="text-to-left"
                                    style={{ color: "#49274a" }}
                                >
                                    {this.state.vendor.vendor_name + "  "}
                                    <Popover
                                        placement="right"
                                        title={this.state.vendor.vendor_name}
                                        content={content}
                                        trigger="click"
                                    >
                                        <Icon type="info-circle" />
                                    </Popover>
                                </h4>
                            </Col>
                        </Row>
                        <br />
                        <PackageDetails package={this.state.show} />
                    </Col>
                </Row>
                <Order
                    order={this.state.order}
                    type="package"
                    details={this.state.show}
                />
            </div>
        );
        return (
            <div>
                <br />
                <br />
                {this.state.pack
                    ? packageList
                    : this.state.display
                    ? packageDetail
                    : packageList}
                <Footer />
            </div>
        );
    }
}

export default Package;
