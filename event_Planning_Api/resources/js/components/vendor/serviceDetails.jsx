import React, { Component } from "react";
import photography from "../../images/photography.jpg";
import { Avatar, Row, Col, Carousel, Card } from "antd";
//import sjh from "../../../../storage/app/public/services/";
import { getServImgs } from "./vendorFunctions";
import ReactPlayer from "react-player";
var pict = [];
const { Meta } = Card;
class ServiceDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pic_name: [],
            images: [],
            v: false,
            p: false,
            m: false,
            e: false,
            cr: false,
            c: false
        };
    }
    componentDidMount() {
        console.log(this.props.service);
        if (this.props.service.category == "venues") {
            this.setState({
                v: true,
                p: false,
                m: false,
                e: false,
                cr: false,
                c: false
            });
        } else if (this.props.service.category == "photographs") {
            this.setState({
                v: false,
                p: true,
                m: false,
                e: false,
                cr: false,
                c: false
            });
        } else if (this.props.service.category == "makeup artists") {
            this.setState({
                v: false,
                p: false,
                m: true,
                e: false,
                cr: false,
                c: false
            });
        } else if (this.props.service.category == "entertainment") {
            this.setState({
                v: false,
                p: false,
                m: false,
                e: true,
                cr: false,
                c: false
            });
        } else if (this.props.service.category == "car rental") {
            this.setState({
                v: false,
                p: false,
                m: false,
                e: false,
                cr: true,
                c: false
            });
        } else if (this.props.service.category == "catering") {
            this.setState({
                v: false,
                p: false,
                m: false,
                e: false,
                cr: false,
                c: true
            });
        }

        getServImgs(this.props.service.id).then(res => {
            if (res) {
                //var imga=res.data
                console.log(res);
                var arr = [];
                for (var i = 0; i < res.length; i++) {
                    arr = res[i];
                    var pic = arr.path;
                    var fields = pic.split("\\");
                    console.log(fields[9]);
                    console.log(pic);

                    this.state.pic_name.push(fields[9]);

                    pict.push(
                        require(`../../../../storage/app/public/services/` +
                            fields[9])
                    );
                    this.setState({
                        images: res.data
                    });
                }
            }
        });
    }

    render() {
        const show = this.props.service;
        return (
            <div>
                <div className="text-to-left">
                    <Row>
                        <Col
                            span={11}
                            offset={1}
                            style={{ background: "black" }}
                        >
                            <Carousel
                                autoplay
                                style={{ maxHeight: 400, background: "black" }}
                            >
                                {pict.map((imag, i) => (
                                    <div key={i}>
                                        <img
                                            alt="example"
                                            src={imag}
                                            style={{
                                                maxWidth: "100%",
                                                maxHeight: 450,
                                                display: "block",
                                                background: "black",
                                                marginLeft: "auto",
                                                marginRight: "auto"
                                            }}
                                        />
                                    </div>
                                ))}
                                <div
                                    style={{
                                        background: "black"
                                    }}
                                >
                                    <ReactPlayer
                                        style={{
                                            width: 530,
                                            height: 320,
                                            background: "black"
                                        }}
                                        url={show.videos}
                                    />
                                </div>
                            </Carousel>
                        </Col>
                        <Col span={10} offset={1}>
                            <Card style={{ width: "100%" }}>
                                <Meta
                                    title={show.service_name}
                                    description={show.category}
                                />
                                <br />

                                <table
                                    className="table table-striped "
                                    style={{ width: "100%" }}
                                >
                                    <tbody>
                                        <tr>
                                            <th>ID</th>
                                            <td>{show.id}</td>
                                        </tr>
                                        <tr>
                                            <th>Service Name</th>
                                            <td>{show.service_name}</td>
                                        </tr>
                                        <tr>
                                            <th>Event Type</th>
                                            <td>{show.event_type}</td>
                                        </tr>
                                        <tr>
                                            <th>Category</th>
                                            <td>{show.category}</td>
                                        </tr>
                                        <tr>
                                            <th>Price</th>
                                            <td>{"PKR " + show.price}</td>
                                        </tr>
                                        <tr>
                                            <th>Description</th>
                                            <td>{show.description}</td>
                                        </tr>
                                    </tbody>
                                </table>
                                <table
                                    className="table table-striped "
                                    style={{ width: "100%" }}
                                >
                                    {this.state.v ? (
                                        <tbody>
                                            <tr>
                                                <th>Address</th>
                                                <td>{show.Address}</td>
                                            </tr>
                                            <tr>
                                                <th>Start Time</th>
                                                <td>{show.start_time}</td>
                                            </tr>
                                            <tr>
                                                <th>End Time</th>
                                                <td>{show.end_time}</td>
                                            </tr>
                                        </tbody>
                                    ) : this.state.p ? (
                                        <tbody>
                                            <tr>
                                                <th>Photographer Name</th>
                                                <td>
                                                    {show.photographer_name}
                                                </td>
                                            </tr>
                                            <tr>
                                                <th>Contact Number</th>
                                                <td>{show.contact}</td>
                                            </tr>
                                            <tr>
                                                <th>Maximum Pictures</th>
                                                <td>{show.max_pictures}</td>
                                            </tr>
                                        </tbody>
                                    ) : this.state.m ? (
                                        <tbody>
                                            <tr>
                                                <th>Artist Name</th>
                                                <td>{show.name}</td>
                                            </tr>
                                        </tbody>
                                    ) : this.state.e ? (
                                        <tbody>
                                            <tr>
                                                <th>Band Name</th>
                                                <td>{show.bandname}</td>
                                            </tr>
                                            <tr>
                                                <th>No of Hours</th>
                                                <td>{show.hours}</td>
                                            </tr>
                                        </tbody>
                                    ) : this.state.cr ? (
                                        <tbody>
                                            <tr>
                                                <th>Car Company</th>
                                                <td>{show.car_name}</td>
                                            </tr>
                                            <tr>
                                                <th>Plate No.</th>
                                                <td>{show.plate_no}</td>
                                            </tr>
                                        </tbody>
                                    ) : this.state.c ? (
                                        <tbody>
                                            <tr>
                                                <th>Start Time</th>
                                                <td>{show.start_time}</td>
                                            </tr>
                                            <tr>
                                                <th>End Time</th>
                                                <td>{show.end_time}</td>
                                            </tr>
                                        </tbody>
                                    ) : (
                                        <tbody />
                                    )}
                                </table>
                            </Card>
                        </Col>
                    </Row>
                    <br />
                    {/* <Row>
                        <Col span={14}>
                            <Row>
                                {pict.map((imag, i) => (
                                    <Col span={24} key={i}>
                                        <img
                                            alt="example"
                                            src={imag}
                                            style={{ width: "100%" }}
                                        />
                                    </Col>
                                ))}
                            </Row>
                        </Col>
                        <Col span={9} offset={1}>
                            <ReactPlayer url={show.videos} playing />
                        </Col>
                    </Row>
                    <br />
                    <br />
                    <br />
                    <h6>ID: </h6> {show.id}
                    <h6>Event Type: </h6> {show.event_type}
                    <h6>Category: </h6> {show.category}
                    <h6>Price: </h6> {show.price}
                    <h6>Description: </h6>
                    <p>{show.description}</p> */}
                </div>
            </div>
        );
    }
}

export default ServiceDetails;
