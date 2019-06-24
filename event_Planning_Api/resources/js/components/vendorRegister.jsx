import React, { Component } from "react";
import {
    Form,
    Icon,
    Input,
    Button,
    Checkbox,
    Row,
    Col,
    Select,
    message,
    Upload
} from "antd";
import { register, vendorRegister } from "./userFunction";
import loginImage from "../images/form-img.jpg";
import ImageUploader from "react-images-upload";
//import { element } from "prop-types";
const props = {
    name: "file",

    action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
    headers: {
        authorization: "authorization-text"
    },
    onChange(info) {
        if (info.file.status !== "uploading") {
            console.log(info.file, info.fileList);
        }
        if (info.file.status === "done") {
            message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === "error") {
            message.error(`${info.file.name} file upload failed.`);
        }
    }
};
var pictures;
class VendorRegister extends Component {
    constructor(props) {
        super(props);
        this.state = {
            location: [],
            cities: [],
            sel: [],
            address: [],
            cat: [],
            name: ""
        };

        this.onDrop = this.onDrop.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.selectKeys = this.selectKeys.bind(this);
        this.selectCat = this.selectCat.bind(this);
        this.setAddress = this.setAddress.bind(this);
    }

    // onDrop(picture) {
    //     this.setState({
    //         pictures: this.state.pictures.concat(picture)
    //     });
    //     console.log(picture);
    // }
    onDrop(event) {
        var pic_name = event.target.files[0];
        this.setState({
            name: pic_name.name
        });
        // const data = new FormData();
        // data.append(`file`, event.target.files[0]);
        // data.append("name", "some value user types");
        // data.append("description", "some value user types");

        // pictures = data;
        // console.log(event.target.files[0]);
        // console.log(data);
        var reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);
        //var me = this;
        reader.onload = function() {
            var fileContent = reader.result;
            console.log(fileContent);
            pictures = fileContent;
            console.log(pictures);
        };
    }
    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log("Received values of form: ", values);
                console.log(this.state.address);
                var reg = {
                    name: values["userName"],
                    email: values["email"],
                    password: values["password"],
                    user_type: "vendor"
                };
                var image = values["logo"];
                //var con=values["contact"];
                var ven = {
                    vendor_name: values["vendor_name"],
                    contact: "92" + values["contact"],
                    website: values["website"],
                    description: values["description"],
                    logo: pictures,
                    img_name: this.state.name,
                    locations: {},
                    payment_methods: {},
                    categories: {}
                };
                var loc = [];
                var i, prev, curr;
                console.log(this.state.address.length);
                for (i = 0; i < this.state.address.length; i++) {
                    curr = this.state.address[i];
                    if (i == 0) {
                        loc.push(curr);
                    } else {
                        prev = this.state.address[i - 1];
                        if (curr.city == prev.city) {
                            loc.pop();
                            loc.push(curr);
                        } else {
                            loc.push(curr);
                        }
                    }
                }
                var serve = {};
                for (i = 0; i < loc.length; i++) {
                    serve["location" + (i + 1)] = loc[i];
                }
                ven.locations = serve;
                serve = {};
                for (i = 0; i < this.state.cat.length; i++) {
                    var cate = this.state.cat[i];
                    var gory = { category: cate.key };
                    serve["category" + (i + 1)] = gory;
                }
                ven.categories = serve;
                serve = {};
                for (i = 0; i < values.payment_methods.length; i++) {
                    var pay = values.payment_methods[i];
                    var pay_met = { method: pay.key };
                    serve["method" + (i + 1)] = pay_met;
                }
                ven.payment_methods = serve;
                console.log(ven);

                register(reg)
                    .then(res => {
                        if (res) {
                            vendorRegister(ven).then(res => {
                                if (res) {
                                    message.success(
                                        "Account created Successfully!"
                                    );
                                    var user = JSON.parse(
                                        localStorage.getItem("usertoken")
                                    );
                                    window.location.href =
                                        "http://localhost:8000/" +
                                        user.user_type;
                                } else {
                                    message.error("Unable to create Account!");
                                }
                            });
                        } else {
                            message.error("Unable to create Account!");
                        }
                    })
                    .catch(err => {
                        console.log(err);
                        console.log(typeof err);
                        if (err.response) {
                            console.log(err.response);
                            console.log(err.response.data.errors);
                        }
                    });
            } else {
                message.warn("Incorrect information!");
            }
        });
    }
    onChange(checkedValues) {
        console.log("checked = ", checkedValues);
        console.log(checkedValues[0]);
        this.setState({
            cities: checkedValues
        });
    }
    selectKeys(value) {
        //console.log(`selected ${value}`);
        console.log(value);
        this.setState({
            sel: value
        });
    }
    selectCat(value) {
        console.log(value);
        this.setState({
            cat: value
        });
    }
    setAddress(e, cities) {
        //console.log(this.state.address);
        var val = e.target.value;
        console.log(cities + " : " + val);
        var add = {
            city: cities,
            address: val
        };
        this.state.address.push(add);
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { TextArea } = Input;
        const Option = Select.Option;
        const bgForm = {
            backgroundImage: "url(" + loginImage + "})",
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat"
        };
        const prefixSelector = getFieldDecorator("prefix", {
            initialValue: "92"
        })(
            <Select>
                <Option value="92">+92</Option>
            </Select>
        );

        return (
            <div className="contents" styles={bgForm}>
                <br />
                <br />
                <br />
                <br />
                <Row>
                    <Col span={12} offset={6}>
                        <h4 className="text-to-left">
                            Vendor Signup to EventEra
                        </h4>
                        <br />
                        <Form
                            onSubmit={this.handleSubmit}
                            className="login-form "
                        >
                            <input type="file" onChange={this.onDrop} />
                            {/* <ImageUploader
                                withIcon={true}
                                buttonText="Choose images"
                                onChange={this.onDrop}
                                imgExtension={[".jpg", ".gif", ".png", ".gif"]}
                                maxFileSize={5242880}
                            /> */}
                            {/* <Form.Item>
                                {getFieldDecorator("logo", {
                                    rules: [
                                        {
                                            required: true,
                                            message:
                                                "Please input your Company Name!"
                                        }
                                    ]
                                })(
                                    <Upload {...props}>
                                        <Button>
                                            <Icon type="upload" /> Click to
                                            Upload
                                        </Button>
                                    </Upload>
                                )}
                            </Form.Item> */}
                            <Form.Item>
                                {getFieldDecorator("vendor_name", {
                                    rules: [
                                        {
                                            required: true,
                                            message:
                                                "Please input your Company Name!"
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
                                        placeholder="Company Name"
                                    />
                                )}
                            </Form.Item>

                            <Form.Item>
                                {getFieldDecorator("email", {
                                    rules: [
                                        {
                                            type: "email",
                                            message:
                                                "The input is not valid E-mail!"
                                        },
                                        {
                                            required: true,
                                            message: "Please input your E-mail!"
                                        }
                                    ]
                                })(
                                    <Input
                                        prefix={
                                            <Icon
                                                type="mail"
                                                style={{
                                                    color: "rgba(0,0,0,.25)"
                                                }}
                                            />
                                        }
                                        placeholder="Email"
                                    />
                                )}
                            </Form.Item>
                            <Form.Item>
                                {getFieldDecorator("userName", {
                                    rules: [
                                        {
                                            required: true,
                                            message:
                                                "Please input your username!"
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
                                        placeholder="Username"
                                    />
                                )}
                            </Form.Item>
                            <Form.Item>
                                {getFieldDecorator("password", {
                                    rules: [
                                        {
                                            required: true,
                                            message:
                                                "Please input your Password!"
                                        },
                                        {
                                            min: 6,
                                            message:
                                                "Password must be atleast 6 characters!"
                                        }
                                    ]
                                })(
                                    <Input.Password
                                        prefix={
                                            <Icon
                                                type="lock"
                                                style={{
                                                    color: "rgba(0,0,0,.25)"
                                                }}
                                            />
                                        }
                                        type="password"
                                        placeholder="Password"
                                    />
                                )}
                            </Form.Item>

                            <Form.Item>
                                {getFieldDecorator("contact", {
                                    rules: [
                                        {
                                            required: true,
                                            message:
                                                "Please input your Contact No.!"
                                        },
                                        {
                                            pattern: "[0-9]{10}",
                                            message: "Invalid Contact Number!"
                                        },
                                        ,
                                        {
                                            max: 10,
                                            message: "Contact no out of range!"
                                        }
                                    ]
                                })(
                                    <Input
                                        addonBefore={prefixSelector}
                                        prefix={
                                            <Icon
                                                type="phone"
                                                style={{
                                                    color: "rgba(0,0,0,.25)"
                                                }}
                                            />
                                        }
                                        placeholder="Contact No."
                                    />
                                )}
                            </Form.Item>

                            <Form.Item>
                                {getFieldDecorator("website", {
                                    rules: [
                                        {
                                            required: true,
                                            message: "Please input website!"
                                        }
                                    ]
                                })(<Input placeholder="mysite" />)}
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
                                    <Select
                                        mode="multiple"
                                        labelInValue
                                        onChange={this.selectCat}
                                        placeholder="Select Category"
                                    >
                                        <Option value="photographs">
                                            Photography
                                        </Option>
                                        <Option value="videography">
                                            Videography
                                        </Option>
                                        <Option value="makeup artists">
                                            Makeup Artist
                                        </Option>
                                        <Option value="decorators">
                                            Decorators
                                        </Option>
                                        <Option value="designers">
                                            Designers
                                        </Option>
                                        <Option value="venues">Venues</Option>
                                        <Option value="cards">
                                            Invitations and Cards
                                        </Option>
                                        <Option value="catering">
                                            Food and Catering Services
                                        </Option>
                                        <Option value="entertainment">
                                            Music and Entertainment
                                        </Option>
                                        <Option value="car rental">
                                            Car Rental Services
                                        </Option>
                                        <Option value="event planners">
                                            Event Planners
                                        </Option>
                                    </Select>
                                )}
                            </Form.Item>

                            <Form.Item>
                                {getFieldDecorator("description", {
                                    rules: [
                                        {
                                            required: true,
                                            message: "Please input description!"
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
                                {getFieldDecorator("payment_methods", {
                                    rules: [
                                        {
                                            required: true,
                                            message:
                                                "Please select your payment methods!"
                                        }
                                    ]
                                })(
                                    <Select
                                        labelInValue
                                        mode="multiple"
                                        style={{ width: "100%" }}
                                        placeholder="Select payment methods"
                                        onChange={this.selectKeys}
                                    >
                                        <Option value="cash">Cash</Option>
                                        <Option value="credit card">
                                            Credit Card
                                        </Option>
                                        <Option value="debit card">
                                            Debit Card
                                        </Option>
                                    </Select>
                                )}
                            </Form.Item>

                            <Form.Item>
                                <div className="text-to-left">
                                    <label>Cities:</label>
                                    <br />
                                </div>
                                <Checkbox.Group
                                    style={{ width: "100%" }}
                                    onChange={this.onChange}
                                >
                                    <Row>
                                        <Col span={8}>
                                            <Checkbox value="Islamabad">
                                                Islamabad
                                            </Checkbox>
                                        </Col>
                                        <Col span={8}>
                                            <Checkbox value="Lahore">
                                                Lahore
                                            </Checkbox>
                                        </Col>
                                        <Col span={8}>
                                            <Checkbox value="Karachi">
                                                Karachi
                                            </Checkbox>
                                        </Col>
                                    </Row>
                                </Checkbox.Group>
                            </Form.Item>

                            {this.state.cities.map((city, i) => (
                                <Form.Item key={i}>
                                    {city + ": "}
                                    <Input
                                        placeholder="Enter Address"
                                        onChange={e => this.setAddress(e, city)}
                                    />
                                </Form.Item>
                            ))}

                            <Form.Item className="text-to-left">
                                {getFieldDecorator("remember", {
                                    valuePropName: "checked",
                                    initialValue: true
                                })(<Checkbox>Remember me</Checkbox>)}
                                <a className="login-form-forgot" href="/">
                                    Forgot password
                                </a>
                                <br />
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    className="login-form-button"
                                >
                                    Register
                                </Button>
                                <br />
                                Or <a href="/">login now!</a>
                            </Form.Item>
                        </Form>
                    </Col>
                </Row>
            </div>
        );
    }
}

const WrappedVendorRegister = Form.create({ name: "normal_login" })(
    VendorRegister
);
export default WrappedVendorRegister;
//export default VendorRegister;
