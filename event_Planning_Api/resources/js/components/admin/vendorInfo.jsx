import React, { Component } from "react";
import { List, Avatar, Button, Icon, Progress, Tooltip, message } from "antd";
//import VendorDetail from "../admin/vendorDetail";
import avatar from "../../images/avatar.jpg";
import { getPendingVendors, updateVendorStatus } from "../userFunction";

const ButtonGroup = Button.Group;

class VendorInfo extends Component {
    constructor() {
        super();
        this.state = {
            detail: false,
            vendors: [],
            vendor_id: "",
            arr: {}
        };
        this.toggleDetail = this.toggleDetail.bind(this);
        this.toggleDetails = this.toggleDetails.bind(this);
        this.pendingVendors = this.pendingVendors.bind(this);
    }
    toggleDetail(item) {
        console.log(item);
        //console.log.(e.target.key);
        this.setState({
            detail: true,
            arr: item
        });
    }
    toggleDetails() {
        this.setState({
            detail: false
        });
    }
    pendingVendors() {
        getPendingVendors().then(res => {
            if (res) {
                //console.log(res.data);
                const lists = JSON.stringify(res.data);
                const list = JSON.parse(lists);
                this.setState({
                    vendors: list
                });
                //console.log(this.state.vendors);
                console.log(this.state.vendors.length);
            }
        });
    }
    componentDidMount() {
        this.pendingVendors();
    }

    accepted() {
        var v_id = this.state.arr.vendor_id;
        console.log(this.state.arr.vendor_id);
        updateVendorStatus("approved", v_id).then(res => {
            if (res) {
                this.setState({
                    vendors: []
                });
                this.pendingVendors();
                this.toggleDetails();
                message.success("Vendor Account Accepted");
                //this.props.history.push("/admin");
            } else {
                message.error("Something went wrong!!");
            }
        });
    }
    rejected() {
        var v_id = this.state.arr.vendor_id;
        console.log(this.state.arr.vendor_id);
        updateVendorStatus("rejected", v_id).then(res => {
            if (res) {
                this.setState({
                    vendors: []
                });
                this.pendingVendors();
                this.toggleDetails();
                message.success("Vendor Account Rejected");
                //this.props.history.push("/admin");
            } else {
                message.error("Something went wrong!!");
            }
        });
    }
    render() {
        const vendorList = (
            <div>
                <List
                    itemLayout="horizontal"
                    dataSource={this.state.vendors}
                    renderItem={item => (
                        <div>
                            <List.Item>
                                <List.Item.Meta
                                    avatar={<Avatar src={avatar} />}
                                    title={<p>{item.vendor_name}</p>}
                                    description={item.description}
                                />
                                <br />
                                <Button
                                    type="primary"
                                    onClick={() => this.toggleDetail(item)}
                                >
                                    View Details
                                </Button>
                            </List.Item>
                        </div>
                    )}
                />
                <br />
                <ButtonGroup>
                    <Button type="primary">
                        <Icon type="left" />
                        Previous
                    </Button>
                    <Button type="primary">
                        Next
                        <Icon type="right" />
                    </Button>
                </ButtonGroup>
            </div>
        );
        const vendorDetail = (
            <div>
                <Button type="primary" onClick={this.toggleDetails.bind(this)}>
                    Back
                    <Icon type="left-circle" />
                </Button>
                <br />
                <br />

                <table className="table table-striped table-hover">
                    <thead>
                        <tr>
                            <td>
                                <Avatar size={64} icon="user" />
                            </td>
                            <td>
                                <h4>{this.state.arr.vendor_name}</h4>
                            </td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th>Email</th>
                            <td>
                                <a href={"mailto:" + this.state.arr.email}>
                                    {this.state.arr.email}
                                </a>
                            </td>
                        </tr>
                        <tr>
                            <th>Website</th>
                            <td>
                                <a href={this.state.arr.website}>
                                    {this.state.arr.website}
                                </a>
                            </td>
                        </tr>
                        <tr>
                            <th>Contact</th>
                            <td>
                                <a href="tel:#">{this.state.arr.contact}</a>
                            </td>
                        </tr>
                        <tr>
                            <th>Description</th>
                            <td>{this.state.arr.description}</td>
                        </tr>
                    </tbody>
                </table>

                <br />
                <Button type="primary" onClick={this.accepted.bind(this)}>
                    Accept
                </Button>
                <Button type="danger" onClick={this.rejected.bind(this)}>
                    Reject
                </Button>
            </div>
        );
        return (
            <div>
                {/* <div>
                    <Tooltip placement="top" title="Total Vendors">
                        <Progress type="circle" percent={30} width={80} />
                    </Tooltip>
                    <span />
                    <Tooltip placement="top" title="Pending Accounts ">
                        <Progress
                            type="circle"
                            percent={70}
                            width={80}
                            status="exception"
                            className="m-4 "
                        />
                    </Tooltip>

                    <span />
                    <Tooltip placement="top" title="Approved">
                        <Progress type="circle" percent={100} width={80} />
                    </Tooltip>
                </div> */}
                <br />

                {this.state.detail ? vendorDetail : vendorList}
            </div>
        );
    }
}

export default VendorInfo;
