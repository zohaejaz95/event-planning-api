import React, { Component } from "react";
//import { Link } from "react-router-dom";
import { Card, Col, Row } from "antd";

//service images
import makeup from "../images/makeup.jpg";
import designer from "../images/suit-and-tie.jpg";
import photography from "../images/photography.jpg";
import venues from "../images/venues.jpg";

class Services extends Component {
    constructor() {
        super();
        this.state = {
            service: [
                {
                    name: "Photography",
                    image: photography
                },
                {
                    name: "Makeup Artist",
                    image: makeup
                },
                {
                    name: "Designers",
                    image: designer
                },
                {
                    name: "Venues",
                    image: venues
                },
                {
                    name: "Videography",
                    image: photography
                },
                {
                    name: "Decorators",
                    image: makeup
                },
                {
                    name: "Invitations and Cards",
                    image: designer
                },
                {
                    name: "Food and Catering",
                    image: venues
                },
                {
                    name: "Music and Entertainment",
                    image: makeup
                },
                {
                    name: "Car Rentals",
                    image: designer
                },
                {
                    name: "Event Planners",
                    image: venues
                }
            ]
        };
    }
    viewService() {
        this.props.history.push("/services/photography");
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
        return (
            <div>
                <br />
                <br />
                <br />
                <br />
                <h4>Services</h4>

                <Row type="flex" justify="center">
                    {this.state.service.map((serve, i) => (
                        <Col {...cardLayout} className="m-4" key={i}>
                            <Card
                                hoverable
                                style={{ width: 240 }}
                                cover={<img alt="example" src={serve.image} />}
                                key={i}
                                onClick={this.viewService.bind(this)}
                            >
                                <Meta title={serve.name} />
                            </Card>
                        </Col>
                    ))}
                </Row>
            </div>
        );
    }
}

export default Services;
