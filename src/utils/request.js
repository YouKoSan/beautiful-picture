export default (param) => {
//加载中
uni.showLoading({
    title:"加载中..."
})
//promise
return new Promise((resolve, reject) => {
    uni.request({
        ...param,
        success: (res) => {
            resolve(res.data);
        },
        fail: (err) => {
            reject(err)
        },
        complete: () => {
            uni.hideLoading()
        }
    })
})

}