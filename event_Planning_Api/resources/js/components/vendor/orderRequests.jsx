import React, { Component } from "react";
import { List, Avatar, Button, Icon, Collapse, Modal, message } from "antd";
import avatar from "../../images/avatar.jpg";
import { getOrderPending, updateOrderStatus } from "./vendorFunctions";
const Panel = Collapse.Panel;
const ButtonGroup = Button.Group;
const confirm = Modal.confirm;
const customPanelStyle = {
    background: "#f7f7f7",
    borderRadius: 4,
    marginBottom: 24,
    border: 0,
    overflow: "hidden"
};

class OrderRequests extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orders: [],
            details: false
        };
        this.pendingOrders = this.pendingOrders.bind(this);
        this.showApproveConfirm = this.showApproveConfirm.bind(this);
        this.showRejectConfirm = this.showRejectConfirm.bind(this);
    }

    pendingOrders() {
        getOrderPending(this.props.order_type).then(response => {
            if (response) {
                this.setState({
                    orders: response.data
                });
                console.log(response.data);
            }
        });
    }
    showApproveConfirm(item) {
        confirm({
            title: "Are you sure you want to accept this order?",
            content: "Order ID: " + item.o_id,
            okText: "Yes",
            okType: "danger",
            cancelText: "No",
            onOk() {
                console.log("OK");
                updateOrderStatus(item.o_id, "approved").then(res => {
                    if (res) {
                        message.success("Marked as approved");
                    } else {
                        message.error("Something went wrong!");
                    }
                });
            },
            onCancel() {
                console.log("Cancel");
                message.error("Still Pending");
            }
        });
    }
    showRejectConfirm(item) {
        confirm({
            title: "Are you sure you want to reject this order?",
            content: "Order ID: " + item.o_id,
            okText: "Yes",
            okType: "danger",
            cancelText: "No",
            onOk() {
                console.log("OK");
                updateOrderStatus(item.o_id, "rejected").then(res => {
                    if (res) {
                        message.info("Order Request Rejected!");
                        this.setState({
                            orders: []
                        });
                        this.pendingOrders();
                    } else {
                        message.error("Something went wrong!");
                    }
                });
            },
            onCancel() {
                console.log("Cancel");
                message.error("Still Pending");
            }
        });
    }
    componentWillMount() {
        this.pendingOrders();
        if (this.props.order_type == "services") {
            this.setState({
                details: true
            });
        }
    }
    // componentWillUpdate() {
    //     this.setState({
    //         orders: []
    //     });
    //     this.pendingOrders();
    //     if (this.props.order_type == "services") {
    //         this.setState({
    //             details: true
    //         });
    //     }
    // }
    render() {
        return (
            <div>
                <div>
                    <List
                        itemLayout="horizontal"
                        dataSource={this.state.orders}
                        renderItem={item => (
                            <div>
                                <List.Item>
                                    <List.Item.Meta
                                        avatar={<Avatar src={avatar} />}
                                        title={
                                            <p>{"Order ID: " + item.o_id}</p>
                                        }
                                        description={
                                            "Customer Name: " + item.customer_id
                                        }
                                    />
                                </List.Item>
                                <Collapse
                                    bordered={false}
                                    defaultActiveKey={["1"]}
                                >
                                    <Panel
                                        header="Details"
                                        key={item}
                                        style={customPanelStyle}
                                    >
                                        {this.state.details ? (
                                            <p>
                                                {"Service Name: " +
                                                    item.service_id}
                                            </p>
                                        ) : (
                                            <p>
                                                {"Package Name: " +
                                                    item.package_id}
                                            </p>
                                        )}
                                        <p>
                                            Payment Method:{" "}
                                            {item.payment_method}
                                        </p>
                                        <p>Description:</p>
                                        <p>{item.description}</p>
                                        <Button
                                            type="primary"
                                            onClick={() =>
                                                this.showApproveConfirm(item)
                                            }
                                        >
                                            Accept
                                        </Button>
                                        <Button
                                            type="danger"
                                            onClick={() =>
                                                this.showRejectConfirm(item)
                                            }
                                        >
                                            Reject
                                        </Button>
                                    </Panel>
                                </Collapse>
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
            </div>
        );
    }
}

export default OrderRequests;
