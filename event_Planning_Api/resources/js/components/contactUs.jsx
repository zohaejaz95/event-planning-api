import React, { Component } from "react";

import { Form, Input, Button, Row, Col } from "antd";

import contact from "../images/contact-us.jpg";
import TextArea from "antd/lib/input/TextArea";
import ngoMain from "../images/ngo-main.jpg";

class ContactUs extends Component {
    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log("Received values of form: ", values);
            }
        });
    }

    render() {
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 }
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 8 }
            }
        };
        //const { getFieldDecorator } = this.props.form;
        return (
            <div className="contents">
                <img
                    src={contact}
                    alt="Contact Us Here"
                    className="img-fluid myImage"
                />
                <Form onSubmit={this.handleSubmit}>
                    <Form.Item {...formItemLayout} label="E-mail">
                        <Input />
                    </Form.Item>
                    <Form.Item {...formItemLayout} label="Comments">
                        <TextArea />
                    </Form.Item>
                    <Button>Submit</Button>
                </Form>
                <br />
                <br />
                <h4>About Us</h4>
                <Row>
                    <Col span={20} offset={2}>
                        <div className="text-to-left">
                            <img
                                src={ngoMain}
                                alt="NGO Name"
                                style={{ width: 300, float: "left" }}
                                className="m-4"
                            />
                            <br />
                            <h5>NGO Name 1</h5>
                            <p>
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Iste repudiandae similique,
                                quia consectetur, et, temporibus modi dolorem
                                quasi id fugiat fugit laboriosam optio eveniet
                                perspiciatis earum aspernatur nam. Esse, quod?
                            </p>
                        </div>
                    </Col>
                </Row>
                <br />
                <br />
                <Row>
                    <Col span={20} offset={2}>
                        <div className="text-to-right">
                            <img
                                src={ngoMain}
                                alt="NGO Name"
                                style={{ width: 300, float: "right" }}
                                className="m-4"
                            />
                            <br />
                            <h5>NGO Name 2</h5>
                            <p>
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Iste repudiandae similique,
                                quia consectetur, et, temporibus modi dolorem
                                quasi id fugiat fugit laboriosam optio eveniet
                                perspiciatis earum aspernatur nam. Esse, quod?
                            </p>
                        </div>
                    </Col>
                </Row>
                <br />
                <br />
                <Row>
                    <Col span={20} offset={2}>
                        <div className="text-to-left">
                            <img
                                src={ngoMain}
                                alt="NGO Name"
                                style={{ width: 300, float: "left" }}
                                className="m-4"
                            />
                            <br />
                            <h5>NGO Name 3</h5>
                            <p>
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Iste repudiandae similique,
                                quia consectetur, et, temporibus modi dolorem
                                quasi id fugiat fugit laboriosam optio eveniet
                                perspiciatis earum aspernatur nam. Esse, quod?
                            </p>
                        </div>
                    </Col>
                </Row>
                <br />
            </div>
        );
    }
}

export default ContactUs;
