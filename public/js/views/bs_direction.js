/**
 * User: e.kamenev
 * Date: 19.09.12
 * Time: 8:43
 */

App.Views.BsDirection = Backbone.View.extend({
    // TODO разобраться, почему в этом месте, не может быть получен див карты!
    //this.el = this.options.map.getDiv();
    /*events:{
        'click': 'render'
    },*/

    arrows:[], // массив стрелок

    initialize: function(){

        _.bindAll(this, 'render', 'deleteArrow', 'disable');

        this.el = this.options.map.getDiv(); //див карты

        $(this.el).click(this.render); // Отрисовываем стрелку

    },

    render: function(event){

        this.model = new App.Models.NearestBaseStations;

        // при получении данных с сервера с базами данных
        this.model.on('success',function(model){
            // удаляем предыдущие стрелки
            this.deleteArrow();

            // рисуем новые стрелки
            _.each(model.get('locations'),function(location){

                this.arrows.push(this.getArrow(this.getLatLngFromEvent(event),location));

            },this);

        },this);

        // запрашиваем данные на сервере, скармливаем серверу координаты пользователя
        this.model.fetch({
            data: {
                lat: this.getLatLngFromEvent(event).lat(),
                lng: this.getLatLngFromEvent(event).lng()
            },

            // Возбуждаем событие успешности получения данных с сервера.
            success:function(model){
                model.trigger('success',model);
            }
        });

    },


    getLatLngFromEvent:function(event){ // конвертируем координаты окна в координаты карты
        var point;

        point = new google.maps.Point(parseInt(event.pageX), parseInt(event.pageY)-21);// 21px отступ для главного меню
        return App.Views.overlay.get().getProjection().fromContainerPixelToLatLng(point);
    },


    getArrow: function(from,to){

        // длинна вектора
        var vector_long = Math.sqrt(Math.pow( to.lat-from.lat(),2 )+ Math.pow( to.lng-from.lng(),2 ));

        //координаты вектора
        var vector_coord = {
            lat: (to.lat - from.lat()),
            lng: (to.lng - from.lng())
        };

        //конце стрелки удаленный от начала на 0.008 градуса
        var vector_point_coord = {
            lat: ((vector_coord.lat / vector_long)*0.006)+ from.lat(),
            lng: ((vector_coord.lng / vector_long)*0.006)+ from.lng()
        };

        //конец стрелки
        var arrow_to = new google.maps.LatLng(vector_point_coord.lat,vector_point_coord.lng);

        var arrow =  new google.maps.Polyline({
            path:[from, arrow_to],
            strokeColor: "black",
            strokeOpacity: 1.0,
            strokeWeight: 2,
            map:this.options.map
        });

        return arrow;
    },

    deleteArrow: function(){

        _.each(this.arrows,function(arrow){
            arrow.setMap(null);
        });

        this.arrows = [];

    },

    disable:function(){

        $(this.el).unbind('click',this.render);
        this.deleteArrow();
    }


});