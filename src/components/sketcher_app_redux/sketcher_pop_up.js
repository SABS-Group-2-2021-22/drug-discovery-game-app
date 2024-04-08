import React from "react";
import { sketcherActions } from "../../actions";
import { connect} from "react-redux";
import {Text} from "react-native";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import "./sketcher_app.css"

class SketcherPopUp extends React.Component {
    turn_error_off = () => {
        this.props.dispatch(sketcherActions.closePopUp())
    }

    render () {
        return (
                <div>
                    <Modal show={this.props.sketcher_error[this.props.sketcher_error.length - 1] === 1} onHide={this.Turn_error_off}>
                    <Modal.Header>
                      <Modal.Title>Incorrect Chemistry</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <Text>The molecule you just tried to save had incorrect valency</Text>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button onClick={this.turn_error_off}>Close</Button>
                    </Modal.Footer>
                    
                  </Modal>
                  </div>
        )
    }
}

function mapStateToProps(state) {
    return {
      sketcher_error: state.sketcher.sketcher_error
    };
  }
  

export default connect (mapStateToProps) (SketcherPopUp);