const { response, request } = require("express")
const Activity = require('../models/activity');

const addActivity = async(req = request, res = response) =>
{
    const {name, description, email} = req.body;

    const activity = new Activity({name, description, email});

    await activity.save();

    res.status(200).json({
        sts: "ok", 
        activity
    });
}

const getRandomActivity = async(req = request, res = response) =>
{
    const activities = await Activity.find();

    const activity = activities[Math.floor(Math.random() * activities.length)];

    res.status(200).json(activity);
}

module.exports = {
    addActivity,
    getRandomActivity
}