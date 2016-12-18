/**
 * Created by zhaoangyouyou on 11/12/2016.
 */
var VoiceTime=0, startTime = 0, endTime = 0;
var timeInterval, timeOut;
var flag = 0; //没按下
var voice = {
    localId: '',
    serverId: ''
};


$(function(){
    $("#pushMe").on({
        touchstart: function(e){
            flag = 1;
            document.getElementById('pushMe').innerText = "发表言论";

            startTime = new Date().getTime();
            wx.startRecord({
                cancel: function () {
                    alert('用户拒绝授权录音');
                }
            });

            e.preventDefault();
        },
        touchmove: function(e){

            /*判断手指是否滑出*/
            var endx, endy;
            var x = document.getElementById('pushMe').offsetLeft, y = document.getElementById('pushMe').offsetTop;
            e.preventDefault();
            endx=e.changedTouches[0].clientX;
            endy=e.changedTouches[0].clientY;
            if(endx < x||endx > (x+205)||endy > (y+75)||endy<y){
                //clearInterval(timeOutEvent);
                document.getElementById('pushMe').innerText = "松开结束";
            }
            else{}

        },
        touchend: function(e){
            setTimeout("upload()", 1000);


            $.get('http://rabbit.neverstar.top/media_info/write?voice_time=' + VoiceTime);

            VoiceTime = 0;
        }
    })

});

function upload() {
    endTime = new Date().getTime();
    flag = 0;

    /*停止录音*/
    wx.stopRecord({
        success: function (res) {
            voice.localId = res.localId;
        }
    });

    document.getElementById('pushMe').innerText = "按我";
    e.preventDefault();

    VoiceTime = (endTime - startTime) / 1000;
    /*上传录音到服务器*/
    if (/*voice.localId*/ VoiceTime < 1 ) {
        alert("时间过短，请重新录制!");
        return;
    }

    wx.uploadVoice({
        localId: voice.localId,
        success: function (res) {
            voice.serverId = res.serverId;
        }
    });

}