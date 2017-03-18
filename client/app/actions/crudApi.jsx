const axios = require('axios');

const API_URL = 'http://localhost:4000';

module.exports = {
  getRecipes: function () {
    return axios.get(`${API_URL}/recipes`).then(function (response) {
      return {
        recipes: response.data.recipes
      }
    }).catch(function (error) {
      throw error;
    });
  },
  getByid: function (id) {
    return axios.get(`${API_URL}/recipes/${id}`).then(function (response) {
      return {
        recipe: response.data
      }
    }).catch(function (error) {
      throw error;
    });
  },
  postRecipe: function (title, text) {
    return axios.post(`${API_URL}/recipes`, {title:title,text:text}).then(function (response) {
      console.log(response);
    }).catch(function (error) {
      throw error;
    });
  },
  deleteRecipe: function (id) {
    return axios.delete(`${API_URL}/recipes/${id}`).then(function (response) {
      console.log(response);
    }).catch(function (error) {
      throw error;
    });
  },
  updateRecipe: function (id, title, text) {
    return axios.put(`${API_URL}/recipes/${id}`, {title:title,text:text}).then(function (response) {
      console.log(response);
    }).catch(function (error) {
      throw error;
    });
  }
};
