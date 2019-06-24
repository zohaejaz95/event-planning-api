import React, { Component } from "react";
import {
    Form,
    Icon,
    Input,
    InputNumber,
    Button,
    TimePicker,
    Select,
    Row,
    Col,
    message
} from "antd";
import moment from "moment";
//import loginImage from "../../images/Pakistani-Wedding.png";
import { createService, addImgServices } from "./vendorFunctions";
//import GetImage from "../getImage";
function onChange(checkedValues) {
    console.log("checked = ", checkedValues);
}
// var stime = "";
// var etime = "";
// function onChangeStartTime(time, timeString) {
//     stime = timeString;
//     console.log(time, timeString);
//     console.log(stime);
// }
// function onChangeEndTime(time, timeString) {
//     etime = timeString;
//     console.log(time, timeString);
//     console.log(etime);
// }
var pictures = [];
//const Option = Select.Option;
class AddService extends Component {
    constructor() {
        super();
        this.state = {
            category: "",
            counter: 0,
            dishes: [],
            ven: [],
            photo: [],
            car: [],
            make: [],
            enter: [],
            cat: [],
            name: [],
            pictures: []
        };

        this.onDrop = this.onDrop.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.updateForm = this.updateForm.bind(this);
        this.dishesNumber = this.dishesNumber.bind(this);
        //onChange
        this.onChangeAddress = this.onChangeAddress.bind(this);
        this.onChangeStartTime = this.onChangeStartTime.bind(this);
        this.onChangeEndTime = this.onChangeEndTime.bind(this);
        this.onChangePhotographer = this.onChangePhotographer.bind(this);
        this.onChangeContact = this.onChangeContact.bind(this);
        this.onChangePic = this.onChangePic.bind(this);
        this.onChangeCarName = this.onChangeCarName.bind(this);
        this.onChangePlate = this.onChangePlate.bind(this);
        this.onChangeArtist = this.onChangeArtist.bind(this);
        this.onChangeBandName = this.onChangeBandName.bind(this);
        this.onChangeHours = this.onChangeHours.bind(this);
        this.onChangeDishes = this.onChangeDishes.bind(this);
    }
    //on Change Venues
    onChangeAddress(value) {
        this.state.ven["Address"] = value;
    }
    onChangeStartTime(time, timeString) {
        if (this.state.category == "venues") {
            this.state.ven["start_time"] = timeString;
        } else {
            this.state.cat["start_time"] = timeString;
        }
    }
    onChangeEndTime(time, timeString) {
        if (this.state.category == "venues") {
            this.state.ven["end_time"] = timeString;
        } else {
            this.state.cat["end_time"] = timeString;
        }
    }
    //onChange photography
    onChangePhotographer(e) {
        console.log(e.target.value);
        this.state.photo["photographer_name"] = e.target.value;
    }
    onChangeContact(e) {
        this.state.photo["contact"] = Number(e.target.value);
    }
    onChangePic(value) {
        this.state.photo["max_pictures"] = value;
    }
    //onChange Car rentals
    onChangeCarName(e) {
        this.state.car["car_name"] = e.target.value;
    }
    onChangePlate(e) {
        this.state.car["plate_no"] = e.target.value;
    }
    //onChange makeup artist
    onChangeArtist(e) {
        this.state.make["name"] = e.target.value;
    }
    //onchange entertainment
    onChangeBandName(e) {
        this.state.enter["band_name"] = e.target.value;
    }
    onChangeHours(e) {
        this.state.enter["hours"] = e.target.value;
    }
    //onChange catering
    onChangeDishes(e, num) {
        console.log(e.target.value + num);
        this.state.cat[num] = { dish: e.target.value };
    }

