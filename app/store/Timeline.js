Ext.define('ES.store.Timeline', {
    extend: 'Ext.data.Store',

    alias: 'store.timeline',

    fields: [
        'time', 'adress', 'dir'
    ],

    data: { query: [
        { time: '11h:50min', adress: "Viaduto António Pacheco",   dir: "North" },
        { time: '00h:30min',     adress: "A1",                    dir: "South" },
        { time: '09h:45min',   adress: "Av. Luisa Todi",          dir: "West" },
        { time: '19h:10min',     adress: "Rua Sergio Calado",     dir: "East" }
    ]},

    proxy: {
        type: 'memory',
        reader: {
            type: 'json',
            rootProperty: 'query'
        }
    }
});