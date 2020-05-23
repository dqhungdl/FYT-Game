import React, { Component } from "react";
import RowList from "../Row/RowList";
import { TILES,COLORS } from "../../constants";
import { Col, Row, Statistic, Space } from "antd";

class Board extends Component {
  constructor() {
    super();
    this.state = {
      map: [
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
      ],
      scores: [0, 0, 0, 0],
    };
  }

  updateScore() {
    var tempScores = [0, 0, 0, 0];
    for (var team = 1; team <= 4; team++) {
      for (var i = 0; i < 8; i++)
        for (var j = 0; j < 8; j++)
          if (this.state.map[i][j] === team) {
            if (TILES[i][j] === 0) tempScores[team - 1]+=4;
            else if (TILES[i][j] === team) tempScores[team - 1] += 2;
            else tempScores[team - 1] += 3;
          }
    }
    this.setState({ scores: tempScores });
  }

  updateMap(rowId, colId, value) {
    var tempArr = this.state.map;
    tempArr[rowId - 1][colId - 1] = value;
    this.setState({ map: tempArr });
    this.updateScore();
  }

  render() {
    return (
      <Row>
        <Col span={10} offset={6}>
          <div>
            {TILES.map((row, id) => (
              <RowList
                key={id}
                row={row}
                rowId={id + 1}
                updateMap={this.updateMap.bind(this)}
              />
            ))}
          </div>
        </Col>
        <Col span={8}>
          <Statistic
            title={
              <div
                style={{ fontWeight: "bold", fontSize: "20px", color: COLORS[1] }}
              >
                Personal Branding Team:
              </div>
            }
            valueStyle={{
              fontWeight: "bold",
              fontSize: "23px",
              color: "black",
            }}
            value={this.state.scores[0]}
          />
          <Statistic
            title={
              <div
                style={{ fontWeight: "bold", fontSize: "20px", color: COLORS[2] }}
              >
                Time Management Team:
              </div>
            }
            valueStyle={{
              fontWeight: "bold",
              fontSize: "23px",
              color: "black",
            }}
            value={this.state.scores[1]}
          />
          <Statistic
            title={
              <div
                style={{ fontWeight: "bold", fontSize: "20px", color: COLORS[3] }}
              >
                Connection Team:
              </div>
            }
            valueStyle={{
              fontWeight: "bold",
              fontSize: "23px",
              color: "black",
            }}
            value={this.state.scores[3]}
          />
          <Statistic
            title={
              <div
                style={{ fontWeight: "bold", fontSize: "20px", color: COLORS[4] }}
              >
                LinkedIn Team:
              </div>
            }
            valueStyle={{
              fontWeight: "bold",
              fontSize: "23px",
              color: "black",
            }}
            value={this.state.scores[2]}
          />
        </Col>
      </Row>
    );
  }
}

export default Board;
