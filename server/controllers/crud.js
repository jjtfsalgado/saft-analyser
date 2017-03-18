var {mongoose} = require('./../db/mongoose');
var {Recipe} = require('./../models/recipe');
var controller = {};

controller.readAll = [
  function(req,res,next) {
    Recipe.find().then((recipes) => {
      res.send({recipes})
    }, (e) => {
      res.status(400).send(e);
    });
  }
];

controller.readById = [
  function(req,res,next) {
    Recipe.findById(req.params.id, function (err, recipe) {
        if (err) {
            res.send(err)
        }
        if (recipe) {
            res.send(recipe)
        } else {
            res.send("No recipe found with that ID")
        }
    });
  }
];

controller.create = [
	function(req,res,next) {
    var recipe = new Recipe({
      title: req.body.title,
      text: req.body.text
    });

    recipe.save().then((doc) => {
      res.send(doc);
    }, (e) => {
      res.status(400).send(e);
    });
	}
];

controller.update = [
	function(req,res,next) {
    Recipe.findById(req.params.id, function (err, recipe) {
        if (err) {
            res.status(500).send(err);
        } else {

            recipe.title = req.body.title;
            recipe.text = req.body.text;

            recipe.save(function (err, recipe) {
                if (err) {
                    res.status(500).send(err)
                }
                res.send(recipe);
            });
        }
    });
	}
];

controller.delete = [
	function(req,res,next) {
    Recipe.findByIdAndRemove(req.params.id, function (err, recipe) {
        // We'll create a simple object to send back with a message and the id of the document that was removed
        // You can really do this however you want, though.
        if (err) {throw err};
        var response = {
            message: "Recipe successfully deleted",
            recipe: recipe
        };
        res.send(response);
    });
	}
];

module.exports = controller;
