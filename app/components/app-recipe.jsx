import React from 'react';

import RecipesList from './recipes-list';
import AddRecipe from './add-recipe';

import Api from '../actions/crudApi';

var AppRecipe = React.createClass({
  getInitialState(){
    return {
      title: undefined,
      text: undefined,
      updated: false,
      edited: false
    };
  },
  handleEdited(boolean){
    this.setState({edited:boolean});
  },
  handleChange(e){
    const name = e.target.name;
    this.setState({
      [name]: e.target.value,
    })
  },
  handleNewRecipe: function() {
    var that = this;

    if (this.state.title && this.state.text) {
      Api.postRecipe(this.state.title, this.state.text).then(function () {
        console.log('Sucess! Your data was submitted');
        that.setState({
          title: '',
          text: '',
          updated: true,
        })
      }).catch(function (error) {
        throw error;
      });
    }else {
      console.log('Unable to add data');
    }
  },
  render: function() {
    return(
      <div className="container">
        <RecipesList updated={this.state.updated} edited={this.state.edited} onEdited={this.handleEdited}/>
        <AddRecipe title={this.state.title} text={this.state.text} updated={this.state.updated} handleChange={this.handleChange} handleNewRecipe={this.handleNewRecipe}/>
      </div>
    )
  }
});

module.exports = AppRecipe;
