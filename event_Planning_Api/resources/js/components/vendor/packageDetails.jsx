import React, { Component } from "react";
import ServiceDetails from "./serviceDetails";
//import photography from "../../../../storage/app/public/packages/1561441602_leonardo.jpg";
import { Row, Col, Carousel, Card } from "antd";
import ReactPlayer from "react-player";
import { getPckgImgs, getPckgPrice, getPckgServices } from "./vendorFunctions";
//var pict = [];
const { Meta } = Card;
class PackageDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: [],
            services: [],
            pic_name: [],
            pict: [],
            price: ""
        };
    }
    componentDidMount() {
        //console.log
        getPckgImgs(this.props.package.p_id).then(res => {
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

                    this.state.pict.push(
                        require(`../../../../storage/app/public/packages/` +
                            fields[9])
                    );
                }
            }
        });
        getPckgPrice(this.props.package.p_id).then(res => {
            if (res) {
                this.setState({
                    price: res.data.price
                });
                console.log(res);
            }
        });
        getPckgServices(this.props.package.p_id).then(res => {
            if (res) {
                this.setState({
                    services: res.data
                });
            }
        });
    }
    render() {
        const show = this.props.package;

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
                                {this.state.pict.map((imag, i) => (
                                    <div key={i}>
                                        <img
                                            alt={this.state.pic_name[i]}
                                            src={imag}
                                            style={{
                                                maxWidth: "100%",
                                                height: 450,
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
                                    title={show.name}
                                    description={"PKR" + this.state.price}
                                />
                                <br />
                                <table className="table table-striped ">
                                    <tbody>
                                        <tr>
                                            <th>ID</th>
                                            <td>{show.p_id}</td>
                                        </tr>
                                        <tr>
                                            <th>Package Name</th>
                                            <td>{show.name}</td>
                                        </tr>
                                        <tr>
                                            <th>Total Price</th>
                                            <td>{"PKR" + this.state.price}</td>
                                        </tr>
                                        <tr>
                                            <th>Availability</th>
                                            <td>{show.expiration_date}</td>
                                        </tr>
                                        <tr>
                                            <th>Description</th>
                                            <td>{show.description}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </Card>
                        </Col>
                    </Row>
                    <br />
                    <h4>Services Offered</h4>
                    <br />
                    <Carousel autoplay>
                        {this.state.services.map((serv, i) => (
                            <div key={i}>
                                <ServiceDetails service={serv} />
                            </div>
                        ))}
                    </Carousel>
                </div>
            </div>
        );
    }
}

export default PackageDetails;
