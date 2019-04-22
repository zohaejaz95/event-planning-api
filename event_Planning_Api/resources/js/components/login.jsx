import React, { Component } from "react";
import { Modal, Icon, Button, Form, Input, Checkbox, Row, Col } from "antd";
import { BrowserRouter, Route } from "react-router-dom";
//import LoginForm from "./loginForm";
//import router from "./router";
import loginImage from "../images/Pakistani-Wedding.png";
import { userLogin } from "./userFunction";
class Login extends Component {
    constructor() {
        super();
        this.state = {
            visible: false
        };
        this.showModal = this.showModal.bind(this);
        this.handleOk = this.handleOk.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    showModal() {
        localStorage.removeItem("usertoken");
        this.setState({
            visible: true
        });
    }

    handleOk() {
        this.props.history.push("/admin");
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
                userLogin(values).then(res => {
                    if (res) {
                        console.log(res.data);
                        this.handleOk();
                        //this.props.history.push("/admin");
                        // this.setState({
                        //     visible: false
                        // });
                        //router.push("/$res.data.user_type");
                        //this.context.router.push("/");
                        //this.props.history.push("/admin");
                        //this.context.router.history.push('/');
                    }
                });
            }
        });
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div>
                <div onClick={this.showModal}>
                    <Icon type="login" />
                    Login
                </div>
                <Modal
                    title=""
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
                    <div>
                        <div className="contents">
                            <Row>
                                <Col span={10}>
                                    <img
                                        src={loginImage}
                                        alt=""
                                        className="myImage"
                                    />
                                </Col>
                                <Col span={12} offset={1}>
                                    <h4 className="text-to-left">
                                        Login to EventEra
                                    </h4>
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
                                                        message:
                                                            "Please input your E-mail!"
                                                    }
                                                ]
                                            })(
                                                <Input
                                                    prefix={
                                                        <Icon
                                                            type="mail"
                                                            style={{
                                                                color:
                                                                    "rgba(0,0,0,.25)"
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
                                                                color:
                                                                    "rgba(0,0,0,.25)"
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
                                            <a
                                                className="login-form-forgot"
                                                href="/"
                                            >
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
                    </div>
                </Modal>
            </div>
        );
    }
}

const WrappedLogin = Form.create({ name: "normal_login" })(Login);
export default WrappedLogin;
