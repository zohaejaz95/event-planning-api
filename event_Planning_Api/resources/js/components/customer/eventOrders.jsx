import React, { Component } from "react";
import { Card, Row, Col, message } from "antd";
import { Link } from "react-router-dom";
import { getApprovedOrders, getPendingOrders } from "./customerFunction";
class EventOrders extends Component {
    constructor(props) {
        super(props);
        this.state = {
            services: [
                { id: 56, name: "Johar Shaadi Hall" },
                { id: 11, name: "Junoon Band" }
            ],
            id: ""
        };
        this.approvedServices = this.approvedServices.bind(this);
        this.approvedPackages = this.approvedPackages.bind(this);
        this.pendingPackages = this.pendingPackages.bind(this);
        this.pendingServices = this.pendingServices.bind(this);
    }
    approvedServices() {
        getApprovedOrders(this.props.event_id, "services").then(response => {
            console.log(response);
        });
    }
    approvedPackages() {
        getApprovedOrders(this.props.event_id, "packages").then(response => {
            console.log(response);
        });
    }
    pendingServices() {
        getPendingOrders(this.props.event_id, "services").then(response => {
            if (response) {
                console.log(response);
            }
        });
    }
    pendingPackages() {
        getPendingOrders(this.props.event_id, "packages").then(response => {
            console.log(response);
        });
    }
    componentDidMount() {
        this.setState({
            id: this.props.event_id
        });
        this.approvedPackages();
        this.approvedServices();
        this.pendingPackages();
        this.pendingServices();
    }
    render() {
        return (
            <div>
                <h4>Orders: Services</h4>
                <Row>
                    <Col span={10} offset={1}>
                        <h5>Approved Orders</h5>
                        {this.state.services.map((serve, i) => (
                            <div key={i}>
                                <Link
                                    to={{
                                        pathname: "/services",
                                        search: "?id=" + serve.id,
                                        state: { service: serve }
                                    }}
                                >
                                    <Card hoverable bordered={true}>
                                        <p>{serve.name}</p>
                                    </Card>
                                </Link>
                                <br />
                            </div>
                        ))}
                    </Col>
                    <Col span={10} offset={1}>
                        <h5>Pending Orders</h5>
                        {this.state.services.map((serve, i) => (
                            <div key={i}>
                                <Link
                                    to={{
                                        pathname: "/services",
                                        search: "?id=" + serve.id,
                                        state: { service: serve }
                                    }}
                                >
                                    <Card hoverable bordered={true}>
                                        <p>{serve.name}</p>
                                    </Card>
                                </Link>
                                <br />
                            </div>
                        ))}
                    </Col>
                </Row>
                <br />
                <h4>Orders: Packages</h4>
                <Row>
                    <Col span={10} offset={1}>
                        <h5>Approved Orders</h5>
                        {this.state.services.map((serve, i) => (
                            <div key={i}>
                                <Link
                                    to={{
                                        pathname: "/services",
                                        search: "?id=" + serve.id,
                                        state: { service: serve }
                                    }}
                                >
                                    <Card hoverable bordered={true}>
                                        <p>{serve.name}</p>
                                    </Card>
                                </Link>
                                <br />
                            </div>
                        ))}
                    </Col>
                    <Col span={10} offset={1}>
                        <h5>Pending Orders</h5>
                        {this.state.services.map((serve, i) => (
                            <div key={i}>
                                <Link
                                    to={{
                                        pathname: "/services",
                                        search: "?id=" + serve.id,
                                        state: { service: serve }
                                    }}
                                >
                                    <Card hoverable bordered={true}>
                                        <p>{serve.name}</p>
                                    </Card>
                                </Link>
                                <br />
                            </div>
                        ))}
                    </Col>
                </Row>
            </div>
        );
    }
}

export default EventOrders;
