import React, { Component } from "react";
import { List, Avatar, Button, Icon, Collapse } from "antd";
import avatar from "../../images/avatar.jpg";

const Panel = Collapse.Panel;
const ButtonGroup = Button.Group;
const data = [
    {
        num: 1,
        title: "Sponsor 1"
    },
    {
        num: 2,
        title: "Sponsor 2"
    },
    {
        num: 3,
        title: "Sponsor 3"
    },
    {
        num: 4,
        title: "Sponsor 4"
    },
    {
        num: 5,
        title: "Sponsor 5"
    }
];
const customPanelStyle = {
    background: "#f7f7f7",
    borderRadius: 4,
    marginBottom: 24,
    border: 0,
    overflow: "hidden"
};

class SponsorRequest extends Component {
    render() {
        return (
            <div>
                <div>
                    <List
                        itemLayout="horizontal"
                        dataSource={data}
                        renderItem={item => (
                            <div>
                                <List.Item>
                                    <List.Item.Meta
                                        avatar={<Avatar src={avatar} />}
                                        title={<p>{item.title}</p>}
                                        description="Customer Name"
                                    />
                                </List.Item>
                                <Collapse
                                    bordered={false}
                                    defaultActiveKey={["1"]}
                                >
                                    <Panel
                                        header="Details"
                                        key={item.num}
                                        style={customPanelStyle}
                                    >
                                        <p>Service/Package Name:</p>
                                        <p>Payment Method:</p>
                                        <p>Description:</p>
                                        <p>
                                            Lorem, ipsum dolor sit amet
                                            consectetur adipisicing elit.
                                            Deserunt neque iste architecto
                                            beatae labore provident, consectetur
                                            qui ducimus numquam vero et sint
                                            voluptatibus doloribus fugiat eum
                                            ratione quibusdam dicta eius.
                                        </p>
                                        <Button type="primary">Accept</Button>
                                        <Button type="danger">Reject</Button>
                                    </Panel>
                                </Collapse>
                            </div>
                        )}
                    />
                    <br />
                    <ButtonGroup>
                        <Button type="primary">
                            <Icon type="left" />
                            Previous
                        </Button>
                        <Button type="primary">
                            Next
                            <Icon type="right" />
                        </Button>
                    </ButtonGroup>
                </div>
            </div>
        );
    }
}

export default SponsorRequest;
