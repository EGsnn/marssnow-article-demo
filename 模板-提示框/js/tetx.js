// ==UserScript==
// @name         禅道编辑优化
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        cms.shhzcj.com/specialcontent/*
// @grant        none
// ==/UserScript==
/**
 * 模板类
 * @param {*} data
 */

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
    this.confirBtn.className = this.confirBtn.className + '-right'
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
    <style>
        .ms-alert>div,span,p,b,ul{margin:0;padding:0}.ms-layer{width:300px;height:auto;position:fixed;display:none;top:0}.ms-alert{width:300px;height:auto;font-size:14px;background:#fff;border-radius:5px;color:#555;padding:10px 0 10px;position:fixed;margin:auto;right:10px;top:50%;box-sizing:border-box;border:#ddd solid 3px}.ms-alert .ms-closeBtn{display:block;width:30px;height:30px;background:#555;position:absolute;right:0;top:0;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAADbElEQVRYR7WXv2/TQBTHv2cDKTSCghSBgAEVBhYkIKBKiCHih0qBdrBzgBAgJJjYGJj5Bxi6wcSAhIR011IRIJSWEqBCLGVlaxnYvLYQfvmhF3zV1bUTp21uyQ+f7/t533vv2Sfwfzie5+0ZHR2djX539KNUKq3r6enZPTY29lVIKXcAmAawl4hG5+bmLs3MzPzuFIGU8iARVQDsAjAsfN/vdxznlSU4MTs7e64TECwO4B2AzZHeV8FfyuXypBDiZCch4uJEREKICw0AKeVGInophCh1AiJJHMB1rfWjBgCPgYGBXHd396s4xPz8/GC1Wv250pxoJs5rLgKkQRBRbWFh4cxKIDzPO+q67qTZc7YdwGWt9RMT0BKAtYSIxKcA5HndJPFlDjTbjnacyCqeCrAaJ9oRbwpgIPL5PDeN08adZk7ExQH8JaIr9p7Hk3lZDsQnFIvF9b29vS/iEEKIs0qpH2Z+uVw+JoQYN3vO4lzhSqmnzSqoJQDfnALxUQhxiiEicc72jZFYJvGWW2CTp0GEYXjXdd1nKxFvCyDNiZi9mSNP7QOtOl6SE1Gd/+He3mrP207CJCAp5QkAb2LXvtTr9SOVSuV7qyDs65mS0L5BSnmciMaFEJsShKbr9Xp/OxBtAfi+3yeEmDLiRMS2fwJw3IKZDoLgdK1Wq2dxIjMAizuOw6XW6O1RnXtBELwsFArPAfRbglNBEJzLApEJwPO8w67r8puMLX5JKaVZVEq5AQCX4hIIfsorpX6tqhFF4vxU2xJle+NNxoibxVMguDMONYNo6oCU8gCAD7Y4gKta68cp1cFOVAFwlZgxHgTB+Vqt9ifpnlSASJxt32oibyZuFi+VSl2FQoGfHTbEsyAI/CSIRICViscgJmLVkQixDMD3/f2O43y0IyeimyMjIw+zlJWZMzg4uKmrq4tzwC5RTlRPKcUtuzGWAETi7wEUzIQwDG+0K25D5HI57ht9FjxXDldQA2IRQEq5DwBHvigO4JZS6n47kcfnSinzRMTnjiUQSqmLAEJzLmBxznY+ppmxanGrRBnivRDikPmPiB5rra+JoaGh7blc7jOAndbF21rr4dVEnuDEFiJ6G4N4sOxsSERrLm45wc2Mneb+wq/q38wWvOZ3PiK6o7W+t5aRJzixDQAfhothGF75B69d7LGQbeS7AAAAAElFTkSuQmCC) no-repeat center;background-size:12px 12px}.ms-alert .ms-content{margin-top:20px;padding:16px;border-top:1px #e8e8e8 solid;border-bottom:1px #e8e8e8 solid;margin-bottom:8px}.ms-alert .ms-confirBtn-right{display:block;float:right;border:1px #ddd solid;padding:1px 12px;border-radius:3px;margin-right:10px;background-color:#40a9ff;border-color:#40a9ff;color:#fff;height:32px;line-height:32px;cursor:pointer}.ms-alert .ms-confirBtn-right-weichart{display:block;float:right;border:1px #ddd solid;padding:1px 12px;border-radius:3px;margin-right:10px;background-color:#40a9ff;border-color:#40a9ff;color:#fff;height:32px;line-height:32px;cursor:pointer}.ms-alert .input-box{}.ms-alert .input-box li{margin-bottom:7px;display:flex}.ms-alert .input-box li input{flex:5;background:#f2f2f2;height:40px;padding:0 8px;box-sizing:border-box}.ms-alert .input-box li .replace-text{display:inline-block;padding:0 8px;flex:5;background:#f2f2f2;height:80px;box-sizing:border-box;line-height:30px}.ms-alert .input-box li a{flex:2;height:40px;background:#40a9ff;line-height:40px;text-align:center;color:#fff;border-radius:5px;margin-left:9px}.search-value-style{background:#40a9ff66}
    </style>
        <div class="input-box">
            <ul>
                <li><input type="text" class="search-input-ms" placeholder="请输入搜索内容"><a class="getSearchCursor" href="javascript:;">搜索</a></li>
                <li><textarea class="replace-text replace-text-ms"  type="text" placeholder="替换的值"></textarea></li>
            </ul>
        </div>
`))

}





const ReplaceWeiChart = function(data){
    // 继承模板提示框的构造函数
    MSAlret.call(this, data)
    this.confirBtn.className = this.confirBtn.className + '-right-weichart'
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





(function() {
    'use strict';
    window.onload= function(){
          let ele= $('.control-group').eq(4).find('.controls').eq(0)
          ele.css({position:'fixed',left:'-125px',top:'40%',width:'100px'})
        ele.children().css({'margin-top':10,float:'right',width:'100px'})

    // 实例化
    let RightAlertSelf = new InputAlert({
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
        confir:'一键替换微信号：',
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
            text =text.replace(/\<[\w+]{1,3}([\s]+)?style([\s]+)?=([\s]+)?('|")display([\s]+)?:([\s]+)?none([\s]+)?('|")>([\w+\s]+)<\/[\w+]{1,3}>/g,value)
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
    }
    // Your code here...
})();
