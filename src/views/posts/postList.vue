<template>
  <div class="postList">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><a href="javascript:;">文章管理</a></el-breadcrumb-item>
      <el-breadcrumb-item>文章列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card
     class="box-card"
     style="margin-top:20px"
     >
      <el-table
      :data="postList.data"
      style="width: 100%" 
      border>
      <el-table-column
        type="index"
      >
      </el-table-column>
      <el-table-column
        prop="title"
        label="标题"
        width="480">
      </el-table-column>
      <el-table-column
        prop="type"
        label="类型"
        width="180">
        <template slot-scope="scope">
          {{ scope.row.type===1?'文章':'视频'}}
        </template>
      </el-table-column>
      <el-table-column
        prop="user.nickname"
        label="作者"
        width="180">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            icon="el-icon-edit"
            @click="handleEdit(scope.row)"
            ></el-button>
          <el-button
            size="mini"
            type="warning"
            icon="el-icon-share"
            ></el-button>
          <el-button
            size="mini"
            type="danger"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- current-page 当前页数 -->
    <!-- page-sizes 每页显示个数选择器的选项设置 -->
    <!-- page-sizes 每页显示条目个数 -->
    <!-- size-change pageSize 改变时会触发 参数：每页条目数 -->
    <!-- current-change currentPage 改变时会触发 参数：当前页 -->
    <el-pagination
      style="margin-top:20px"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageIndex"
      :page-sizes="[4, 6, 8, 10]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="postList.total">
    </el-pagination>
  </div>
</template>

<script>
import {postList} from '@/apis/articles.js'
export default {
  data() {
      return {
        postList:[],
        pageIndex:1,//当前页数
        pageSize:4//每页显示条数
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      // 文章列表方法请求的封装
      async init(){
        let res = await postList({
        pageIndex:this.pageIndex,
        pageSize:this.pageSize
      })
      console.log(res);
      this.postList=res.data
      },
      // 编辑
      handleEdit(row) {
        console.log(row);
        this.$router.push({path:"postPublish/"+row.id})
      },
      // 删除
      handleDelete(row) {
        console.log(row);
      },
      // 每页显示条数变化时触发
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.pageSize=val
        this.init()
      },
      // 当前页变化时触发
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.pageIndex=val
        this.init()
      }
    }
}
</script>

<style lang='less' scoped>

</style>