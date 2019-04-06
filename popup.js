$(function(){
	const TXT_UNKNOWN = "不明です"
	const TXT_FAIL = "あいにく、情報を取得できませんでした"
	const TXT_ENTER_NAME = "アイコンを右クリックして[Options]から名前をセットしてください"
	const txt_clip = "下記をクリップボードにコピーしました。Ctrl+vで貼り付けることができます \n==========\n"
	const txt_over90 = "\nチャットが混み合っており、大変お待たせをしておりますことお詫び申し上げます。"
	const txt_open2 = `いつもFacebook広告をご利用頂きましてありがとうございます。`
	let agentName = ''
	chrome.storage.sync.get('agentName', function(option){
		if(option.agentName){
			agentName = option.agentName
		}else{
			$('#err').text(TXT_ENTER_NAME)
		}
	})

	$('#btn-case-info').click(function(){
			getCaseNumUrl()
			getTabElements()
	})

	$('#btn-opening').click(function () {
		const cusName = $('#cus-name').val()
		const caseNum = $('#case-num').val()
		if((cusName.length > 0) && (caseNum.length > 0)){
			let txt_opening = `${cusName}様、`+ getGreeting() + txt_open2
			if(agentName){
				txt_opening += `Facebookカスタマーサービスの${agentName}と申します。よろしくお願いいたします。`
			}
			if(document.getElementById("check90").checked){
				txt_opening += txt_over90
			}
			txt_opening += `\n本件のお問い合わせ番号は${caseNum}でございます。\n本日はどういったお問い合わせでしょうか？`
			showMsg(txt_opening)
		}
	})

	function getCaseNumUrl(){
		chrome.tabs.getSelected(null,function(tab) {
				const strUrl = tab.url
				const myregex = RegExp('jobs=(\\d+)')
				if(myregex.test(strUrl)){
					const strCaseNum = strUrl.match(/jobs=(\d+)/)[1]
					$("#case-num").val(strCaseNum)
				}else{
					$("#case-num").val(TXT_UNKNOWN)
				}
		})
	}

	function getTabElements(){
		chrome.tabs.query({currentWindow: true, active: true},
			function(tabs){
				chrome.tabs.sendMessage(tabs[0].id, 'hi', function(res){
					if(res){
						$('#cus-name').val(res.cusName.trim())
						$('#email').val(res.email.trim())
						$('#aid').val(res.aid.trim())
						$('#bid').val(res.bid.trim())
						$('#uid').val(res.uid.trim())
						const tier = res.tier
						if(tier == "Managed GSO"){
							$("input[name=tier][value='GSO']").prop('checked', true)
						}else{
							$("input[name=tier][value='SMB']").prop('checked', true)
						}
					}else{
						$('#err').text(TXT_FAIL)
					}
				})
			}
		)
	}

	function showMsg(str){
		alert(txt_clip + str)
		chrome.runtime.sendMessage({
			type: 'copy',
			text: str
		})
	}

	function getGreeting(){
		const today = new Date()
		const hours = today.getHours()
		let greeting
		if(hours<11){
			greeting = "おはようございます。"
		}else{
			greeting = "こんにちは！"
		}
		return greeting
	}
})
