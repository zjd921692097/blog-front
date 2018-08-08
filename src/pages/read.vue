<template>
  <div class="my-div">
    <el-container>
      <el-main style="width:250px">
        <ul style="list-style-type:none">
          <li v-for="todo in tableData" class="my-li" @click="viewArticle(todo)">
            <el-col>
              <el-card shadow="hover" class="my-card" :body-style="{ padding: '4%' }">
                <div class="my-title">
                  <a>
                    <span>{{ todo.bookName}}</span>
                  </a>
                </div>
                </br>
                <div class="my-time">
                  <span>开始阅读时间:{{ todo.startDate}}</span>
                  <span style="margin-left:24px;">作者:{{ todo.author}}</span>
                  <el-progress :percentage="todo.progress" :stroke-width=4></el-progress>
                </div>
              </el-card>
            </el-col>
          </li>
        </ul>
      </el-main>
      <el-aside width="28%">
        <el-row>
          <el-col :key="o" :offset="index > 0 ? 2 : 0">
            <el-card :body-style="{ padding: '0px' }" class="side-cars">
              <div style="padding: 14px;">
                <a href="https://github.com/zjd921692097"><img src="@/assets/img/timg.jpg" class="image"></a>
                </br>
                <span><pre>     小迪  |   Java开发工程师
                                                             
                          极简主义者</pre></span>
              </div>
            </el-card>
            <el-card :body-style="{ padding: '0px' }" class="side-cars">
              <div style="padding: 14px;text-align:center;">
                <el-button @click="centerDialogVisible = true">增加书籍</el-button>
                <el-dialog title="add book" :visible.sync="centerDialogVisible" width="30%" center>
                  <el-form>
                    <el-form-item label="书名" :label-width="formLabelWidth" style="margin-left:20%;">
                      <el-col :span="15">
                        <el-input v-model="AddBookParam.bookName" auto-complete="off"></el-input>
                      </el-col>
                    </el-form-item>
                    <el-form-item label="作者" :label-width="formLabelWidth" style="margin-left:20%;">
                      <el-col :span="15">
                        <el-input v-model="AddBookParam.author"></el-input>
                      </el-col>
                    </el-form-item>
                    <el-form-item label="页数" :label-width="formLabelWidth" style="margin-left:20%;">
                      <el-col :span="15">
                        <el-input v-model="AddBookParam.pageNum"></el-input>
                      </el-col>
                    </el-form-item>
                  </el-form>
                  <span slot="footer" class="dialog-footer">
                                    <el-button @click="centerDialogVisible = false">取 消</el-button>
                                   <el-button type="primary" @click="addBook()">确 定</el-button>
                                  </span>
                </el-dialog>
                <el-button @click="centerDialogVisible2 = true">记录阅读</el-button>
                <el-dialog title="add book" :visible.sync="centerDialogVisible2" width="30%" center>
                  <el-form>
                    <el-form-item label="书名" :label-width="formLabelWidth" style="margin-left:20%;">
                      <el-select v-model="editForm.bookName" placeholder="请选择">
                        <el-option v-for="item in tableData" :key="item.id" :label="item.bookName" :value="item.id">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  
                    <el-form-item label="阅读页数" :label-width="formLabelWidth" style="margin-left:14%;">
                      <el-col :span="12">
                        <el-input v-model="AddBookParam.pageNum"></el-input>
                      </el-col>
                    </el-form-item>
                  </el-form>
                  <span slot="footer" class="dialog-footer">
                                    <el-button @click="centerDialogVisible2 = false">取 消</el-button>
                                   <el-button type="primary" @click="addReadLog()">确 定</el-button>
                                  </span>
                </el-dialog>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </el-aside>
    </el-container>
  </div>
</template>

<script>
  import $ from 'jquery'
  export default {
    data() {
      return {
        centerDialogVisible: false,
        centerDialogVisible2: false,
        items: '',
        tableData: [],
        tableType: [],
        currentDate: new Date(),
        AddBookParam: {
          bookName: '',
          author: '',
          pageNum: '',
        },
        editForm: {
          id: null,
          bookName: null
        },
      };
    },
    methods: {
      handleEdit: function(index, row) {
        this.editFormVisible = true;
        //this.editForm = Object.assign({}, row);  
        this.editForm.id = row.id;
        this.editForm.bookName = row.bookName;
      },
      addBook() {
        var self = this;
        var result = null;
        if (!self.AddBookParam.bookName || !self.AddBookParam.pageNum || !self.AddBookParam.author) {
          return this.$message.warning('书名、页数和作者不能为空', {
            data: this.data
          })
        }
        $.ajax({
          url: 'http://localhost:9090/book/addBook',
          type: 'post',
          data: self.AddBookParam,
          dataType: "text",
          async: false,
          xhrFields: {
            withCredentials: true
          },
          crossDomain: true,
          success: function(data) {
            data = JSON.parse(data)
            console.log(data)
            result = data;
          },
          error: function(data) {
            //TODO 失败
            console.log("error", data)
          }
        })
        if (result.success === false) {
          return this.$message.warning('please login', {
            data: this.data
          })
        }
        if (result.success === true) {
          self.centerDialogVisible = false;
          return this.$message.warning('添加成功', {
            data: this.data
          })
        }
      },
      viewArticle(todo) {
        console.log("this", todo)
        //  this.$router.push({name: 'read',params:{id:todo}})
        this.$router.push({
          name: `viewBlog`,
          params: {
            id: todo
          }
        })
      }
    },
    created: function() {
      var self = this;
      $.ajax({
        url: 'http://localhost:9090/book/getBooks',
        type: 'post',
        dataType: "text",
        async: false,
        xhrFields: {
          withCredentials: true
        },
        crossDomain: true,
        success: function(data) {
          data = JSON.parse(data)
          console.log(data)
          self.tableData = data.data
          console.log("abc", self.tableData)
        },
        error: function(data) {
          //TODO 失败
          console.log("error", data)
        }
      })
      if (!self.tableData.bookName)
        for (var i = 0; i < self.tableData.length; i++) {
          console.log(self.tableData[i].startDate);
          var date = new Date(self.tableData[i].startDate); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
          var Y = date.getFullYear() + '-';
          var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
          var D = date.getDate() + ' ';
          var h = date.getHours() + ':';
          var m = date.getMinutes() + ':';
          var s = date.getSeconds();
          self.tableData[i].startDate = Y + M + D;
        }
    }
  }
</script>

<style scoped>
  .el-main {
    padding: 0px;
    line-height: 16px;
  }
  .el-card {
    border-radius: 0;
  }
  .el-card:not(:first-child) {
    margin-top: 20px;
  }
  a:hover {
    color: blue;
  }
  a:active {
    color: blue;
  }
  .my-li {
    margin-top: 5%;
    height: 30%;
  }
  .my-title {
    font-size: 120%;
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
    font-weight: 600
  }
  .my-time {
    font-size: 50%;
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
    color: #999;
  }
  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }
  .button {
    padding: 0;
    float: right;
  }
  .image {
    margin: 0 auto;
    width: 50%;
    display: block;
  }
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }
  .side-cars {
    margin-top: 13%;
    margin-left: 5%;
  }
</style>
