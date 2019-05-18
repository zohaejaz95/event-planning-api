import React, { Component } from "react";
import photography from "../../images/photography.jpg";
import { Avatar, Row, Col } from "antd";

import ReactPlayer from "react-player";
class ServiceDetails extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const show = this.props.service;
        return (
            <div>
                <div className="text-to-left">
                    <span>
                        <h4>{show.service_name}</h4>
                    </span>
                    <br />
                    <Row>
                        <Col span={14}>
                            <img
                                alt="example"
                                src={photography}
                                style={{ width: "100%" }}
                            />
                        </Col>
                        <Col span={9} offset={1}>
                            <ReactPlayer
                                url="https://www.youtube.com/watch?v=IBpzMByqOx4"
                                playing
                            />
                        </Col>
                    </Row>
                    <br />
                    <br />
                    <br />
                    <h6>ID: </h6> {show.id}
                    <h6>Event Type: </h6> {show.event_type}
                    <h6>Category: </h6> {show.category}
                    <h6>Price: </h6> {show.price}
                    <h6>Description: </h6>
                    <p>{show.description}</p>
                </div>
            </div>
        );
    }
}

export default ServiceDetails;
