/**
 * Users.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */
var bcrypt = require('bcrypt');

module.exports = {

  attributes: {
    userName : {
      type : 'string',
      required : true,
      columnType : 'text'
    },

    email : {
      type : 'string',
      required : true,
      email : true,
      unique : true,
      columnType : 'text'
    },

    encryptedPassword : {
      type : 'string',
      columnType : 'text'
    },
    
  },
  


  // customToJSON: function(){
	// 	return _.omit(this, ['encryptedPassword']);
	// },

	beforeCreate: (values, next ) => {
      bcrypt.hash(values.encryptedPassword, 10, function(err, hash) {
          if (err) return next(err);
          values.encryptedPassword  = hash;        
          next();
      });
	}

};

