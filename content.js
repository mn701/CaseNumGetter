chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  // alert(request)
  const strNameSpan = $('div[data-testid="gms_three_pane_header_name"]').find('span').text()
  let cusName
  let myregex = /\((.+?)\)/
  if(myregex.test(strNameSpan)){
    cusName = strNameSpan.match(/\((.+?)\)/)[1]
  }else{
    myregex = /(.+?):/
    if(myregex.test(strNameSpan)){
      cusName = strNameSpan.match(myregex)[1]
    }else{
      cusName = 'unknown'
    }
  }
  const email = $('._4ytq:contains("Email")').siblings('._4ytr').find('._2lj1').text()
  const aid = $('._4ytq:contains("Ad Account ID")').siblings('._4ytr').find('._2lj1').text()
  const bid = $('._4ytq:contains("Business Manager ID")').siblings('._4ytr').find('._2lj1').text()
  const uid = $('._4ytq:contains("Case Contact")').siblings('._4ytr').find('._2lj1').text()
  const tier = $('._4ytq:contains("Tier")').siblings('._4ytr').text()
  sendResponse({cusName: cusName, email:email, aid:aid, bid:bid, uid:uid, tier:tier })
})
