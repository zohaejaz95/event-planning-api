import React, { Component } from "react";
import {
    Form,
    Input,
    InputNumber,
    Select,
    Button,
    Checkbox,
    Row,
    Col
} from "antd";

import loginImage from "../../images/Pakistani-Wedding.png";
function onChange(value) {
    console.log("changed", value);
}
class SponsorshipForm extends Component {
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
        const Option = Select.Option;
        const selectAfter = (
            <Select defaultValue="service1" style={{ width: 100 }}>
                <Option value="service1">service1</Option>
                <Option value="service2">service2</Option>
            </Select>
        );
        return (
            <div className="contents">
                <Row>
                    <Col span={8} offset={3}>
                        <img src={loginImage} alt="" className="myImage" />
                    </Col>
                    <Col span={12} offset={1}>
                        <h4 className="text-to-left">Sponsorship</h4>
                        <br />
                        <Form
                            onSubmit={this.handleSubmit}
                            className="login-form "
                        >
                            <Form.Item>
                                <div className="text-to-left">
                                    <label>Type:</label>
                                    <br />{" "}
                                </div>

                                <Checkbox.Group
                                    style={{ width: "100%" }}
                                    onChange={onChange}
                                >
                                    <Row>
                                        <Col span={8}>
                                            <Checkbox value="Financial">
                                                Financial
                                            </Checkbox>
                                        </Col>
                                        <Col span={8}>
                                            <Checkbox value="Services">
                                                Services
                                            </Checkbox>
                                        </Col>
                                    </Row>
                                </Checkbox.Group>
                            </Form.Item>
                            <Form.Item>
                                <InputNumber
                                    style={{ width: 300 }}
                                    min={1}
                                    max={1000000}
                                    onChange={onChange}
                                    placeholder="Amount"
                                />
                            </Form.Item>
                            <Form.Item>
                                <Input
                                    addonAfter={selectAfter}
                                    placeholder="Services"
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

const WrappedSponsorshipForm = Form.create({ name: "normal_login" })(
    SponsorshipForm
);
export default WrappedSponsorshipForm;
//export default VendorRegister;
