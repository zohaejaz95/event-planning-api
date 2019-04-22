import React, { Component } from "react";
import { Select, Card, Button, Icon } from "antd";

class GuestList extends Component {
    render() {
        const Option = Select.Option;

        function handleChange(value) {
            console.log(`selected ${value}`);
        }

        function handleBlur() {
            console.log("blur");
        }

        function handleFocus() {
            console.log("focus");
        }
        return (
            <div>
                <Select
                    showSearch
                    style={{ width: 200 }}
                    placeholder="Select an event"
                    optionFilterProp="children"
                    onChange={handleChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    filterOption={(input, option) =>
                        option.props.children
                            .toLowerCase()
                            .indexOf(input.toLowerCase()) >= 0
                    }
                >
                    <Option value="jack">Jack</Option>
                    <Option value="lucy">Lucy</Option>
                    <Option value="tom">Tom</Option>
                </Select>

                <br />
                <Card hoverable bordered={false}>
                    <h5>Izzah</h5>
                    <p>Details</p>
                    <Button type="danger">
                        <Icon type="minus" />
                        Uninvite
                    </Button>
                </Card>
                <br />
                <Card hoverable bordered={false}>
                    <h5>Ramlah</h5>
                    <p>Details</p>
                    <Button type="danger">
                        <Icon type="minus" />
                        Uninvite
                    </Button>
                </Card>
                <br />
                <Card hoverable bordered={false}>
                    <h5>Warda</h5>
                    <p>Details</p>
                    <Button type="danger">
                        <Icon type="minus" />
                        Uninvite
                    </Button>
                </Card>
            </div>
        );
    }
}

export default GuestList;
