import React, { Component } from "react";
import { Form, Input, Button, Row, Col } from "antd";

//import loginImage from "../../images/Pakistani-Wedding.png";

class AddList extends Component {
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
                <Row>
                    <Col span={22} offset={1}>
                        <h4 className="text-to-left">To Do list</h4>
                        <br />
                        <Form
                            onSubmit={this.handleSubmit}
                            className="login-form "
                        >
                            <Form.Item>
                                {getFieldDecorator("activityName", {
                                    rules: [
                                        {
                                            required: true,
                                            message:
                                                "Please enter Activity Name!"
                                        }
                                    ]
                                })(<Input placeholder="Activity Name" />)}
                            </Form.Item>
                            <Form.Item>
                                <TextArea
                                    rows={4}
                                    placeholder="Enter Details"
                                />
                            </Form.Item>

                            <Button
                                type="primary"
                                htmlType="submit"
                                className="login-form-button"
                            >
                                Add
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </div>
        );
    }
}

const WrappedTodolist = Form.create({ name: "normal_login" })(AddList);
export default WrappedTodolist;
