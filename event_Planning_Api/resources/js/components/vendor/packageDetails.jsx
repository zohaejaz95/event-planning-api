import React, { Component } from "react";
import photography from "../../images/photography.jpg";
import { Row, Col } from "antd";
import ReactPlayer from "react-player";

class ServiceDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            services: []
        };
    }
    componentDidMount() {}
    render() {
        const show = this.props.package;

        return (
            <div>
                <div className="text-to-left">
                    <span>
                        <h4>{show.name}</h4>
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
                                url="https://www.youtube.com/watch?v=NiN_3FrVCPU"
                                playing
                            />
                        </Col>
                    </Row>
                    <br />
                    <br />
                    <br />
                    <h6>ID: </h6> {show.p_id}
                    <h6>Availability: </h6> {show.expiration_date}
                    <h6>Description: </h6>
                    <p>{show.description}</p>
                    <br />
                </div>
            </div>
        );
    }
}

export default ServiceDetails;
