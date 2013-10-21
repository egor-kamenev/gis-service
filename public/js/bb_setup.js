$(document).ready(function() {

    // Инициализируем карту
    App.Views.map = new App.Views.Map({el:"#map_canvas"}).render();

    // Создаем новый слой на карте для возможнсти получить проекцию карты.
    App.Views.overlay = new (Backbone.View.extend({

        initialize:function(){

            _.bindAll(this, 'get');
            this.overlay = new google.maps.OverlayView();
            this.overlay.draw = function(){};
            this.overlay.setMap(App.Views.map.getMap());
        },

        get:function(){
            return this.overlay;
        }

    }));


    google.maps.event.addListenerOnce(App.Views.map.getMap(),'tilesloaded',function(){

        // проверяме права пользователя
        if([1,3,4].indexOf(parseInt($.cookie('right_type_id')))!=-1){

            // Создаем вид отображающий зоны охвата
            App.Views.signalCanvas = new App.Views.SignalCanvas({
                map: App.Views.map.getMap()
            });

            //Создаем вид отображающий метки секторов
            App.Collections.sectors = new App.Collections.Sectors;

            App.Collections.sectors.fetch({
                success:function(collection){

                    if([1,4].indexOf(parseInt($.cookie('right_type_id')))!=-1){

                        App.Views.signals = new App.Views.Sectors({
                            map: App.Views.map.getMap(),
                            collection: App.Collections.sectors
                        }).render();

                        // сообщаем о удачной синхронизации для того что бы своевреммено удалить модель
                        // из колекции при удалении самой модели
                        App.Collections.sectors.trigger('fetched');
                    }

                    // добавляем коллекцию для отображения зон охвата
                    App.Views.signalCanvas.addCollection(App.Collections.sectors);

                }

            });

            // Создаем базовые станции после успешной синхронизации с сервером
            App.Collections.baseStations.fetch({
                success:function(collection){

                    // Проверяем права доступа к базовым станциям
                    if([1,4].indexOf(parseInt($.cookie('right_type_id')))!=-1){
                        //выводим базовые станции
                        App.Views.baseStations = new App.Views.Labels({
                            collection:App.Collections.baseStations,
                            map:App.Views.map.getMap(),
                            View:App.Views.BaseStation
                        }).render();


                    }

                    // Сообщяем об успешной синхронизации
                    App.Collections.baseStations.trigger('fetched');

                    // Добавляем коллекцию в вид зон охвата для её обтображения
                    App.Views.signalCanvas.addCollection(App.Collections.baseStations);

                }
            });

        }

        // Создаем метки после успешной синхронизации с сервером
        App.Collections.markers.fetch({
            success:function(){

                // Проверяем права доступа к фильтру
                if([1].indexOf(parseInt($.cookie('right_type_id')))!=-1){

                    // Активируем меню "Фильтр меток", и приводим нашу коллекцию в соответствие фильтру меток
                    App.Views.filterMenu = new App.Views.FilterMenu({
                        collection: App.Collections.markers
                    });
                }

                // Создаем вид меток
                App.Views.markers = new App.Views.Labels({
                    collection: App.Collections.markers,
                    map: App.Views.map.getMap(),
                    View: App.Views.Marker
                });


                // Создаем и выводим метки
                App.Views.markers.render();

                // Сообщаем об успешной синхронизации
                App.Collections.markers.trigger('fetched');

                // Скрываем прелоадер
                App.Views.preloader.hide();

            },

            error:function(data,d){
                jAlert("Отсутствует связь с сервером! Проверьте наличие интернета, и попробуйте снова.", "Маркеры не могут быть загружены");
                console.error("Отсутствует связь с сервером! Проверьте наличие интернета, и попробуйте снова.", "Маркеры не могут быть загружены");
            }

        });

        // Инициализируем контекстное меню.
        App.Views.contextMenu = new App.Views.DropDownMenu({
            map: App.Views.map.getMap()
        });

        // Инициализируем всплывающие окно
        App.Views.infoWindow = new App.Views.InfoWindow({
            map:App.Views.map.getMap()
        });

        // Создаем и выводим меню инструментов(рулетка)
        App.Views.controlMenu = new App.Views.ControlMenu({
            template: _.template($('#ContollerMenuIcon-template').html()),
            collection: App.Collections.controlMenuElements,
            position: google.maps.ControlPosition.TOP_CENTER,
            map:App.Views.map.getMap()
        });

        // Активируем главное меню
        App.Views.mainMenu = new App.Views.MainMenu;


    });

});