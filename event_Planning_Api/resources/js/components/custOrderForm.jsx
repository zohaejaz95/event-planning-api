import React, { Component } from "react";
import { Form, Input, Button, message, Modal, Select } from "antd";
import { getEvents, newOrder } from "./customer/customerFunction";
//import loginImage from "../../images/Pakistani-Wedding.png";
const Option = Select.Option;
class CustOrderForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: true,
            events: []
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
        getEvents().then(res => {
            if (res) {
                console.log(res.data);
                const lists = JSON.stringify(res.data);
                const elist = JSON.parse(lists);
                this.setState({
                    events: elist
                });
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
                            })(<Input placeholder="Enter Payment Method" />)}
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
                                    style={{ width: 200 }}
                                    placeholder="Select a person"
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
