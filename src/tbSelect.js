$.fn.extend({
    tbSelect: function (options) {
        var options = $.extend({}, { bindText: "title", bindId: "id", showCount: 25, callback: null }, options);
        var $ele = $(this);
        var bindSelect = function (options) {
            var selectList = $ele;
            for (var i = 0; i < selectList.length; i++) {
                selectList[i].onclick = function () {
                    select14OnClick(this, options.data)
                };
                select14DataBind(selectList[i], options);
            }
        };
        var select14OnClick = function (ele, data) {
            if ($('.tbSelect-result').length > 0)
                $('.tbSelect-result').remove();

            $(".tbSelect").prop('disabled', false);

            var resultName = "searchResultDiv_" + Math.random().toString().substring(2, 12);
            var $div = $('#' + resultName);
            if ($div.length == 0) {
                $div = $('<div id="' + resultName + '" class="tbSelect-result"><input style="width:100%;height: 30;" class="form-control" placeholder="\t\t icerikte arama yapin... " type="text" id="search_' + resultName + '" /> <br> </div>').appendTo('body');
                $('#search_' + resultName).keyup(function () {
                    var term = $(this).val().toLowerCase().replaceAll("ý", "i");
                    $('#' + resultName + ' span').each(function (index) {
                        if ($(this).attr('data-text').indexOf(term) > -1 && index < options.showCount) {
                            $(this).css('display', '');
                        }
                        else {
                            $(this).css('display', 'none');
                        }
                    });
                });
            }

            $div.attr("style", "margin: 1px 1px 1px " + ele.offsetLeft + "px; background: #ebebeb;position:fixed;left: 1px;top:" + (ele.getBoundingClientRect().top + 21) + "px;");

            $div.find('span').empty();

            var index = 10;
            data.forEach(function (item, i) {
                var foo = i < options.showCount ? "" : "dn";
                var opt = document.createElement('span');
                opt.setAttribute("data-value", item[options.bindId])
                opt.setAttribute("data-text", item[options.bindText].toLowerCase().replaceAll("ý", "i"))
                opt.className = foo;
                //opt.value = item.Guid;
                opt.innerHTML = item[options.bindText] + "<br>";
                opt.onclick = function () {
                    $(ele).val(this.getAttribute("data-value")).prop('disabled', false);
                    $div.hide();
                }
                $div.append(opt);
            });

            $(ele).prop('disabled', true);
            return false;
        };
        var select14DataBind = function (selectElement, options) {
            if (options.callback !== undefined && options.callback !== null) {
                bindDataCallback(options.data)
            }
            else {
                options.data.forEach(function (item) {
                    var opt = document.createElement('option');
                    opt.value = item[options.bindId];
                    opt.innerHTML = item[options.bindText];
                    selectElement.appendChild(opt);
                });
            }
        };

        document.addEventListener("accOnChange", function (txtSearch, resultName) {
            var term = txtSearch.value.toLowerCase().replaceAll("ý", "i");
            $('#' + resultName + ' span').each(function (index) {
                if ($(this).attr('data-text').indexOf(txtSearch.value) > -1 && index < options.showCount) {
                    $(this).removeClass("dn");
                }
                else {
                    $(this).addClass("dn");
                }
            });
        });

        bindSelect(options);
    }
});