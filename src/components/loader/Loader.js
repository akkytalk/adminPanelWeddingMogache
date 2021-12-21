import React from "react";
import { ScaleLoader } from "react-spinners";

class Loader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  }
  render() {
    return (
      <div className="sweet-loading">
        <ScaleLoader
          sizeUnit={"px"}
          size={100}
          color={"#36D7D7"}
          loading={this.state.loading}
        />
      </div>
    );
  }
}

export default Loader;
