const { query } = require('express');
const express = require('express');
const dbo = require("../db/conn");
const ObjectId = require("mongodb").ObjectId;

const nameRoutes = express.Router();


//get all names

nameRoutes.route("/names").get((req, res) => {
    let db_connect = dbo.getDb("pushNotification")
    db_connect
        .collection("pushNotificationDB")
        .find({})
        .toArray(function (err, result) {
            if(err) throw err;

            res.json(result);
        })
})

//get a specific name

nameRoutes.route("/names/:name").get((req, res) => {
    let db_connect = dbo.getDb()
    let query = {name: req.params.name}
    db_connect
        .collection("pushNotificationDB")
        .findOne(query, function (err, result) {
            if(err) throw err;
            console.log(result)
            res.json(result);
        })
    })

//adding a new name

nameRoutes.route("/names/add").post(function (req, response){
    let db_connect = dbo.getDb()
    let query = {"name": req.body.name}
    db_connect
        .collection("pushNotificationDB")
        .insertOne(query, (res) => {
            response.json("A new name was added!")
        })
    })


module.exports = nameRoutes;
