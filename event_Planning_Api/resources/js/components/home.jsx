import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Card, Row, Col, Input } from "antd";
//main images
import main from "../images/event-planning.jpg";
import alter from "../images/chopping.jpg";
//event type images
import wedding from "../images/gift-and-roses.jpg";
import corporate from "../images/urban-street.jpg";
import bday from "../images/purple-balloons.jpg";
import personal from "../images/gift-bag-wrap.jpg";
//services images
import makeup from "../images/makeup.jpg";
import designer from "../images/suit-and-tie.jpg";
import photography from "../images/photography.jpg";
import venues from "../images/venues.jpg";

const Search = Input.Search;
const { Meta } = Card;
//import Cards from "./cards";
class Home extends Component {
    constructor() {
        super();
        this.state = {
            events: [
                {
                    name: "Wedding",
                    image: wedding
                },
                {
                    name: "Corporate",
                    image: corporate
                },
                {
                    name: "Birthday",
                    image: bday
                },
                {
                    name: "Personal",
                    image: personal
                }
            ],
            services: [
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
                }
            ]
            //event: ["Wedding", "Corporate", "Birthdays", "Personal"],
            //images: [{ wedding }, { corporate }, { bday }, { personal }]
        };
    }

    render() {
        //const { event, images } = this.state;
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
            <div className="contents">
                <Search
                    className="fixed-search"
                    placeholder="search any vendor"
                    onSearch={value => console.log(value)}
                    style={{ width: 200 }}
                />

                <img src={main} alt={alter} className="img-fluid myImage" />

                <br />
                <br />
                <br />
                <h3>Events</h3>
                <Row type="flex" justify="center">
                    {this.state.events.map((event, i) => (
                        <Col {...cardLayout} className="m-4" key={i}>
                            <Card
                                hoverable
                                style={{ width: 240 }}
                                cover={<img alt="example" src={event.image} />}
                                key={i}
                            >
                                <Meta title={event.name} />
                            </Card>
                        </Col>
                    ))}
                </Row>
                <br />
                <h3>Popular Services</h3>
                <Row type="flex" justify="center">
                    {this.state.services.map((serve, i) => (
                        <Col {...cardLayout} className="m-4" key={i}>
                            <Card
                                hoverable
                                style={{ width: 240 }}
                                cover={<img alt="example" src={serve.image} />}
                                key={i}
                            >
                                <Meta title={serve.name} />
                            </Card>
                        </Col>
                    ))}
                </Row>
                <div className="text-to-right" style={{ paddingRight: "10%" }}>
                    <Link to="/services">View more</Link>
                </div>

                <br />
                <br />
            </div>
        );
    }
}

export default Home;
/*
<Carousel autoplay>
          <div>
            <img src={main} alt={alter} className="img-fluid" />
          </div>
          <div>
            <img src={alter} alt={main} className="img-fluid" />
          </div>
        </Carousel>
        */
