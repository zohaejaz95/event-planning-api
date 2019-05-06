import React, { Component } from "react";
import { Form, Icon, Input, InputNumber, Button, Row, Col, Select } from "antd";
import { getVendorServices } from "./vendorFunctions";
//import loginImage from "../../images/Pakistani-Wedding.png";

class AddPackages extends Component {
    constructor() {
        super();
        this.state = {
            service: [],
            id: [],
            service_name: [],
            sel: [],
            val: {},
            services: {}
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.selectKeys = this.selectKeys.bind(this);
        this.onChange = this.onChange.bind(this);
    }
    onChange(value, i) {
        console.log("changed", value);
        console.log(i);
        if (this.state.val == null || this.state.val.service_id == i) {
            this.setState({
                services: {
                    discount: value,
                    service_id: i
                }
            });
        } else {
            this.setState({
                services: {
                    discount: value,
                    service_id: i
                }
            });
        }

        //this.state.services.push({ discount: value, service_id: i });
        console.log(this.state.services);
    }
    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log("Received values of form: ", values);
                let i = -1;

                this.state.id.forEach(element => {
                    this.state.val.push(element);
                    this.setState({
                        val: [
                            {
                                service_id: element,
                                discount: values["discount" + element]
                            }
                        ]
                    });
                    console.log(this.state.val);
                });
            }
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
                                {getFieldDecorator("services", {
                                    rules: [
                                        {
                                            required: true,
                                            message:
                                                "Please input your Package Name!"
                                        }
                                    ]
                                })(
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
                                )}
                            </Form.Item>

                            <Form.Item>
                                {getFieldDecorator("PackageName", {
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

const WrappedAddPackages = Form.create({ name: "normal_login" })(AddPackages);
export default WrappedAddPackages;
//export default VendorRegister;
