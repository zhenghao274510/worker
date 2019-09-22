
import wx from 'weixin-js-sdk';


function directScanQRCode(appId, timestamp, nonceStr, signature) {
	wx.config({
		// 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
		debug: false,
		// 必填，公众号的唯一标识
		appId: appId,
		// 必填，生成签名的时间戳
		timestamp: timestamp,
		// 必填，生成签名的随机串
		nonceStr: nonceStr,
		// 必填，签名，见附录1
		signature: signature,
		// 必填，需要使用的JS接口列表，所有JS接口列表见附录2
		jsApiList: ['checkJsApi', 'scanQRCode']
	});
	wx.error(function(res) {
		//这个地方的好处就是wx.config配置错误，会弹出窗口哪里错误，然后根据微信文档查询即可。
		alert("扫码出错了1：" + res.errMsg)
	});
	wx.ready(function() {
		wx.scanQRCode({
			needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
			scanType: ["qrCode"], // 可以指定扫二维码还是一维码，默认二者都有
			success: function(r) {
				let arr = r.resultStr.split(',')
				  alert(arr);
			},
			fail: function(res) {
				alert("扫码出错了2：" + res.errMsg)
			},
			complete : function(res) {}
		});

	});
}


export default directScanQRCode;
