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
    this.contentNode = document.createElement('div')
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
            // me.hide()
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
        return this
    }
}



const RightAlert = function(data){
    // 继承模板提示框的构造函数
    MSAlret.call(this, data)
    this.confirBtn.className = this.confirBtn.className + '-right'
}
// 继承模板提示框的方法
RightAlert.prototype = new MSAlret()

const InputAlert = function(data){
    // 继承模板提示框的构造函数
    MSAlret.call(this, data)
    this.confirBtn.className = this.confirBtn.className + '-input'
}
// 继承模板提示框的方法
InputAlert.prototype = new MSAlret()
InputAlert.prototype.render = function(){
    // 生成提示框
    this.appendIput()
    this.panel.appendChild(this.closeBtn)
    this.panel.appendChild(this.contentNode)
    this.panel.appendChild(this.confirBtn)
    this.layer.appendChild(this.panel)
    // 插入页面中
    document.body.appendChild(this.layer)
}
InputAlert.prototype.appendIput = function(){
    // 生成提示框
    this.contentNode.appendChild(createDocumentFragment(`
    
    <div class="input-box">
        <ul>
            <li><input type="text" placeholder="请输入搜索内容"><a class="getSearchCursor" href="javascript:;">搜索</a></li>
            <li><textarea class="replace-text" type="text" placeholder="替换的值1"></textarea></li>
        </ul>
    </div>
    `))

}



const ReplaceWeiChart = function(data){
    // 继承模板提示框的构造函数
    MSAlret.call(this, data)
    this.confirBtn.className = this.confirBtn.className + '-weichart'
}
// 继承模板提示框的方法
ReplaceWeiChart.prototype = new MSAlret()
ReplaceWeiChart.prototype.render = function(){
    // 生成提示框
    this.appendIput()
    this.panel.appendChild(this.closeBtn)
    this.panel.appendChild(this.contentNode)
    this.panel.appendChild(this.confirBtn)
    this.layer.appendChild(this.panel)
    // 插入页面中
    document.body.appendChild(this.layer)
}
ReplaceWeiChart.prototype.appendIput = function(){
    // 生成提示框
    this.contentNode.appendChild(createDocumentFragment(`
    <div class="input-box">
        <ul>
            <li><textarea class="replace-text replace-text-wxChart" type="text" placeholder="替换的值"></textarea></li>
        </ul>
    </div>
    `))

}
function createDocumentFragment (template) {
    let frag = document.createRange().createContextualFragment(template);
    return frag;
}


// 实例化
let InputAlertSelf = new InputAlert({
    content:'替换文本：',
    confir:'替换所有',
    success: function(){
        let reg = new RegExp($('.search-input-ms').val(),'g')
        let text = textArea.value.replace(reg,$('.replace-text-ms').val())
        editor.setValue(text)
    }
}).init().show()

// 实例化
let ReplaceWeiChartSelf = new ReplaceWeiChart({
    content:'替换微信号：',
    confir:'一键替换微信号',
    success: function(){
        if( editor.getTextArea().value.indexOf('data-clipboard-text')<0){
            alert('该页面无法使用该功能！')
            return false
        }
        let value = editor.getTextArea().value.match(/data-clipboard-text([\s]+)?=([\s]+)?('|")([\w+\s\<\>\!\@\-\(\)]+)('|")/g)[0].match(/['|"]([\w+\s\<\>\!\@\-\(\)]+)['|"]/g)[0].replace(/\"|\'|\s/g,'')
        // [0].match(/['|"]([\w+\s]+)['|"]/g)[0].replace(/\"|\'/g,'')
        let reg;
        if(value.indexOf('wechatAccount')>-1){
            reg = /\<\!\-\-@wechatAccount\([\d+]+\)-\-\>/g
        }else {
            reg = new RegExp(text,'g')
        }
        let text = textArea.value.replace(reg,$('.replace-text-wxChart').val())

        
        editor.setValue(text)
    }
}).init().show()


    $('.getSearchCursor').click(function(){
        let val = $('.search-input-ms').val()

        let cursor = editor.getSearchCursor(val,false)
        while (cursor.findNext()) {
                editor.markText(cursor.from(), cursor.to(), {
                    className: 'search-value-style'
                });
            }
    })
    // editor.getTextArea().value.match(/data-clipboard-text([\s]+)?=([\s]+)?('|")([\w+\s\<\>\!\@\-\(\)]+)('|")/g)
    // [0].match(/['|"]([\w+\s]+)['|"]/g)[0].replace(/\"|\'/g,'')