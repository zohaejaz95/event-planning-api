import React, { Component } from "react";
import photography from "../../images/photography.jpg";
import { Avatar, Row, Col } from "antd";
//import sjh from "../../../../storage/app/public/services/";
import { getServImgs } from "./vendorFunctions";
import ReactPlayer from "react-player";
var pict = [];
class ServiceDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pic_name: [],
            images: []
        };
    }
    componentDidMount() {
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
                    <span>
                        <h4>{show.service_name}</h4>
                    </span>
                    <br />
                    <Row>
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
                    <p>{show.description}</p>
                </div>
            </div>
        );
    }
}

export default ServiceDetails;
