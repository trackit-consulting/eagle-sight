Ext.define('ES.view.Layout.RouteBar.RouteBarController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.routebar',

    onItemClick: function(table, td, columnIndex, record, tr, rowIndex, e) {

        //Show toast when the user clicks at a specific row
        Ext.toast({
        timeout: 5000,
        html: td.innerText,
        width: 150,
        height: 20

    });
    
    }
    
});
