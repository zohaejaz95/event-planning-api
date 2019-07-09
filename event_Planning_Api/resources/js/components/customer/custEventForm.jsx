import React, { Component } from "react";
import {
    Form,
    Icon,
    Input,
    DatePicker,
    TimePicker,
    InputNumber,
    Select,
    Button,
    Row,
    Col,
    message
} from "antd";
import moment from "moment";
import { createEvent } from "./customerFunction";
//import loginImage from "../../images/form-img.jpg";
var edate = "";
var etime = "";
function onChangeDate(date, dateString) {
    console.log(dateString);
    console.log(date, dateString);
    edate = dateString;
    console.log(edate);
}
function onChangeTime(time, timeString) {
    etime = timeString;
    console.log(time, timeString);
    console.log(etime);
}
class CustEventForm extends Component {
    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log("Received values of form: ", values);
                values["date"] = edate;
                values["time"] = etime;
                values["status"] = "active";
                values["type"] = "private";
                createEvent(values).then(res => {
                    if (res) {
                        message.success("Event created!");
                    } else {
                        message.error("Something went wrong!");
                    }
                });
            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { TextArea } = Input;
        const Option = Select.Option;

        return (
            <div className="contents">
                <Row>
                    <Col span={12} offset={3}>
                        <h4 className="text-to-left">New Event</h4>
                        <br />
                        <Form
                            onSubmit={this.handleSubmit}
                            className="login-form "
                        >
                            <Form.Item>
                                {getFieldDecorator("event_name", {
                                    rules: [
                                        {
                                            required: true,
                                            message: "Please Enter Event Name!"
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
                                        placeholder="Event Name"
                                    />
                                )}
                            </Form.Item>

                            <Form.Item>
                                {getFieldDecorator("category", {
                                    rules: [
                                        {
                                            required: true,
                                            message: "Please Select Category!"
                                        }
                                    ]
                                })(
                                    <Select placeholder="Please select a category!">
                                        <Option value="wedding">Wedding</Option>
                                        <Option value="birthday">
                                            Birthday
                                        </Option>
                                        <Option value="corporate">
                                            Corporate
                                        </Option>
                                        <Option value="personal">
                                            Personal
                                        </Option>
                                    </Select>
                                )}
                            </Form.Item>
                            <Form.Item>
                                {getFieldDecorator("time", {
                                    rules: [
                                        {
                                            required: true,
                                            message: "Please Enter Time!"
                                        }
                                    ]
                                })(
                                    <TimePicker
                                        style={{ width: "100%" }}
                                        onChange={onChangeTime}
                                        defaultOpenValue={moment(
                                            "00:00:00",
                                            "HH:mm:ss"
                                        )}
                                    />
                                )}
                            </Form.Item>
                            <Form.Item>
                                {getFieldDecorator("date", {
                                    rules: [
                                        {
                                            required: true,
                                            message: "Please Enter Date!"
                                        }
                                    ]
                                })(
                                    <DatePicker
                                        style={{ width: "100%" }}
                                        onChange={onChangeDate}
                                    />
                                )}
                            </Form.Item>
                            <Form.Item>
                                {getFieldDecorator("budget", {
                                    rules: [
                                        {
                                            required: true,
                                            message: "Please Enter Budget!"
                                        }
                                    ]
                                })(
                                    <InputNumber
                                        style={{ width: "100%" }}
                                        min={1}
                                        max={1000000}
                                        placeholder="Budget"
                                    />
                                )}
                            </Form.Item>
                            <Form.Item>
                                {getFieldDecorator(
                                    "description"
                                    // , {
                                    //     rules: [
                                    //         {
                                    //             required: true,
                                    //             message: "Please Enter Decsription!"
                                    //         }
                                    //     ]
                                    // }
                                )(
                                    <TextArea
                                        rows={4}
                                        placeholder="Enter Description"
                                    />
                                )}
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

const WrappedCustEventForm = Form.create({ name: "normal_login" })(
    CustEventForm
);
export default WrappedCustEventForm;
//export default VendorRegister;
