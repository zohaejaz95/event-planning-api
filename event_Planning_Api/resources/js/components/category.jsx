import React, { Component } from "react";
//import { Link } from "react-router-dom";
import { Card, Col, Row, Menu, Icon, Switch } from "antd";

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
    constructor() {
        super();
        this.state = {
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
            ]
        };
    }
    viewService() {
        this.props.history.push("/services/photography/vendor-name");
    }
    render() {
        const { Meta } = Card;
        const { SubMenu } = Menu;
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
        return (
            <div>
                <br />
                <br />
                <br />
                <Row>
                    <Col {...cardLayout}>
                        <Menu
                            defaultSelectedKeys={["1"]}
                            mode="horizontal"
                            theme="light"
                        >
                            <Menu.Item key="1">Photography</Menu.Item>
                            <Menu.Item key="2">Videography</Menu.Item>
                            <Menu.Item key="3">Makeup Artist</Menu.Item>
                            <Menu.Item key="4">Decorators</Menu.Item>
                            <Menu.Item key="5">Designers</Menu.Item>
                            <Menu.Item key="6">Venues</Menu.Item>
                            <Menu.Item key="7">Invitations and Cards</Menu.Item>
                            <Menu.Item key="8">Food and Catering</Menu.Item>
                            <Menu.Item key="9">
                                Music and Entertainment
                            </Menu.Item>
                            <Menu.Item key="10">Car Rental Services</Menu.Item>
                            <Menu.Item key="11">Event Planners</Menu.Item>
                        </Menu>
                    </Col>
                    <h4>Photography</h4>
                    <Row type="flex" justify="center">
                        {this.state.service.map((serve, i) => (
                            <Col {...cardLayout} className="m-4" key={i}>
                                <Card
                                    hoverable
                                    style={{ width: 240 }}
                                    cover={
                                        <img alt="example" src={serve.image} />
                                    }
                                    key={i}
                                    onClick={this.viewService.bind(this)}
                                >
                                    <Meta title={serve.name} />
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Row>
            </div>
        );
    }
}

export default Category;
