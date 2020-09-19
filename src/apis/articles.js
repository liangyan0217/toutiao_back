import myaxios from '@/utils/myaxios'

// 文章列表
// 接口类型:【GET】
// 接口地址: /post
export const postList=(params)=>{
  return myaxios({
    url:'/post',
    params
  })
}

// 发布文章
// 接口类型:【POST】
// 需要验证:【Authorization 】
// 接口地址: /post
export const postPublish=(data)=>{
  return myaxios({
    method:'post',
    url:'/post',
    data,
  })
}


