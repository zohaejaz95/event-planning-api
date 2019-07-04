import React, { Component } from "react";
import photography from "../../../../storage/app/public/packages/1561441602_leonardo.jpg";
import { Row, Col } from "antd";
import ReactPlayer from "react-player";
import { getPckgImgs } from "./vendorFunctions";
var pict = [];
class ServiceDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: [],
            services: [],
            pic_name: [],
            pict: []
        };
    }
    componentDidMount() {
        //console.log
        getPckgImgs(this.props.package.p_id).then(res => {
            if (res) {
                //var imga=res.data
                console.log(res);
                var arr = [];
                for (var i = 0; i <= res.length; i++) {
                    arr = res[i];
                    var pic = arr.path;
                    var fields = pic.split("\\");
                    console.log(fields[9]);
                    console.log(pic);

                    this.state.pic_name.push(fields[9]);

                    this.state.pict.push(
                        require(`../../../../storage/app/public/packages/` +
                            fields[9])
                    );
                }
            }
        });
    }
    render() {
        const show = this.props.package;

        return (
            <div>
                <div className="text-to-left">
                    <span>
                        <h4>{show.name}</h4>
                    </span>
                    <br />
                    <Row>
                        <Col span={14}>
                            <img
                                src={photography}
                                alt=""
                                style={{ width: "100%" }}
                            />
                            {/* {this.state.pict.map((imag, i) => (
                                <img
                                    key={i}
                                    alt="example"
                                    src={imag}
                                    style={{ width: "100%" }}
                                />
                            ))} */}
                        </Col>
                        <Col span={9} offset={1}>
                            <ReactPlayer url={show.videos} playing />
                        </Col>
                    </Row>
                    <br />
                    <br />
                    <br />
                    <h6>ID: </h6> {show.p_id}
                    <h6>Availability: </h6> {show.expiration_date}
                    <h6>Description: </h6>
                    <p>{show.description}</p>
                    <br />
                </div>
            </div>
        );
    }
}

export default ServiceDetails;
