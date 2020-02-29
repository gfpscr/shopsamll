import Toast from './Toast'

//1、先创建一个常量对象
const obj = {};
 //2、把要执行的函数添加到obj.install中
 obj.install = function (Vue){
        //1、创建组件构造器
        const toastContrustor = Vue.extend(Toast);
        //2、new的方式，根据组件构造器，可以创建一个组件对象
        const toast = new toastContrustor(); 
        //3、将组件对象，手动挂载到某个元素上
        toast.$mount(document.createElement('div'));
        //4、toast.$el 对应的就是div
        document.body.appendChild(toast.$el);
        Vue.prototype.$toast = toast; 
 };

export default obj;


/*
这样做的好处就是在Detail页面使用这个Toast这个组件不用
1、不用导入Toast这个组件，注册这个组件
2、也不要使用这个组件  
3、其他页面使用可以直接用 this.$toast.方法名   代码量少
4、要调用的方法可以直接在toast组件理描述
*/            
