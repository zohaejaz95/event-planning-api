import React, { Component } from "react";
import CustFeedbackForm from "./customer/custFeedbackForm";
import { Comment, Rate, Avatar } from "antd";

class Feedbacks extends Component {
    render() {
        return (
            <div>
                <h5 className="text-to-left">Ratings and Comments</h5>
                <Rate disabled defaultValue={2} />
                <Comment
                    author={<a>Han Solo</a>}
                    avatar={
                        <Avatar
                            src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                            alt="Han Solo"
                        />
                    }
                    content={
                        <p>
                            We supply a series of design principles, practical
                            patterns and high quality design resources (Sketch
                            and Axure), to help people create their product
                            prototypes beautifully and efficiently.
                        </p>
                    }
                />
                <br />
                <CustFeedbackForm />
                <br />
            </div>
        );
    }
}

export default Feedbacks;
