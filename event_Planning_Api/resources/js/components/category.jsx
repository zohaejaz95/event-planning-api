import React, { Component } from "react";
//import { Link } from "react-router-dom";
import ReactPlayer from "react-player";
import Order from "./order";
import { Card, Col, Row, Button, Select, Icon } from "antd";
import { getServicesCat, getAllPackages } from "./vendor/vendorFunctions";
import ServiceDetails from "./vendor/serviceDetails";
import PackageDetails from "./vendor/packageDetails";
//import onlineShopping from "../images/online-shopping.jpg";
//import waterLily from "../images/water-lily.png";
import texture from "../images/texture.jpg";
import backgrnd from "../images/background.jpg";
//service images
import makeup from "../images/makeup.jpg";
import designer from "../images/suit-and-tie.jpg";
import photography from "../images/photography.jpg";
import venues from "../images/venues.jpg";
import wedding from "../images/gift-and-roses.jpg";
import corporate from "../images/urban-street.jpg";
import bday from "../images/purple-balloons.jpg";
import personal from "../images/gift-bag-wrap.jpg";

class Category extends Component {
    constructor(props) {
        super(props);
        this.state = {
            detail: false,
            age: [],
            pack: false,
            display: false,
            category: "photographs",
            service: [
                {
                    name: "Vendor Name",
                    image: photography
                },
                {
                    name: "Vendor Name",
                    image: makeup
                },
                {
                    name: "Vendor Name",
                    image: designer
                },
                {
                    name: "Vendor Name",
                    image: venues
                },
                {
                    name: "Vendor Name",
                    image: wedding
                },
                {
                    name: "Vendor Name",
                    image: corporate
                },
                {
                    name: "Vendor Name",
                    image: bday
                },
                {
                    name: "Vendor Name",
                    image: venues
                },
                {
                    name: "Vendor Name",
                    image: makeup
                },
                {
                    name: "Vendor Name",
                    image: designer
                },
                {
                    name: "Vendor Name",
                    image: personal
                }
            ],
            services: [],
            show: [],
            package: [],
            order: {
                id: "",
                type: "service"
            }
        };
        this.vendor = this.vendor.bind(this);
        this.toggleDetail = this.toggleDetail.bind(this);
        this.toggleDetails = this.toggleDetails.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.getPackage = this.getPackage.bind(this);
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
    }
    togglePackageDetail(item) {
        this.setState({
            detail: false,
            pack: false,
            display: true,
            show: item
        });
        this.state.order.id = item.package_id;
        this.state.order.type = "package";
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
        if (this.props.location.state.service) {
            this.setState({
                detail: true,
                show: this.props.location.state.service
            });
        } else {
            this.setState({
                detail: false
            });
        }
        getServicesCat("photographs").then(res => {
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
    viewService() {
        this.props.history.push("/services/category");
    }
    vendor(value) {
        console.log(value);
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
                    detail: false,
                    display: false
                });
                this.state.order.type = "package";
            }
        });
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
        const Option = Select.Option;

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
        const packageList = (
            <div>
                <div style={mainDiv}>
                    <img
                        src={backgrnd}
                        alt={texture}
                        style={{ maxHeight: "200px", width: "100%" }}
                    />
                    <div style={paraStyle}>
                        <h3 style={{ color: "white" }}>Avail Services</h3>
                        <Button type="primary" onClick={this.toggleDetails}>
                            Get Now
                        </Button>
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
                                        playing
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
        const serviceList = (
            <div>
                <div style={mainDiv}>
                    <img
                        src={backgrnd}
                        alt={texture}
                        style={{ maxHeight: "200px", width: "100%" }}
                    />

                    <div style={paraStyle}>
                        <h3 style={{ color: "white" }}>
                            Avail Reasonable Packages
                        </h3>
                        <Button type="primary" onClick={this.getPackage}>
                            Get Now
                        </Button>
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
                                // cover={<img alt="example" src={photography} />}
                                // cover={
                                //     <video style={{ width: 195 }} controls>
                                //         <source
                                //             src={serve.videos}
                                //             type="video/mp4"
                                //         />
                                //     </video>
                                // }
                                key={i}
                                onClick={() => this.toggleDetail(serve)}
                            >
                                {/* <div className="video-container">
                                    <iframe
                                        style={{ width: 195 }}
                                        src={serve.videos}
                                    />
                                </div> */}
                                {/* <video style={{ width: 195 }} controls>
                                    <source
                                        src={serve.videos}
                                        type="video/mp4"
                                    />
                                </video>
                                */}
                                <div style={{ height: 125 }}>
                                    <ReactPlayer
                                        url={serve.videos}
                                        playing
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
                <Button
                    type="primary"
                    onClick={this.toggleDetails.bind(this)}
                    className="text-to-left"
                >
                    Back
                    <Icon type="left-circle" />
                </Button>
                <br />
                <br />
                <Row type="flex">
                    <Col span={14} offset={2}>
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
        const packageDetail = (
            <div>
                <br />
                <br />
                <Button
                    type="primary"
                    onClick={this.toggleDetails.bind(this)}
                    className="text-to-left"
                >
                    Back
                    <Icon type="left-circle" />
                </Button>
                <br />
                <br />
                <Row type="flex">
                    <Col span={14} offset={2}>
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
                {this.state.detail
                    ? serviceDetail
                    : this.state.pack
                    ? packageList
                    : this.state.display
                    ? packageDetail
                    : serviceList}
            </div>
        );
    }
}

export default Category;
