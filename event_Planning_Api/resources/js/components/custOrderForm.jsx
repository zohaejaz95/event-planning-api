import React, { Component } from "react";
import {
    Form,
    Input,
    Button,
    message,
    Modal,
    Select,
    notification
} from "antd";
import { getEvents, newOrder, createConvo } from "./customer/customerFunction";
import { getPayment } from "./vendor/vendorFunctions";
//import loginImage from "../../images/Pakistani-Wedding.png";
const Option = Select.Option;
class CustOrderForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: true,
            events: [],
            payment: []
        };
        this.showModal = this.showModal.bind(this);
        this.handleOk = this.handleOk.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    showModal() {
        this.setState({
            visible: true
        });
    }

    handleOk(e) {
        console.log(e);
        this.setState({
            visible: false
        });
    }

    handleCancel(e) {
        console.log(e);
        this.setState({
            visible: false
        });
    }
    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                var type = this.props.order.type;
                values["order_type"] = type;
                if (type == "service") {
                    values["service_id"] = this.props.order.id;
                } else {
                    values["package_id"] = this.props.order.id;
                }
                console.log("Received values of form: ", values);
                newOrder(values).then(res => {
                    if (res) {
                        message.success("Order has been placed!");
                        console.log(this.state.events);
                        console.log(this.props.details);
                        var c_id = this.state.events[0];
                        createConvo(
                            c_id.customer_id,
                            this.props.details.vendor_id
                        ).then(res => {
                            if (res) {
                                notification["info"]({
                                    message: "Chat Now",
                                    description:
                                        "Now you can chat with the customer. Open messages now!"
                                });
                                this.setState({
                                    visible: false
                                });
                            }
                        });
                    } else {
                        message.error("Unable to place order!");
                    }
                });
            } else {
                message.error("Order could not be placed!");
            }
        });
    }
    componentDidMount() {
        getEvents("active").then(res => {
            if (res) {
                console.log(res.data);
                const lists = JSON.stringify(res.data);
                const elist = JSON.parse(lists);
                this.setState({
                    events: elist
                });
            }
        });

        getPayment(this.props.details.vendor_id).then(res => {
            if (res) {
                this.setState({
                    payment: res
                });
                console.log(res);
            }
        });
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const { TextArea } = Input;

        const order_id = this.props.order.id;
        return (
            <div className="contents">
                <Modal
                    title={"Order: " + order_id}
                    style={{ top: "8%", width: "1em" }}
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={[
                        <Button
                            className="m-2"
                            type="danger"
                            key="back"
                            onClick={this.handleCancel}
                        >
                            Cancel
                        </Button>
                    ]}
                >
                    <Form onSubmit={this.handleSubmit} className="login-form ">
                        <Form.Item>
                            {getFieldDecorator("payment_method", {
                                rules: [
                                    {
                                        required: true,
                                        message:
                                            "Please enter your Payment Method!"
                                    }
                                ]
                            })(
                                <Select
                                    showSearch
                                    style={{ width: "100%" }}
                                    placeholder="Select Payment Method"
                                    optionFilterProp="children"
                                    filterOption={(input, option) =>
                                        option.props.children
                                            .toLowerCase()
                                            .indexOf(input.toLowerCase()) >= 0
                                    }
                                >
                                    {this.state.payment.map((pay, i) => (
                                        <Option value={pay.method} key={i}>
                                            {pay.method}
                                        </Option>
                                    ))}
                                </Select>
                            )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator("event_id", {
                                rules: [
                                    {
                                        required: true,
                                        message: "Please select your event!"
                                    }
                                ]
                            })(
                                <Select
                                    showSearch
                                    style={{ width: "100%" }}
                                    placeholder="Select an event"
                                    optionFilterProp="children"
                                    filterOption={(input, option) =>
                                        option.props.children
                                            .toLowerCase()
                                            .indexOf(input.toLowerCase()) >= 0
                                    }
                                >
                                    {this.state.events.map((events, i) => (
                                        <Option value={events.event_id} key={i}>
                                            {events.event_name}
                                        </Option>
                                    ))}
                                </Select>
                            )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator("description", {
                                rules: [
                                    {
                                        required: true,
                                        message: "Please enter description"
                                    }
                                ]
                            })(
                                <TextArea
                                    rows={4}
                                    placeholder="Enter Description"
                                />
                            )}
                        </Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="login-form-button"
                        >
                            Submit
                        </Button>
                    </Form>
                </Modal>
            </div>
        );
    }
}

const WrappedCustOrderForm = Form.create({ name: "normal_login" })(
    CustOrderForm
);
export default WrappedCustOrderForm;
