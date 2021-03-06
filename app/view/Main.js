/*
 * File: app/view/Main.js
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

Ext.define('MobaApp.view.Main', {
    extend: 'Ext.tab.Panel',

    config: {
        items: [
            {
                xtype: 'navigationview',
                title: 'Guides',
                iconCls: 'bookmarks',
                id: 'buildnavigationview',
                autoDestroy: true,
                navigationBar: {
                    items: [
                        {
                            xtype: 'button',
                            id: 'favButton',
                            text: 'To Favorites',
                            align: 'right',
                            hidden: true,
                            iconCls: 'favorites',
                            iconMask: true,
                            hideAnimation: Ext.os.is.Android ? false : {
                                type: 'fadeOut',
                                duration: 200
                            },
                            showAnimation: Ext.os.is.Android ? false : {
                                type: 'fadeIn',
                                duration: 200
                            }
                        },]
                },
                items: [
                    {
                        xtype: 'list',
                        title: 'Heroes',
                        plugins: [
                            {
                                xclass: 'Ext.plugin.PullRefresh',
                                pullRefreshText: 'Pull down to update list!'
                            }
                        ],
                        itemId: 'mylist',
                        emptyText: 'Couldn\'t connect to server.',
                        itemTpl: [
                            '<div><img width="50px" height="50px" style="width:50px; height:50px" src="{image}"> {name}</div>'
                        ],
                        store: 'HeroStore',
                        items: [
                            {
                                xtype: 'searchfield',
                                docked: 'top',
                                itemId: 'mysearchfield',
                                label: 'Buscar'
                            }
                        ]
                    }
                ]
            },{
                xtype: 'navigationview',
                title: 'Favorites',
                id: 'favnavigationview',
                iconCls: 'favorites',
                autoDestroy: true,
                navigationBar: {
                    items: [
                        {
                            xtype: 'button',
                            id: 'removeButton',
                            text: 'Remove Favorite',
                            align: 'right',
                            hidden: true,
                            iconCls: 'favorites',
                            iconMask: true,
                            hideAnimation: Ext.os.is.Android ? false : {
                                type: 'fadeOut',
                                duration: 200
                            },
                            showAnimation: Ext.os.is.Android ? false : {
                                type: 'fadeIn',
                                duration: 200
                            }
                        },]
                },
                items: [
                    {
                        xtype: 'list',
                        title: 'Favorites',
                        iconCls: 'favorites',
                        plugins: [
                            {
                                xclass: 'Ext.plugin.PullRefresh',
                                pullRefreshText: 'Pull down to update list!'
                            }
                        ],
                        itemId: 'favlist',
                        emptyText: 'No favorites yet.',
                        itemTpl: [
                            '<div><img width="50px" height="50px" style="width:50px; height:50px" src="{heroimage}"> {heroname}<br><small>{buildname}</div>'
                        ],
                        store: 'FavoritesStore',
                    }
                ]
            },
        ],
        tabBar: {
            docked: 'bottom'
        },
        listeners: [
            {
                fn: 'onSearchfieldKeyup',
                event: 'keyup',
                delegate: '#mysearchfield'
            },
            {
                fn: 'onListItemTap',
                event: 'itemtap',
                delegate: '#mylist'
            }
        ]
    },

    onSearchfieldKeyup: function(textfield, e, eOpts) {
        var store = Ext.getStore('HeroStore');
        store.clearFilter(true);
        store.filter('name',textfield.getValue());

    },

    onListItemTap: function(dataview, index, target, record, e, eOpts) {
        var view = Ext.create('MobaApp.view.HeroView');
        var store = view.getItems().getAt(0).getStore();
        store.getProxy().setExtraParam('hero',record.data.id);
        store.load();
        
        view.setTitle(record.data.name);
        target.up('navigationview').push(view);

    }

});