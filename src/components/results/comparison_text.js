import React from "react";
import { connect } from "react-redux";


class ComparisonText extends React.Component {

  dispText() {
    let obj = this.props.comp_text;
    var str = obj["logd"] + "\n" + obj["clearance_human"] + "\n" + obj["pampa"] + "\n" + obj["pic50"];
    return str.replace(/pIC50/g, 'pIC<sub>50</sub>');
  }

  render() {
    return <div dangerouslySetInnerHTML={{__html: this.dispText()}} />
  }
}

function mapStateToProps(state) {
  return {
    comp_text: state.analysis.comp_text.data.comparison,
  };
}

export default connect(mapStateToProps)(ComparisonText);