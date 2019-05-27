import React, { Component } from "react";
import { Form, Icon, Input, Button, Modal, Row, Col, Alert } from "antd";
import { customerRegister } from "./userFunction";
import loginImage from "../images/form-img.jpg";

class CustomerForm extends Component {
    constructor() {
        super();
        this.state = {
            visible: true,
            succ: false,
            msg: false
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
                customerRegister(values).then(res => {
                    //console.log(res);
                    if (res) {
                        console.log(res);
                        this.setState({
                            succ: true,
                            msg: false
                        });
                    } else {
                        //e.preventDefault();
                        this.setState({
                            succ: false,
                            msg: true
                        });
                    }
                });
            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="contents">
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
                    <Row>
                        <Col span={11}>
                            <img src={loginImage} alt="" className="myImage" />
                        </Col>
                        <Col span={12} offset={1}>
                            <h4 className="text-to-left">Account Details</h4>
                            <br />
                            <Form
                                onSubmit={this.handleSubmit}
                                className="login-form "
                            >
                                <Form.Item>
                                    {getFieldDecorator("first_name", {
                                        rules: [
                                            {
                                                required: true,
                                                message:
                                                    "Please input your First Name!"
                                            }
                                        ]
                                    })(
                                        <Input
                                            prefix={
                                                <Icon
                                                    type="user"
                                                    style={{
                                                        color: "rgba(0,0,0,.25)"
                                                    }}
                                                />
                                            }
                                            placeholder="First Name"
                                        />
                                    )}
                                </Form.Item>

                                <Form.Item>
                                    {getFieldDecorator("last_name", {
                                        rules: [
                                            {
                                                required: true,
                                                message:
                                                    "Please input your Last Name!"
                                            }
                                        ]
                                    })(
                                        <Input
                                            prefix={
                                                <Icon
                                                    type="user"
                                                    style={{
                                                        color: "rgba(0,0,0,.25)"
                                                    }}
                                                />
                                            }
                                            placeholder="Last Name"
                                        />
                                    )}
                                </Form.Item>

                                <Form.Item>
                                    {getFieldDecorator("contact", {
                                        rules: [
                                            {
                                                required: true,
                                                message:
                                                    "Please input your Contact No.!"
                                            },
                                            {
                                                pattern: "[9][2][0-9]{10}",
                                                message:
                                                    "Invalid Contact Number!"
                                            }
                                        ]
                                    })(
                                        <Input
                                            prefix={
                                                <Icon
                                                    type="phone"
                                                    style={{
                                                        color: "rgba(0,0,0,.25)"
                                                    }}
                                                />
                                            }
                                            placeholder="Contact No."
                                        />
                                    )}
                                </Form.Item>

                                <Form.Item>
                                    {getFieldDecorator("address", {
                                        rules: [
                                            {
                                                required: true,
                                                message:
                                                    "Please input your address!"
                                            }
                                        ]
                                    })(
                                        <Input
                                            prefix={
                                                <Icon
                                                    type="home"
                                                    style={{
                                                        color: "rgba(0,0,0,.25)"
                                                    }}
                                                />
                                            }
                                            placeholder="Address"
                                        />
                                    )}
                                </Form.Item>

                                <Form.Item>
                                    <Button
                                        type="primary"
                                        htmlType="submit"
                                        className="login-form-button"
                                    >
                                        Submit
                                    </Button>
                                </Form.Item>
                            </Form>
                        </Col>
                    </Row>
                    {this.state.msg ? (
                        <Alert
                            message="Error"
                            description="Something went wrong!!"
                            type="error"
                            showIcon
                        />
                    ) : this.state.succ ? (
                        <Alert
                            message="Congratulations!"
                            description="Registration Successful! Click on Dashboard to view your profile."
                            type="success"
                            showIcon
                        />
                    ) : (
                        <div />
                    )}
                </Modal>
            </div>
        );
    }
}
const WrappedCustomerForm = Form.create({ name: "normal_login" })(CustomerForm);
export default WrappedCustomerForm;
//export default CustomerForm;
