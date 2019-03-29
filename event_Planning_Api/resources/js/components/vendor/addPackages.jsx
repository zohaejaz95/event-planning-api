import React, { Component } from "react";
import { Form, Icon, Input, Button, Checkbox, Row, Col } from "antd";

class AddPackages extends Component {
    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log("Received values of form: ", values);
            }
        });
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="contents">
                <br />
                <br />
                <br />
                <br />
                <Row>
                    <Col span={12} offset={6}>
                        <h4 className="text-to-left">
                            Vendor Signup to EventEra
                        </h4>
                        <br />
                        <Form
                            onSubmit={this.handleSubmit}
                            className="login-form "
                        >
                            <Form.Item>
                                {getFieldDecorator("firstName", {
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
                                {getFieldDecorator("lastName", {
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
                                {getFieldDecorator("email", {
                                    rules: [
                                        {
                                            type: "email",
                                            message:
                                                "The input is not valid E-mail!"
                                        },
                                        {
                                            required: true,
                                            message: "Please input your E-mail!"
                                        }
                                    ]
                                })(
                                    <Input
                                        prefix={
                                            <Icon
                                                type="mail"
                                                style={{
                                                    color: "rgba(0,0,0,.25)"
                                                }}
                                            />
                                        }
                                        placeholder="Email"
                                    />
                                )}
                            </Form.Item>
                            <Form.Item>
                                {getFieldDecorator("userName", {
                                    rules: [
                                        {
                                            required: true,
                                            message:
                                                "Please input your username!"
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
                                        placeholder="Username"
                                    />
                                )}
                            </Form.Item>
                            <Form.Item>
                                {getFieldDecorator("password", {
                                    rules: [
                                        {
                                            required: true,
                                            message:
                                                "Please input your Password!"
                                        }
                                    ]
                                })(
                                    <Input
                                        prefix={
                                            <Icon
                                                type="lock"
                                                style={{
                                                    color: "rgba(0,0,0,.25)"
                                                }}
                                            />
                                        }
                                        type="password"
                                        placeholder="Password"
                                    />
                                )}
                            </Form.Item>
                            <Form.Item className="text-to-left">
                                {getFieldDecorator("remember", {
                                    valuePropName: "checked",
                                    initialValue: true
                                })(<Checkbox>Remember me</Checkbox>)}
                                <a className="login-form-forgot" href="/">
                                    Forgot password
                                </a>
                                <br />
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    className="login-form-button"
                                >
                                    Register
                                </Button>
                                <br />
                                Or <a href="/">login now!</a>
                            </Form.Item>
                        </Form>
                    </Col>
                </Row>
            </div>
        );
    }
}

const WrappedAddPackages = Form.create({ name: "normal_login" })(AddPackages);
export default WrappedAddPackages;
//export default VendorRegister;
