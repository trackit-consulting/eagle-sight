var lang = localStorage ? (localStorage.getItem('user-lang') || 'en') : 'en';
var file = '/ext/resources/translations/' + lang + '.js';

document.write('<script type="text/javascript" src="' + file + '"></script>');