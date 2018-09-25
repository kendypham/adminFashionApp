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

	login :async function (req, res){
		if(!req.body.email || !req.body.password)
		{
			return res.badRequset({err : "Email or password can not empty"});
		}
		console.log(req.body);
		var user = await Users.findOne({email : req.body.email});
			if(!user) return res.redirect("http://localhost:3000/404.html");
			bcrypt.compare(req.body.password, user.encryptedPassword, function(err, result){
				if(err) return res.serverError(err);
				if(result){
					
					return res.json({
                        user:user,
                        token: JWT.sign(user)//generate the token and send it in the response
                    });
				}
				else {
					return res.redirect("http://localhost:3000/404.html");
				}
			});		
	},
	check: function(req, res) {
        return res.json();
    },

    

  

};

