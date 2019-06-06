import React, { Component } from "react";
import {
    Form,
    TimePicker,
    DatePicker,
    InputNumber,
    Input,
    Button,
    Row,
    Col,
    message
} from "antd";
import { createEvent } from "./ngoFunctions";
import moment from "moment";
var edate = "";
var estime = "";
var eetime = "";
//import loginImage from "../../images/Pakistani-Wedding.png";
function onChangeDate(date, dateString) {
    console.log(dateString);
    console.log(date, dateString);
    edate = dateString;
    console.log(edate);
}
function onChangeStartTime(time, timeString) {
    estime = timeString;
    console.log(time, timeString);
    console.log(estime);
}
function onChangeEndTime(time, timeString) {
    eetime = timeString;
    console.log(time, timeString);
    console.log(eetime);
}
class NGOEventForm extends Component {
    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                values["start_time"] = estime;
                values["end_time"] = eetime;
                values["date"] = edate;
                values["status"] = "active";
                console.log("Received values of form: ", values);
                createEvent(values).then(res => {
                    if (res) {
                        message.success("Event Created Successfully!");
                    } else {
                        message.error("Unable to Create Event!");
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
                    <Col span={12} offset={3}>
                        <h4 className="text-to-left">New Event</h4>
                        <br />
                        <Form
                            onSubmit={this.handleSubmit}
                            className="login-form "
                        >
                            <Form.Item>
                                {getFieldDecorator("start_time", {
                                    rules: [
                                        {
                                            required: true,
                                            message: "Please Select Start Time!"
                                        }
                                    ]
                                })(
                                    <TimePicker
                                        placeholder="Select Start Time"
                                        style={{ width: "100%" }}
                                        onChange={onChangeStartTime}
                                        defaultOpenValue={moment(
                                            "00:00:00",
                                            "HH:mm:ss"
                                        )}
                                    />
                                )}
                            </Form.Item>

                            <Form.Item>
                                {getFieldDecorator("end_time", {
                                    rules: [
                                        {
                                            required: true,
                                            message: "Please Select End Time!"
                                        }
                                    ]
                                })(
                                    <TimePicker
                                        placeholder="Select End Time"
                                        style={{ width: "100%" }}
                                        onChange={onChangeEndTime}
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
                                            message: "Please Select Date!"
                                        }
                                    ]
                                })(
                                    <DatePicker
                                        placeholder="Select Date"
                                        style={{ width: "100%" }}
                                        onChange={onChangeDate}
                                    />
                                )}
                            </Form.Item>
                            <Form.Item>
                                {getFieldDecorator("fund", {
                                    rules: [
                                        {
                                            required: true,
                                            message:
                                                "Please Enter Required Fund!"
                                        }
                                    ]
                                })(
                                    <InputNumber
                                        style={{ width: "100%" }}
                                        min={1}
                                        max={1000000}
                                        placeholder="Enter Required Fund"
                                    />
                                )}
                            </Form.Item>
                            <Form.Item>
                                {getFieldDecorator("subject", {
                                    rules: [
                                        {
                                            required: true,
                                            message: "Please Enter Subject!"
                                        }
                                    ]
                                })(
                                    <TextArea
                                        rows={4}
                                        placeholder="Enter Subject"
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

const WrappedNGOEventForm = Form.create({ name: "normal_login" })(NGOEventForm);
export default WrappedNGOEventForm;
//export default NGOEventForm;
