const chat = $('#chatBox');
const input = $('#chatInput');

let otherUsername;

$(input).keypress(function(e) {
	if(e.which == 13) {
		//Send chat package
		if($(input).val() != ""){
			addMessageToChat($(input).val(), 'You')
			sendData({
				type: 'chatMessage',
				msg: $(input).val()
			})
			$(input.val(""))
		}
	}
});

function addMessageToChat(msg, user, color){
	var date = new Date();

	$(chat).html($(chat).html() + `${color != undefined ? '<span style="color:' + color + ';">' : ''}${date.getHours() + ':' + date.getMinutes()} - ${user}: ${msg}${color != undefined ? '</span>' : ''}` + "<br>");
}

function clearChat(){
	$(chat).html("");
}