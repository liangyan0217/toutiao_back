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

// 文章详情
// 接口类型:【GET】
// 需要验证:【Authorization 】
// 接口地址: /post/:id
export const postDetail =(id)=>{
  return myaxios({
    url:`/post/${id}`,
  })
}

// 编辑文章
// 接口类型:【POST】
// 需要验证:【Authorization 】
// 接口地址: /post_update/:id
export const postEdit =(id,data)=>{
  return myaxios({
    method:'post',
    url:`/post_update/${id}`,
    data
  })
}

