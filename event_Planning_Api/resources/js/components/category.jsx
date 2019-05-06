import React, { Component } from "react";
//import { Link } from "react-router-dom";
import ReactPlayer from "react-player";
import Order from "./order";
import { Card, Col, Row, Button, Select, Icon } from "antd";
import { getServicesCat } from "./vendor/vendorFunctions";
//service images
import avatar from "../images/avatar.jpg";
import makeup from "../images/makeup.jpg";
import designer from "../images/suit-and-tie.jpg";
import photography from "../images/photography.jpg";
import venues from "../images/venues.jpg";
import wedding from "../images/gift-and-roses.jpg";
import corporate from "../images/urban-street.jpg";
import bday from "../images/purple-balloons.jpg";
import personal from "../images/gift-bag-wrap.jpg";

class Category extends Component {
    constructor() {
        super();
        this.state = {
            detail: false,
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
            show: []
        };
        this.vendor = this.vendor.bind(this);
        this.toggleDetail = this.toggleDetail.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    toggleDetail(item) {
        this.setState({
            detail: true,
            show: item
        });
    }
    toggleDetails() {
        this.setState({
            detail: false
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
        this.props.history.push("/services/photography/vendor-name");
    }
    vendor(value) {
        console.log(value);
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
        const serviceList = (
            <Row>
                <Select
                    showSearch
                    style={{ width: 200 }}
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
                    <Option value="makeup artists">Makeup Artist</Option>
                    <Option value="decorators">Decorators</Option>
                    <Option value="designers">Designers</Option>
                    <Option value="venues">Venues</Option>
                    <Option value="cards">Invitations and Cards</Option>
                    <Option value="catering">Food and Catering Services</Option>
                    <Option value="entertainment">
                        Music and Entertainment
                    </Option>
                    <Option value="car rental">Car Rental Services</Option>
                    <Option value="event planners">Event Planners</Option>
                </Select>
                <br />

                <Row type="flex" justify="center">
                    {this.state.services.map((serve, i) => (
                        <Col {...cardLayout} className="m-4" key={i}>
                            <Card
                                hoverable
                                style={{ width: 240 }}
                                cover={<img alt="example" src={photography} />}
                                key={i}
                                onClick={() => this.toggleDetail(serve)}
                            >
                                <Meta title={serve.service_name} />
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Row>
        );
        const serviceDetail = (
            <div>
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
                    <Col span={16} offset={2}>
                        <img
                            alt="example"
                            src={photography}
                            style={{ width: "100%" }}
                        />
                        <div className="text-to-left">
                            <span>
                                <h4>{this.state.show.service_name}</h4>
                            </span>
                            <br />
                            <ReactPlayer
                                url="https://www.youtube.com/watch?v=lqx5ocbekWA"
                                playing
                            />
                            <br />
                            <h6>Event Type: </h6> {this.state.show.event_type}
                            <h6>Category: </h6> {this.state.show.category}
                            <h6>Price: </h6> {this.state.show.price}
                            <h6>Description: </h6>
                            <p>{this.state.show.description}</p>
                        </div>

                        <br />
                    </Col>
                </Row>
                <Order />
            </div>
        );
        return (
            <div>
                <br />
                <br />
                <br />
                <br />
                {this.state.detail ? serviceDetail : serviceList}
            </div>
        );
    }
}

export default Category;
