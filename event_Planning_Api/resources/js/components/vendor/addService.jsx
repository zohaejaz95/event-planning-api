import React, { Component } from "react";
import {
    Form,
    Icon,
    Input,
    InputNumber,
    Button,
    Select,
    Row,
    Col,
    message
} from "antd";

//import loginImage from "../../images/Pakistani-Wedding.png";
import { createService } from "./vendorFunctions";
import GetImage from "../getImage";
function onChange(checkedValues) {
    console.log("checked = ", checkedValues);
}
class AddService extends Component {
    constructor() {
        super();
        this.state = {
            category: ""
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.updateForm = this.updateForm.bind(this);
    }
    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log("Received values of form: ", values);
                createService(values).then(res => {
                    if (res) {
                        message.success("Service created!");
                    } else {
                        message.error("Something went wrong!");
                    }
                });
            }
        });
    }
    updateForm(value) {
        console.log(value);
        this.setState({
            category: value
        });
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const { TextArea } = Input;
        const Option = Select.Option;

        return (
            <div className="contents">
                <br />

                <Row>
                    <Col span={12} offset={3}>
                        <h4 className="text-to-left">Add Service</h4>
                        <br />
                        <Form
                            onSubmit={this.handleSubmit}
                            className="login-form "
                        >
                            <Form.Item>
                                <GetImage />
                            </Form.Item>
                            <Form.Item>
                                {getFieldDecorator("service_name", {
                                    rules: [
                                        {
                                            required: true,
                                            message:
                                                "Please Enter Service Name!"
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
                                        placeholder="Service Name"
                                    />
                                )}
                            </Form.Item>
                            <Form.Item>
                                {getFieldDecorator("description", {
                                    rules: [
                                        {
                                            required: true,
                                            message: "Please Enter Description!"
                                        }
                                    ]
                                })(
                                    <TextArea
                                        rows={4}
                                        placeholder="Enter Description"
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
                                    <Select placeholder="Select Category">
                                        <Option
                                            value="photographs"
                                            onClick={() =>
                                                this.updateForm("photographs")
                                            }
                                        >
                                            Photography
                                        </Option>
                                        <Option value="videography">
                                            Videography
                                        </Option>
                                        <Option
                                            value="makeup artists"
                                            onClick={() =>
                                                this.updateForm(
                                                    "makeup_artists"
                                                )
                                            }
                                        >
                                            Makeup Artist
                                        </Option>
                                        <Option value="decorators">
                                            Decorators
                                        </Option>
                                        <Option value="designers">
                                            Designers
                                        </Option>
                                        <Option
                                            value="venues"
                                            onClick={() =>
                                                this.updateForm("venues")
                                            }
                                        >
                                            Venues
                                        </Option>
                                        <Option value="cards">
                                            Invitations and Cards
                                        </Option>
                                        <Option
                                            value="catering"
                                            onClick={() =>
                                                this.updateForm("caterings")
                                            }
                                        >
                                            Food and Catering Services
                                        </Option>
                                        <Option
                                            value="entertainment"
                                            onClick={() =>
                                                this.updateForm(
                                                    "entertainments"
                                                )
                                            }
                                        >
                                            Music and Entertainment
                                        </Option>
                                        <Option
                                            value="car rental"
                                            onClick={() =>
                                                this.updateForm("car_rentals")
                                            }
                                        >
                                            Car Rental Services
                                        </Option>
                                        <Option value="event planners">
                                            Event Planners
                                        </Option>
                                    </Select>
                                )}
                            </Form.Item>
                            <Form.Item>
                                {getFieldDecorator("event_type", {
                                    rules: [
                                        {
                                            required: true,
                                            message: "Please Select Category!"
                                        }
                                    ]
                                })(
                                    <Select placeholder="Please select an event type!">
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
                                {getFieldDecorator("price", {
                                    rules: [
                                        {
                                            required: true,
                                            message: "Please Select Category!"
                                        }
                                    ]
                                })(
                                    <InputNumber
                                        style={{ width: 300 }}
                                        min={1}
                                        max={1000000}
                                        onChange={onChange}
                                        placeholder="Price"
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

const WrappedAddService = Form.create({ name: "normal_login" })(AddService);
export default WrappedAddService;
//export default VendorRegister;
