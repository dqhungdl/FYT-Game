import React, { Component } from "react";
import { Modal, Button, Divider, Space } from "antd";
import { ClockCircleTwoTone, QuestionCircleTwoTone } from "@ant-design/icons";
import {
  COLORS,
  STRONG_COLORS,
  QUESTIONS,
  QUESTION_TIMING,
} from "../../constants";
import "antd/dist/antd.css";

const NORMAL_BUTTON = {
  textAlign: "center",
  display: "inline-block",
  fontSize: "23px",
  fontWeight: "bold",
  textDecoration: "none",
  width: 70,
  height: 70,
  borderRadius: "2px",
  color: "black",
  border: "0.5px solid black",
};

const HOVER_BUTTON = {
  textAlign: "center",
  display: "inline-block",
  fontSize: "23px",
  fontWeight: "bold",
  textDecoration: "none",
  width: 70,
  height: 70,
  borderRadius: "2px",
  color: "black",
  border: "3px solid black",
};

class Tile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      colorId: 0,
      titleId: (props.rowId - 1) * 8 + props.colId,
      style: NORMAL_BUTTON,
      isHover: false,
      popUpVisible: false,
      countDown: 0,
    };
  }

  enterHover = () => {
    this.setState({
      style: HOVER_BUTTON,
      isHover: true,
    });
  };

  leaveHover = () => {
    this.setState({
      style: NORMAL_BUTTON,
      isHover: false,
    });
  };

  toggleColor = () => {
    this.setState(
      {
        colorId: (this.state.colorId + 1) % 5,
      },
      function () {
        var updateMap = this.props.updateMap;
        updateMap(this.props.rowId, this.props.colId, this.state.colorId);
      }.bind(this)
    );
  };

  toggleQuestion = () => {
    this.setState(
      {
        colorId: (this.state.colorId + 3) % 5,
        popUpVisible: true,
        countDown: QUESTION_TIMING,
      },
      function () {
        var updateMap = this.props.updateMap;
        updateMap(this.props.rowId, this.props.colId, this.state.colorId);
      }.bind(this)
    );
    // Countdown
    const timer = setInterval(() => {
      if (this.state.countDown > 1)
        this.setState({
          countDown: Math.max(this.state.countDown - 1, 0),
        });
      else
        this.setState({
          countDown: 0,
          popUpVisible: false,
        });
    }, 1000);
  };

  handleOk = () => {
    this.setState({
      popUpVisible: false,
    });
  };

  getContent = (contentId) => {
    for (var i = 0; i < 64; i++)
      if (QUESTIONS[i].id === contentId) return QUESTIONS[i].content;
  };

  render() {
    var styles = Object.assign(
      {},
      {
        backgroundColor: !this.state.isHover
          ? COLORS[this.state.colorId]
          : STRONG_COLORS[this.state.colorId],
      },
      this.state.style
    );
    return (
      <span>
        <Button
          onDoubleClick={this.toggleQuestion}
          onClick={this.toggleColor}
          onMouseEnter={this.enterHover}
          onMouseLeave={this.leaveHover}
          style={styles}
        >
          {this.state.titleId}
        </Button>
        <Modal
          type="primary"
          width={1000}
          title={
            <span style={{ fontWeight: "bold", fontSize: "35px" }}>
              <Space>
                <QuestionCircleTwoTone />
                Câu hỏi số {this.state.titleId}
              </Space>
            </span>
          }
          visible={this.state.popUpVisible}
          onOk={this.handleOk}
          onCancel={this.handleOk}
          footer={[
            <span
              style={{
                float: "left",
                fontWeight: "bold",
                fontSize: "25px",
                color: "black",
              }}
            >
              <Space>
                <ClockCircleTwoTone />
                Thời gian còn lại: {this.state.countDown}
              </Space>
            </span>,
            <Button
              key="submit"
              type="primary"
              size="large"
              // height="65px"
              onClick={this.handleOk}
            >
              Done
            </Button>,
          ]}
        >
          <div style={{ fontSize: "25px", color: "black" }}>
            {this.getContent(this.state.titleId)}
          </div>
        </Modal>
      </span>
    );
  }
}

export default Tile;
