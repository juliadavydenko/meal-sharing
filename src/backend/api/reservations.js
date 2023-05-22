const express = require("express");
const reservationsRouter = express.Router();
const knex = require("../database");

reservationsRouter.get("/", async (req, res) => {
    try {
      const allReservations = await knex("reservation").select("*")
      if(!allReservations.length){
        res.status(404).json({ error: 'Page does not exist.' });
      }
      res.json(allReservations);
    } 
    catch (error) {
      res.status(500).json({
        error: 'An error occured'
      });
    }
  });

  reservationsRouter.get("/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const idReservation = await knex("reservation").select("*").where("id", '=', id);
      if(!idReservation.length){
        res.status(404).json({ error: 'Page does not exist' });
      }
      res.json(idReservation);
    } 
    catch (error) {
      res.status(500).json({
        error: 'An error occured'
      });
    }
  });

  reservationsRouter.post("/", async (req, res)  => {
    try {
      await knex("reservation").insert(req.body);
      res.status(201).json({message: "Successfully created"});
    } 
    catch (error) {
      res.status(500).json({
        error: 'An error occured'
      });
    }
  });

  reservationsRouter.put("/:id", async (req, res)  => {
    try {
      const id = parseInt(req.params.id);
      const idReservation = await knex("reservation").where({ id: id }).update(req.body);
      if(idReservation){
        res.status(202).json({ message: 'Data has been modified' });
      }
    } 
    catch (error) {
      res.status(500).json({
        error: 'An error occured'
      });
    }
  });

  reservationsRouter.delete("/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await knex("reservation").where({ id: id }).del();
      res.status(200).json({ message: 'Data has been deleted' });
    } 
    catch (error) {
      res.status(500).json({
        error: 'An error occured'
      });
    }
  });


module.exports = reservationsRouter;