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
import { updateEvent } from "./ngoFunctions";
import moment from "moment";
var edate = "";
var estime = "";
var eetime = "";
var dat = moment();
var stime = moment();
var etime = moment();
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
class NGOEditEvent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            event: []
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount() {
        this.setState({
            event: this.props.event
        });
        // moment("12-25-1995", "MM-DD-YYYY")
        dat = moment(this.props.event.date, "YYYY-MM-DD");
        etime = moment(this.props.event.end_time, "HH:mm:ss");
        stime = moment(this.props.event.start_time, "HH:mm:ss");
        eetime = this.props.event.end_time;
        estime = this.props.event.start_time;
        edate = this.props.event.date;
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
                updateEvent(this.props.event.event_id, values).then(res => {
                    if (res) {
                        message.success("Event Updated Successfully!");
                    } else {
                        message.error("Unable to Update Event!");
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
                        <h4 className="text-to-left">Edit Event</h4>
                        <br />
                        <Form
                            onSubmit={this.handleSubmit}
                            className="login-form "
                        >
                            <Form.Item>
                                {getFieldDecorator("start_time", {
                                    initialValue: stime
                                })(
                                    <TimePicker
                                        placeholder="Select New Start Time"
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
                                    initialValue: etime
                                })(
                                    <TimePicker
                                        placeholder="Select New End Time"
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
                                    initialValue: dat
                                })(
                                    <DatePicker
                                        placeholder="Select New Date"
                                        style={{ width: "100%" }}
                                        onChange={onChangeDate}
                                    />
                                )}
                            </Form.Item>
                            <Form.Item>
                                {getFieldDecorator("fund", {
                                    initialValue: this.state.event.fund
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
                                {getFieldDecorator(
                                    "subject",
                                    { initialValue: this.state.event.subject },
                                    {
                                        rules: [
                                            {
                                                required: true,
                                                message: "Please Enter Subject!"
                                            }
                                        ]
                                    }
                                )(
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

const WrappedNGOEventEdit = Form.create({ name: "normal_login" })(NGOEditEvent);
export default WrappedNGOEventEdit;
//export default NGOEditEvent;
