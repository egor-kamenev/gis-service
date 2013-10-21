$(function(){

    // вид всплывающего окна
    App.Views.InfoWindow = Backbone.View.extend({

        initialize:function(){
            _.bindAll(this,'close');
            this.infobox = new google.maps.InfoWindow({disableAutoPan:true});
            google.maps.event.addListener(this.options.map,'click', this.close);

        },

        render:function(options){
            this.template = options.template;
            this.infobox.setContent(this.template(options.model.toJSON()));
            this.infobox.setPosition( new google.maps.LatLng(options.model.get('lat'), options.model.get('lng')) );
            if (options.visible == true) this.infobox.open(this.options.map); else this.infobox.close();
        },

        close:function(){
          this.infobox.close();
        }

    });

});