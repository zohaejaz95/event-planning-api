import React, { Component } from "react";
import { Form, Icon, Input, InputNumber, Button, Row, Col } from "antd";

//import loginImage from "../../images/Pakistani-Wedding.png";
function onChange(value) {
    console.log("changed", value);
}
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
        const { TextArea } = Input;
        return (
            <div className="contents">
                <br />
                <Row>
                    <Col span={12} offset={3}>
                        <h3 className="text-to-left">Add Package</h3>
                        <br />
                        <Form
                            onSubmit={this.handleSubmit}
                            className="login-form "
                        >
                            <Form.Item>
                                {getFieldDecorator("PackageName", {
                                    rules: [
                                        {
                                            required: true,
                                            message:
                                                "Please input your Package Name!"
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
                                        placeholder="Package Name"
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

const WrappedAddPackages = Form.create({ name: "normal_login" })(AddPackages);
export default WrappedAddPackages;
//export default VendorRegister;
