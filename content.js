chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  const strNameSpan = $('div[data-testid="gms_three_pane_header_name"]').find('span').text()
  const cusName = strNameSpan.match(/\((.+?)\)/)[1]
  const email = $('._4ytq:contains("Email")').siblings('._4ytr').find('._2lj1').text()
  const aid = $('._4ytq:contains("Ad Account ID")').siblings('._4ytr').find('._2lj1').text()
  const bid = $('._4ytq:contains("Business Manager ID")').siblings('._4ytr').find('._2lj1').text()
  const uid = $('._4ytq:contains("Case Contact")').siblings('._4ytr').find('._2lj1').text()
  const tier = $('._4ytq:contains("Tier")').siblings('._4ytr').text()
  sendResponse({cusName: cusName, email:email, aid:aid, bid:bid, uid:uid, tier:tier })
})
