
$(function () {
  var currentPage = 1;//当前页
  var pageSize = 5;//页面有多少条
  render();
  function render() {
    $.ajax({
      type: "get",
      url: "/category/queryTopCategoryPaging",
      datatype: "json",
      data: {
        page: currentPage,
        pageSize: pageSize,
      },
      success: function (info) {
        console.log(info);
        var htmlStr = template("first-tmp", info);
        $(".user-table tbody").html(htmlStr);
        //页面初始化
        $("#pagintor").bootstrapPaginator({
          bootstrapMajorVersion: 3,//默认是2，如果是bootstrap3版本，这个参数必填
          currentPage: 1,//当前页
          totalPages: Math.ceil(info.total / info.size),//总页数
          size: "small",//设置控件的大小，mini, small, normal,large
          onPageClicked: function (event, originalEvent, type, page) {
            //为按钮绑定点击事件 page:当前点击的按钮值
            currentPage = page;
            render();
          }
        });
      }
      
    })
 
//点击添加分类按钮，显示添加模态框
$("#addBtn").click(function(){
  $("#addModal").modal("show");
});

//表单效验
$("#form").bootstrapValidator({
  //2. 指定校验时的图标显示，默认是bootstrap风格
    // 配置图标
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },

    // 校验的字段
    fields: {
      categoryName: {
        // 校验规则
        validators: {
          // 非空检验
          notEmpty: {
            // 提示信息
            message: "请输入一级分类名称"
          }
        }
      }
    }
});
$("#form").on("success.form.bv",function(e){
  e.preventDefault();
  $.ajax({
    type:"post",
    url:"/category/addTopCategory",
    datatype:"json",
    data:$("#form").serialize(),
    success:function(info){
      console.log(info);
      if (info.success) {
        // 关闭模态框
        $('#addModal').modal("hide");
        // 重新渲染页面, 添加的项会在第一页, 所以应该重新渲染第一页
        currentPage = 1;
        render();

        // 重置表单校验状态和 表单内容
        // 传 true 不仅可以重置 状态, 还可以重置内容
        $('#form').data("bootstrapValidator").resetForm( true );
      }
    }
  })
})

  }
 

})