$(function(){

    //коллекция эл-ов меню инструментов
    App.Collections.ControlMenuElements = Backbone.Collection.extend({
        model: App.Models.ControlMenuElement
    });

    App.Collections.controlMenuElements = new App.Collections.ControlMenuElements([


        {
            id: "viewMode",
            title:"Режим просмотра",
            sprite_position: "-144px" // позиция на спрйте для нужного изображения
        },

        {
            id: "rulerMode",
            title:"Рулетка",
            sprite_position: "-32px"
        },

        {
            id: "arrowMode",
            title:"Стрелки",
            sprite_position: "0px"
        }



    ]);

});