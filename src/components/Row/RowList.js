import React, { Component } from "react";
import Tile from "../Tile/Tile";

class RowList extends Component {

  render() {
    var updateMap=this.props.updateMap;
    return (
      <div>
        {this.props.row.map((col, id) => {
          return (
            <Tile
              key={id}
              rowId={this.props.rowId}
              colId={id + 1}
              updateMap={updateMap.bind(this)}
            />
          );
        })}
      </div>
    );
  }
}

export default RowList;
