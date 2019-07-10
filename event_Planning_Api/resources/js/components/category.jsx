import React, { Component } from "react";
import ReactPlayer from "react-player";
import Order from "./order";
import Footer from "./footer";
import { Card, Col, Row, Button, Select, Icon, Popover } from "antd";
import {
    getServicesCat,
    getServicesCatToken,
    vendorIDProfile,
    getPayment,
    getServicesCatVen
} from "./vendor/vendorFunctions";
import ServiceDetails from "./vendor/serviceDetails";
import texture from "../images/texture.jpg";
import backgrnd from "../images/background.jpg";

var pict = [];
class Category extends Component {
    constructor() {
        super();
        this.state = {
            detail: false,
            vendor: [],
            payment: [],
            age: [],
            category: "photographs",
            services: [],
            show: [],
            order: {
                id: "",
                type: "service"
            }
        };
        this.handleChange = this.handleChange.bind(this);
        this.vendor = this.vendor.bind(this);
        this.toggleDetail = this.toggleDetail.bind(this);
    }
    toggleDetail(item) {
        this.setState({
            detail: true,
            pack: false,
            show: item,
            display: false
        });
        this.state.order.id = item.id;
        this.state.order.type = "service";
        vendorIDProfile(item.vendor_id).then(res => {
            if (res) {
                this.setState({
                    vendor: res
                });
                console.log(res);
                var arr = "";
                arr = res;
                pict = require(`../../../storage/app/public/vendor/logos/` +
                    arr.logo);
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
    toggleDetails() {
        this.setState({
            detail: false,
            pack: false,
            display: false
        });
    }
    handleChange(value) {
        console.log(`selected ${value}`);
        this.setState({
            category: value
        });

        getServicesCat(value).then(res => {
            if (res) {
                console.log(res.data);
                const lists = JSON.stringify(res.data);
                const elist = JSON.parse(lists);
                this.setState({
                    services: elist
                });
            }
        });
    }
    componentDidMount() {
        // if (this.props.location.state.service) {
        //     this.setState({
        //         detail: true,
        //         show: this.props.location.state.service
        //     });
        // } else {
        //     this.setState({
        //         detail: false
        //     });
        // }
        getServicesCatVen("photographs", "31").then(res => {
            if (res) {
                console.log(res);

                this.setState({
                    services: res
                });
            }
        });
    }
    vendor(value) {
        console.log(value);
    }
    render() {
        const { Meta } = Card;
        const Option = Select.Option;
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
        function handleBlur() {
            console.log("blur");
        }

        function handleFocus() {
            console.log("focus");
        }
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
        const serviceList = (
            <div>
                <div style={mainDiv}>
                    <img
                        src={backgrnd}
                        alt={texture}
                        style={{ maxHeight: "200px", width: "100%" }}
                    />

                    <div style={paraStyle}>
                        <h3 style={{ color: "white" }}>Services</h3>
                    </div>
                </div>
                <br />
                <br />
                <Row>
                    <Col span={6} offset={2}>
                        <Select
                            showSearch
                            style={{ width: "100%" }}
                            placeholder="Select category to search"
                            optionFilterProp="children"
                            onChange={this.handleChange}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                            filterOption={(input, option) =>
                                option.props.children
                                    .toLowerCase()
                                    .indexOf(input.toLowerCase()) >= 0
                            }
                        >
                            <Option value="photographs">Photography</Option>
                            <Option value="videography">Videography</Option>
                            <Option value="makeup artists">
                                Makeup Artist
                            </Option>
                            <Option value="decorators">Decorators</Option>
                            <Option value="designers">Designers</Option>
                            <Option value="venues">Venues</Option>
                            <Option value="cards">Invitations and Cards</Option>
                            <Option value="catering">
                                Food and Catering Services
                            </Option>
                            <Option value="entertainment">
                                Music and Entertainment
                            </Option>
                            <Option value="car rental">
                                Car Rental Services
                            </Option>
                            <Option value="event planners">
                                Event Planners
                            </Option>
                        </Select>
                    </Col>
                </Row>
                <br />

                <Row type="flex" justify="center">
                    {this.state.services.map((serve, i) => (
                        <Col {...cardLayout} className="m-4" key={i}>
                            <Card
                                hoverable
                                style={{ width: 240 }}
                                key={i}
                                onClick={() => this.toggleDetail(serve)}
                            >
                                <div style={{ height: 125 }}>
                                    <ReactPlayer
                                        url={serve.videos}
                                        style={{ width: 195, height: 100 }}
                                    />
                                </div>

                                <Meta title={serve.service_name} />
                            </Card>
                        </Col>
                    ))}
                </Row>
                <Button type="primary">Previous</Button>
                <Button type="primary">Next</Button>
            </div>
        );
        const serviceDetail = (
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
                        <ServiceDetails service={this.state.show} />
                    </Col>
                </Row>
                <Order
                    order={this.state.order}
                    type="service"
                    details={this.state.show}
                />
            </div>
        );
        return (
            <div>
                <br />
                <br />
                {this.state.detail ? serviceDetail : serviceList}
                <Footer />
            </div>
        );
    }
}

export default Category;
