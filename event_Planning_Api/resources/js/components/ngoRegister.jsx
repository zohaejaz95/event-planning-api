import React, { Component } from "react";
import {
    Form,
    Icon,
    Input,
    Button,
    Checkbox,
    Row,
    Col,
    Select,
    message
} from "antd";
import { register, ngoRegister } from "./userFunction";
import loginImage from "../images/Pakistani-Wedding.png";
var pictures;
const { TextArea } = Input;
const Option = Select.Option;
class NGORegister extends Component {
    constructor() {
        super();
        this.state = {
            name: ""
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onDrop = this.onDrop.bind(this);
    }
    onDrop(event) {
        var reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);
        var pic_name = event.target.files[0];
        this.setState({
            name: pic_name.name
        });
        console.log(event.target.files[0]);
        reader.onload = function() {
            var fileContent = reader.result;
            console.log(fileContent);
            pictures = fileContent;
            console.log(pictures);
        };
    }
    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log("Received values of form: ", values);
                var reg = {
                    name: values["userName"],
                    email: values["email"],
                    password: values["password"],
                    user_type: "ngo"
                };
                var ngo = {
                    ngo_name: values["ngo_name"],
                    purpose: values["purpose"],
                    contact: "92" + values["contact"],
                    website: values["website"],
                    profile_pic: pictures,
                    img_name: this.state.name
                };
                register(reg)
                    .then(res => {
                        if (res) {
                            ngoRegister(ngo).then(res => {
                                if (res) {
                                    message.success(
                                        "Account created Successfully!"
                                    );
                                } else {
                                    message.error("Unable to create Account!");
                                }
                            });
                        } else {
                            message.error("Unable to create Account!");
                        }
                    })
                    .catch(err => {
                        console.log(err);
                        console.log(typeof err);
                        if (err.response) {
                            console.log(err.response);
                            console.log(err.response.data.errors);
                        }
                    });
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
        const prefixSelector = getFieldDecorator("prefix", {
            initialValue: "92"
        })(
            <Select>
                <Option value="92">+92</Option>
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
                            <input type="file" onChange={this.onDrop} />
                            <Form.Item>
                                {getFieldDecorator("ngo_name", {
                                    rules: [
                                        {
                                            required: true,
                                            message:
                                                "Please input your Organization Name!"
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
                                        },
                                        {
                                            min: 6,
                                            message:
                                                "Password must be atleast 6 characters!"
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
                            <Form.Item>
                                {getFieldDecorator("contact", {
                                    rules: [
                                        {
                                            required: true,
                                            message:
                                                "Please input your Contact No.!"
                                        },
                                        {
                                            pattern: "[0-9]{10}",
                                            message: "Invalid Contact Number!"
                                        },
                                        {
                                            max: 10,
                                            message: "Contact no out of range!"
                                        }
                                    ]
                                })(
                                    <Input
                                        addonBefore={prefixSelector}
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
                                {getFieldDecorator("website", {
                                    rules: [
                                        {
                                            required: true,
                                            message:
                                                "Please input your Contact No.!"
                                        }
                                    ]
                                })(
                                    <Input
                                        addonAfter={selectAfterW}
                                        placeholder="Please input your website"
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
                                {getFieldDecorator("purpose")(
                                    <TextArea
                                        rows={4}
                                        placeholder="Enter Description"
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

const WrappedNGORegister = Form.create({ name: "normal_login" })(NGORegister);
export default WrappedNGORegister;
//export default ngoRegister;
