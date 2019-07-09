import React, { Component } from "react";
//import { Server } from "http";
import { updatePaymentStatus } from "./customerFunction";
import { List, Button, message, notification } from "antd";
class DisplayServices extends Component {
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
        updatePaymentStatus(val, "completed").then(res => {
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
    // componentWillUnmount() {
    //     this.setState({
    //         status: "",
    //         approve: [],
    //         pend: []
    //     });
    // }
    // shouldComponentUpdate(){

    // }
    render() {
        return (
            <div>
                <br />
                {this.state.status ? (
                    <h5>Approved Orders</h5>
                ) : (
                    <h5>Complete Orders</h5>
                )}
                <List
                    itemLayout="horizontal"
                    dataSource={this.state.approve}
                    renderItem={item => (
                        <List.Item>
                            <List.Item.Meta
                                title={<a href="/">{item.service_name}</a>}
                                description={item.description}
                            />
                            {this.state.status ? (
                                <Button
                                    type="primary"
                                    onClick={() => this.onPayment(item.o_id)}
                                >
                                    Paid
                                </Button>
                            ) : (
                                <div />
                            )}
                        </List.Item>
                    )}
                />

                {this.state.status ? (
                    <div>
                        <h5>Pending Orders</h5>
                        <List
                            itemLayout="horizontal"
                            dataSource={this.state.pend}
                            renderItem={item => (
                                <List.Item>
                                    <List.Item.Meta
                                        title={
                                            <a href="/">{item.service_name}</a>
                                        }
                                        description={item.description}
                                    />
                                </List.Item>
                            )}
                        />
                    </div>
                ) : (
                    <div />
                )}
                <div style={{ height: 100 }} />
            </div>
        );
    }
}

export default DisplayServices;
