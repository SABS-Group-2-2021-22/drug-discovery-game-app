import React from "react";
import { connect } from "react-redux";


class SketcherComparisonText extends React.Component {
  constructor(props) {
    super(props);
  }

  dispText() {
    let obj = this.props.comp_text;
    var str = obj["pic50"] + "\n" + obj["logd"] + "\n" + obj["clearance_human"];
    return str;
  }

  render() {
    return this.dispText();
  }
}

function mapStateToProps(state) {
  return {
    comp_text: state.comp_text.data.comparison,
  };
}

export default connect(mapStateToProps)(SketcherComparisonText);