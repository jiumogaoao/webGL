(function () {
    var ajaxparams = {
        url: "http://test.3vjia.com/Web3D.axd",
        cache: false,
        global: false,
        type: "POST",
        async: true,
    }
    basic = {
        form: function (command, params, success, error) {
            //ajaxparams.dataType = "jsonp";
            //ajaxparams.jsonp = "callback";
            ajaxparams.data = { command: command, resulttype: "jsonp", params: JSON.stringify(params) };
            ajaxparams.success = success;
            ajaxparams.error = error;
            $.ajax(ajaxparams);
        }
    };


    window.PageFactory = basic;

  
})();