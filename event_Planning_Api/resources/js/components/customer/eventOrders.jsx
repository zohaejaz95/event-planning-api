import React, { Component } from "react";
import { Card, Row, Col, message, Select } from "antd";
import DisplayServices from "./displayServices";
import DisplayPackages from "./displayPackages";
//import { Link } from "react-router-dom";
import {
    getApprovedOrders,
    getPendingOrders,
    getPackage,
    getService
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
            p_services: [],
            p_packages: [],
            a_services: [],
            a_packages: []
        };
        this.approvedServices = this.approvedServices.bind(this);
        this.approvedPackages = this.approvedPackages.bind(this);
        this.pendingPackages = this.pendingPackages.bind(this);
        this.pendingServices = this.pendingServices.bind(this);
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
                    console.log("pS: " + id.service_id);
                    getService(id.service_id).then(res => {
                        //console.log(id);

                        if (res) {
                            var val = res[0];
                            //this.state.p_services[i] = val;
                            this.state.pS.push(val);
                            //this.state.p_services[i].push(val);
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
                ) : (
                    <div />
                )}
            </div>
        );
    }
}

export default EventOrders;
