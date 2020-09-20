<template>
  <div class="postPublish">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><a href="javascript:;">文章管理</a></el-breadcrumb-item>
      <el-breadcrumb-item>文章发布</el-breadcrumb-item>
    </el-breadcrumb>
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
            :on-preview="handlePictureCardPreview"
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
        <el-button type="primary" @click="handlePublish" ref="btn">发布文章</el-button>
      </el-form>
    </el-card>
  </div>
</template>
<script>
import { postPublish, postDetail, postEdit } from "@/apis/articles";
import { category } from "@/apis/cate";
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
      console.log(this.fileList);
      this.post.content = "http://127.0.0.1:3000" + response.data.url;
    },
    // 封装的请求头用户信息验证
    getToken() {
      return { Authorization: localStorage.getItem("toutiao_back_token") };
    },
    // 点击发布文章时触发
    async handlePublish() {
      if (this.post.type == 1) {
        // 富文本框内容
        this.post.content = this.$refs.pulishContent.editor.root.innerHTML;
      }
      // 处理栏目
      this.post.categories = this.post.categories.map((v) => {
        return { id: v };
      });
      // 保存编辑
      if (this.$route.params.id) {
        let res2 = await postEdit(this.$route.params.id, this.post);
        console.log(res2);
        if (res2.data.message === "文章编辑成功") {
          this.$message.success("文章编辑成功");
        }
      } else {
        // 发布文章
        let res = await postPublish(this.post);
        console.log(this.post);
        console.log(res);
        if (res.data.message === "文章发布成功") {
          this.$message.success("文章发布成功");
        }
      }
      this.$router.push({ name: "postList" });
    },
    // 点击全选复选框触发
    handleCheckAllChange(val) {
      this.post.categories = val
        ? this.cateList.map((v) => {
            return v.id;
          })
        : [];
      this.isIndeterminate = false;
    },
    // 点击栏目复选框触发
    handleCheckedCateChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.cateList.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.cateList.length;
    },
    // 文件列表移除文件时的钩子
    handleRemove(file, fileList) {
      console.log(file, fileList);
      this.post.cover.forEach((value, index) => {
        if (value.id == file.id) {
          this.post.cover.splice(index, 1);
        }
      });
      console.log(this.post.cover);
    },
    // 点击文件列表中已上传的文件时的钩子
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
  },
  async mounted() {
    let res = await category();
    console.log(res);
    this.cateList = res.data.data.splice(2);
    // 判断是否有id，有id编辑，无id新增发布
    let id = this.$route.params.id;
    if (id) {
      console.log(this.$refs.btn);
      // this.$refs.btn.innerHTML()="保存编辑"
      let res = await postDetail(id);
      console.log(res);
      this.post = res.data.data;
      // 富文本框内容
      this.$refs.pulishContent.editor.clipboard.dangerouslyPasteHTML(
        0,
        this.post.content
      );
      // 栏目
      this.post.categories = this.post.categories.map((v) => {
        return v.id;
      });
      // 封面
      this.post.cover = this.post.cover.map((v) => {
        if (v.url.indexOf("http") === -1) {
          v.url = "http://127.0.0.1:3000" + v.url;
        }
        return v;
      });
    }
  },
};
</script>

<style lang="less" scoped>
</style>