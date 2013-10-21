$(function(){

    App.Models.Sector = App.Models.Label.extend({//модель секторов
        silent:true,
        urlRoot:"/signals",
        defaults:{
            signal_zone_type:2 // тип зоны охвата по умолчанию
        }
    });
});