import myaxios from '@/utils/myaxios'
// 登录
// 接口类型:【POST】
// 接口地址:/login
export const login=(data)=>{
  return myaxios({
    method:'post',
    url:'/login',
    data
  })
}

// 用户详情
// 接口类型:【GET】
// 需要验证:【Authorization 】
// 接口地址: /user/:id
// export const user =(id)=>{
//   return myaxios({
//     url:`/user/${id}`,
//     headers: { Authorization: localStorage.getItem('toutiao_back_token')}
//   })
// }