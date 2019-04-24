import React, { Component } from "react";
import {
    Form,
    Icon,
    Input,
    Button,
    Modal,
    Checkbox,
    Row,
    Col,
    Alert
} from "antd";
import CustomerForm from "./customerForm";
import loginImage from "../images/form-img.jpg";
import { register } from "./userFunction";
class CustomerRegister extends Component {
    constructor() {
        super();
        this.state = {
            visible: false,
            done: false,
            user_type: "customer",
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
                values["user_type"] = this.state.user_type;
                console.log("Received values of form: ", values);
                register(values).then(res => {
                    if (res) {
                        console.log(res.data.user_type);
                        this.setState({
                            done: true,
                            visible: false
                        });
                    } else {
                        //e.preventDefault();
                        this.setState({
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
            <div>
                <div onClick={this.showModal}>
                    <Icon type="user-add" />
                    Register
                </div>
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
                    <div>
                        <Row>
                            <Col span={11}>
                                <img
                                    src={loginImage}
                                    alt=""
                                    className="myImage"
                                />
                            </Col>
                            <Col span={12} offset={1}>
                                <h4 className="text-to-left">
                                    Customer Signup to EventEra
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
                                            />
                                        )}
                                    </Form.Item>

                                    <Form.Item>
                                        {getFieldDecorator("name", {
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
                                                            color:
                                                                "rgba(0,0,0,.25)"
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
                                                            color:
                                                                "rgba(0,0,0,.25)"
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
                                            Register
                                        </Button>
                                        <br />
                                        Or <a href="/">login now!</a>
                                    </Form.Item>
                                </Form>
                            </Col>
                        </Row>
                        {this.state.msg ? (
                            <Alert
                                message="Error"
                                description="Invalid Email or Username"
                                type="error"
                                showIcon
                            />
                        ) : (
                            <div />
                        )}
                    </div>
                </Modal>
                {this.state.done ? <CustomerForm /> : <div />}
            </div>
        );
    }
}

const WrappedCustomerRegister = Form.create({ name: "normal_login" })(
    CustomerRegister
);
export default WrappedCustomerRegister;
