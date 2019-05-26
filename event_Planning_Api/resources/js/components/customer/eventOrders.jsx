import React, { Component } from "react";
import { Card, Row, Col, message } from "antd";
import { Link } from "react-router-dom";
import {
    getApprovedOrders,
    getPendingOrders,
    getPackage,
    getService
} from "./customerFunction";
class EventOrders extends Component {
    constructor(props) {
        super(props);
        this.state = {
            services: [
                { id: 56, name: "Johar Shaadi Hall" },
                { id: 11, name: "Junoon Band" }
            ],
            id: "",
            pS: [],
            pP: [],
            aS: [],
            aP: [],
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
                var res = response.data.data;
                for (var i = 0; i < res.length; i++) {
                    var id = res[i];
                    console.log("service id: " + id.service_id);
                    getService(id.service_id).then(res => {
                        //console.log(id);
                        if (res) {
                            var val = res[0];
                            this.state.aS.push(val);
                            //console.log(res);
                        }
                    });
                }
            }
            console.log(this.state.aS);
            //console.log(response);
        });
    }
    approvedPackages() {
        getApprovedOrders(this.props.event_id, "packages").then(response => {
            if (response) {
                this.setState({
                    a_packages: response.data.data
                });
                //console.log(response.data.data);
                var res = response.data.data;
                for (var i = 0; i < res.length; i++) {
                    var id = res[i];
                    console.log("package id: " + id.package_id);
                    getPackage(id.package_id).then(res => {
                        //console.log(id);
                        if (res) {
                            var val = res[0];
                            this.state.aP.push(val);
                            //console.log(res);
                        }
                    });
                }
            }
            console.log(this.state.aP);
            //console.log(response);
        });
    }
    pendingServices() {
        getPendingOrders(this.props.event_id, "services").then(response => {
            if (response) {
                this.setState({
                    p_services: response.data.data
                });
                var res = response.data.data;
                for (var i = 0; i < res.length; i++) {
                    var id = res[i];
                    console.log("pService: " + id.service_id);
                    getService(id.service_id).then(res => {
                        //console.log(id);
                        if (res) {
                            var val = res[0];
                            this.state.pS.push(val);
                            //console.log(val.service_name);
                        }
                        //console.log(res);
                    });
                }
                console.log(this.state.pS);
            }
        });
    }
    pendingPackages() {
        getPendingOrders(this.props.event_id, "packages").then(response => {
            if (response) {
                this.setState({
                    p_packages: response.data.data
                });
                var res = response.data.data;
                for (var i = 0; i < res.length; i++) {
                    var id = res[i];
                    console.log("pPackage: " + id.package_id);
                    getPackage(id.package_id).then(res => {
                        //console.log(id);
                        if (res) {
                            var val = res[0];
                            this.state.pP.push(val);
                            //console.log(res);
                        }
                    });
                }
            }
            console.log(this.state.pP);
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
                        {this.state.aS.map((approve, i) => (
                            <div key={i}>
                                <Link
                                    to={{
                                        pathname: "/services",
                                        state: { service: approve }
                                    }}
                                >
                                    <Card hoverable bordered={true}>
                                        <p>{approve.service_name}</p>
                                    </Card>
                                </Link>
                                <br />
                            </div>
                        ))}
                    </Col>
                    <Col span={10} offset={1}>
                        <h5>Pending Orders</h5>
                        {this.state.pS.map((pend, j) => (
                            <div key={j}>
                                <Link
                                    to={{
                                        pathname: "/services",
                                        state: { service: pend }
                                    }}
                                >
                                    <Card hoverable bordered={true}>
                                        <p>{pend.service_name}</p>
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
                        {this.state.aP.map((serve, k) => (
                            <div key={k}>
                                <Link
                                    to={{
                                        pathname: "/services",
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
                        {this.state.pP.map((serve, l) => (
                            <div key={l}>
                                <Link
                                    to={{
                                        pathname: "/services",
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
