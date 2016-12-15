/**
 * Created by zhaoangyouyou on 11/12/2016.
 */
var timeOutEvent=0;
var voice = {
    localId: '',
    serverId: ''
};


$(function(){
    $("#pushMe").on({
        touchstart: function(e){
            document.getElementById('pushMe').innerText = "发表言论";
            //timeOutEvent = setInterval("longPress()",200);

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
            /*停止录音*/
            wx.stopRecord({
                success: function (res) {
                    voice.localId = res.localId;
                }
            });
            //clearInterval(timeOutEvent);
            document.getElementById('pushMe').innerText = "按我";
            e.preventDefault();

            /*上传录音到服务器*/
            if (voice.localId == '') {
                alert('请先使用 startRecord 接口录制一段声音');
                return;
            }
            wx.uploadVoice({
                localId: voice.localId,
                success: function (res) {
                    //alert('上传语音成功，serverId 为' + res.serverId);
                    voice.serverId = res.serverId;
                }
            });
        }
    })

});

function longPress(){
    //此处有接口声音
    document.getElementById('text1').append("1");

}