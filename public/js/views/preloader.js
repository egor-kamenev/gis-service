$(function(){

    App.Views.Preloader = Backbone.View.extend({
        el: '#preloader',

        initialize:function(){
            _.bindAll(this, 'hide');
            this.$el.removeClass('hidden');
        },

        hide:function(){
            this.$el.addClass('hidden');
        }

    });

});