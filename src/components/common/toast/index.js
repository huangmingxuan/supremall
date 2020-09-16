import Toast from "./Toast"

const obj = {}
obj.install = function(Vue) {
    
    //创建组件构造器
    const ToastContrustor = Vue.extend(Toast)
    //new的方式 根据组件的构造器 创建一个组件对象
    const toast = new ToastContrustor()
    //把组件对象，挂载到元素上
    toast.$mount(document.createElement("div"))
    //toast.$el对应的就是div
    document.body.appendChild(toast.$el)

    Vue.prototype.$toast = toast;
}
export default obj