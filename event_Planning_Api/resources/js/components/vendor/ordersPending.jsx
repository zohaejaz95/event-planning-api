import React, { Component } from "react";
import {
    List,
    Avatar,
    Button,
    Icon,
    Collapse,
    Checkbox,
    message,
    Modal
} from "antd";
import avatar from "../../images/avatar.jpg";
import { getOrderApproved, updateOrderStatus } from "./vendorFunctions";
const confirm = Modal.confirm;
const Panel = Collapse.Panel;
const ButtonGroup = Button.Group;

const customPanelStyle = {
    background: "#f7f7f7",
    borderRadius: 4,
    marginBottom: 24,
    border: 0,
    overflow: "hidden"
};

class OrdersPending extends Component {
    constructor(props) {
        super(props);
        this.state = {
            details: false,
            orders: []
        };
        this.approvedOrders = this.approvedOrders.bind(this);
        this.showConfirm = this.showConfirm.bind(this);
    }
    approvedOrders() {
        getOrderApproved(this.props.order_type).then(response => {
            if (response) {
                this.setState({
                    orders: response.data
                });
            }
            console.log(response.data);
        });
    }
    componentWillMount() {
        this.approvedOrders();
        if (this.props.order_type == "services") {
            this.setState({
                details: true
            });
        }
    }
    showConfirm(item) {
        confirm({
            title: "Are you sure this order is completed?",
            content: "Order ID: " + item.o_id,
            okText: "Yes",
            okType: "danger",
            cancelText: "No",
            onOk() {
                console.log("OK");
                updateOrderStatus(item.o_id, "completed").then(res => {
                    if (res) {
                        this.setState({
                            orders: []
                        });
                        this.approvedOrders();
                        message.success("Marked as complete");
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
                                        <Checkbox
                                            onClick={() =>
                                                this.showConfirm(item)
                                            }
                                        >
                                            Mark as Complete
                                        </Checkbox>
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

export default OrdersPending;
