
$(function(){
$("#form").bootstrapValidator({
  //配置图标
 
  feedbackIcons:{
    valid: 'glyphicon glyphicon-ok',
    invalid: 'glyphicon glyphicon-remove',
    validating: 'glyphicon glyphicon-refresh'
  },
  //对字段进行效验
  fields: {
    username: {
      validators:{
        notEmpty:{
          message:"用户名不能为空",
        },
        //要求长度2-6位
     stringLength:{
     min:2,
     max:6,
     message:"用户长度必须是2-6位"
     },
     callback:{
       message:"用户不存在",
     }

      }
    },
  password: {
    validators:{ 
      notEmpty:{
        message:"密码不能为空"
      },
     //长度校验
      stringLength:{
      min:6,
      max:12,
      message:"密码长度必须是6-12位",
      },
      callback:{
        message:"密码错误",
      }
    }
  }
  },

})

//重置功能实现
$('[type="reset"]').click(function(){
  $("#form").data("bootstrapValidator").resetForm();
});

});
//登录功能
$("#form").on("success.form.bv",function(e){
//组织默认的表单提交
e.preventDefault();
$.ajax({
type:"post",
url:"/employee/employeeLogin",
data:$('#form').serialize(),
datatype:"json",
success:function(info){
  console.log(info);
  if(info.success){
    location.href="index.html";
  }
  if(info.error===1000){
  $('#form').data("bootstrapValidator").updateStatus("username","INVALID","callback");
  }
  if(info.error===1001){
    $('#form').data("bootstrapValidator").updateStatus("password","INVALID","callback");
  }
}
})

})