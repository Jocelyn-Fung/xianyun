//将基准路径保存起来
export const state =()=> {
    return{
        baseURL:''
    }
}

export const mutations={
    SetBaseURL(state,data){
        state.baseURL = data
    }
}