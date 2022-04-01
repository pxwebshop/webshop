function formatMoney(amount, decimalCount = 0, decimal = ".", thousands = ",") {
    try {
        decimalCount = Math.abs(decimalCount);
        decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

        var negativeSign = amount < 0 ? "-" : "";

        var i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString();
        var j = (i.length > 3) ? i.length % 3 : 0;

        return negativeSign + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) + (decimalCount ? decimal + Math.abs(amount - i).toFixed(decimalCount).slice(0) : "");
    } catch (e) {
        console.log(e)
    }
};

var homeconfig = {
    pageSize: 9,
    pageIndex: 1,
}
var searchController = {
    init: function () {
        searchController.loadDataSelect();
        searchController.registerEvent();
    },
    registerEvent: function () {
    },

    loadDataSelect: function (sort) {
        formatMoney();       
        $.ajax({
            url: "/sort",
            method: "POST",
            data: JSON.stringify({
                sort: sort,
                page: homeconfig.pageIndex,
                pageSize: homeconfig.pageSize,
            }),
            dataType: 'JSON',
            contentType: "application/json",

            success: function (response) {
                if (response.status) {
                    $("#loader").css("display", "none")
                    var data = response.data;
                    $(".review_count").text(response.total);
                    var html = '';
                    var template = $('#data-template').html();
                    $.each(data,
                        function (i, item) {
                            //debugger 
                            html += Mustache.render(template,
                                {
                                    ID: item.ID,
                                    ProfileImages: item.ProfileImages,
                                    Title: item.Title,
                                    FullName: item.FullName,
                                    Content: item.Content,

                                });
                        });
                    $('#databin').html(html);
                    //for (var i = 0; i < data.length; i++) {
                    //    if (data[i].Star == 1) {
                    //        var sart1 = '<p class="star-rating text-right"><span class="fa fa-star"></span></p >';
                    //        $('#demotest-' + data[i].ID).append(sart1);
                    //    }
                    //    if (data[i].Star == 2) {
                    //        var sart2 = '<p class="star-rating text-right"><span class="fa fa-star"></span><span class="fa fa-star"></span></p >';
                    //        $('#demotest-' + data[i].ID).append(sart2);
                    //    }
                    //    if (data[i].Star == 3) {
                    //        var sart3 = '<p class="star-rating text-right"><span class="fa fa-star"></span><span class="fa fa-star"></span><span class="fa fa-star"></span></p >';
                    //        $('#demotest-' + data[i].ID).append(sart3);
                    //    }
                    //    if (data[i].Star == 4) {
                    //        var sart4 = '<p class="star-rating text-right"><span class="fa fa-star"></span><span class="fa fa-star"></span><span class="fa fa-star"></span><span class="fa fa-star"></span></p >';
                    //        $('#demotest-' + data[i].ID).append(sart4);
                    //    }
                    //    if (data[i].Star == 5) {
                    //        var sart5 = '<p class="star-rating text-right"><span class="fa fa-star"></span><span class="fa fa-star"></span><span class="fa fa-star"></span><span class="fa fa-star"></span><span class="fa fa-star"></span></p >';
                    //        $('#demotest-' + data[i].ID).append(sart5);
                    //    }
                    //}
                    searchController.paging(response.total,
                        function () {
                            searchController.loadDataSelect();
                        });
                    searchController.registerEvent();
                }
            }
        });
    },
    paging: function (totalRow, callBack) {

        var totalPage = Math.ceil(totalRow / homeconfig.pageSize);
        $('#pagination').twbsPagination({
            totalPages: totalPage,
            first: "first",
            next: "next",
            last: "last",
            prev: "prev",
            visiblePages: 10,
            onPageClick: function (event, page) {
                homeconfig.pageIndex = page;
                setTimeout(callBack, 200);
            }
        });
    }
}
searchController.init();
