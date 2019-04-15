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
    Col
} from "antd";
import moment from "moment";
//import loginImage from "../../images/form-img.jpg";

function onChange(date, dateString, checkedValues, time, timeString) {
    console.log(date, dateString);
    console.log("checked = ", checkedValues);
    console.log(time, timeString);
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
            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { TextArea } = Input;
        const Option = Select.Option;
        const selectAfter = (
            <Select defaultValue="Wedding" style={{ width: 100 }}>
                <Option value="Wedding">Wedding</Option>
                <Option value="Birthday">Birthday</Option>
                <Option value="Corporate">Corporate</Option>
                <Option value="Personal">Personal</Option>
            </Select>
        );
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
                                {getFieldDecorator("Name", {
                                    rules: [
                                        {
                                            required: true,
                                            message: "Please Enter your Name!"
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
                                        placeholder="Name"
                                    />
                                )}
                            </Form.Item>

                            <Form.Item>
                                <Input
                                    addonAfter={selectAfter}
                                    placeholder="Select Category"
                                />
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
                                    placeholder="Budget"
                                />
                            </Form.Item>
                            <Form.Item>
                                <TextArea
                                    rows={4}
                                    placeholder="Enter Description"
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

const WrappedCustEventForm = Form.create({ name: "normal_login" })(
    CustEventForm
);
export default WrappedCustEventForm;
//export default VendorRegister;
