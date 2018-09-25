/**
 * FileUploadController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  upload : function(req, res){
      if(req.method === 'GET')return res.json({'status' : 'GET not allowed'});
      sails.log.debug('We have entered the uploading process ');
      var modelName = req.param("modelName");
      var modelData = req.param("modelData");
      //var fileName = req.file('modelPhoto')._files[0].stream.filename;
      req.file('modelPhoto').upload({dirname:'../../assets/images/model/', maxBytes : 10000000  },async function(err, files){        
          if(err) return res.serverError(err);     
          await FileUpload.create({'modelPhoto' :files[0].fd ,'modelName' : modelName, 'modelData' : modelData}).fetch();
          await FileUpload.create({'modelPhoto' :files[1].fd ,'modelName' : modelName, 'modelData' : modelData}).fetch();
          res.json({status : 200, file : files, 'modelName' : modelName, 'modelData' : modelData});
      });
  }

};

