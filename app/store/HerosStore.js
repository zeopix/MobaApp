/*
 * File: app/store/HerosStore.js
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

Ext.define('MobaApp.store.HerosStore', {
    extend: 'Ext.data.Store',

    requires: [
        'MobaApp.model.Hero'
    ],

    config: {
        autoLoad: true,
        model: 'MobaApp.model.Hero',
        storeId: 'HeroStore',
        proxy: {
            type: 'jsonp',
            url: 'http://moba/app_dev.php/api/heros/',
            reader: {
                type: 'json'
            }
        }
    }
});