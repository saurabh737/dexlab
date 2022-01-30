const express = require('express');
const router = express.Router();

const userService = require('../models/getactivity');

router.get('/get', function (req, res) {
    userService.getActivity(req.headers)
        .then(result => res.status(200).send(result))
        .catch(err => res.status(503).send(err));
});

router.post('/set', async (req, res) => {
    try {
        let userActivity = await userService.getActivity(req.headers);
        if (userActivity.history) {
            if (userActivity.data.length > 20) {
                userActivity.data.pop()
            }
            userActivity.data.unshift(req.body);
        } else {
            userActivity.data = []
            userActivity.data.push(req.body);
        }

        let set = await userService.setActivity(data, JSON.stringify(userActivity));
        if (set) {
            res.status(200).send({
                "message": "success"
            })
        } else {
            res.status(400).send({
                "message": "failure"
            })
        }
    } catch (error) {
        console.log(e);
        res.status(503).send({
            error: e,
            status: "Something went wrong"
        })
    }
});

module.exports = router;