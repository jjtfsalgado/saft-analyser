import React from 'react';
import { PanelGroup, Panel } from 'react-bootstrap';
import Api from '../actions/crudApi';

import Recipe from './recipe';

var RecipesList = React.createClass({
  getInitialState: function () {
    return{
      recipes: undefined,
      updated: false
    }
  },
  update(){
    this.props.onEdited(true);
  },
  componentWillMount: function () {
    var that = this;

    Api.getRecipes().then(function(res){
      that.setState({
        recipes: res.recipes
      })
    });
  },
  componentWillReceiveProps (nextProps) {
    if(nextProps.updated || nextProps.edited){
      this.componentWillMount();
    }
  },
  render: function() {
    var all = this.state.recipes;
    this.state.updated;
    if (all) {
      return(
        <div>
          {all.map((row, index) => (
            <PanelGroup defaultActiveKey={index} key={index} accordion>
              <Panel header={row.title}>
                <Recipe ingredients={row.text} id={row._id} onUpdate={this.update}/>
              </Panel>
            </PanelGroup>
          ))}
        </div>
      )
    }else {
      return(
        <p>Fetching Data</p>
      )
    }
  }
});

module.exports = RecipesList;
