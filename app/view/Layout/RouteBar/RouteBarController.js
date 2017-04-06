Ext.define('ES.view.Layout.RouteBar.RouteBarController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.routebar',

    onItemClick: function(table, td, columnIndex, record, tr, rowIndex, e) {

        Ext.toast({
        timeout: 5000,
        html: locale.value +  td.innerText,
        width: 150,
        height: 20
        });
    }
    
});
