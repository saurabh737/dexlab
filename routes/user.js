const express = require('express');
const router = express.Router();
const {
    v5: uuidv4
} = require('uuid');
const constants =  require('../lib/constants')
const request = require('request')

router.post('/signup', async (req, res) => {
    try {
        req.body.userID = uuidv4(req.body.email, constants.MY_NAMESPACE);
        const options = {
            url: `${constants.addUserUrl}`,
            method: "POST",
            json: true,
            headers: {
                uniqueid: uuidv4(req.body.email, constants.MY_NAMESPACE),
                token: "jbasdjbj",
                verify: true
            },
            body: req.body
        }
        request(options, (error, response, body) => {
            if (error) {
                res.status(503).send({
                    error: error,
                    status: "Something went wrong"
                })
            } else if (response.statusCode == 200) {
                const val = {
                    message: "Success"
                }
                res.status(200).send(val)
            } else if (response.statusCode == 400) {
                res.status(400).send({
                    "message": "Email id already exist, Please try with different id"
                })
            }
        })
    } catch (e) {
        console.log(e);
        res.status(503).send({
            error: e,
            status: "Something went wrong"
        })
    }
})

router.post('/login', async (req, res) => {
    try {
        let uniqueid = uuidv4(req.body.email, constants.MY_NAMESPACE);
        const options = {
            url: `${constants.loginUserUrl}${uniqueid}`,
            method: "GET",
            headers: {
                token: "jbasdjbj"
            }
        }
        request(options, (error, response, body) => {
            body = JSON.parse(body)
            if (error) {
                res.status(503).send({
                    error: error,
                    status: "Something went wrong"
                })
            } else if (response.statusCode == 200) {
                console.log(typeof(body.password), req.body.password)
                if (body.password == req.body.password) {
                    res.status(200).send({
                        message: "Success",
                        userid: uniqueid,
                        email: req.body.email
                    })
                } else{
                    res.status(401).send({
                    "message": "Invalid emailid/password"
                })
                }
            } else if (response.statusCode == 400) {
                res.status(400).send({
                    "message": "Email id doesn't exist, please signup to access the services"
                })
            }else{
                res.status(response.statusCode).send(body)   
            }
        })
    } catch (e) {
        console.log(e);
        res.status(503).send({
            error: e,
            status: "Something went wrong"
        })
    }
})

module.exports = router