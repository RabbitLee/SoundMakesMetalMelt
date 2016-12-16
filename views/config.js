/**
 * Created by RabbitLee on 14/12/2016.
 */

$.ajax({
    type: 'get',
    dataType: 'json',
    url: 'http://localhost:3000/get_config',
    success: function (config) {
        console.log(config);
        wx.config({
            debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: 'wxbe363aa018d662a6', // 必填，公众号的唯一标识
            timestamp: config.timestamp, // 必填，生成签名的时间戳
            nonceStr: config.nonceStr, // 必填，生成签名的随机串
            signature: config.signature,// 必填，签名，见附录1
            jsApiList: ['startRecord',
                'stopRecord',
                'onVoiceRecordEnd',
                'playVoice',
                'onVoicePlayEnd',
                'pauseVoice',
                'stopVoice',
                'uploadVoice',
                'downloadVoice'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
        })
    }
});

