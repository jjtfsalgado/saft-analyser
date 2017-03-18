import React from 'react';
import { ButtonToolbar, Button, Modal, FormGroup, FormControl, ControlLabel  } from 'react-bootstrap';

import Api from '../actions/crudApi';

var Recipe = React.createClass({
  getInitialState(){
    return {
      title: undefined,
      text: undefined,
      show: false,
      updated: false
    };
  },
  handleEdit(){
    console.log(this.props.id);
    var that = this;

    Api.getByid(this.props.id).then(function(res){
      that.setState({
        title: res.recipe.title,
        text: res.recipe.text,
        show: true
      })
    });
  },
  handleDelete(){
    var that = this;

    Api.deleteRecipe(this.props.id).then(function(res){
      console.log('Deleted sucessfully');
      that.props.onUpdate(true);
    }).catch(function (error) {
      throw error;
    });
  },
  handleUpdateRecipe(){
    var that = this;
    Api.updateRecipe(this.props.id, this.state.title, this.state.text).then(function(res){
      console.log('Updated sucessfully');
      that.setState({
        show: false,
        updated: true
      })
      that.props.onUpdate(true);
    }).catch(function (error) {
      throw error;
    });
  },
  handleChange(e){
    const name = e.target.name;
    this.setState({
      [name]: e.target.value,
    })
  },
  componentWillReceiveProps(nextProps){
    if(nextProps.open){
      this.setState({show: true});
    }
  },
  close(){
    this.setState({show: false});
  },
  open(){
    this.setState({show: true});
  },
  render: function() {
    var ingredients = this.props.ingredients;
    var arrayIngredients = ingredients.split(',');
      return(
        <div>
          <h3>Ingredients</h3>
          <ul>
            {arrayIngredients.map((row, index) => (
              <li key={index}>{row}</li>
            ))}
          </ul>
          <Button bsStyle="primary" onClick={this.handleEdit}>Edit</Button>
          <Button bsStyle="danger" onClick={this.handleDelete}>Delete</Button>

          <Modal
            show={this.state.show}
            onHide={this.close}
            container={this}
            aria-labelledby="contained-modal-title"
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title">Edit Recipe</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form>
                <FormGroup controlId="formBasicText">
                  <ControlLabel>Recipe</ControlLabel>
                  <FormControl name='title' value={this.state.title} onChange={this.handleChange} placeholder="Recipe Name"/>
                </FormGroup>
                <FormGroup controlId="formControlsTextarea">
                  <ControlLabel>Ingredients</ControlLabel>
                  <FormControl name='text' value={this.state.text} onChange={this.handleChange} componentClass="textarea" placeholder="Enter ingredients separated by commas" />
                </FormGroup>
              </form>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={this.close}>Close</Button>
              <Button bsStyle="primary" type="submit" onClick={this.handleUpdateRecipe}>Edit Recipe</Button>
            </Modal.Footer>
          </Modal>
        </div>
      )
    }
});

module.exports = Recipe;
