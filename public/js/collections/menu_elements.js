$(function(){

    App.Collections.MenuElements = App.Collections.baseCollection.extend({ //коллекция элементов меню
        model: App.Models.MenuElement
    });

    //инициализируем коллекцию эл-ов меню
    App.Collections.menuElements = new App.Collections.MenuElements([
        {
            id:"addNewMarker",
            name:"Добавить маркер",
            img_path: App.Config.imageSrc + "add_marker.png",
            right_types:[1,2,3,4] // группы у которых есть право доступа к пункту меню
        },

        {
            id:"addNewBaseStation",
            name:"Добавить базовую станцию",
            img_path: App.Config.imageSrc + "add_bs.png",
            right_types:[1]
        },

        {
            id:"addNewSector",
            name:"Добавить сектор",
            img_path: App.Config.imageSrc + "add_sector.png",
            right_types:[1]
        }
    ]);

});