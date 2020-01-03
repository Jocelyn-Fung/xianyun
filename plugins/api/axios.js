//写拦截器
import {Message} from 'element-ui'
export default({$axios})=>{
    // 拦截axios的错误
    $axios.onError(res=>{
        // response是js的原生Error对象的属性
        const{statusCode, message} = res.response.data;
        if(statusCode===400){
            // this.message = Message
            Message.error(message)
        }
    })
}