$(function() {

    // Базовый вид для маркеров(метки, базовые станции)
    App.Views.Label = Backbone.View.extend({

        initialize: function(){

            _.bindAll(this,
                'showInfoWindow',
                'showEditWindow',
                'getTitle',
                'getIcon',
                'labelChangedPosition',
                'setOptions',
                'rights'
            );

            // Слушаем модель, перерисовываем вид в случаеи измененения или удаления модели
            this.model.on("change", this.setOptions, this);
            this.model.on("change", function(){ this.showInfoWindow(false) }, this);
            this.model.on("destroy", this.remove, this);
            this.model.on("edited", this.showInfoWindow, this);
        },

        render:function(){

            // Создаем маркер
            this.marker =  new google.maps.Marker();
            this.setOptions();

            google.maps.event.addListener(this.marker,'click',this.showInfoWindow);
            google.maps.event.addListener(this.marker,'dblclick',this.showEditWindow);
            google.maps.event.addListener(this.marker,'dragend',this.labelChangedPosition);


            return this;
        },

        // Обновляем модель если маркер перенесли
        labelChangedPosition:function(){
            jConfirm("Переместить маркер?", "Переместить маркер?", $.proxy(function(result) {
                if(result == true) {
                    this.model.set({
                        lat: this.marker.getPosition().lat(),
                        lng: this.marker.getPosition().lng()
                    });

                    this.model.save();

                }else{
                    this.model.trigger('change');
                }
            },this));

        },

        //удаляем маркер
        remove:function(){
            this.marker.setMap(null);
        },

        getIcon:function(){
            return new google.maps.MarkerImage(
                App.Config.imageSrc + this.img_name,
                new google.maps.Size(32, 37),
                new google.maps.Point(0, 0),
                new google.maps.Point(15,20)
            );

        },

        setOptions:function(){
            a = this.model;
            this.marker.setOptions({

                position: new google.maps.LatLng(this.model.get('lat'), this.model.get('lng')),
                title: this.getTitle(),
                visible: this.model.get('visible'),
                map: this.options.map,
                draggable:this.rights('is_draggable'),
                icon: this.getIcon(),
                flat: true
            });
        },

        showEditWindow:function(){

            if(this.rights('is_editable')){

                var view = new App.Views.collection[this.editViewId]({
                    template: this.editTemplate,
                    title: this.editWindowTitle,
                    model: this.model,
                    action: 'edit'
                });
                view.render();
            }

        },

        rights:function(right){

            switch(right){

                case 'is_draggable': return $.cookie('right_type_id') == "1" ? true : false ;
                    break;
                case 'is_editable': return $.cookie('right_type_id') == "1" ? true : false ;
                    break;

                default: return false;
            }
        },

        showInfoWindow:function(visible){

            if(typeof(visible) == "object") visible = true;

            App.Views.infoWindow.render({
                model:this.model,
                template: this.$info_win_template,
                visible: visible
            });
        }



    });

});