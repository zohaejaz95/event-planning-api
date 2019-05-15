import React, { Component } from "react";
import {
    Form,
    Icon,
    Input,
    InputNumber,
    Button,
    Row,
    Col,
    Select,
    message,
    DatePicker
} from "antd";
import { getVendorServices, updatePackage } from "./vendorFunctions";

const dateFormat = "YYYY-MM-DD";
//import loginImage from "../../images/Pakistani-Wedding.png";
class UpdatePackage extends Component {
    constructor() {
        super();
        this.state = {
            service: [],
            id: [],
            service_name: [],
            sel: [],
            val: [],
            my_services: {},
            services: [],
            expiration_date: ""
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.selectKeys = this.selectKeys.bind(this);
        this.onChange = this.onChange.bind(this);
        this.dateChange = this.dateChange.bind(this);
    }
    onChange(value, i) {
        console.log("changed", value);
        console.log(i);
        if (this.state.val === null || this.state.val.service_id === i) {
            this.setState({
                my_services: {
                    discount: value,
                    service_id: i
                }
            });
            console.log(this.state.val.service_id);
        } else {
            this.setState({
                my_services: {
                    discount: value,
                    service_id: i
                }
            });
            console.log(this.state.val.service_id);
            this.state.val.push(this.state.my_services);
        }

        //this.state.my_services.push({ discount: value, service_id: i });
        console.log(this.state.my_services);
    }
    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log("Received values of form: ", values);
                console.log(this.state.val);

                var i, prev, curr;
                for (i = 0; i < this.state.val.length; i++) {
                    curr = this.state.val[i];
                    if (i == 0) {
                        console.log("I am empty!");
                    } else {
                        prev = this.state.val[i - 1];
                        if (curr.service_id == prev.service_id) {
                            this.state.services.pop();
                            this.state.services.push(curr);
                        } else {
                            this.state.services.push(curr);
                        }
                        console.log("Forming an array...!");
                    }
                }
                //services = this.state.services;
                console.log(this.state.services);
                var serve = {};
                for (i = 0; i < this.state.services.length; i++) {
                    serve["service" + i] = this.state.services[i];
                }
                console.log(serve);
                values["services"] = serve;
                console.log(values);
                values["expiration_date"] = this.state.expiration_date;
                createPackages(values).then(res => {
                    if (res) {
                        message.success("Package Created!");
                    } else {
                        message.error("Package could not be created!");
                    }
                });
            }
        });
    }
    dateChange(date, dateString) {
        console.log(date, dateString);
        this.setState({
            expiration_date: dateString
        });
    }
    handleChange(s_id, name) {
        console.log(`selected ${name}` + s_id);
        this.state.id.push(s_id);
        this.state.service_name.push(name);
        var con = this.state.id;
        console.log({ con });
    }
    selectKeys(value) {
        //console.log(`selected ${value}`);
        console.log(value);
        this.setState({
            sel: value
        });
    }
    componentDidMount() {
        getVendorServices().then(res => {
            if (res) {
                //console.log(res);
                this.setState({
                    service: res
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
                <br />
                <Row>
                    <Col span={12} offset={3}>
                        <h3 className="text-to-left">Add Package</h3>
                        <br />
                        <Form
                            onSubmit={this.handleSubmit}
                            className="login-form "
                        >
                            <Form.Item>
                                <Select
                                    labelInValue
                                    mode="multiple"
                                    style={{ width: "100%" }}
                                    placeholder="Please select services"
                                    onChange={this.selectKeys}
                                >
                                    {this.state.service.map((con, i) => (
                                        <Option
                                            key={i}
                                            value={con.id}
                                            onClick={() =>
                                                this.handleChange(
                                                    con.id,
                                                    con.service_name
                                                )
                                            }
                                        >
                                            {con.service_name}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>

                            <Form.Item>
                                {getFieldDecorator("name", {
                                    rules: [
                                        {
                                            required: true,
                                            message:
                                                "Please input your Package Name!"
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
                                        placeholder="Package Name"
                                    />
                                )}
                            </Form.Item>
                            <Form.Item>
                                {getFieldDecorator("expiration_date", {
                                    rules: [
                                        {
                                            required: true,
                                            message:
                                                "Please input your Expirateion Date!"
                                        }
                                    ]
                                })(
                                    <DatePicker
                                        style={{ width: "100%" }}
                                        format={dateFormat}
                                        placeholder="Select an expiration date"
                                        onChange={this.dateChange}
                                    />
                                )}
                            </Form.Item>
                            <Form.Item>
                                {getFieldDecorator("description", {
                                    rules: [
                                        {
                                            required: true,
                                            message:
                                                "Please input your Package Name!"
                                        }
                                    ]
                                })(
                                    <TextArea
                                        rows={4}
                                        placeholder="Enter Description"
                                    />
                                )}
                            </Form.Item>
                            {this.state.sel.map((con, i) => (
                                <Form.Item key={i}>
                                    <div>
                                        {con.label + ":"}
                                        <br />
                                        <InputNumber
                                            labelInValue
                                            style={{ width: 300 }}
                                            min={1}
                                            max={100}
                                            onChange={e =>
                                                this.onChange(e, con.key)
                                            }
                                            placeholder="Enter Discount"
                                        />
                                    </div>
                                </Form.Item>
                            ))}

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

const WrappedAddPackages = Form.create({ name: "normal_login" })(UpdatePackage);
export default WrappedAddPackages;
//export default VendorRegister;