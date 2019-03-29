import React, { Component } from "react";
import { List, Avatar, Button, Icon, Progress } from "antd";
//import VendorDetail from "../admin/vendorDetail";
import avatar from "../../images/avatar.jpg";

const ButtonGroup = Button.Group;
const data = [
    {
        title: "Vendor 1"
    },
    {
        title: "Vendor 2"
    },
    {
        title: "Vendor 3"
    },
    {
        title: "Vendor 4"
    },
    {
        title: "Vendor 5"
    }
];

class VendorInfo extends Component {
    constructor() {
        super();
        this.state = {
            detail: false
        };
        this.toggleDetail = this.toggleDetail.bind(this);
    }
    toggleDetail() {
        this.setState({
            detail: !this.state.detail
        });
    }
    render() {
        const vendorList = (
            <div>
                <List
                    itemLayout="horizontal"
                    dataSource={data}
                    renderItem={item => (
                        <div>
                            <List.Item>
                                <List.Item.Meta
                                    avatar={<Avatar src={avatar} />}
                                    title={<p>{item.title}</p>}
                                    description="Category and Events"
                                />
                                <Button
                                    type="primary"
                                    onClick={this.toggleDetail.bind(this)}
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
                <Button type="primary" onClick={this.toggleDetail.bind(this)}>
                    Back
                    <Icon type="left-circle" />
                </Button>
                <br />
                <br />
                <Avatar size={64} icon="user" />
                <span>
                    <h4>Vendor Name</h4>
                </span>
                <br />
                <p>Email: </p>
                <p>Website: </p>
                <p>Contact:</p>
                <p>City/ies: </p>
                <p>Events: </p>
                <p>Payment Methods:</p>
                <p>Description: </p>
                <br />
                <Button type="primary">Accept</Button>
                <Button type="danger">Reject</Button>
            </div>
        );
        return (
            <div>
                <div>
                    <Progress type="circle" percent={30} width={80} />
                    <span />
                    <Progress
                        type="circle"
                        percent={70}
                        width={80}
                        status="exception"
                        className="m-4 "
                    />
                    <span />
                    <Progress type="circle" percent={100} width={80} />
                </div>
                <br />

                {this.state.detail ? vendorDetail : vendorList}
            </div>
        );
    }
}

export default VendorInfo;
