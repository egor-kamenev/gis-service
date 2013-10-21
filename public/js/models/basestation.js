$(function(){

    App.Models.BaseStation = App.Models.Label.extend({//модель базовой станции
        silent : true,
        urlRoot : "/bs",
        defaults : {
            signal_zone_type : 1 // тип зоны охвата по умолчанию
        }

    });

});