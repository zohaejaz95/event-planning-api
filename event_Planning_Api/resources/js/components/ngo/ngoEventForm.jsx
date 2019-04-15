import React, { Component } from "react";
import {
    Form,
    TimePicker,
    DatePicker,
    InputNumber,
    Input,
    Button,
    Row,
    Col
} from "antd";
import moment from "moment";

//import loginImage from "../../images/Pakistani-Wedding.png";
function onChange(date, dateString, checkedValues, time, timeString) {
    console.log(date, dateString);
    console.log("checked = ", checkedValues);
    console.log(time, timeString);
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
                console.log("Received values of form: ", values);
            }
        });
    }
    render() {
        const { TextArea } = Input;
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
                                <TextArea rows={4} placeholder="Subject" />
                            </Form.Item>
                            <Form.Item>
                                <TimePicker
                                    style={{ width: 300 }}
                                    onChange={onChange}
                                    defaultOpenValue={moment(
                                        "00:00:00",
                                        "HH:mm:ss"
                                    )}
                                />
                            </Form.Item>
                            <Form.Item>
                                <DatePicker
                                    style={{ width: 300 }}
                                    onChange={onChange}
                                />
                            </Form.Item>
                            <Form.Item>
                                <InputNumber
                                    style={{ width: 300 }}
                                    min={1}
                                    max={1000000}
                                    onChange={onChange}
                                    placeholder="Fund"
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

const WrappedNGOEventForm = Form.create({ name: "normal_login" })(NGOEventForm);
export default WrappedNGOEventForm;
//export default NGOEventForm;
