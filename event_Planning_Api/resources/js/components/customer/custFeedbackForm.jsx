import React, { Component } from "react";
import { Rate, Input, Form, Button, Row, Col } from "antd";
//import loginImage from "../../images/Pakistani-Wedding.png";

class CustFeedbackForm extends Component {
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
        const { TextArea } = Input;

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
                                <Rate />
                            </Form.Item>
                            <Form.Item>
                                <label>Comment Box: </label>
                                <TextArea
                                    rows={4}
                                    style={{ width: "100%" }}
                                    placeholder="Enter Details"
                                />
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

export default CustFeedbackForm;
