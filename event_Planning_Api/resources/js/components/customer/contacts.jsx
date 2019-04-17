import React, { Component } from "react";
import { Select, Card, Button, Icon } from "antd";

class Contacts extends Component {
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
                    <p>Izzah</p>
                    <Button>
                        <Icon type="plus" />
                    </Button>
                    <Button type="danger">
                        <Icon type="delete" />
                    </Button>
                </Card>
                <br />
                <Card hoverable bordered={false}>
                    <p>Ramlah</p>
                    <Button>
                        <Icon type="plus" />
                    </Button>
                    <Button type="danger">
                        <Icon type="delete" />
                    </Button>
                </Card>
                <br />
                <Card hoverable bordered={false}>
                    <p>Warda</p>
                    <Button>
                        <Icon type="plus" />
                    </Button>
                    <Button type="danger">
                        <Icon type="delete" />
                    </Button>
                </Card>
            </div>
        );
    }
}

export default Contacts;
