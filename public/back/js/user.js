$(function () {
  var currentPage = 1;//当前页数
  var pageSize = 5;//页面中有几条数据
  var currentId;

  render();
  function render() {
    $.ajax({
      type: "GET",
      datatype: "json",
      url: "/user/queryUser",
      data: {
        page: currentPage,
        pageSize: pageSize,

      },
      success: function (info) {
        console.log(info);
        //模板引擎
        var htmlstr = template("tmp1", info);
        $("tbody").html(htmlstr);
        //分页初始化
        $("#pagintor").bootstrapPaginator({
          bootstrapMajorVersion: 3,//默认是2，如果是bootstrap3版本，这个参数必填
          currentPage: info.page,//当前页
          totalPages: Math.ceil(info.total / info.size),//总页数
          size: "small",//设置控件的大小，mini, small, normal,large
          onPageClicked: function (event, originalEvent, type, page) {
            //为按钮绑定点击事件 page:当前点击的按钮值
            console.log(page);
            currentPage = page;
            render();
          }
        });

      }

    })
 }

//显示禁用启用状态栏，使用事件委托绑定事件
$(".user-table tbody").on("click",".btn",function(){
  //弹出模态框
  $("#userModal").modal("show");

  //要实现点击模态框确定按钮，实现按钮的切换，发送ajax请求进行切换数据
  //获取点击当前的状态按钮id
  currentId= $(this).parent().data("id");
  console.log(currentId);
  //获取当前id的状态值,根据属性类名判断禁用还是启用
  var isDelete = $(this).hasClass("btn-danger") ? 0 : 1;
  console.log(isDelete);
  $("#userBtm").click(function(){
  
  $.ajax({
    type:"post",
    url:"/user/updateUser",
    datatype:"json",
    data:{
      id:currentId,
      isDelete:isDelete,
    },
    success:function(info){
      console.log(info);
      if(info.success){
        //点击确认按钮成功后关闭模态框
        $("#userModal").modal("hide");
        //重新渲染
        render();
      }
    }
  })
  });
  
})
})