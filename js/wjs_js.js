

$(function () {
  // 初始化工具提示
  $('[data-toggle="tooltip"]').tooltip();
  // 自动轮播
  var items = $(".carousel-inner .item");
  /*监听屏幕大小变化事件*/
  // .trigger("resize")定义事件时自动运行一次
  $(window).on("resize", function () {
    var wWidth = $(window).width();
    /*获取item元素*/

    /*判断然后加载*/
    if (wWidth>=768){
      /*为每一个item添加图片，这里不能直接拿到图片的路径，应该在html结构中给每张图设置自定义属性存储图片的路径，格式为(data-a..-b..)，在js取用时用驼峰命名法取用：(a..B..)*/
      $(items).each(function (index, value) {
        var item = $(this);
        // console.log($(this));
        /*获取存储的路径*/
        var imgSrc = item.data("largeImg");
        /*由于路径被解析为空格，所以图片还是不能出来*/
        // item.html('<a href="javascript:;" class="pcImg" style="background-image: url("'+imgSrc+'");"></a>');
        /*可以通过jq提供的添加样式的方式实现路径图片的加载：特别注意字符串的拼接*/
        item.html($('<a href="javascript:;" class="pcImg"></a>').css("backgroundImage", "url('"+imgSrc+"')"));
      });
    }else {
      $(items).each(function (index, value) {
        var item = $(this);
        var imgSrc = item.data("smallImg");
        /*移动端可以直接在img标签中的引用路径加入字符串，注意拼接*/
        item.html($('<a href="javascript:;" class="mobilImg"><img src="'+imgSrc+'" alt="..."></a>'));
      })
    }
  }).trigger("resize");

  /*实现移动端手动滑动操作*/
  var startX,endX;
  // 获取当前图片元素
  var carousel_inner = $('.carousel-inner')[0];
  // console.log(carousel_inner);
  // 获取当前轮播图
  var carousel = $('.carousel');
  carousel_inner.addEventListener("touchstart", function (e) {
    startX = e.targetTouches[0].clientX;
  });
  carousel_inner.addEventListener("touchend", function (e) {
    // 注意这里的结束触摸不能再用targetTouches
    endX = e.changedTouches[0].clientX;
    if (endX-startX>0){
      // 借助bootstrap的carousel插件carousel方法实现手动上下滑动图片
      carousel.carousel('prev');
    }else if (endX-startX<0){
      carousel.carousel('next');
    }
  });

  /*计算产品块导航块的原始宽度,就是想要撑开的宽度*/
  var ul = $(".wjs_product .nav-tabs");
  var lis = ul.find("li");
  var totalWidth = 0;
  lis.each(function (index, value) {
    // 获取元素宽度width()只能获取内容的宽度，没有padding值
    // innerWidth()可以获取内容宽度加上padding值
    // outerWidth(true)可以获取内容宽度加上padding值加margin值
    totalWidth = totalWidth+ $(value).innerWidth();
  });
  // 给ul设置宽度（滑动区间）
  ul.width(totalWidth);
  /*在页面中给ul增加盒子*/
  // 实现滑动，默认垂直滑动，水平不动，要修改传入参数，google看不到用firefox
  var myScroll = new IScroll('.tabs-parent',{
    scrollX: true,
    scrollY: false
  });
});