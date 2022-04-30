$(function () {
  //点击去“注册账号”的链接

  $('#link_reg').on('click', function () {
    $('.login-box').hide()
    $('.reg-box').show()
  })




  //点击去“登录”的链接
  $('#link_login').on('click', function () {
    $('.login-box').show()
    $('.reg-box').hide()
    
  })



  //从 layui 中获取 from对象
  var form = layui.form

  //导入了layer
  var layer = layui.layer

//通过from.verify() 函数自定义校验规则
form.verify({
  //自定义了一个叫做pwd校验规则
  pass: [
    /^[\S]{6,12}$/
    ,'密码必须6到12位，且不能出现空格'
  ],
  

  //校验两次密码是否一致的规则
  repass: function (value) {
    //通过形参拿到的是确认密码框中的内容
    //还需要拿到密码框中的内容
    //然后进行一次等于的判断
    //如果判断失败，则return一个提示消息即可

    var pass =$('.reg-box [name=password]')
      .val()
    if (pass !== value)
      return '两次密码不一致！'
  }

})

  
  //监听注册表单的提交事件
  $('#form_reg').on('submit', function (e) {
    //1. 阻止默认的提交行为
    e.preventDefault();

    var data =  {username: $('#form_reg [name=username]').val(),
    password: $('#form_reg [name=password]').val()}
    //发起ajax的post请求
    $.post('http://www.liulongbin.top:3007/api/reguser', data,
      function (res) {
        if (res.status !== 0) {
          return layer.msg(res.message)
        }
        layer.msg('注册成功！ 请立即登录')
        
        // 模拟人的点击行为
        $('#link_login').click()
      })
    

  })
  

  //监听登录表单的提交事件
  $('#form_login').submit(function (e) {
    
    //阻止默认提交行为
    e.preventDefault()
    $.ajax({
      url: 'http://www.liulongbin.top:3007/api/login',
      method: 'POST',

      //快速获取表单中的数据
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg('登陆失败')
        }
        layer.msg('登录成功！')
           //console.log(res.token)
        //将登录成功得到的token字符串 保存到localStorage中
        localStorage.setItem('token', res.token)
//跳转到后台主页
      location.href = './index.html'

      }
    })
  })
  })
