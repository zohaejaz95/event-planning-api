import React, { Component } from "react";
import { Form, Icon, Input, Button, Checkbox, Row, Col } from "antd";

import loginImage from "../images/Pakistani-Wedding.png";
import { userLogin } from "./userFunction";
class LoginForm extends Component {
    constructor() {
        super();
        this.state = {
            email: "",
            password: "",
            usertype: "admin",
            errors: {}
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
        //console.log(this.state.usertype);
    }
    onSubmit(e) {
        e.preventDefault();
        const user = {
            email: this.state.email,
            password: this.state.password
        };
        console.log(this.state.usertype);
        userLogin(user).then(res => {
            if (res) {
                history.push(this.state.usertype);
            }
        });
    }
    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log("Received values of form: ", values);
                userLogin(values).then(res => {
                    if (res) {
                        console.log(res.data.user_type);
                        this.props.history.push("/admin");
                    }
                });
            }
        });
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="contents">
                <Row>
                    <Col span={10}>
                        <img src={loginImage} alt="" className="myImage" />
                    </Col>
                    <Col span={12} offset={1}>
                        <h4 className="text-to-left">Login to EventEra</h4>
                        <br />
                        <Form
                            onSubmit={this.handleSubmit}
                            className="login-form "
                        >
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
                                        onChange={this.onChange}
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
                                        onChange={this.onChange}
                                    />
                                )}
                            </Form.Item>
                            <Form.Item className="text-to-left">
                                <Checkbox>Remember me</Checkbox>)
                                <a className="login-form-forgot" href="/">
                                    Forgot password
                                </a>
                                <br />
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    className="login-form-button"
                                >
                                    Log in
                                </Button>
                                <br />
                                Or <a href="/">register now!</a>
                            </Form.Item>
                        </Form>
                    </Col>
                </Row>
            </div>
        );
    }
}
const WrappedLoginForm = Form.create({ name: "normal_login" })(LoginForm);
export default WrappedLoginForm;
//export default LoginForm;
