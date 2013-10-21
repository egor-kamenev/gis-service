$(function () {

    // Вид метки - наследуем его от базового класса для маркеров App.Views.Label
    App.Views.Marker = App.Views.Label.extend({

        editViewId:'addNewMarker',
        editTemplate:_.template($("#addNewMarker-template").html()),
        editWindowTitle:"Редактирвать маркер",
        $info_win_template:_.template($('#MarkerInfoWindow-template').html()),

        initialize: function(){

            _.bindAll(this,
                'download_qlt',
                'upload_qlt',
                'ping_qlt'
            );

            App.Views.Label.prototype.initialize.call(this);
        },

        getTitle:function () {
            return this.model.get('login') + " | up/down: " + this.model.get('upload') + "/" + this.model.get('download')
                + "(Mbit/s) | ping: " + this.model.get('ping') + "ms";
        },

        getIcon:function () {
            var connect_qlt = 0;

            connect_qlt += this.download_qlt(this.model.get('download'));
            connect_qlt += this.upload_qlt(this.model.get('upload'));
            connect_qlt += this.ping_qlt(this.model.get('ping'));

            // Производим итоговую оценку качества соединения
            if( connect_qlt !=0 ) connect_qlt= Math.round(connect_qlt/3);

            //выставляем иконку в зависемости от сво-ва модели signal_quality
            return new google.maps.MarkerImage(
                App.Config.imageSrc
                    + connect_qlt
                    + ".png",
                new google.maps.Size(20, 34),
                new google.maps.Point(0, 0),
                new google.maps.Point(10, 35)
            );
        },

        // Оцениваем download speed
        download_qlt:function (download) {
            var common_level = 0;

            if (download >= 15) {
                common_level = 5;
            } else if (download >= 10 && download < 15) {
                common_level = 4;
            } else if (download >= 5 && download < 10) {
                common_level = 3;
            } else if (download >= 1 && download < 5) {
                common_level = 2;
            } else if (download < 1 && download != 0 && download != "") {
                common_level = 1;
            }
            return common_level;
        },

        // Оцениваем upload speed
        upload_qlt:function (upload) {
            var common_level = 0;

            if (upload >= 3) {
                common_level = 5;
            } else if (upload >= 2 && upload < 3) {
                common_level = 4;
            } else if (upload >= 1 && upload < 2) {
                common_level = 3;
            } else if (upload >= 0.2 && upload < 1) {
                common_level = 2;
            } else if (upload < 0.2 && upload != 0 && upload != "") {
                common_level = 1;
            }
            return common_level;
        },

        // Оцениваем ping
        ping_qlt:function (ping) {
            var common_level = 0;
            if (ping >= 150) {
                common_level += 1;
            } else if (ping >= 90 && ping < 150) {
                common_level += 2;
            } else if (ping >= 60 && ping < 90) {
                common_level += 3;
            } else if (ping >= 40 && ping < 60) {
                common_level += 4;
            } else if (ping < 40 && ping != '0' && ping != '') {
                common_level += 5;
            }
            return common_level;
        },

        rights:function (right) {
            switch (right) {
                case 'is_draggable':
                    return $.cookie('login') == this.model.get('login') ||
                        $.cookie('right_type_id') == "1" ? true : false;
                    break;
                case 'is_editable' :
                    return $.cookie('login') == this.model.get('login') ||
                        $.cookie('right_type_id') == "1" ? true : false;
                    break;

            }

        }

    });

});