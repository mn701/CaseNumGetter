$(function(){
    chrome.storage.sync.get('agentName',function(option){
        $('#agent-name').val(option.agentName)
    })

    $('#saveName').click(function(){
        const agentName = $('#agent-name').val()
        if (agentName){
            chrome.storage.sync.set({'agentName': agentName}, function(){
                close()
            })
        }
    })
})
