import React, { Component } from "react";
import { Form, Icon, Input, InputNumber, Button, Select, Row, Col } from "antd";

import loginImage from "../../images/Pakistani-Wedding.png";
function onChange(checkedValues) {
    console.log("checked = ", checkedValues);
}
class AddService extends Component {
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
        const { TextArea } = Input;
        const Option = Select.Option;
        const selectAfter = (
            <Select defaultValue="Photography" style={{ width: 150 }}>
                <Option value="Photography">Photography</Option>
                <Option value="Videography">Videography</Option>
                <Option value="Makeup Artist">Makeup Artist</Option>
                <Option value="Decorators">Decorators</Option>
                <Option value="Designers">Designers</Option>
                <Option value="Venues">Venues</Option>
                <Option value="Invitations and Cards">
                    Invitations and Cards
                </Option>
                <Option value="Food and Catering Services">
                    Food and Catering Services
                </Option>
                <Option value="VMusic and Entertainment">
                    Music and Entertainment
                </Option>
                <Option value="Car Rental Services">Car Rental Services</Option>
                <Option value="Event Planners">Event Planners</Option>
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
                        <h4 className="text-to-left">Add Service</h4>
                        <br />
                        <Form
                            onSubmit={this.handleSubmit}
                            className="login-form "
                        >
                            <Form.Item>
                                {getFieldDecorator("Service Name", {
                                    rules: [
                                        {
                                            required: true,
                                            message:
                                                "Please Enter Service Name!"
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
                                        placeholder="Service Name"
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
                                <Input
                                    addonAfter={selectAfter}
                                    placeholder="Select Category"
                                />
                            </Form.Item>
                            <Form.Item>
                                <InputNumber
                                    style={{ width: 300 }}
                                    min={1}
                                    max={1000000}
                                    onChange={onChange}
                                    placeholder="Price"
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
                    </Col>
                </Row>
            </div>
        );
    }
}

const WrappedAddService = Form.create({ name: "normal_login" })(AddService);
export default WrappedAddService;
//export default VendorRegister;
