import React, { Component } from "react";
import AddList from "./addList";
import { Card, Button, Icon, Checkbox } from "antd";
class TodoList extends Component {
    constructor() {
        super();
        this.state = {
            show: false
        };
    }
    showForm(e) {
        this.setState({
            show: !this.state.show
        });
    }
    render() {
        function onChange(e) {
            console.log(`checked = ${e.target.checked}`);
        }

        return (
            <div>
                {this.state.show ? (
                    <div>
                        <Button onClick={this.showForm.bind(this)}>
                            <Icon type="close-circle" />
                        </Button>
                        <br />
                        <AddList />
                    </div>
                ) : (
                    <Button onClick={this.showForm.bind(this)}>
                        <Icon type="plus-circle" />
                    </Button>
                )}
                <hr />
                <Card hoverable bordered={false}>
                    <Checkbox onChange={onChange}>List Item 1</Checkbox>
                    <Button type="danger">
                        <Icon type="delete" />
                    </Button>
                </Card>
                <br />
                <Card hoverable bordered={false}>
                    <Checkbox onChange={onChange}>List Item 2</Checkbox>
                    <Button type="danger">
                        <Icon type="delete" />
                    </Button>
                </Card>
                <br />
                <Card hoverable bordered={false}>
                    <Checkbox onChange={onChange}>List Item 3</Checkbox>
                    <Button type="danger">
                        <Icon type="delete" />
                    </Button>
                </Card>
            </div>
        );
    }
}

export default TodoList;
