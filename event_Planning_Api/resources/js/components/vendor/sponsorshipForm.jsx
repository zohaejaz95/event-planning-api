import React, { Component } from "react";
import {
    Form,
    InputNumber,
    Select,
    Button,
    Radio,
    Row,
    Col,
    message
} from "antd";
import { getAllServices, createSponsorship } from "./vendorFunctions";
//import loginImage from "../../images/Pakistani-Wedding.png";
function onChange(value) {
    console.log("changed", value);
}
function onChangeServ(value) {
    console.log(`selected ${value}`);
}

function onBlur() {
    console.log("blur");
}

function onFocus() {
    console.log("focus");
}

function onSearch(val) {
    console.log("search:", val);
}
class SponsorshipForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: "",
            services: [],
            cash: true,
            serv: true
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentWillMount() {
        getAllServices().then(res => {
            if (res) {
                this.setState({
                    services: res
                });
                console.log(res);
            }
        });
    }
    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                values["type"] = this.state.value;
                var list = this.props.ngo_data;
                values["ngo_id"] = list.ngo_id;
                values["nevent_id"] = list.event_id;
                console.log("Received values of form: ", values);
                createSponsorship(values).then(res => {
                    if (res) {
                        message.success("Request Submission Successful");
                    } else {
                        message.error("Unable to complete request!");
                    }
                });
            }
        });
    }
    onChange1(e) {
        console.log("radio checked", e.target.value);
        this.setState({
            value: e.target.value
        });
        if (e.target.value == "cash") {
            this.setState({
                cash: false,
                serv: true
            });
        } else {
            this.setState({
                serv: false,
                cash: true
            });
        }
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const { Option } = Select;
        const options = [
            { label: "Financial", value: "cash" },
            { label: "Service", value: "service" }
        ];
        return (
            <div className="contents">
                <Row>
                    <Col span={12} offset={1}>
                        <h4 className="text-to-left">Sponsorship</h4>
                        <br />
                        <Form
                            onSubmit={this.handleSubmit}
                            className="login-form "
                        >
                            <Form.Item>
                                <div className="text-to-left">
                                    <label>Type:</label>
                                    <br />{" "}
                                </div>

                                <Radio.Group
                                    options={options}
                                    onChange={e => this.onChange1(e)}
                                    value={this.state.value}
                                />
                            </Form.Item>
                            <Form.Item>
                                {getFieldDecorator("donation")(
                                    <InputNumber
                                        id="don"
                                        disabled={this.state.cash}
                                        style={{ width: "100%" }}
                                        min={0}
                                        max={1000000}
                                        onChange={onChange}
                                        placeholder="Amount"
                                    />
                                )}
                            </Form.Item>
                            <Form.Item>
                                {getFieldDecorator("service_id")(
                                    <Select
                                        disabled={this.state.serv}
                                        showSearch
                                        style={{ width: "100%" }}
                                        placeholder="Select a service"
                                        optionFilterProp="children"
                                        onChange={onChangeServ}
                                        onFocus={onFocus}
                                        onBlur={onBlur}
                                        onSearch={onSearch}
                                        filterOption={(input, option) =>
                                            option.props.children
                                                .toLowerCase()
                                                .indexOf(input.toLowerCase()) >=
                                            0
                                        }
                                    >
                                        {this.state.services.map((item, i) => (
                                            <Option value={item.id} key={i}>
                                                {item.service_name}
                                            </Option>
                                        ))}
                                    </Select>
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

const WrappedSponsorshipForm = Form.create({ name: "normal_login" })(
    SponsorshipForm
);
export default WrappedSponsorshipForm;
//export default VendorRegister;
