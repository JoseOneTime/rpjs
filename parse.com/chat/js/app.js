var parseID = 'BVum4CZB1WIdbgDwUoU1iWoTTKVKwg4cpIU5MX38';
var parseRestKey = 'kswlWuR9cvH4GHJcYpvLUPlBFfH1S5IoWHsO4mws';

$(document).ready(function(){

	getMessages();

	$('#send').click(function(){
		// .attr('value') didn't work, but .val() does
		var username = $('input[name=username]').val();
		var message = $('input[name=message]').val();
		console.log(username + ', ' + message);
		alert(username + '!');

		$.ajax({
			url : 'https://api.parse.com/1/classes/MessageBoard',
			headers : {
				'X-Parse-Application-Id' : parseID,
				'X-Parse-REST-API-Key' : parseRestKey
			},
			contentType : 'application/json',
			dataType : 'json',
			processData : false,
			data : JSON.stringify({
				'username' : username,
				'message' : message
			}),
			type : 'POST',
			success : function(){
				alert('sent');
				getMessages();
			},
			error : function(){
				alert('ERROR!');
			}
		});
	})

	function getMessages(){
		$.ajax({
			url : 'https://api.parse.com/1/classes/MessageBoard',
			headers : {
				'X-Parse-Application-Id' : parseID,
				'X-Parse-REST-API-Key' : parseRestKey
			},
			contentType : 'application/json',
			dataType : 'json',
			type : 'GET',
			success : function(data) {
				alert('get');
				updateView(data);
			},
			error : function(){
				alert('ERROR!');
			}
		});
	}

	function updateView(messages){
		var table = $('.table tbody');
		table.html('');
		$.each(messages.results, function(index, value){
			var trEl = $(
				'<tr>' +
				'<td>' + value.username + '</td>' +
				'<td>' + value.message + '</td>' + 
				'</tr>'
			);
			table.append(trEl);
		});
		console.log(messages);
	}
})