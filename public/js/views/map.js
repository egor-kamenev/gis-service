$(function() {
    App.Views.Map = Backbone.View.extend({

        initialize:function () {

            this.$el.css({
                "height":screen.height,
                "width":screen.width
            });

            _.bindAll(this,
                'LoadMapPosition',
                'SaveMapPosition',
                'LoadMapZoom',
                'SaveMapZoom',
                'LoadMapType',
                'SaveMapType',
                'getMap'
            );
        },

        render:function(){

            var myOptions = {
                zoom:16,
                mapTypeId:google.maps.MapTypeId.ROADMAP,
                disableDoubleClickZoom:true,
                draggableCursor:'default',
                center:new google.maps.LatLng(42.8753903660182, 74.63396263701634)
            };

            this.map = new google.maps.Map(this.$el[0], myOptions);

            // активаруем состояние карты при загрузке(тип карты, положение, масштаб)
            this.LoadMapPosition();
            this.LoadMapZoom();
            this.LoadMapType();

            //запоминаем состояние карты при загрузке(тип карты, положение, масштаб)
            google.maps.event.addListener(this.map, 'dragend', this.SaveMapPosition);
            google.maps.event.addListener(this.map, 'zoom_changed', this.SaveMapZoom);
            google.maps.event.addListener(this.map,'maptypeid_changed', this.SaveMapType);

            google.maps.event.addListenerOnce(this.map,'idle', $.proxy(function(){
                this.trigger("rendered");
            },this));

            return this;
        },

        LoadMapPosition:function () {

            var map_position = $.jCookies({
                get:"map_position"
            });

            if (map_position) {
                this.map.setCenter(new google.maps.LatLng(map_position.lat, map_position.lng));
            }
        },

        SaveMapPosition:function () {
            $.jCookies({
                name:"map_position",
                value:{
                    lat: this.map.getCenter().lat(),
                    lng: this.map.getCenter().lng()
                }
            });
        },

        SaveMapZoom:function(){
            $.jCookies({
                name : "map_zoom",
                value : this.map.getZoom()
            });
        },

        LoadMapZoom:function(){
            var map_zoom = $.jCookies({
                get:"map_zoom"
            });

            if (map_zoom) {
                this.map.setZoom(map_zoom);
            }
        },

        SaveMapType: function(){
            $.jCookies({
                name : "map_type",
                value : this.map.getMapTypeId()
            });
        },

        LoadMapType: function(){
            var map_type = $.jCookies({
                get:"map_type"
            });

            if (map_type) {
                this.map.setMapTypeId(map_type);
            }

        },

        getMap:function(){
            return this.map;
        }
    });


});