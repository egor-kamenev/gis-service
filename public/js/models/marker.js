$(function(){

    App.Models.Marker = App.Models.Label.extend({ // модель меток
        silent: true,
        urlRoot:"/markers",
        defaults:{
            is_signal : "0",
            is_building:"0"
        }
    });

});