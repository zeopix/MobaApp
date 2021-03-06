/*
 * File: app/controller/HeroListController.js
 *
 * This file was generated by Sencha Architect version 2.2.0.
 * http://www.sencha.com/products/architect/
 *
 * This file requires use of the Sencha Touch 2.1.x library, under independent license.
 * License of Sencha Architect does not include license for Sencha Touch 2.1.x. For more
 * details see http://www.sencha.com/license or contact license@sencha.com.
 *
 * This file will be auto-generated each and everytime you save your project.
 *
 * Do NOT hand edit this file.
 */

Ext.define('MobaApp.controller.HeroListController', {
    extend: 'Ext.app.Controller',

    config: {
        stores: [
            'HerosStore'
        ],

        refs: {
            heroview: {
                autoCreate: true,
                selector: '#HeroViewElm',
                xtype: 'heroview'
            },
            herobuild : 'herobuild',
            heroList: 'heroview list',
            favList: '#favnavigationview list',
            nav: '#buildnavigationview',
            favButton: '#buildnavigationview #favButton',
            favNav: '#favnavigationview',
            removeFavButton: '#favnavigationview #removeButton',
            buildsView: '#BuildsView'
        },

        control: {
            "nav":{
                pop: 'onNavPop'
            },
            "favNav":{
                pop: 'onFavNavPop'
            },
            "heroList": {
                itemtap: 'onListItemTap'
            },
            "favList": {
                itemtap: 'onFavListItemTap'
            },
            "herobuild": {
                updatedata: 'onHeroBuildLoad'
            },
            "favButton":{
                tap: 'onFavButtonTap'
            },
            "removeFavButton":{
                tap: 'onRemoveFavButtonTap'
            }
        }
    },
    onHeroBuildLoad: function(obj){
        //fill son 
        var data = obj.getData();
        obj.getItems().getAt(1).setData(data);

        obj.getItems().getAt(1).getItems().getAt(0).setData({link:"http://mobafire.com/"+data.link});

        //runes
        var runes = Ext.create('MobaApp.store.RunesStore');
        runes.loadLocal(function(){
            var dataRunes = data.runes;
            parsedData = { };
            for(rune in dataRunes){
                dataRunes[rune].data = runes.getAt(runes.find("id",data.runes[rune].id)).getData();
            }
            parsedData.runes = dataRunes;
            obj.getItems().getAt(2).setData(parsedData);
        })

        //mastery
        var masteries = Ext.create('MobaApp.store.MasteryStore');
        masteries.loadLocal(function(){
            var dataMasteries = data.mastery;
            parsedData = {}
            for(mastery in dataMasteries){
                dataMasteries[mastery].data = masteries.getAt(masteries.find("id",dataMasteries[mastery].id)).getData();
            }
            parsedData.masteries = dataMasteries;
            obj.getItems().getAt(3).setData(parsedData);
        })        

        var items = Ext.create('MobaApp.store.ItemsStore');
        items.loadLocal(function(){
            parsedData = { bags: [] };
            for(bag in data.bags){
                var dataItems = data.bags[bag].items;
                for(item in dataItems){
                    var itemIndex = items.find("id",dataItems[item]);
                    dataItems[item] = {
                        data: (itemIndex > -1) ? items.getAt(itemIndex).getData() : false,
                        id: dataItems[item]
                    };
                }
                var parsedBag = {
                    items: dataItems,
                    name: data.bags[bag].name
                };
                parsedData.bags.push(parsedBag);
            }

            obj.getItems().getAt(4).setData(parsedData);
        })
        var abilities = Ext.create('MobaApp.store.AbilitiesStore');
        abilities.loadLocal(function(){
            var dataAbilities = data.abilities;
            for(ability in dataAbilities){
                var abilityIndex = abilities.find("id",dataAbilities[ability].id);
                dataAbilities[ability] = {
                    data: (abilityIndex > -1) ? abilities.getAt(abilityIndex).getData() : false,
                    levels: dataAbilities[ability].levels
                };
            }
            parsedData.levels = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17];
            parsedData.abilities = dataAbilities;
            obj.getItems().getAt(5).setData(parsedData);
        })
        
        
    },
    onNavPop: function(){
        this.getFavButton().hide();
    },
    onFavNavPop: function(){
        this.getRemoveFavButton().hide();
    },
    onRemoveFavButtonTap: function(){
        alert("Removing "+window.currentFavorite)
        var store = Ext.create('MobaApp.store.FavoritesStore');
        store.load();
        var existentFavorite = store.find("buildid",window.currentFavorite);
        if(existentFavorite > -1){
            store.remove(store.getAt(existentFavorite));
            store.sync();
            Ext.Msg.alert('Success!', 'This guide has been removed from your favorites.', Ext.emptyFn);
        }else{
            Ext.Msg.alert('Already in Fav!', 'This guide couldn\'t be removed from your favorites.', Ext.emptyFn);
        }
    },
    onFavButtonTap: function(){
        var data =this.getHerobuild().getData();
        var favorite = {
                heroimage: data.hero.image,
                heroid: data.hero.id,
                heroname: data.hero.name,
                buildid: data.id,
                buildname: data.title,
        }

        var buildsStore = this.getBuildsView().getStore();

        var currentIndex = buildsStore.find("id",data.id);
        if(currentIndex>-1){
            var dataBuild = buildsStore.getAt(currentIndex);
            favorite.rawdata = Ext.encode(dataBuild.raw);
        }
        console.log(dataBuild.raw)
        var model = Ext.create("MobaApp.model.Favorite",favorite);
        var store = Ext.create('MobaApp.store.FavoritesStore');
        store.load();
        var existentFavorite = store.find("buildid",data.id);
        if(existentFavorite == -1){
            model.save();
            Ext.Msg.alert('Success!', 'This guide has been added to your favorites.', Ext.emptyFn);
        }else{
            Ext.Msg.alert('Already in Fav!', 'This guide was already in your favorites.', Ext.emptyFn);
        }

    },
    onListItemTap: function(dataview, index, target, record, e, eOpts) {
        //var panel = Ext.create('MobaApp.view.BuildPanel');
        this.getNav().push({
            xtype:'herobuild',
            title: record.get('heroname')
        });
        this.getFavButton().show();
        this.getHerobuild().setData(record.raw);
        //this.getNav().push(panel);
        //target.up('navigationview').push(panel);
    },
    onFavListItemTap: function(dataview, index, target, record, e, eOpts) {
        window.currentFavorite = record.raw.buildid;
        var data = Ext.decode(record.raw.rawdata);
        //var panel = Ext.create('MobaApp.view.BuildPanel');
        this.getFavNav().push({
            xtype:'herobuild',
            title: record.get('heroname')
        });
        this.getRemoveFavButton().show();
        //load build
        

        this.getHerobuild().setData(data);
        //this.getNav().push(panel);
        //target.up('navigationview').push(panel);
    },

    init: function(application) {
        //var store = Ext.getStore('HeroStore');
        //store.load();
    }

});