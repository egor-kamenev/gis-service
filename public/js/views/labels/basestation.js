$(function(){

    // вид базовой станции - наследуем его от базового класса для маркеров App.Views.Label
    App.Views.BaseStation =  App.Views.Label.extend({

        editViewId: "addNewBaseStation",
        editTemplate: _.template($("#addNewBaseStation-template").html()),
        editWindowTitle:"Редактировать базовую станцию",
        $info_win_template: _.template($('#BaseStationInfoWindow-template').html()),

        img_name:"bs.png",

        getTitle:function(){
            return this.model.get('name') + " | " + this.model.get('cell_id');
        },

        getIcon:function(){
            return new google.maps.MarkerImage(
                App.Config.imageSrc + this.img_name,
                new google.maps.Size(32, 37),
                new google.maps.Point(0, 0),
                new google.maps.Point(15,35)
            );

        }

    });


});