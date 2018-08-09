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
                  <span>开始阅读时间:{{ todo.startDateString}}</span>
                  <span style="margin-left:24px;">作者:{{ todo.author}}</span>
                  <span style="margin-left:24px;">总页数:{{ todo.pageNum}}</span>
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
                 <span style="margin-left:24px;"><pre>近三日阅读:    {{statistic.countThreeDay}}     页</pre></span>
                 
                  <span style="margin-left:24px;"><pre>近一周阅读:    {{statistic.countWeek}}     页</pre></span>
                  
                  <span style="margin-left:24px;"><pre>近一月阅读:    {{statistic.countMouth}}     页</pre></span>
                  
                  <span style="margin-left:24px;"><pre>近一年阅读:    {{statistic.countYer}}     页</pre></span>
                  <span style="margin-left:24px;"><pre>最近正在读的书:    {{statistic.countYer}}     页</pre></span>
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
                      <el-select v-model="editForm.id" placeholder="请选择">
                        <el-option v-for="item in tableData" :key="item.id" :label="item.bookName" :value="item.id">
                        </el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="阅读页数" :label-width="formLabelWidth" style="margin-left:14%;">
                      <el-col :span="12">
                        <el-input v-model="AddReadLogParam.readNum"></el-input>
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
        statistic:'',
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
        AddReadLogParam: {
          bookId: '',
          readNum: '',
        }

      };
    },
    methods: {
      getbooks(){
        var self=this;
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
            console.log(111)
            if (result.success === false) {
              return self.$message.warning('please login', {
                data: self.data
              })
            }
            if (result.success === true) {
              self.centerDialogVisible = false;
              self.$message.warning('添加成功', {
                data: self.data
              })
             
            }
          },
          error: function(data) {
            //TODO 失败
            console.log("error", data)
          }
        })
        self.getbooks();
      },
      addReadLog() {
        var self = this;
        var result = null;
        self.AddReadLogParam.bookId = self.editForm.id;
        console.log("aaaa")
        if (!self.AddReadLogParam.bookId || !self.AddReadLogParam.readNum) {
          return this.$message.warning('书名和阅读页数不能为空', {
            data: this.data
          })
        }
        $.ajax({
          url: 'http://localhost:9090/book/addReadLog',
          type: 'post',
          data: self.AddReadLogParam,
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
            if (result.success === false) {
              return self.$message.warning(result.retMsg, {
                data: self.data
              })
            }
            if (result.success === true) {
              self.centerDialogVisible2 = false;
              return self.$message.warning('添加成功', {
                data: self.data
              })
            }
          },
          error: function(data) {
            //TODO 失败
            console.log("error", data)
          }
        })
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
      self.getbooks();
       $.ajax({
          url: 'http://localhost:9090/book/getReadStatistics',
          type: 'post',
          dataType: "text",
          xhrFields: {
            withCredentials: true
          },
          crossDomain: true,
          success: function(data) {
            data = JSON.parse(data)
            console.log(data)
            self.statistic = data.data;
          },
          error: function(data) {
            //TODO 失败
            console.log("error", data)
          }
        })
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
