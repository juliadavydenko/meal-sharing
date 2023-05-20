const express = require("express");
const router = express.Router();
const knex = require("../database");

//all reviews
router.get("/", async (req, res) => {
  try {
    const data = await knex("Review").select();
    res.status(200).json(await data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occured" });
  }
});

//add a new review 
router.post("/", async (req, res) => {
  try {
    const newReview = req.body;
    const [id] = await knex("review").insert(newReview);
    if (id) {
      res.status(201).json({
        message: "New review added",
      });
    }
  } catch (error) {
    res.status(500).json({ error: "An error occured" });
    console.error(error);
  }
});

// return a review by id.
router.get("/:id", async (req, res) => {
  try {
    const requestedId = parseInt(req.params.id);
    const review = await knex("review").select().where("id", requestedId);
    if (review.length === 0) {
      res.status(404).json({ error: "No data found" });
    } else {
      res.status(200).json(await review);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// update review by id
router.put("/:id", async (req, res) => {
  try {
    const requestedId = parseInt(req.params.id);
    const updatedReview = req.body;
    const updatedId = await knex("review")
      .where("id", requestedId)
      .update(updatedReview);

    if (updatedId) {
      res.status(202).json({
        message: "Review updated",
      });
    } else {
      res.status(404).json({
        message: "No data found",
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// delete review by id
router.delete("/:id", async (req, res) => {
  const requestedId = parseInt(req.params.id);
  const deletedReview = await knex("review").where("id", requestedId).del();
  if (deletedReview) {
    res.status(202).json({
      message: "Review deleted",
    });
  } else {
    res.status(404).json({
      message: "No data found",
    });
  }
});

module.exports = router;