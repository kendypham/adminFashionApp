/**
 * UsersController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
var bcrypt = require('bcrypt');
module.exports = {
    signup :async function(req, res){
        try{
			if(req.body === undefined){
				return res.serverError(err);
			}
			let {email, userName, password, confirmation} = req.body;
            
            
			if(password !== confirmation){
				return res.status(400).json({
					err: 'Passwords do not match'
				});
            }
            
		    const userCreated = await Users.create({
				email, userName, encryptedPassword : password,
            });
			return res.json(userCreated);
		} catch(err){
			console.error(err);
            return res.serverError(err);
		}
	},

    

  

};

