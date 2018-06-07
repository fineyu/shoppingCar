// 商店产品左滑显示删除
$(".shop>.product").on("swipeleft",function(){
    $(this).addClass("change_left");
  })
  $(".shop>.product").on("swiperight",function(){
    $(this).removeClass("change_left");
  })
  // 点击删除  删除该列商品
  $(".delate").on("click",function(){
      $(this).parent().addClass("none");
      ifShopDelate ($(this))
  })
  

  function ifShopDelate (jqDom) {
    var $shop = jqDom.parent().parent().parent().parent()   // $shop是当前点击商品所在店铺的jq对象
    var $shop_product = $shop.find('.product')
    var delateProducts=0     //当前删除的数量
    // 遍历该店铺中所有的product，看看其中有没有哪些选中的商品（就是判断.product_choose这个div有没有checked这个类名）
      $shop_product.each(function (index, el) {
        if ($(el).hasClass('none')) {
              // console.log(el)
              delateProducts++

              var allProductsShop = $(el).parents(".shop").find('.product').length;  //当前店内的商品数量 
              if (allProductsShop === delateProducts) {
                var shopName=$(this).parent();
                console.log(shopName); 
                shopName.remove();
              }
        }
          
      })

  }





  
  // 所有勾选框的特效
  function clickProduct (jqDom) {
    var $checkBox = jqDom.parent()
    $checkBox.toggleClass('checked', '')
  }
  $(".product_choose>img").click(function () {
      var $this = $(this);
      clickProduct($this);
      ifShopChecked($this);
      ifAll();
      total();
    })
  $('.shop_img>img').click(function () {
      var $this = $(this);
      clickProduct($this);
      ifChooseAllIncurrentShop($this);
      ifAll();
      total();
    })
  $('.all>img').click(function () {
      var $this = $(this);
      clickProduct($this);
      chooseAllOrRemoveAll();
      total();
    })
  
  
  
  /**
   * @name ifShopChecked
   * @description 点击某个具体商品的时候判断店铺是否需要勾选
   * @param jqDom
   */
  function ifShopChecked (jqDom) {
    var $shop = jqDom.parent().parent().parent().parent()   // $shop是当前点击商品所在店铺的jq对象
    var $shop_img = $shop.find('.shop_img')
    var allProductsInprestntShop = $shop.find('.product').length   //当前店铺中所有商品总数
    var selectedProducts = 0   //该变量用来计数已经被选中的商品
    var delateProducts=0
    // 遍历该店铺中所有的product，看看其中有没有哪些选中的商品（就是判断.product_choose这个div有没有checked这个类名）
    $shop.find('.product').each(function (index, ele) {
      if ($(ele).find('.product_choose').hasClass('checked')) {
          selectedProducts++
        }
    })
    // 如果所有商品被选中，勾选店铺，  否则，不勾选店铺
    if (allProductsInprestntShop === selectedProducts) {
      $shop_img.addClass('checked')
    } else {
      $shop_img.removeClass('checked')
    }
  }
   


  /**
   * @name ifChooseAllIncurrentShop
   * @param 点击的选框(jq对象)
   * @description 点击店铺按钮，控制该店铺下商品是否勾选
   */
  function ifChooseAllIncurrentShop (jqDom) {
    var $shop = jqDom.parent().parent().parent()
    var $products = $shop.find('.product')
    // 如果选中店铺，则把该店铺下所有商品勾选上
    if ($shop.find('.shop_img').hasClass('checked')) {
      // 遍历该店铺下所有商品，并勾选（添加checked类名）
      $products.each(function (index, ele) {
        $(ele).find('.product_choose').addClass('checked')
      })
    } else {
      $products.each(function (index, ele) {
        $(ele).find('.product_choose').removeClass('checked')
      })
    }
  }
  
  
  
  /**
   * @name chooseAllOrRemoveAll
   *@param none
   * @description 全选按钮对全局的状态控制
   */
  function chooseAllOrRemoveAll () {
    // 如果点击了全选，那么勾选所有店铺
    var $shops = $('.shop')
    if ($('#all').hasClass('checked')) {
      $shops.each(function (index, ele) {
        // 勾选店铺
        $(ele).find('.shop_img').addClass('checked')
        // 勾选店铺下所有商品
        $(ele).find('.product').each(function (index, ProductModel) {
          $(ProductModel).find('.product_choose').addClass('checked')
        })
      })
    } else {
      $shops.each(function (index, ele) {
        // 取消勾选店铺
        $(ele).find('.shop_img').removeClass('checked')
        // 取消勾选店铺下所有商品
        $(ele).find('.product').each(function (index, ProductModel) {
          $(ProductModel).find('.product_choose').removeClass('checked')
        })
      })
    }
  }
  
  
  function  ifAll() {
    var howManyShops = $('.shop').length
    var selectedShops = 0
    // 遍历
    $('.shop').find('.shop_img').each(function (index, ele) {
      if ($(ele).hasClass('checked')) {
        selectedShops++
      }
    })
    if (howManyShops === selectedShops) {
      $('#all').addClass('checked');
    } else {
      $('#all').removeClass('checked');
    }
  }

  // 价格联动
  function total(){
    // 先是总价为0
    var aggregate=0;
    var allPrice=0;
    var $products=$(".product");
    // console.log($products);
    $products.each(function(){
      var $choose=$(this).find(".product_choose");
      console.log($choose)
      if($choose.hasClass("checked")){
        var number=$(this).find(".num").text();
        var price=$(this).find("em").text();
        aggregate+=Number(number)*Number(price);
        $(".aggregate").text(aggregate+".00");
      }else{
        $(".aggregate").text(aggregate+".00");
      }
    })
    // console.log(aggregate);
  }
  total();

  
  // 调整底部不占标准流问题
  $(".footer").prev().css("margin-bottom","7.5vh");

  // 数量加减的问题
  $(document).ready(function(){
      //加的效果
          $(".plus").click(function(){
          var n=$(this).prev().text();
          var num=parseInt(n)+1;
          if(num==0){ return;}
          $(this).prev().text(num);
          $('#loading').showLoading();
          setTimeout("$('#loading').hideLoading()",1000);
          total();
    });

    // 加载
    $(".loading").css("height",$(window).height());
    $(".loading").css("width",$(window).width())


          //减的效果
          $(".min").click(function(){
              var n=$(this).next().text();
              var num=parseInt(n)-1;
              if(num==0){ return}
              $(this).next().text(num);
              $('#loading').showLoading();
              setTimeout("$('#loading').hideLoading()",1000);
              total();
          });

    })


  
  // 底部栏点击
  $(".footer>div").click(function(){
    $(this).find("span").addClass("green");
    $(this).find(".color").show();
    $(this).find(".gray").hide();
    $(this).siblings().find("span").removeClass("green");
    $(this).siblings().find(".gray").show();
    $(this).siblings().find(".color").hide();
  })
  // 去支付loading效果
  $(".footer_right").click(function(){
    $('#loading').showLoading();
    setTimeout("$('#loading').hideLoading()",1000)
  })

  // 飞入效果
  $plus=$(".plus");
  $plus.each(function(){
      $(this).click(function(){
          var top1=$('.car').offset().top;
          var left1=$('.car').offset().left;
          // console.log(top1)
          // console.log(left1)
          var top=$(this).offset().top;
          var left=$(this).offset().left;
          var fly=$(this).clone().css("opacity","0.8");
          fly.text(" ")
          fly.css({
              "z-index":9000,
              "display":"block",
              "position":"absolute",
              "top":top,
              "left":left,
              "width":$(this).width(),
              "height":$(this).height(),
              "background":"#57c340",
              "border-radius":"50%",
          });
          $("body").append(fly);
          fly.animate({
              top:top1,
              left:left1,
              opacity:0,
          },"slow")
      })
  })

  
