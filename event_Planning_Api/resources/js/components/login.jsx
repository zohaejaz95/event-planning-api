import React, { Component } from "react";
import {
    Modal,
    Icon,
    Button,
    Form,
    Input,
    Checkbox,
    Row,
    Col,
    Alert,
    message
} from "antd";

import loginImage from "../images/Pakistani-Wedding.png";
import { userLogin } from "./userFunction";
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            url: "/",
            msg: false,
            succ: false,
            token: "",
            confirmLoading: false
        };

        this.showModal = this.showModal.bind(this);
        this.handleOk = this.handleOk.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.changeUrl = this.changeUrl.bind(this);
    }

    showModal() {
        localStorage.removeItem("usertoken");
        this.setState({
            visible: true
        });
    }

    handleOk() {
        this.props.history.push("/" + this.state.token);
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
                        console.log(res.data.user_type);
                        this.setState({
                            succ: true,
                            msg: false
                        });
                        var user = JSON.parse(
                            localStorage.getItem("usertoken")
                        );
                        this.setState({
                            token: user.user_type
                        });
                        //window.location.reload();
                        window.location.href =
                            "http://localhost:8000/" + user.user_type;
                        message.success("Login Successful!");
                        const { history } = this.props;
                        //var path = "/" + res.data.user_type;
                        //this.handleOk();
                        history.push("/" + user.user_type);
                        //this.changeUrl();

                        //console.log(this.state.url);
                        //browserHistory.push("/" + user.user_type);
                        //this.context.router.push("/");
                        //this.props.history.push("/admin");
                        //this.context.router.history.push('/');
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
    changeUrl() {
        var user = JSON.parse(localStorage.getItem("usertoken"));
        this.setState({
            url: user.user_type
        });
        //this.props.history.push("/" + this.state.url);
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
                    confirmLoading={this.state.confirmLoading}
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
                                                <Input.Password
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
                                            {getFieldDecorator("remember", {
                                                valuePropName: "checked",
                                                initialValue: true
                                            })(
                                                <Checkbox>Remember me</Checkbox>
                                            )}
                                            <a
                                                className="login-form-forgot"
                                                href="/"
                                            >
                                                Forgot password
                                            </a>
                                            <br />
                                            <a href={"/" + this.state.token}>
                                                <Button
                                                    type="primary"
                                                    htmlType="submit"
                                                    className="login-form-button"
                                                >
                                                    Log in
                                                </Button>
                                            </a>
                                            <br />
                                            Or <a href="/">register now!</a>
                                        </Form.Item>
                                    </Form>
                                </Col>
                            </Row>
                            {this.state.msg ? (
                                <Alert
                                    message="Error"
                                    description="Invalid Email or Password"
                                    type="error"
                                    showIcon
                                />
                            ) : (
                                <div />
                            )}
                        </div>
                    </div>
                </Modal>
            </div>
        );
    }
}

const WrappedLogin = Form.create({ name: "normal_login" })(Login);
export default WrappedLogin;
