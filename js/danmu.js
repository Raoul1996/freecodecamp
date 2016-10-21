/**
 * Created by RaoulChou on 2016/10/22.
 */
$(document).ready(function () {
    var ref= new Wilddog("https://freecodedanmu.wilddogio.com");
    var arr=[];
    //提交数据到wilddog
    $("#sub").click(function () {
        var text=$("#s_txt").val();
        ref.child('message').push(text);
        $("#s_txt").val('');
    });
    //响应按键点击事件
    $("#s_txt").keypress(function (event) {
        if(event.keyCode =="13"){
            $("#sub").trigger('click');
        }
    });
    //响应按键清除事件
    $("#clr").click(function () {
        ref.remove();
        arr=[];
        $(".dm_show").empty();
    });
    //监听云端数据变化。
    ref.child('message').on('child_added',function (snapshot) {
        var text =snapshot.val();
        arr.push(text);
        var textObj=$("<div class=\"dm-message\"></div>");
        textObj.text(text);
        $(".dm_show").append(textObj);
        moveObj(textObj);
    });
    ref.on('child_removed',function () {
        arr=[];
        $(".dm_show").empty();
    });

    //按照时间排序弹幕
    var topMin=$('.dm_mask').offset().top;
    var topMax=topMin+$('dm_mask').height();
    var _top =topMin;

    var moveObj=function (obj) {
        var _left=$(".dm_mask").width() - obj.width();
        _top =_top+50;
        if (_top>(topMax-50)){
            _top=topMin;
        }
        obj.css({
            left:_left,
            top:_top,
            color:getRandomColor()
        });
        var time=20000+10000*Math.random();
        obj.animate({
            left:"-"+_left+"px"
        }, time, function () {
            obj.remove();
        });
    };
    var getRandomColor =function () {
        return '#'+(function (h) {
                return new Array(7-h.length).join("0")+h
            })((Math.random()*0x1000000<<0).toString(16));
    };
    var getAndRun=function () {
        if (arr.length>0){
            var n=Math.floor(Math.random()*arr.length+1)-1;
            var textObj =$("<div>"+arr[n]+"</div>");
            $(".dm_show").append(textObj);
            moveObj(textObj);
        }
        setTimeout(getAndRun,3000);
    };
    jQuery.fx.interval =50;
    getAndRun();
});