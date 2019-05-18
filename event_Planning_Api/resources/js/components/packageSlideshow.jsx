import React, { Component } from "react";
import { Carousel } from "antd";
import main from "../images/event-planning.jpg";
import alter from "../images/chopping.jpg";
import eventImage from "../images/event-image.jpg";
class PackageSlideShow extends Component {
    render() {
        return (
            <div>
                <Carousel autoplay>
                    <div>
                        <img
                            style={{ maxHeight: "100px" }}
                            src={eventImage}
                            alt={alter}
                            className="img-fluid"
                        />
                    </div>
                    <div>
                        <img
                            style={{ maxHeight: "100px" }}
                            src={alter}
                            alt={main}
                            className="img-fluid"
                        />
                    </div>
                </Carousel>
            </div>
        );
    }
}

export default PackageSlideShow;
