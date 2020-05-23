import React, { Component } from "react";
import "./App.css";
import Board from "./../Board/Board";
import { Space, Button, Modal } from "antd";
import {
  HomeTwoTone,
  InfoCircleTwoTone,
  ClockCircleTwoTone,
} from "@ant-design/icons";
import boardPic from "./board.png";
import { MAP_REMEMBER_TIMING } from "./../../constants.js";

class App extends Component {
  constructor() {
    super();
    this.state = {
      introductionVisible: true,
      imageVisible: false,
      countDown: MAP_REMEMBER_TIMING,
    };
  }

  handleIntroductionOk = () => {
    this.setState({ 
      introductionVisible: false,
      imageVisible: true,
    });
    const timer = setInterval(() => {
      if (this.state.countDown > 1)
        this.setState({
          countDown: Math.max(this.state.countDown - 1, 0),
        });
      else
        this.setState({
          countDown: 0,
          imageVisible: false,
        });
    }, 1000);
  };

  handleImageOk = () => {
    this.setState({
      imageVisible: false,
    });
  };

  render() {
    return (
      <div className="App-header">
        <h1
          style={{ fontWeight: "bold", color: "#b30000", textAlign: "center" }}
        >
          <Space>
            <HomeTwoTone twoToneColor="#b30000" />
            Đấu trường công sở
          </Space>
        </h1>
        <Board />
        <Modal
          style={{ top: 15 }}
          type="primary"
          width={1000}
          title={
            <span style={{ fontWeight: "bold", fontSize: "35px" }}>
              <Space>
                <InfoCircleTwoTone />
                Hướng dẫn
              </Space>
            </span>
          }
          visible={this.state.introductionVisible}
          onOk={this.handleIntroductionOk}
          onCancel={this.handleIntroductionOk}
          footer={[
            <Button
              key="submit"
              type="primary"
              size="large"
              onClick={this.handleIntroductionOk}
            >
              Done
            </Button>,
          ]}
        >
          <div style={{ fontSize: "25px", color: "black" }}>
            <ol>
              <li>
                Có 4 đội chơi, mỗi đội chọn 1 trong 4 màu (đỏ, xanh dương, xanh
                lá, vàng) tương ứng với 4 chủ đề (Personal Branding, Time
                Management, Conection, LinkedIn). Ngoài ra còn có các câu hỏi về
                kiến thức chung.
              </li>
              <li>
                Có 64 câu hỏi, được sắp xếp trên bàn cờ 8x8, mỗi ô tương ứng với
                một câu hỏi:
                <ul>
                  <li>10 ô màu đỏ tương ứng với chủ đề Personal Branding.</li>
                  <li>
                    10 ô màu xanh dương tương ứng với chủ đề Time Management.
                  </li>
                  <li>10 ô màu xanh lá tương ứng với chủ đề Connection.</li>
                  <li>10 ô màu vàng tương ứng với chủ đề LinkedIn.</li>
                  <li>
                    24 ô màu trắng tương ứng với các kiến thức chung (rất khó).
                  </li>
                </ul>
              </li>
              <li>
                Các đội ghi nhớ các ô màu của đội mình và đội đối phương trong
                vòng 30s.
              </li>
              <li>
                Điểm thưởng cho mỗi ô:
                <ul>
                  <li>Ô màu của đội mình: trả lời đúng được +2 điểm</li>
                  <li>
                    Ô màu của đội đối phương: trả lời đúng được +3 điểm, trả lời
                    sai +2 điểm cho đội sở hữu ô màu đó
                  </li>
                  <li>Ô màu trắng: trả lời đúng được +4 điểm</li>
                </ul>
              </li>
              <li>
                Các ô đã trả lời rồi sẽ được tô màu tương ứng với màu của đội
                nhận được điểm từ câu đó và giữ nguyên trạng thái màu cho đến
                cuối trận.
              </li>
              <li>
                Nếu đội nào chiếm được 3 trên 4 ô của một hình vuông 2x2 bất kỳ
                và ô còn lại chưa được tô màu thì sẽ chiếm được ô đó, số điểm
                cộng tương ứng với số điểm nếu trả lời đúng ô đó.
              </li>
            </ol>
          </div>
        </Modal>

        <Modal
          style={{ top: 15 }}
          type="primary"
          width={1000}
          title={
            <span style={{ fontWeight: "bold", fontSize: "35px" }}>
              <Space>
                <InfoCircleTwoTone />
                Bảng ghi nhớ màu
              </Space>
            </span>
          }
          visible={this.state.imageVisible}
          onOk={this.handleImageOk}
          onCancel={this.handleImageOk}
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
              onClick={this.handleImageOk}
            >
              Done
            </Button>,
          ]}
        >
          <div style={{ textAlign: "center" }}>
            <img src={boardPic} alt="Board" />
          </div>
        </Modal>
      </div>
    );
  }
}

export default App;
