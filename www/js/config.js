//var _HOST_ = 'http://www2.tecbiz.com.br/tecbiz/tecbiz.php';

var _HOST_ = 'https://www.tecbiz.com.br/tecbizMobile.php';
//var _HOST_ = 'http://interno.tecbiz.com.br:8080/tecbiz/tecbizMobile.php';

if (_HOST_ != 'http://www2.tecbiz.com.br/tecbiz/tecbiz.php') {
	$('div[data-role="content"]').css('background-color', 'orange');
}