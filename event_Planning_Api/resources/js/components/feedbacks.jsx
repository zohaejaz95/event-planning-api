import React, { Component } from "react";
import CustFeedbackForm from "./customer/custFeedbackForm";
import { Comment, Rate, Avatar, message } from "antd";
import { getFeedback, getCustomer } from "./customer/customerFunction";
class Feedbacks extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            cust: []
        };
    }
    componentDidMount() {
        var id;
        var feedbackPath;
        if (this.props.type == "service") {
            var id = this.props.details.id;
            feedbackPath = "api/customer/feedbacks/service/" + id;
            getFeedback(feedbackPath).then(res => {
                if (res) {
                    var c_id;
                    //here get customer name and add it in list array to print later
                    for (var i = 0; i < res.data.length; i++) {
                        c_id = res.data[i];
                        //this.state.cust.push("");
                        getCustomer(c_id.customer_id).then(response => {
                            if (response) {
                                c_id["name"] =
                                    response.first_name +
                                    " " +
                                    response.last_name;
                                console.log(this.state.cust);
                                this.state.cust[i] =
                                    response.first_name +
                                    " " +
                                    response.last_name;

                                //res.data[i] = c_id;
                                //this.state.cust.push()
                                //this.state.list.push(c_id);
                                console.log("List: " + this.state.list);
                            } else {
                                this.state.cust[i] = "user";
                            }
                        });
                    }
                    this.setState({
                        list: res.data
                    });

                    //console.log(res.data);
                } else {
                    message.warning("Couldn't load user feedback!");
                }
            });
        } else {
            var id = this.props.details.p_id;
            feedbackPath = "api/customer/feedbacks/package/" + id;
        }
        console.log(feedbackPath + id);
    }
    render() {
        //var obj = this.state.list;
        return (
            <div>
                <h5 className="text-to-left">Ratings and Comments</h5>
                {this.state.list.map((fb, i) => (
                    <div key={i} className="text-to-left">
                        <Rate disabled defaultValue={fb.rating} />
                        <Comment
                            author={<a>User</a>}
                            avatar={
                                <Avatar
                                    src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                                    alt="Han Solo"
                                />
                            }
                            content={<p>{fb.comments}</p>}
                        />
                    </div>
                ))}

                <br />
                <CustFeedbackForm
                    type={this.props.type}
                    details={this.props.details}
                />
                <br />
            </div>
        );
    }
}

export default Feedbacks;
