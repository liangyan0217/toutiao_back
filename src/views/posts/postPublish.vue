<template>
  <div class="postPublish">
    <el-card class="box-card" style="margin-top:20px">
      <el-form ref="form" :model="post" label-width="80px">
        <el-form-item label="标题">
          <el-input v-model="post.title"></el-input>
        </el-form-item>
        <el-form-item label="类型">
          <el-radio-group v-model="post.type">
            <el-radio :label="1">文章</el-radio>
            <el-radio :label="2">视频</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="内容">
          <el-upload
            class="upload-demo"
            action="http://127.0.0.1:3000/upload"
            :file-list="fileList"
            v-if="post.type==2"
            :on-success="handleSuccess"
            :headers="getToken()"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传视频文件</div>
          </el-upload>
          <VueEditor :config="config" v-if="post.type==1" ref="pulishContent" />
        </el-form-item>
        <el-form-item label="栏目">
          <!-- indeterminate 设置 indeterminate 状态，只负责样式控制 -->
          <el-checkbox
            :indeterminate="isIndeterminate"
            v-model="checkAll"
            @change="handleCheckAllChange"
          >全选</el-checkbox>
          <div style="margin: 15px 0;"></div>
          <el-checkbox-group v-model="post.categories" @change="handleCheckedCateChange">
            <el-checkbox v-for="value in cateList" :label="value.id" :key="value.id">{{value.name}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="封面">
          <el-upload
            action="http://127.0.0.1:3000/upload"
            list-type="picture-card"
            :on-remove="handleRemove"
            :on-success="onSuccess"
            :headers="getToken()"
            :file-list="post.cover"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt />
          </el-dialog>
        </el-form-item>
        <el-button type="primary" @click="handlePublish">发布文章</el-button>
      </el-form>
    </el-card>
  </div>
</template>
<script>
import { category } from "@/apis/articles";
import { postPublish } from "@/apis/cate";
import VueEditor from "vue-word-editor";
import "quill/dist/quill.snow.css";
export default {
  components: {
    VueEditor,
  },
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      // 是否全选
      checkAll: false,
      // 是否不确定状态（全选）
      isIndeterminate: false,
      // 默认选中项
      checkedCates: [],
      // 栏目列表
      cateList: [],
      // 上传列表
      fileList: [],
      post: {
        title: "",
        content: "",
        categories: [],
        cover: [],
        type: 1,
      },
      config: {
        // 上传图片的配置
        uploadImage: {
          url: "http://localhost:3000/upload",
          name: "file",
          headers: this.getToken(),
          // res是结果，insert方法会把内容注入到编辑器中，res.data.url是资源地址
          uploadSuccess(res, insert) {
            insert("http://localhost:3000" + res.data.data.url);
            console.log(res);
          },
        },
        // 上传视频的配置
        uploadVideo: {
          url: "http://localhost:3000/upload",
          name: "file",
          headers: this.getToken(),
          uploadSuccess(res, insert) {
            insert("http://localhost:3000" + res.data.data.url);
            console.log(res);
          },
        },
      },
    };
  },
  methods: {
    // 封面上传成功时触发
    onSuccess(response, file, fileList) {
      console.log(response, file, fileList);
      this.post.cover.push({
        id: response.data.id,
        url: "http://127.0.0.1:3000" + response.data.url,
      });
      console.log(this.post.cover);
    },
    // 视频上传成功时触发
    handleSuccess(response, file, fileList) {
      console.log(response, file, fileList);
      this.post.content = "http://127.0.0.1:3000" + response.data.url;
    },
    // 封装的请求头用户信息验证
    getToken() {
      return { Authorization: localStorage.getItem("toutiao_back_token") };
    },
    // 点击发布文章时触发
    async handlePublish() {
      if (this.post.type == 1) {
        this.post.content = this.$refs.pulishContent.editor.root.innerHTML;
      }
      this.post.categories = this.post.categories.map((v) => {
        return { id: v };
      });
      let res = await postPublish(this.post);
      this.$router.push({name:'postList'})
      console.log(this.post);
      console.log(res);
    },
    // 点击全选复选框触发
    handleCheckAllChange(val) {
      this.post.categories = val
        ? this.cateList.map((v) => {
            return v.id;
          })
        : [];
      this.isIndeterminate = false;
      // console.log(this.post.categories);
    },
    // 点击栏目复选框触发
    handleCheckedCateChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.cateList.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.cateList.length;
    },
    // 点击文件列表中已上传的文件时的钩子
    handleRemove(file, fileList) {
      console.log(file, fileList);
      this.post.cover.forEach((value,index)=>{
        if(value.id==file.id){
          this.post.cover.splice(index,1)
        }
      })
      console.log(this.post.cover);
    },
    // 文件列表移除文件时的钩子
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
  },
  async mounted() {
    let res = await category();
    console.log(res);
    this.cateList = res.data.data.splice(2);
  },
};
</script>

<style lang="less" scoped>
</style>