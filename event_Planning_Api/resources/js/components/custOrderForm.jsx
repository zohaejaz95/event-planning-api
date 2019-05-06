import React, { Component } from "react";
import { Form, Input, Button, message, Modal } from "antd";

//import loginImage from "../../images/Pakistani-Wedding.png";

class CustOrderForm extends Component {
    constructor() {
        super();
        this.state = {
            visible: true
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
                console.log("Received values of form: ", values);
                message.success("Service Ordered");
            } else {
                message.error("Order could not be placed!");
            }
        });
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const { TextArea } = Input;

        return (
            <div className="contents">
                <h4 className="text-to-left">Order</h4>
                <Modal
                    title="Register"
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
                            {getFieldDecorator("PaymentMethod", {
                                rules: [
                                    {
                                        required: true,
                                        message:
                                            "Please enter your Payment Method!"
                                    }
                                ]
                            })(<Input placeholder="Payment Method" />)}
                        </Form.Item>

                        <Form.Item>
                            <TextArea
                                rows={4}
                                placeholder="Enter Description"
                            />
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
