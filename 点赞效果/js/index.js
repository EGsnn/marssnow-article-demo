/**
   * Gift
   * 礼物虚拟父类 
   */
  var Gift = function (){
    this.children = []
    this.element = null
}
Gift.prototype = {
    init:function(){
        throw new Error('请重写你的方法')
    },
    add:function(){
        throw new Error('请重写你的方法')
    },
    getElement:function(){
        throw new Error('请重写你的方法')
    },
}



  /**
   * 
   * 对象原型继承 
   */
  function object (o)//这个o相当于父对象实例
  {
      function F(){}//这个F相当子对象
      F.prototype=o;//继承
      return new F();//实例化传出
  }
  function inheritPrototype(subType,superType)
  {
      var prototype=object(superType.prototype);//创建对象
      prototype.construct=subType;//增强对象
      subType.prototype=prototype;//指定对象
  }




 /**
 * Container
 * 礼物的容器 
 */
var Container = function (id, parent){
    Gift.call(this)
    this.id = id
    this.parent = document.getElementById(parent)
    this.lastChild = null
    this.init()
}

//继承父类
inheritPrototype(Container,Gift)

Container.prototype.init = function(){
    this.element = document.createElement('ul')
    this.element.id= this.id
    this.element.className = 'gift-container'
}
Container.prototype.add = function(child){
    this.children.push(child)
    this.element.appendChild(child.getElement())
    this.lastChild = child.getElement()
    return this
}
Container.prototype.show = function(){
    this.parent.appendChild(this.element)
}
//添加动画效果
Container.prototype.addAnimate = function(){
    new addAnimation(this.lastChild)
    return this
}


 /**
 * Item
 * 礼物 可以写不同的样式 
 */
var Item = function(classname){
    Gift.call(this)
    this.className = classname
    this.init()
}
inheritPrototype(Item,Gift)

Item.prototype.init = function(){
    this.element = document.createElement('li')
    this.element.className = this.className 
    this.element.style.left = 0
}

Item.prototype.getElement = function(){
    return this.element
}


/**
 * addAnimation
 * 添加动画效果 
 */
var addAnimation = function (ele){
    // console.log(timerNum)
    this.timerNum = 2000
    this.ele = $(ele)[0]
    this.time = null
    var that = this
    // console.log(this.ele)
    setTimeout(function(){
        this.move()
    }.bind(this),200)
    this.rand = Math.random()*2 - 1;
    // console.log( this.rand )    
    // console.log( this.ele.style.left)
}
addAnimation.prototype.move = function(){
    this.timerNum = this.timerNum - 17;
    // console.log(this.ele)
    // console.log('------2-----')
    if(this.timerNum <0){
        clearTimeout(this.time)
        this.ele.remove()
        return 
    }
    // debugger
    this.ele.style.left = ( parseFloat(this.ele.style.left) + this.rand) + 'px'
    this.time = setTimeout(function(){this.move()}.bind(this),17)
}


var gift1 = new Container('gift-icon-box','gift-left-box')
gift1.show()
$('.gift-btn').click(function(){
    gift1.add(
        new Item('gift')
    ).addAnimate()
});

