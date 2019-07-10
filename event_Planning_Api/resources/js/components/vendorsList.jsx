import React, { Component } from "react";
import { Card, Col, Row, Select, Carousel } from "antd";
import { getApprovedVendors, getAllApprovedVendors } from "./userFunction";
import Footer from "./footer";
import AltImg from "../images/event-planning.jpg";
import { Link } from "react-router-dom";

var pict = [];
class VendorsList extends Component {
    constructor() {
        super();
        this.state = {
            vendors: [],
            category: "",
            message: "",
            slides: []
        };
        this.handleChange = this.handleChange.bind(this);
    }
    componentWillMount() {
        getApprovedVendors("photographs").then(res => {
            if (res) {
                console.log(res);
                this.setState({
                    vendors: res,
                    message: ""
                });
            } else {
                this.setState({
                    message: "No vendor found in this category!"
                });
            }
        });
        getAllApprovedVendors().then(res => {
            if (res) {
                console.log(res);
                this.setState({
                    slides: res.data
                });
                var arr = res.data[0];
                pict.push(
                    require(`../../../storage/app/public/vendor/logos/` +
                        arr.logo)
                );
            }
        });
    }

    handleChange(value) {
        console.log(`selected ${value}`);
        this.setState({
            category: value
        });

        getApprovedVendors(value).then(res => {
            if (res) {
                console.log(res);
                this.setState({
                    vendors: res,
                    message: ""
                });
            } else {
                this.setState({
                    message: "No vendor found in this category!"
                });
            }
        });
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

        return (
            <div>
                <Carousel autoplay>
                    {pict.map((slid, i) => (
                        <div key={i}>
                            <img
                                src={slid}
                                alt={AltImg}
                                className="img-fluid myImage"
                            />
                        </div>
                    ))}
                </Carousel>
                <div style={{ minHeight: 400 }}>
                    <br />
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
                                <Option value="cards">
                                    Invitations and Cards
                                </Option>
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
                    <div>
                        <h6 style={{ color: "#9F6000" }}>
                            {this.state.message}
                        </h6>
                    </div>
                    <Row type="flex" justify="center">
                        {this.state.vendors.map((vend, i) => (
                            <Link
                                key={i}
                                to={{
                                    pathname: "/services/category",
                                    state: {
                                        service: false
                                    }
                                }}
                            >
                                <Col {...cardLayout} className="m-4">
                                    <Card
                                        hoverable
                                        style={{ width: 240 }}
                                        cover={
                                            <img
                                                alt="example"
                                                src={vend.logo}
                                            />
                                        }
                                        key={i}
                                        onClick={() => this.toggleDetail(serve)}
                                    >
                                        <Meta title={vend.vendor_name} />
                                    </Card>
                                </Col>
                            </Link>
                        ))}
                    </Row>
                </div>

                <br />
                <Footer />
            </div>
        );
    }
}

export default VendorsList;
