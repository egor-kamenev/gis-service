App.Views.SignalCanvas = Backbone.View.extend({
    initialize:function(){

        _.bindAll(this,'addCollection', 'setVisible', 'getVisible');

        this.collections = []; // addCollection() складывает сюда коллекции с назначенными правами и пр. цацками

        // создаем canvas
        if([1].indexOf(parseInt($.cookie('right_type_id')))!=-1){
            this.div = $("<div style='position: absolute;' class='hidden'>");
        }else{
            this.div = $("<div style='position: absolute;'>");
        }


        this.div.append('<canvas id="signal_canvas">error<\/canvas>');
        $(App.Views.overlay.get().getPanes().overlayLayer).append(this.div);

        this.canvas = $('#signal_canvas').attr({
            height: screen.height + "px",
            width: screen.width + "px"
        });

        // рендерим наш canvas при перетаскивании и изменении zoom
        google.maps.event.addListener(this.options.map,'dragend', $.proxy(this.render,this));
        google.maps.event.addListener(this.options.map,'zoom_changed', $.proxy(this.render,this));
        // скрываем наш canvas во время перетаскивания
        google.maps.event.addListener(this.options.map,'drag', $.proxy(this.hideOnDrag,this));

        // Инициализируем коллекции с зонами охвата или секторами
        _.each(this.options.collections, function(collection){
            this.addCollection(collection);
        },this);

    },

    render:function(){

        //если вид скрыт, то не производим его рендеринг
        if(!this.getVisible()) return null;

        var projection = App.Views.overlay.get().getProjection();
        var map_center_point = projection.fromLatLngToDivPixel(this.options.map.getCenter());

        //изменяем положение родительского div-a canvas относительно основного div-а карты
        this.div.css({
            'left': (map_center_point.x - (screen.width / 2)) + "px",
            'top': (map_center_point.y - (screen.height / 2)) + "px"
        });

        // получаем данные о базовых станциях из базы данных
        // создаем отдельные слои на canvas для зон охвата
        var layers = {
            high_level_signal : this.canvas[0].getContext("2d"),
            medium_level_signal : this.canvas[0].getContext("2d"),
            low_level_signal : this.canvas[0].getContext("2d")
        };

        //Задаем цвет заливки и прозрачность для каждого слоя
        layers.high_level_signal.fillStyle = "rgba(0, 255, 0, 0.4)";
        layers.medium_level_signal.fillStyle = "rgba(0, 255, 0, 0.3)";
        layers.low_level_signal.fillStyle = "rgba(0, 255, 0, 0.2)";

        //задаем сопаставления слоев и имен параметров зон охвата возвращаемых через ajax
        var layers_alias = {
            high_level_signal : "high_level_signal_radius",
            medium_level_signal : "medium_level_signal_radius",
            low_level_signal : "low_level_signal_radius"
        };

        // Очищаем canvas перед перерисовкой
        layers.low_level_signal.clearRect(0, 0, screen.width, screen.height);

        for(var layer in layers) {

            // Отмечаем начало пути росования
            layers[layer].beginPath();

            _(this.collections).each(function(collection){
                collection.each(function(model){

                    //получаем координаты зоны охвата в dom
                    var basestation_dom_location = projection.fromLatLngToContainerPixel(new google.maps.LatLng(model.get('lat'), model.get('lng')));
                    //конвертируем радиус из метров в пикселы
                    var radius = this.fromMeterToPixel(model.get([layers_alias[layer]]), this.options.map.getZoom());

                    // перемещаемся в точку центра окружности
                    //console.log(radius);
                    layers[layer].moveTo(basestation_dom_location.x, basestation_dom_location.y);
                    //отрисовываем окружность

                    layers[layer].arc(basestation_dom_location.x, basestation_dom_location.y, radius, model.get('starting_angle'), model.get('ending_angle'), false);

                },this);
            },this);

            //закрываем слой
            layers[layer].closePath();

            //заливаем слой
            layers[layer].fill();

        }

        //return this;
    },

    // конварируем метры в пиксили при задонном зуме
    fromMeterToPixel: function(meter, zoom) {
        var i = 2;

        //соотношение метров к пикселам при масштабе карты(zoom) == 1
        //найдено эмпирическим путем!
        var z = 57032;

        //при увелечении масштаба на еденицу коэфицент падает в 2 раза
        //т.е. снижаем коэфицент до текущего масштаба
        while(i <= zoom) {
            z = z / 2;
            i++;
        }

        // получаем кол-во пикселов
        return meter / z;
    },

    addCollection: function(collection){
        collection.on('add',this.render,this);
        collection.on('remove',this.render,this);
        collection.on('change',this.render,this);
        this.collections.push(collection);
        this.render();
    },

    setVisible: function(status){
        switch(status){
            case false:  this.div.addClass('hidden'); break;
            case true:  this.div.removeClass('hidden'); break;
            default: this.div.removeClass('hidden'); break;
        }

        //рендерим слой перед тем как вывести на карту
        this.render();
    },

    getVisible: function(){
        return !this.div.is('.hidden');
    },

    hideOnDrag: function(){
        var visible = this.getVisible();
        if(typeof(visible) == 'boolean'){
            if(visible == true){
                this.setVisible(false);
                // по событию dragend показываем canvas, если он был видимым до перетаскивания
                google.maps.event.addListenerOnce(this.options.map,'dragend', $.proxy(function(){
                    this.setVisible(true);
                },this));
            }

        }else{
            console.log('"visible" must be a boolean var');
        }


    }

});