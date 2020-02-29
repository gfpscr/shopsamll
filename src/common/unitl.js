//防抖函数
export function debounce(func,delay){
    let timer = null;  //多少时间之后可以运行这个函数
    return (...args) => {
      if (timer) {
        clearTimeout(timer)
      };
      timer = setTimeout(() =>{
          func(...args)
      },delay)
    }
  }

  //时间转换
export function formatDate(date,fmt){
  //获取年份
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
      let o ={
        //获取具体时间
        'M+':date.getMonth() + 1,
        'd+':date.getDate(),
        'h+':date.getHours(),
        'm+':date.getMinutes(),
        's+':date.getSeconds(),
      };
      for (let k in o) {
       if (new RegExp(`(${k})`).test(fmt)) {
         let str = o[k] + '';
         fmt = fmt.replace(RegExp.$1,(RegExp.$1.length === 1)? str:padLeftZero(str));
       }
        
      }
      return fmt;
   }
  }
    function padLeftZero(str){
      return ('00' + str).substr(str.length);
  } 
