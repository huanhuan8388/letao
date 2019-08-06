//左侧二级导航滑动
$(function(){
$(".category").click(function(){
  $(".nav_list").stop().slideToggle();
});

//头部切换功能

  $(".icon_menu").click(function(){
    $(".lt_aside").toggleClass("hidemenu");
    $(".lt_main").toggleClass("hidemenu");
  })
})


//一进入页面进行登录状态获取，即当前页面是否是登录页
if(location.href.indexOf("login.html") === -1) {
  $.ajax({
    type:"get",
    url:"/employee/checkRootLogin",
    success:function(info){
  
    if(info.success){
      //不用做什么
      console.log("已经登录");
    }
    if(info.error===400){
    location.href="login.html";
    }
    }

  })

}
//退出登录
$(function(){
  $(".icon_logout").click(function(){
    $('#modal1').modal('show')
  })
})
//退出状态
$(function(){
  $("#layout").click(function(){
 $.ajax({
   type:"get",
   url:" /employee/employeeLogout",
   dataType:"json",
   success:function(info){
   console.log(info);
   if(info.success){
     //如果退出成功，跳转登录页面
     location.href="login.html";
   }
   }
 })
  })
})