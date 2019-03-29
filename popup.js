$ = document.querySelector.bind(document)
const txt_msg = "クリップボードにコピーします。Ctrl+vで貼り付けてください。<br />===========<br />"

$('#btn-u').onclick = function(){
	chrome.tabs.getSelected(null,function(tab) {
	    const strUrl = tab.url
	    const caseNum = strUrl.match(/questions\/(\d+)\//)[1]
	    const msgStr = `お問い合わせ番号は${caseNum}でございます。`
	    document.getElementById("res").innerHTML = txt_msg +  msgStr
	    chrome.runtime.sendMessage({
	    	type: 'copy',
	    	text: msgStr
		})
	})
}

