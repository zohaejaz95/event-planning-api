import React, { Component } from "react";
import {
    List,
    Avatar,
    Button,
    Icon,
    Collapse,
    Modal,
    Checkbox,
    message
} from "antd";
import avatar from "../../images/avatar.jpg";

const confirm = Modal.confirm;
const Panel = Collapse.Panel;
const ButtonGroup = Button.Group;
const data = [
    {
        num: 1,
        title: "Sponsorship Event 1"
    },
    {
        num: 2,
        title: "Sponsorship Event 2"
    },
    {
        num: 3,
        title: "Sponsorship Event 3"
    },
    {
        num: 4,
        title: "Sponsorship Event 4"
    },
    {
        num: 5,
        title: "Sponsorship Event 5"
    }
];
const customPanelStyle = {
    background: "#f7f7f7",
    borderRadius: 4,
    marginBottom: 24,
    border: 0,
    overflow: "hidden"
};
function showDeleteConfirm() {
    confirm({
        title: "Are you sure delete this task?",
        content: "Some descriptions",
        okText: "Yes",
        okType: "danger",
        cancelText: "No",
        onOk() {
            console.log("OK");
            message.success("Click on Yes");
        },
        onCancel() {
            console.log("Cancel");
            message.error("Click on No");
        }
    });
}

class Sponsorships extends Component {
    render() {
        return (
            <div>
                <h4>Sponsored Events</h4>
                <hr />
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
                                        description="NGO Name"
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
                                        <p>
                                            Lorem, ipsum dolor sit amet
                                            consectetur adipisicing elit.
                                            Deserunt neque iste architecto
                                            beatae labore provident, consectetur
                                            qui ducimus numquam vero et sint
                                            voluptatibus doloribus fugiat eum
                                            ratione quibusdam dicta eius.
                                        </p>
                                        <Checkbox onClick={showDeleteConfirm}>
                                            Mark as Complete
                                        </Checkbox>
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

export default Sponsorships;
