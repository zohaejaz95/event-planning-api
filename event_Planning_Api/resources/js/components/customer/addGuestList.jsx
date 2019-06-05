import React, { Component } from "react";
import { Form, Icon, Input, Button, Row, Col, message, Select } from "antd";
//import loginImage from "../../images/form-img.jpg";
import { createContact } from "./customerFunction";
class GuestList extends Component {
    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log("Received values of form: ", values);
                createContact(values).then(res => {
                    if (res) {
                        message.success("Contact Added");
                    } else {
                        message.error("Something went wrong!!");
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
                    <Col span={12} offset={3}>
                        <h4 className="text-to-left">Add a contact</h4>
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
                                            message: "Invalid Contact Number!"
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
                                {getFieldDecorator("province", {
                                    rules: [
                                        {
                                            required: true,
                                            message: "Please Select Category!"
                                        }
                                    ]
                                })(
                                    <Select placeholder="Please select a province!">
                                        <Select.Option value="punjab">
                                            Punjab
                                        </Select.Option>
                                        <Select.Option value="sindh">
                                            Sindh
                                        </Select.Option>
                                        <Select.Option value="balochistan">
                                            Balochistan
                                        </Select.Option>
                                        <Select.Option value="kpk">
                                            KPK
                                        </Select.Option>
                                    </Select>
                                )}
                            </Form.Item>
                            <Form.Item>
                                {getFieldDecorator("city", {
                                    rules: [
                                        {
                                            required: true,
                                            message: "Please Enter City!"
                                        }
                                    ]
                                })(<Input placeholder="Enter City!" />)}
                            </Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                className="login-form-button"
                            >
                                Submit
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </div>
        );
    }
}
const WrappedGuestList = Form.create({ name: "normal_login" })(GuestList);
export default WrappedGuestList;
