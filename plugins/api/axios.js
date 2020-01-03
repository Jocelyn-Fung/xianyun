//写拦截器
import {Message} from 'element-ui'  //从element-ui中将Message结构出来
export default({$axios})=>{
    // 拦截axios的错误
    $axios.onError(res=>{
        // response是js的原生Error对象的属性
        const{statusCode, message} = res.response.data; //解构出返回的错误信息中的statusCode和 message
        if(statusCode===400){
            // this.message = Message
            Message.error(message)
        }
    })
}