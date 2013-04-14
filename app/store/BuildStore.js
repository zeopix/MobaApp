/*
 * File: app/store/BuildStore.js
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

Ext.define('MobaApp.store.BuildStore', {
    extend: 'Ext.data.Store',
    alias: 'store.BuildStore',

    requires: [
        'MobaApp.model.Build'
    ],

    config: {
        model: 'MobaApp.model.Build',
        storeId: 'BuildStore',
        pageSize: 10,
        proxy: {
            type: 'jsonp',
            extraParams: {
                hero: 40
            },
            url: 'http://moba/app_dev.php/api/builds/',
            reader: Ext.create('MobaApp.reader.Builds',{
                type:'json'
            })
        }
    }
});