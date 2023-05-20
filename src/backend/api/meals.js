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

//search queries 

router.get("/", async (req, res) => {
  try {
    const param = req.query;
    for (const [key, value] of Object.entries(param)) {
      
      if (key === "maxPrice") {
        const price = parseInt(value);
        const selectedMeals = await knex
          .select()
          .from("Meal")
          .where("price", "<=", price);
        res.json(selectedMeals);
           } else if (key === "title") {
        const meals = await knex
          .select()
          .from("Meal")
          .where("title", "like", `%${value}%`);
        res.status(200).json(meals);
      
      } else if (key === "dateAfter") {
        const meals = await knex
          .select()
          .from("Meal")
          .where("when", ">", `${value}`);
        res.status(200).json(meals);
        
      } else if (key === "dateBefore") {
        const meals = await knex
          .select()
          .from("Meal")
          .where("when", "<", `${value}`);
        res.status(200).json(meals);
        
      } else if (key === "limit") {
        const meals = await knex.select().from("Meal").limit(`${value}`);
        res.status(200).json(meals);

      } else if (
        req.query.sortKey === "when" ||
        req.query.sortKey === "max_reservations" ||
        req.query.sortKey === "price"
      ) {
        
        if (req.query.sortDir) {
          const meals = await knex
            .select()
            .from("meal")
            .orderBy(`${req.query.sortKey}`, `${req.query.sortDir}`);
          return res.status(200).json(meals);
        } else {
          const meals = await knex.select().from("meal").orderBy(`${value}`);
          res.status(200).json(meals);
        }
      } else {
        res.status(404).json({ message: "No data" });
      }
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.get("/:id/reviews", async (req, res) => {
  try {
    const requestedId = parseInt(req.params.id);
    const reviews = await knex("Review")
      .select()
      .where("meal_id", `${requestedId}`);
    if (reviews.length === 0) {
      res.status(404).json({ error: "No data" });
    } else {
      res.status(200).json(reviews);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


module.exports = mealsRouter;
