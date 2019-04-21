import React, { Component } from "react";
import { Form, Icon, Input, Button, Checkbox, Row, Col, Select } from "antd";

import loginImage from "../images/Pakistani-Wedding.png";

const { TextArea } = Input;
const Option = Select.Option;
class ngoRegister extends Component {
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
        const selectAfterW = (
            <Select defaultValue=".com" style={{ width: 80 }}>
                <Option value=".com">.com</Option>
                <Option value=".net">.net</Option>
                <Option value=".pk">.pk</Option>
                <Option value=".org">.org</Option>
            </Select>
        );

        return (
            <div className="contents">
                <br />
                <br />
                <br />
                <br />
                <Row>
                    <Col span={8} offset={3}>
                        <img src={loginImage} alt="" className="myImage" />
                    </Col>
                    <Col span={12} offset={1}>
                        <h4 className="text-to-left">
                            NGO's Signup to EventEra
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
                                        placeholder="Organization Name"
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
                                <Input
                                    addonAfter={selectAfterW}
                                    placeholder="Please input your website"
                                />
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
                                <TextArea
                                    rows={4}
                                    placeholder="Enter Description"
                                />
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
                                    <Input.Password
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

const WrappedNGORegister = Form.create({ name: "normal_login" })(ngoRegister);
export default WrappedNGORegister;
//export default ngoRegister;
