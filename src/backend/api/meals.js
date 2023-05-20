const express = require("express");
const mealsRouter = express.Router();
const knex = require("../database");

mealsRouter.get("/", async (req, res) => {
  try {
    const allMeals = await knex("meal").select("*")
    if(!allMeals.length) {
      response.status(404).json({ error: "Data not found, no meals."});
    }    
    response.json(allMeals);
  } catch (error) {
   res.status(500).json({
    error: "An error occured"
   });
  }
});

mealsRouter.get("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const idMeal = await knex("meal").select("*").where("id", '=', id);
    if(!idMeal.length){
      res.status(404).json({ error: 'No data' });
    }
    res.json(idMeal);
  } 
  catch (error) {
    res.status(500).json({
      error: 'An error occured'
    });
  }
});

mealsRouter.post("/", async (req, res) => {
  try {
    await knex("meal").insert(req.body);
    res.status(201).json({message: "The request succeeded"});
  } 
  catch (error) {
    res.status(500).json({
      error: 'An error occured'
    });
  }
});

mealsRouter.put("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const idMeal = await knex("meal").where({ id: id }).update(req.body);
    if(idMeal){
      res.status(202).json({ message: 'The request has been received but not yet acted upon.' });
    }
  } 
  catch (error) {
    res.status(500).json({
      error: 'An error occured'
    });
  }
});

mealsRouter.delete("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    await knex("meal").where({ id: id }).del();
    res.status(200).json({ message: 'Successfully deleted' });;
  } 
  catch (error) {
    res.status(500).json({
      error: 'An error occured'
    });
  }
});


module.exports = mealsRouter;
