$(function(){
	
    chrome.storage.sync.get(['spiel', 'sla90'],function(option){
        $('#spiel').val(option.spiel)
        $('#sla90').val(option.sla90)
    })
    
    $('#spiel').keyup(updateSample)
    $('#sla90').keyup(updateSample)
    $('#check90').change(updateSample)

    $('#saveName').click(function(){
        const spiel = $('#spiel').val()
        const sla90 = $('#sla90').val()
        if (spiel){
            chrome.storage.sync.set({'spiel': spiel, 'sla90':sla90}, function(){
                close()
            })
        }
    })
    
    function updateSample(){
    	const greeting = getGreeting()
    	let txt_over90 = $('#sla90').val()?  "\n" + $('#sla90').val(): "\nチャットが混み合っており、大変お待たせをしておりますことお詫び申し上げます。"
    	const sla90 = $('#check90').prop('checked')? txt_over90 : ""
    	let strMsg = $('#spiel').val()
			    .replace(/{{cusName}}/g, "山田")
			    .replace(/{{caseNum}}/g, "123456789012345")
			    .replace(/{{greeting}}/g, greeting)
				.replace(/{{sla90}}/g, sla90)
    	$('#sample').html(strMsg)
    }
    
    
    function getGreeting(){
		const today = new Date()
		const hours = today.getHours()
		let greeting
		if(hours<11){
			greeting = "おはようございます"
		}else{
			greeting = "こんにちは"
		}
		return greeting
	}
})
