/**
 * 模板类   
 * @param {*} data 
 */
const MSAlret = function(data) {
    if(!data){
        // 如果没有数据则返回
        return
    }
    //设置内容 
    this.content = data.content
    
    //创建遮罩 
    this.layer = document.createElement('div')
    // 创建面板
    this.panel = document.createElement('div')
    // 创建内容组件
    this.contentNode = document.createElement('p')
    // 创建确定按钮
    this.confirBtn =  document.createElement('span')
    // 创建关闭按钮
    this.closeBtn =  document.createElement('b')

    // 遮罩添加类
    this.layer.className = 'ms-layer'
    // 面板添加类
    this.panel.className =  'ms-alert'
    // 内容组件添加类
    this.contentNode.className =  'ms-content'
    // 确定按钮添加类
    this.confirBtn.className =  'ms-confirBtn'
    // 关闭按钮添加类
    this.closeBtn.className =  'ms-closeBtn'


    
    // 确定按钮添文案
    this.confirBtn.innerHTML =  data.confir || '确定'
    // 展示内容添加文本
    this.contentNode.innerHTML =  this.content


    // 点击确定按钮 回调方法
    this.success = data.success || function(){}
    // 点击取消按钮 回调方法
    this.fail = data.fail || function(){}
}

MSAlret.prototype = {
    init: function(){
        this.render()
        this.bindEvevt()
        return this
    },
    render: function(){
        // 生成提示框
        this.panel.appendChild(this.closeBtn)
        this.panel.appendChild(this.contentNode)
        this.panel.appendChild(this.confirBtn)
        this.layer.appendChild(this.panel)

        // 插入页面中
        document.body.appendChild(this.layer)
    },
    bindEvevt: function(){
        let me = this
        // 确认按钮点击事件
        this.confirBtn.onclick = function(){
            // 执行 回调 确认方法
            me.success()
            // 隐藏提示框
            me.hide()
        }
        this.closeBtn.onclick = function(){
            // 执行 回调 关闭方法
            me.fail()
            // 隐藏提示框
            me.hide()
        }
    },
    hide: function(){
        this.layer.style.display = 'none'
    },
    show: function(){
        this.layer.style.display = 'block'
    }
}



const RightAlert = function(data){
    // 继承模板提示框的构造函数
    MSAlret.call(this, data)
    this.confirBtn.className = this.confirBtn.className + '-right'
}
// 继承模板提示框的方法
RightAlert.prototype = new MSAlret()


// 实例化
let RightAlertSelf = new RightAlert({
    content:'提示框'
}).init()

