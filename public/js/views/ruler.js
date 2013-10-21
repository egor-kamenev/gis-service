// вид рулетки
App.Views.Ruler = Backbone.View.extend({

    el: '#rulerDisplay',
    dialog_prop:{ // Св-ва диалогового окна рулетки для отображения расстояния
        title:"Рулетка",
        height : 80,
        width : 120,
        draggable : true,
        modal : false,
        position : ["right", "center"],
        autoOpen:true,
        resizable:false,
        open: function(event, ui) {$(".ui-dialog-titlebar-close").hide();}
    },

    initialize:function(){

        // получаем div карты
        this.mapDiv = this.options.map.getDiv();

        _.bindAll(this,
            'addNewZone',
            'bindToMouse',
            'removeZone',
            'getDestination',
            'setInfoWindow',
            'disable'
        );

        this.dialog_prop.open = $.proxy(function(){
            this.$el.css('overflow','hidden');// убераем скролл
            this.$el.parent().find('.ui-dialog-titlebar-close').hide();// При открытии окна, скрываем значок закрытия окна.
        },this);

        this.$el.dialog(this.dialog_prop);

        this.polyline = new google.maps.Polyline({// мультилиния для рулетки
            path: [],
            strokeColor: "#FF0000",
            strokeOpacity: 1.0,
            strokeWeight: 2,
            map:this.options.map
        });
        this.path = []; // массив хранящий координаты всех отрезков

        // работаем с событиями div-а, а не карты, для того чтобы не зависеть от оверлеев, при нажатии на них.
        $(this.mapDiv).click(this.addNewZone); // добавить новый отрезок
        $(this.mapDiv).mousemove(this.bindToMouse); // привязываем конец рулетки к мышки
        $(this.mapDiv).mousemove(this.setInfoWindow); // Обновляем окно с измерениями
        $(this.mapDiv).mousedown(this.removeZone); // удаляем последний отрезок

    },

    addNewZone:function(event){

        var latLng = this.getLatLngFromEvent(event);
        this.path.push(latLng);
        this.polyline.setPath(this.path);

    },

    bindToMouse:function(event){
        this.polyline.setPath(this.path.concat([this.getLatLngFromEvent(event)]));
    },

    removeZone:function(event){
        var latLng = this.getLatLngFromEvent(event);

        if(event.which === 3){
            // если после добавления последнего отрезка рулетки мышка не сдвинулась удаляем сразу 2 последних отрезка
            // Т.к в данном случае при удалении только одного отрезка мы не увидим результата работы функции визуально

                if(latLng.lat() == this.path[this.path.length - 1].lat() && latLng.lng() == this.path[this.path.length - 1].lng()){
                    this.path.pop();
                }

            this.path.pop();
            this.polyline.setPath(this.path.concat(latLng));

        }

    },

    getLatLngFromEvent:function(event){ // конвертируем координаты окна в координаты карты
        var point;

        point = new google.maps.Point(parseInt(event.pageX), parseInt(event.pageY)-21);// 21px отступ для главного меню
        return App.Views.overlay.get().getProjection().fromContainerPixelToLatLng(point);
    },

    getDestination:function(){ // Измеряем расстояние между всеми отрезками
        return google.maps.geometry.spherical.computeLength(this.polyline.getPath().getArray());
    },

    getZonesCount:function(){ // Считаем кол-во отрезков
        return this.path.length;
    },

    setInfoWindow:function(){ // обновляем данные окна с измерениями
        this.$el.html(Math.round(this.getDestination())+"&nbsp;м.("+ this.getZonesCount()+")");
    },

    disable:function(){ // деактивируем режим рулетки
        $(this.mapDiv).unbind('click',this.addNewZone);
        $(this.mapDiv).unbind('mousemove',this.bindToMouse);
        $(this.mapDiv).unbind('mousemove',this.setInfoWindow);
        $(this.mapDiv).unbind('mousedown', this.removeZone);
        this.polyline.setMap(null);
        this.$el.html('').dialog('close');
        this.path = [];
    }

});