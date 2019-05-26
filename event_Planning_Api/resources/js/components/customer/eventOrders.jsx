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
            id: "",
            p_services: [],
            p_packages: [],
            a_services: [],
            a_packages: []
        };
        this.approvedServices = this.approvedServices.bind(this);
        this.approvedPackages = this.approvedPackages.bind(this);
        this.pendingPackages = this.pendingPackages.bind(this);
        this.pendingServices = this.pendingServices.bind(this);
    }
    approvedServices() {
        getApprovedOrders(this.props.event_id, "services").then(response => {
            if (response) {
                this.setState({
                    a_services: response.data.data
                });
            }
            //console.log(response);
        });
    }
    approvedPackages() {
        getApprovedOrders(this.props.event_id, "packages").then(response => {
            if (response) {
                this.setState({
                    a_packages: response.data.data
                });
            }
            //console.log(response);
        });
    }
    pendingServices() {
        getPendingOrders(this.props.event_id, "services").then(response => {
            if (response) {
                this.setState({
                    p_services: response.data.data
                });
                //console.log(response.data.data);
            }
        });
    }
    pendingPackages() {
        getPendingOrders(this.props.event_id, "packages").then(response => {
            if (response) {
                this.setState({
                    p_packages: response.data.data
                });
            }

            //console.log(response);
        });
    }
    componentDidMount() {
        this.setState({
            id: this.props.event_id
        });
        console.log(this.props.event_id);
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
                        {this.state.a_services.map((serve, i) => (
                            <div key={i}>
                                <Link
                                    to={{
                                        pathname: "/services",
                                        search: "?id=" + serve.service_id,
                                        state: { service: serve }
                                    }}
                                >
                                    <Card hoverable bordered={true}>
                                        <p>{serve.description}</p>
                                    </Card>
                                </Link>
                                <br />
                            </div>
                        ))}
                    </Col>
                    <Col span={10} offset={1}>
                        <h5>Pending Orders</h5>
                        {this.state.p_services.map((serve, i) => (
                            <div key={i}>
                                <Link
                                    to={{
                                        pathname: "/services",
                                        search: "?id=" + serve.service_id,
                                        state: { service: serve }
                                    }}
                                >
                                    <Card hoverable bordered={true}>
                                        <p>{serve.description}</p>
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
                        {this.state.a_packages.map((serve, i) => (
                            <div key={i}>
                                <Link
                                    to={{
                                        pathname: "/services",
                                        search: "?id=" + serve.package_id,
                                        state: { service: serve }
                                    }}
                                >
                                    <Card hoverable bordered={true}>
                                        <p>{serve.description}</p>
                                    </Card>
                                </Link>
                                <br />
                            </div>
                        ))}
                    </Col>
                    <Col span={10} offset={1}>
                        <h5>Pending Orders</h5>
                        {this.state.p_packages.map((serve, i) => (
                            <div key={i}>
                                <Link
                                    to={{
                                        pathname: "/services",
                                        search: "?id=" + serve.service_id,
                                        state: { service: serve }
                                    }}
                                >
                                    <Card hoverable bordered={true}>
                                        <p>{serve.description}</p>
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
