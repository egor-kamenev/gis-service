$(function(){

    // вид базовой станции - наследуем его от базового класса для маркеров App.Views.Label
    App.Views.Sector = App.Views.Label.extend({

        editViewId: 'addNewSector',
        editTemplate: _.template($("#addNewSector-template").html()),
        editWindowTitle:"Редактировать сектор",
        $info_win_template: _.template($('#SectorInfoWindow-template').html()),

        img_name:"sector.png",

        getTitle:function(){
            return this.model.get('cell_id') + " | " + this.model.get('sector_id');
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