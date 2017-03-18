import React from 'react';
import { ButtonToolbar, Button, Modal, FormGroup, FormControl, ControlLabel  } from 'react-bootstrap';

var AddRecipe = React.createClass({
  getInitialState(){
    return {
      show: false,
    };
  },
  componentWillReceiveProps(nextProps){
    if(nextProps.updated){
      this.setState({show: false});
    }
  },
  close(){
    this.setState({show: false});
  },
  open(){
    this.setState({show: true});
  },
  render: function() {
    return(
      <div className="modal-container" style={{height: 200}}>
        <Button
          bsStyle="primary"
          bsSize="large"
          onClick={this.open}
        >
          Add Recipe
        </Button>

        <Modal
          show={this.state.show}
          onHide={this.close}
          container={this}
          aria-labelledby="contained-modal-title"
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title">Add a Recipe</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <FormGroup controlId="formBasicText">
                <ControlLabel>Recipe</ControlLabel>
                <FormControl name='title' value={this.props.title} onChange={this.props.handleChange} placeholder="Recipe Name"/>
              </FormGroup>
              <FormGroup controlId="formControlsTextarea">
                <ControlLabel>Ingredients</ControlLabel>
                <FormControl name='text' value={this.props.text} onChange={this.props.handleChange} componentClass="textarea" placeholder="Enter ingredients separated by commas" />
              </FormGroup>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.close}>Close</Button>
            <Button bsStyle="primary" type="submit" onClick={this.props.handleNewRecipe}>Add Recipe</Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
});

module.exports = AddRecipe;
