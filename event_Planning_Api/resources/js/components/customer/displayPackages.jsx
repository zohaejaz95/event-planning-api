import React, { Component } from "react";
//import { Server } from "http";
import { List, Button } from "antd";
class DisplayPackages extends Component {
    constructor(props) {
        super(props);
        this.state = {
            approve: [],
            pend: [],
            status: ""
        };
    }
    componentDidMount() {
        var data = this.props;
        console.log(this.props.approved);
        this.setState({
            approve: data.approved,
            pend: data.pending,
            status: data.status
        });
    }
    render() {
        return (
            <div>
                <br />
                <h5>Approved Orders</h5>
                <List
                    itemLayout="horizontal"
                    dataSource={this.state.approve}
                    renderItem={item => (
                        <List.Item>
                            <List.Item.Meta
                                title={<a href="/">{item.name}</a>}
                                description={item.description}
                            />
                            {this.state.status ? (
                                <Button type="primary">Paid</Button>
                            ) : (
                                <div />
                            )}
                        </List.Item>
                    )}
                />

                <h5>Pending Orders</h5>
                <List
                    itemLayout="horizontal"
                    dataSource={this.state.pend}
                    renderItem={item => (
                        <List.Item>
                            <List.Item.Meta
                                title={<a href="/">{item.name}</a>}
                                description={item.description}
                            />
                        </List.Item>
                    )}
                />
            </div>
        );
    }
}

export default DisplayPackages;
