$(function(){
    chrome.storage.sync.get(['agentName', 'preMsg', 'postMsg'],function(option){
        $('#agent-name').val(option.agentName)
        $('#pre-msg').val(option.preMsg)
        $('#post-msg').val(option.postMsg)
    })

    $('#saveName').click(function(){
        const agentName = $('#agent-name').val()
        const preMsg = $('#pre-msg').val()
        const postMsg = $('#post-msg').val()
        if (agentName){
            chrome.storage.sync.set({'agentName': agentName, 'preMsg':preMsg, 'postMsg':postMsg}, function(){
                close()
            })
        }
    })
})
