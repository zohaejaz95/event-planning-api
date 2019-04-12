import React, { Component } from "react";
import { Form, Input, Button } from "antd";

//import loginImage from "../../images/Pakistani-Wedding.png";

class CustOrderForm extends Component {
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
                <br />
                <br />
                <br />

                <h4 className="text-to-left">Order</h4>
                <br />
                <Form onSubmit={this.handleSubmit} className="login-form ">
                    <Form.Item>
                        {getFieldDecorator("PaymentMethod", {
                            rules: [
                                {
                                    required: true,
                                    message: "Please enter your Payment Method!"
                                }
                            ]
                        })(<Input placeholder="Payment Method" />)}
                    </Form.Item>

                    <Form.Item>
                        <TextArea rows={4} placeholder="Enter Description" />
                    </Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        className="login-form-button"
                    >
                        Submit
                    </Button>
                </Form>
            </div>
        );
    }
}

const WrappedCustOrderForm = Form.create({ name: "normal_login" })(
    CustOrderForm
);
export default WrappedCustOrderForm;
