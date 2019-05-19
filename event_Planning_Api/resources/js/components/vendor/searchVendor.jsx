import React, { Component } from "react";
import { Icon, Button, Input, AutoComplete } from "antd";

const Option = AutoComplete.Option;

class SearchVendors extends Component {
    constructor() {
        super();
        this.state = {
            dataSource: []
        };
        this.handleSearch = this.handleSearch.bind(this);
        this.onSelect = this.onSelect.bind(this);
        this.getRandomInt = this.getRandomInt.bind(this);
        this.searchResult = this.searchResult.bind(this);
        this.renderOption = this.renderOption.bind(this);
    }
    handleSearch(value) {
        this.setState({
            dataSource: value ? searchResult(value) : []
        });
    }
    onSelect(value) {
        console.log("onSelect", value);
    }

    getRandomInt(max, min = 0) {
        return Math.floor(Math.random() * (max - min + 1)) + min; // eslint-disable-line no-mixed-operators
    }

    searchResult(query) {
        return new Array(getRandomInt(5))
            .join(".")
            .split(".")
            .map((item, idx) => ({
                query,
                category: `${query}${idx}`,
                count: getRandomInt(200, 100)
            }));
    }

    renderOption(item) {
        return (
            <Option key={item.category} text={item.category}>
                <div className="global-search-item">
                    <span className="global-search-item-desc">
                        {item.query} 在
                        <a
                            href={`https://s.taobao.com/search?q=${item.query}`}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {item.category}
                        </a>
                        区块中
                    </span>
                    <span className="global-search-item-count">
                        约 {item.count} 个结果
                    </span>
                </div>
            </Option>
        );
    }
    render() {
        const { dataSource } = this.state;
        return (
            <div className="global-search-wrapper" style={{ width: 300 }}>
                <AutoComplete
                    className="global-search"
                    size="large"
                    style={{ width: "100%" }}
                    dataSource={dataSource.map(renderOption)}
                    onSelect={this.onSelect}
                    onSearch={this.handleSearch}
                    placeholder="input here"
                    optionLabelProp="text"
                >
                    <Input
                        suffix={
                            <Button
                                className="search-btn"
                                size="large"
                                type="primary"
                            >
                                <Icon type="search" />
                            </Button>
                        }
                    />
                </AutoComplete>
            </div>
        );
    }
}

export default SearchVendors;
