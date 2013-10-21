// Вида главного меню
App.Views.MainMenu = Backbone.View.extend({
    el:'#menu',
    events:{
        'click #filter_menu_button':'open_filter_menu',
        'click input[name="show_only_own_markers"]':'show_only_own_markers'
    },

    // открыть меню фильтр
    open_filter_menu:function(){
        App.Views.filterMenu.openMenu();
    },

    //показывать только свои маркеры
    show_only_own_markers:function(event){


        var login = $.cookie('login');
        App.Collections.markers.each(function(model){
            if($(event.target).prop('checked')){
                if(model.get('login') != login) model.set('visible',false);
            }else{
                model.set('visible',true);
            }

        });
    }

});