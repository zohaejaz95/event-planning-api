import React, { Component } from "react";
import { Rate, Input, Form, Button, Row, Col, message } from "antd";
//import loginImage from "../../images/Pakistani-Wedding.png";
import { feedback } from "./customerFunction";
class CustFeedbackForm extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log("Received values of form: ", values);

                if (this.props.type == "service") {
                    values["service_id"] = this.props.details.id;
                } else {
                    values["package_id"] = this.props.details.p_id;
                }
                console.log("Received values of form: ", values);
                feedback(values).then(res => {
                    if (res) {
                        message.success("Feedback submitted successfully!");
                        // notification["success"]({
                        //     message: "Your order has been placed!",
                        //     description:
                        //         "Your order request has been sent to the hired vendor. See your dashboard for more details."
                        // });
                    } else {
                        message.error("Your feedback could not be submitted!");
                    }
                });
            }
        });
    }
    render() {
        const { TextArea } = Input;
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="contents">
                <Row>
                    <Col span={12}>
                        <h4 className="text-to-left">Feedback</h4>
                        <br />
                        <Form
                            onSubmit={this.handleSubmit}
                            className="login-form "
                        >
                            <Form.Item className="text-to-left">
                                {getFieldDecorator("rating", {
                                    rules: [
                                        {
                                            required: true,
                                            message: "Please provide rating!"
                                        }
                                    ]
                                })(<Rate />)}
                            </Form.Item>
                            <Form.Item>
                                <label>Comment Box: </label>
                                {getFieldDecorator("comments", {
                                    rules: [
                                        {
                                            required: true,
                                            message: "Please enter comments!"
                                        }
                                    ]
                                })(
                                    <TextArea
                                        rows={4}
                                        style={{ width: "100%" }}
                                        placeholder="Enter Comments"
                                    />
                                )}
                            </Form.Item>

                            <Button
                                type="primary"
                                htmlType="submit"
                                className="login-form-button"
                                style={{ width: "100%" }}
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

//export default CustFeedbackForm;
const WrappedCustFeedbackForm = Form.create({ name: "normal_login" })(
    CustFeedbackForm
);
export default WrappedCustFeedbackForm;
