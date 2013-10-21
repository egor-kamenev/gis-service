/**
 * User: e.kamenev
 * Date: 20.09.12
 * Time create: 11:13
 */

$(function(){

App.Models.NearestBaseStations = Backbone.Model.extend({

       sync: function(method,model,options){
           switch(method){
               case 'get': return Backbone.sync(method,model,{
                   dataType :"json",
                   data: options.data,
                   success:$.proxy(function(data){
                       model.set(data);
                   },this)
               });
               break;
               default: return Backbone.sync(method, model, options); break;

           }
       },

       silent:true,
       url:"/bs_direction"

});

});