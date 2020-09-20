import myaxios from '@/utils/myaxios'
// 栏目列表
// 接口类型:【GET】
// 验证:【Authorization 】
// 接口地址: /category
export const category=()=>{
  return myaxios({
    url:'/category'
  })
}