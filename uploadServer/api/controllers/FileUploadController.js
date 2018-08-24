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
      var thumbnailData = req.param("thumbnailData");
      var accessoriesData = req.param("accessoriesData");
      req.file('thumbnailPhoto').upload({dirname:'../../assets/images/'},async function(err, files){
         
          maxBytes : 10000000;
          if(err) return res.serverError(err);
          
          await FileUpload.create({'thumbnailPhoto' :files[0].fd ,'thumbnailData' : thumbnailData, 'accessoriesData' : accessoriesData}).fetch();
          res.json({status : 200, file : files, 'thumbnailData' : thumbnailData, 'accessoriesData' : accessoriesData});
      });     
  }

};

