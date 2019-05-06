<template>
  <div class="markdown-editor2">
    <mavon-editor
      :editable="false"
      :ishljs="true"
      :subfield="false"
      :toolbarsFlag="false"
      defaultOpen="preview"
      v-model="value"
      style="min-height:850px;width:900px "
    />
    <ul style="list-style-type:none">
      <li v-for="todo in tableData" class="my-li" @click="viewComment(todo)">
        <el-col>
          <el-card shadow="hover" class="my-card" :body-style="{ padding: '4%' }">
            <div class="my-title">
              <a>
                <span>
                  <pre>{{ todo.username}}                                                        {{ todo.time}}  </pre>
                </span>
              </a>
            </div>

            <div class="my-time">
              <span>{{ todo.content}}</span>
            </div>
          </el-card>
        </el-col>
      </li>
    </ul>
    <span>发表评论</span>
    <el-input
      type="textarea"
      :rows="2"
      placeholder="请输入内容"
      v-model="Comment.content"
      style="margin-top: 10px"
    ></el-input>
    <el-button id="my-button2" @click="addComment()">提交</el-button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableData: [1],
      textarea: "",
      form: {},
      value: "<h1>aaa</h1> ",
      Comment: {
        atrictleId: ""
      },
      result: ""
    };
  },
  methods: {
    addComment() {
      var self = this;
      console.log("wodaozhelile");
      $.ajax({
        url: "http://localhost:18083/blog/comment/add",
        type: "post",
        dataType: "text",
        data: self.Comment,
        async: false,
        xhrFields: {
          withCredentials: true
        },
        crossDomain: true,
        success: function(data) {
          data = JSON.parse(data);
          self.result = data;
          console.log(data);
          console.log("abc", self.tableData);
        },
        error: function(data) {
          //TODO 失败
          console.log("error", data);
        }
      });
      console.log("mysata1", self.result);
      if (self.result.success == true) {
        console.log("mysata", self.result);
        this.$message.warning("发布成功", {
          data: this.data
        });
      }
      if (self.result.success == false) {
        console.log("mysata", self.result);
        this.$message.warning("请先登陆", {
          data: this.data
        });
      }
    }
  },
  created: function() {
    this.form = this.$route.params;
    this.value = this.form.id.content;
    this.Comment.atrictleId = this.form.id.id;
    console.log("id", this.form);
    console.log("articleId", this.Comment.atrictleId);
    var self = this;
    $.ajax({
      url: "http://localhost:18083/blog/comment/getComments",
      type: "post",
      dataType: "text",
      data: self.Comment,
      async: false,
      xhrFields: {
        withCredentials: true
      },
      crossDomain: true,
      success: function(data) {
        data = JSON.parse(data);
        console.log("comments", data);
        self.tableData = data.data;
      },
      error: function(data) {
        //TODO 失败
        console.log("error", data);
      }
    });
  }
};
</script>
<style>
.markdown-editor2 {
  margin-left: 20%;
  margin-right: 20%;
  border-style: none;
  box-shadow: 0ch;
  z-index: 100;
}
.my-li {
  margin-top: 5%;
  height: 30%;
}
.my-time {
  font-size: 50%;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  color: #999;
}
.my-title {
  font-size: 120%;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  font-weight: 550;
}
#my-button2 {
  margin-top: 3%;
  margin-left: 92.5%;
}
</style>