    dishesNumber(value) {
        //var val = e.targte.value;
        console.log(value);
        this.setState({
            counter: value
        });
        var i;
        this.state.dishes = [];
        for (i = 0; i < value; i++) {
            this.state.dishes[i] = "dishes" + (i + 1);
            //this.state.dishes.push("dishes" + i);
            //this.state.cat["dishes" + i] = { dish: "" };
        }
    }
    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                var cat = this.state.category;
                if (cat == "photographs") {
                    values["photographer_name"] = this.state.photo[
                        "photographer_name"
                    ];
                    values["contact"] = this.state.photo["contact"];
                    values["max_pictures"] = this.state.photo["max_pictures"];
                } else if (cat == "venues") {
                    values["Address"] = this.state.ven["Address"];
                    values["start_time"] = this.state.ven["start_time"];
                    values["end_time"] = this.state.ven["end_time"];
                } else if (cat == "car_rental") {
                    values["car_name"] = this.state.car["car_name"];
                    values["plate_no"] = this.state.car["plate_no"];
                } else if (cat == "makeup_artists") {
                    values["name"] = this.state.make["name"];
                } else if (cat == "entertainments") {
                    values["bandname"] = this.state.enter["bandname"];
                    values["hours"] = this.state.enter["hours"];
                } else if (cat == "caterings") {
                    values["start_time"] = this.state.cat["start_time"];
                    values["end_time"] = this.state.cat["end_time"];
                    var dsh = {};
                    for (var j = 0; j < this.state.counter; j++) {
                        dsh["dish" + j] = this.state.cat["dish" + j];
                    }
                    values["dishes"] = dsh;
                }
                console.log("Received values of form: ", values);
                createService(values).then(res => {
                    if (res) {
                        var val = {};
                        for (var i = 0; i < pictures.length; i++) {
                            val = {
                                img_name: this.state.name[i],
                                image: pictures[i]
                            };
                            addImgServices(res, val).then(response => {
                                if (response) {
                                    console.log("Images added successfully!");
                                } else {
                                    console.log("Images couldn't be saved!");
                                }
                            });
                        }
                        message.success("Service created!");
                    } else {
                        message.error("Something went wrong!");
                    }
                });
            }
        });
    }

    onDrop(event) {
        var files = event.target.files;
        for (var i = 0; i < files.length; i++) {
            var fil = files[i];
            this.setState({
                name: fil.name
            });
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
        //console.log(this.state.pictures);
        // var pic_name = event.target.files[0];
        // console.log(event.target.files);
        // console.log(pic_name);
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
        const prefixSelector = getFieldDecorator("prefix", {
            initialValue: "92"
        })(
            <Select>
                <Option value="92">+92</Option>
            </Select>
        );
        const venue = (
            <div>
                <Form.Item>
                    <Input
                        placeholder="Enter Address"
                        onChange={this.onChangeAddress}
                    />
                </Form.Item>
                <Form.Item>
                    <TimePicker
                        style={{ width: 300 }}
                        placeholder="Start Time"
                        onChange={this.onChangeStartTime}
                        defaultOpenValue={moment("00:00:00", "HH:mm:ss")}
                    />
                </Form.Item>
                <Form.Item>
                    <TimePicker
                        style={{ width: 300 }}
                        placeholder="End Time"
                        onChange={this.onChangeEndTime}
                        defaultOpenValue={moment("00:00:00", "HH:mm:ss")}
                    />
                </Form.Item>
            </div>
        );
        const photograph = (
            <div>
                <Form.Item>
                    <Input
                        placeholder="Enter Photographer Name"
                        onChange={this.onChangePhotographer}
                    />
                </Form.Item>
                <Form.Item>
                    <Input
                        addonBefore={prefixSelector}
                        placeholder="Enter Contact No"
                        onChange={this.onChangeContact}
                    />
                </Form.Item>
                <Form.Item>
                    <InputNumber
                        style={{ width: 300 }}
                        min={1}
                        max={1000000}
                        placeholder="Max Number of Pictures"
                        onChange={this.onChangePic}
                    />
                </Form.Item>
            </div>
        );
        const makeup = (
            <div>
                <Form.Item>
                    <Input
                        placeholder="Enter Makeup Artist Name"
                        onChange={this.onChangeArtist}
                    />
                </Form.Item>
            </div>
        );
        const entertain = (
            <div>
                <Form.Item>
                    <Input
                        placeholder="Enter Band Name"
                        onChange={this.onChangeBandName}
                    />
                </Form.Item>
                <Form.Item>
                    <InputNumber
                        style={{ width: 300 }}
                        min={1}
                        max={24}
                        placeholder="Number of Hours"
                        onChange={this.onChangeHours}
                    />
                </Form.Item>
            </div>
        );
        const car = (
            <div>
                <Form.Item>
                    <Input
                        placeholder="Enter Car Name"
                        onChange={this.onChangeCarName}
                    />
                </Form.Item>
                <Form.Item>
                    <Input
                        placeholder="Enter Plate Number"
                        onChange={this.onChangePlate}
                    />
                </Form.Item>
            </div>
        );
        const cater = (
            <div>
                <Form.Item>
                    <TimePicker
                        style={{ width: 300 }}
                        placeholder="Start Time"
                        onChange={this.onChangeStartTime}
                        defaultOpenValue={moment("00:00:00", "HH:mm:ss")}
                    />
                </Form.Item>
                <Form.Item>
                    <TimePicker
                        style={{ width: 300 }}
                        placeholder="End Time"
                        onChange={this.onChangeEndTime}
                        defaultOpenValue={moment("00:00:00", "HH:mm:ss")}
                    />
                </Form.Item>

                <Form.Item>
                    <InputNumber
                        style={{ width: 300 }}
                        min={1}
                        max={1000}
                        placeholder="Number of Dishes"
                        onChange={this.dishesNumber}
                    />
                </Form.Item>
                {this.state.dishes.map((dish, i) => (
                    <Form.Item key={i}>
                        <Input
                            placeholder="Enter Dish Name"
                            onChange={e => this.onChangeDishes(e, dish)}
                        />
                    </Form.Item>
                ))}
            </div>
        );
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
                            {/* <Form.Item>
                                <GetImage />
                            </Form.Item> */}
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
                                        <Option
                                            value="videography"
                                            onClick={() => this.updateForm("")}
                                        >
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
                                        <Option
                                            value="decorators"
                                            onClick={() => this.updateForm("")}
                                        >
                                            Decorators
                                        </Option>
                                        <Option
                                            value="designers"
                                            onClick={() => this.updateForm("")}
                                        >
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
                                        <Option
                                            value="cards"
                                            onClick={() => this.updateForm("")}
                                        >
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
                                        <Option
                                            value="event planners"
                                            onClick={() => this.updateForm("")}
                                        >
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

                            {this.state.category == "photographs" ? (
                                photograph
                            ) : this.state.category == "venues" ? (
                                venue
                            ) : this.state.category == "car_rental" ? (
                                car
                            ) : this.state.category == "makeup_artists" ? (
                                makeup
                            ) : this.state.category == "entertainments" ? (
                                entertain
                            ) : this.state.category == "caterings" ? (
                                cater
                            ) : (
                                <div />
                            )}
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
