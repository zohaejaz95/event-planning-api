import React, { Component } from "react";
//import { Server } from "http";
import { updatePaymentStatus } from "./customerFunction";

import { List, Button } from "antd";
class DisplayPackages extends Component {
    constructor(props) {
        super(props);
        this.state = {
            approve: [],
            pend: [],
            status: ""
        };
        this.onPayment = this.onPayment.bind(this);
    }
    componentDidMount() {
        var data = this.props;
        console.log(this.props.approved);
        this.setState({
            approve: data.approved,
            pend: data.pending,
            status: data.status
        });
    }
    onPayment(val) {
        updatePaymentStatus(val, "complete").then(res => {
            if (res) {
                console.log(res);
                message.success("Marked as paid!!");
                notification["info"]({
                    message: "Vendor Side Confirmation",
                    description:
                        "This will only be viewed as paid when approved by the vendors.",
                    onClick: () => {
                        console.log("Notification Clicked!");
                    }
                });
            } else {
                message.error("Unable to mark as paid!");
            }
        });
    }
    render() {
        return (
            <div>
                <br />
                <h5>Approved Orders</h5>
                <List
                    itemLayout="horizontal"
                    dataSource={this.state.approve}
                    renderItem={item => (
                        <List.Item>
                            <List.Item.Meta
                                title={
                                    <a href="/services" service={item}>
                                        {item.name}
                                    </a>
                                }
                                description={item.description}
                            />
                            {this.state.status ? (
                                <Button
                                    type="primary"
                                    onClick={() => this.onPayment(item.p_id)}
                                >
                                    Paid
                                </Button>
                            ) : (
                                <div />
                            )}
                        </List.Item>
                    )}
                />

                <h5>Pending Orders</h5>
                <List
                    itemLayout="horizontal"
                    dataSource={this.state.pend}
                    renderItem={item => (
                        <List.Item>
                            <List.Item.Meta
                                title={<a href="/">{item.name}</a>}
                                description={item.description}
                            />
                        </List.Item>
                    )}
                />
            </div>
        );
    }
}

export default DisplayPackages;
