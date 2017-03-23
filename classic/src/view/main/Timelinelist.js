/**
 * This view is an example list of people.
 */
Ext.define('ES.view.main.Timelinelist', {
    extend: 'Ext.grid.Panel',
    xtype: 'timelinelist',

    requires: [
        'ES.store.Timeline'
    ],

    title: 'Timeline',

    store: {
        type: 'timeline'
    },

    columns: [
        { text: 'Time',  dataIndex: 'time', width:75},
        { text: 'Adress', dataIndex: 'adress', flex: 1, width:150},
        { text: 'Direction', dataIndex: 'dir', flex: 1, width:75 }
    ],

    listeners: {
        select: 'onItemSelected'
    }
});