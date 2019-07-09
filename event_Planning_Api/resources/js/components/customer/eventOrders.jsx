import React, { Component } from "react";
import { Card, Row, Col, message, Select } from "antd";
import { Link } from "react-router-dom";
import DisplayServices from "./displayServices";
import DisplayPackages from "./displayPackages";
//import { Link } from "react-router-dom";
import {
    getApprovedOrders,
    getPendingOrders,
    getPackage,
    getService,
    getCompleteOrders
} from "./customerFunction";
const { Option, OptGroup } = Select;
class EventOrders extends Component {
    constructor(props) {
        super(props);
        this.state = {
            uServices: false,
            uPackages: false,
            pServices: false,
            pPackages: false,
            id: "",
            pS: [],
            pP: [],
            aS: [],
            aP: [],
            cS: [],
            cP: [],
            p_services: [],
            p_packages: [],
            a_services: [],
            a_packages: [],
            c_services: [],
            c_packages: [],
            noth: []
        };
        this.approvedServices = this.approvedServices.bind(this);
        this.approvedPackages = this.approvedPackages.bind(this);
        this.pendingPackages = this.pendingPackages.bind(this);
        this.pendingServices = this.pendingServices.bind(this);
        this.completePackages = this.completePackages.bind(this);
        this.completeServices = this.completeServices.bind(this);

        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(value) {
        if (value == "unpaidServices") {
            this.setState({
                uServices: true,
                uPackages: false,
                pServices: false,
                pPackages: false
            });
        } else if (value == "unpaidPackages") {
            this.setState({
                uPackages: true,
                uServices: false,
                pServices: false,
                pPackages: false
            });
        } else if (value == "paidServices") {
            this.setState({
                pServices: true,
                uServices: false,
                uPackages: false,
                pPackages: false
            });
        } else if (value == "paidPackages") {
            this.setState({
                pPackages: true,
                uServices: false,
                uPackages: false,
                pServices: false
            });
        } else {
            this.setState({
                pPackages: false,
                uServices: false,
                uPackages: false,
                pServices: false
            });
        }
        console.log(`selected ${value}`);
    }
    approvedServices() {
        getApprovedOrders(this.props.event_id, "services").then(response => {
            if (response) {
                this.setState({
                    a_services: response.data.data
                });
                console.log("fdvsetjq");
                console.log(response);
                var res = response.data.data;
                for (var i = 0; i < res.length; i++) {
                    var id = res[i];

                    console.log("service id: " + id.service_id);
                    getService(id.service_id).then(res => {
                        //console.log(id);
                        if (res) {
                            var val = res[0];
                            val["o_id"] = id.o_id;
                            this.state.aS.push(val);
                            //console.log("Here look!!!");
                            //console.log(val);
                        }
                    });
                }
            }
            //console.log(this.state.aS);
            //console.log(response);
        });
    }
    approvedPackages() {
        getApprovedOrders(this.props.event_id, "packages").then(response => {
            if (response) {
                this.setState({
                    a_packages: response.data.data
                });
                console.log("fdvfbgfr");
                console.log(response);
                var res = response.data.data;
                for (var i = 0; i < res.length; i++) {
                    var id = res[i];
                    console.log("package id: " + id.package_id);
                    getPackage(id.package_id).then(res => {
                        //console.log(id);
                        if (res) {
                            var val = res[0];
                            val["o_id"] = id.o_id;
                            this.state.aP.push(val);

                            //console.log(val);
                        }
                    });
                }
            }
            //console.log(this.state.aP);
            //console.log(response);
        });
    }
    pendingServices() {
        getPendingOrders(this.props.event_id, "services").then(response => {
            if (response) {
                this.setState({
                    p_services: response.data.data
                });
                console.log("dffdv");
                var res = response.data.data;
                for (var i = 0; i < res.length; i++) {
                    var id = res[i];
                    console.log("pS: " + id.service_id);
                    getService(id.service_id).then(res => {
                        //console.log(id);

                        if (res) {
                            var val = res[0];
                            val["o_id"] = id.o_id;
                            //this.state.p_services[i] = val;
                            this.state.pS.push(val);
                            //this.state.p_services[i].push(val);
                            //console.log(val.service_name);
                        }
                        //console.log(res);
                    });
                }

                //console.log(this.state.pS);
            }
        });
    }
    pendingPackages() {
        getPendingOrders(this.props.event_id, "packages").then(response => {
            if (response) {
                this.setState({
                    p_packages: response.data.data
                });
                console.log("fdv");
                console.log(response);
                var res = response.data.data;
                for (var i = 0; i < res.length; i++) {
                    var id = res[i];
                    console.log("pPackage: " + id.package_id);
                    getPackage(id.package_id).then(res => {
                        //console.log(id);
                        if (res) {
                            var val = res[0];
                            val["o_id"] = id.o_id;
                            this.state.pP.push(val);
                            //console.log(res);
                        }
                    });
                }
            }
            //console.log(this.state.pP);
            //console.log(response);
        });
    }

    completeServices() {
        console.log(this.props.event_id);
        getCompleteOrders(this.props.event_id, "services").then(response => {
            if (response) {
                this.setState({
                    c_services: response.data.data
                });
                console.log(response);
                var res = response.data.data;
                for (var i = 0; i < res.length; i++) {
                    var id = res[i];
                    console.log("service id: " + id.service_id);
                    getService(id.service_id).then(res => {
                        console.log(res);
                        if (res) {
                            var val = res[0];
                            val["o_id"] = id.o_id;
                            this.state.cS.push(val);
                            console.log(res);
                        }
                    });
                }
            }
            //console.log(this.state.cS);
            //console.log(response);
        });
    }

    completePackages() {
        getCompleteOrders(this.props.event_id, "packages").then(response => {
            if (response) {
                this.setState({
                    c_packages: response.data.data
                });
                console.log(response);
                var res = response.data.data;
                for (var i = 0; i < res.length; i++) {
                    var id = res[i];
                    console.log("pPackage: " + id.package_id);
                    getPackage(id.package_id).then(res => {
                        //console.log(id);
                        if (res) {
                            var val = res[0];
                            val["o_id"] = id.o_id;
                            this.state.cP.push(val);

                            console.log(res);
                        }
                    });
                }
            }
            console.log(this.state.cP);
            //console.log(response);
        });
    }

    completeServices() {
        getCompleteOrders(this.props.event_id, "services").then(response => {
            if (response) {
                this.setState({
                    c_services: response.data.data
                });
                var res = response.data.data;
                for (var i = 0; i < res.length; i++) {
                    var id = res[i];
                    console.log("service id: " + id.service_id);
                    getService(id.service_id).then(res => {
                        //console.log(id);
                        if (res) {
                            var val = res[0];
                            this.state.cS.push(val);
                            //console.log(res);
                        }
                    });
                }
            }
            console.log(this.state.cS);
            //console.log(response);
        });
    }

    completePackages() {
        getCompleteOrders(this.props.event_id, "packages").then(response => {
            if (response) {
                this.setState({
                    c_packages: response.data.data
                });
                var res = response.data.data;
                for (var i = 0; i < res.length; i++) {
                    var id = res[i];
                    console.log("pPackage: " + id.package_id);
                    getPackage(id.package_id).then(res => {
                        //console.log(id);
                        if (res) {
                            var val = res[0];
                            this.state.cP.push(val);
                            //console.log(res);
                        }
                    });
                }
            }
            console.log(this.state.cP);
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
        this.completeServices();
        this.completePackages();
    }
    render() {
        return (
            <div>
                <Select
                    placeholder="Select a category"
                    style={{ width: 200 }}
                    onChange={this.handleChange}
                >
                    <OptGroup label="Paid">
                        <Option value="paidServices">Paid Services</Option>
                        <Option value="paidPackages">Paid Packages</Option>
                    </OptGroup>
                    <OptGroup label="Unpaid">
                        <Option value="unpaidServices">Unpaid Services</Option>
                        <Option value="unpaidPackages">Unpaid Packages</Option>
                    </OptGroup>
                </Select>
                {this.state.uServices ? (
                    <DisplayServices
                        pending={this.state.pS}
                        approved={this.state.aS}
                        status={true}
                    />
                ) : this.state.uPackages ? (
                    <DisplayPackages
                        pending={this.state.pP}
                        approved={this.state.aP}
                        status={true}
                    />
                ) : this.state.pServices ? (
                    <DisplayServices
                        pending={this.state.noth}
                        approved={this.state.cS}
                        status={false}
                    />
                ) : this.state.pPackages ? (
                    <DisplayPackages
                        pending={this.state.noth}
                        approved={this.state.cP}
                        status={false}
                    />
                ) : (
                    <div>
                        <br />
                        <h3>
                            <Link
                                to={{
                                    pathname: "/services",
                                    state: { service: false }
                                }}
                            >
                                Order now!
                            </Link>
                        </h3>
                    </div>
                )}
            </div>
        );
    }
}

export default EventOrders;
