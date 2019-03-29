chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
    	if(request && request.type == "copy"){
    		console.log(request.text)
    		saveToClipboard(request.text);
    	}
})

function saveToClipboard(text) {
    var copyFrom = $('<textarea/>');
    copyFrom.text(text);
    $('body').append(copyFrom);
    copyFrom.select();
    document.execCommand('copy');
    copyFrom.remove();
}

