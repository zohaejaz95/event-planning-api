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
import {
    getVendorServices,
    createPackages,
    addImgPackages
} from "./vendorFunctions";
var pictures = [];
const dateFormat = "YYYY-MM-DD";
//import loginImage from "../../images/Pakistani-Wedding.png";
class AddPackages extends Component {
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
            expiration_date: "",
            name: [],
            pictures: []
        };
        this.onDrop = this.onDrop.bind(this);

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
                        var val = {};
                        for (var i = 0; i < pictures.length; i++) {
                            val = {
                                img_name: this.state.name[i],
                                image: pictures[i]
                            };
                            addImgPackages(res, val).then(response => {
                                if (response) {
                                    console.log("Images added successfully!");
                                    console.log(response);
                                } else {
                                    console.log("Images couldn't be saved!");
                                }
                            });
                        }
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

    onDrop(event) {
        var files = event.target.files;
        if (files.length > 4) {
            message.warning("Upto 4 images can be uploaded!!");
        } else {
            for (var i = 0; i < files.length; i++) {
                var fil = files[i];
                this.state.name.push(fil.name);
                console.log(fil.name);
                console.log(fil);
                var reader = new FileReader();
                reader.readAsDataURL(fil);
                reader.onload = function() {
                    var fileContent = reader.result;
                    console.log(fileContent);
                    pictures.push(fileContent);
                    //pictures = fileContent;
                };
                //console.log(pictures[i]);
            }
        }
        //console.log(this.state.pictures);
        // var pic_name = event.target.files[0];
        // console.log(event.target.files);
        // console.log(pic_name);
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
                            <input
                                type="file"
                                onChange={this.onDrop}
                                multiple
                            />
                            <br />
                            <Form.Item>
                                {getFieldDecorator("videos")(
                                    <Input
                                        prefix={
                                            <Icon
                                                type="upload"
                                                style={{
                                                    color: "rgba(0,0,0,.25)"
                                                }}
                                            />
                                        }
                                        placeholder="Video URL"
                                    />
                                )}
                            </Form.Item>
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
                                        // prefix={
                                        //     <Icon
                                        //         type="user"
                                        //         style={{
                                        //             color: "rgba(0,0,0,.25)"
                                        //         }}
                                        //     />
                                        // }
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
                                {getFieldDecorator(
                                    "description"
                                    // , {
                                    //     rules: [
                                    //         {
                                    //             required: true,
                                    //             message:
                                    //                 "Please input your Package Name!"
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
