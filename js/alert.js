(function ($) {
    $.alerts = {
        alert: function (title, message, callback) {
            if (title == null) title = 'Alert';
            $.alerts._show(title, message, null, 'alert', function (result) {
                if (callback) callback(result);
            });
        },

        confirm: function (title, message, callback) {
            if (title == null) title = 'Confirm';
            $.alerts._show(title, message, null, 'confirm', function (result) {
                if (callback) callback(result);
            });
        },


        _show: function (title, msg, value, type, callback) {

            var _html = "";

            _html += '<div id="mb_box"></div><div id="mb_con"><span id="mb_tit">' + title + '</span>';
            _html += '<div id="mb_msg">' + msg + '</div><div id="mb_btnbox">';
            if (type == "alert") {
                _html += '<button type="button" class="tm-btn-subscribe" onclick="sure()" id="mb_btn_ok" >确定</button>';
            }
            if (type == "confirm") {
                _html += '<input id="mb_btn_no" type="button" value="取消" />';
                _html += '<input id="mb_btn_ok" type="button" value="确定" />';
            }
            _html += '</div></div>';

            //�����Ƚ�_html��ӵ�body��������Css��ʽ  
            $("body").append(_html); GenerateCss();

            switch (type) {
                case 'alert':

                    $("#mb_btn_ok").click(function () {
                        $.alerts._hide();
                        callback(true);
                    });
                    $("#mb_btn_ok").focus().keypress(function (e) {
                        if (e.keyCode == 13 || e.keyCode == 27) $("#mb_btn_ok").trigger('click');
                    });
                    break;
                case 'confirm':
                    $("#mb_btn_ok").click(function () {
                        if (callback)
                            callback(true)
                        $.alerts._hide();
                    });
                    $("#mb_btn_no").click(function () {
                        if (callback) callback(false);
                        $.alerts._hide();
                    });
                    $("#mb_btn_no").focus();
                    $("#mb_btn_ok, #mb_btn_no").keypress(function (e) {
                        if (e.keyCode == 13) $("#mb_btn_ok").trigger('click');
                        if (e.keyCode == 27) $("#mb_btn_no").trigger('click');
                    });
                    break;
            }
        },
        _hide: function () {
            $("#mb_box,#mb_con").remove();
        }
    }
    // Shortuct functions  
    myAlert = function (title, message, callback) {
        $.alerts.alert(title, message, callback);
    }

    myConfirm = function (title, message, callback) {
        $.alerts.confirm(title, message, callback);
    };



    //����Css  
    var GenerateCss = function () {

        $("#mb_box").css({
            width: '100%', height: '100%', zIndex: '99999', position: 'fixed',
            filter: 'Alpha(opacity=60)', backgroundColor: 'black', top: '0', left: '0', opacity: '0.6'
        });

        $("#mb_con").css({
            zIndex: '999999', width: '400px', height: '220px', position: 'fixed',
            backgroundColor: 'White',
        });

        $("#mb_tit").css({
            display: 'block', fontSize: '14px', color: '#444', padding: '10px 15px',
            backgroundColor: '#fff', borderRadius: '15px 15px 0 0',
            fontWeight: 'bold'
        });

        $("#mb_msg").css({
            padding: '20px', lineHeight: '40px', textAlign: 'center',
            fontSize: '18px', color: '#4c4c4c'
        });

        $("#mb_ico").css({
            display: 'block', position: 'absolute', right: '10px', top: '9px',
            border: '1px solid Gray', width: '18px', height: '18px', textAlign: 'center',
            lineHeight: '16px', cursor: 'pointer', borderRadius: '12px', fontFamily: '΢���ź�'
        });

        $("#mb_btnbox").css({ margin: '15px 0px 10px 0', textAlign: 'center' });
        //$("#mb_btn_ok,#mb_btn_no").css({ width: '80px', height: '40px', color: 'white', border: 'none', borderRadius: '4px' });
        $("#mb_btn_ok").css({ backgroundColor: '#41a259' });
        $("#mb_btn_no").css({ backgroundColor: 'gray', marginRight: '40px' });


        //���Ͻǹرհ�ťhover��ʽ  
        $("#mb_ico").hover(function () {
            $(this).css({ backgroundColor: 'Red', color: 'White' });
        }, function () {
            $(this).css({ backgroundColor: '#DDD', color: 'black' });
        });

        var _widht = document.documentElement.clientWidth; //��Ļ��  
        var _height = document.documentElement.clientHeight; //��Ļ��  

        var boxWidth = $("#mb_con").width();
        var boxHeight = $("#mb_con").height();

        //����ʾ�����  
        $("#mb_con").css({ top: (_height - boxHeight) / 2 + "px", left: (_widht - boxWidth) / 2 + "px" });
    }


})(jQuery);
