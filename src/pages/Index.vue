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
                    <span>{{ todo.title}}</span>
                  </a>
                </div>
                </br>
                <div class="my-time">
                  <span>{{ todo.createdTime}}</span>
                </div>
              </el-card>
            </el-col>
          </li>
        </ul>
      </el-main>
      <el-aside width="28%">
        <el-row>
          <el-col  :key="o" :offset="index > 0 ? 2 : 0">
            <el-card :body-style="{ padding: '0px' }" class="side-cars">
              <div style="padding: 14px;">
                <a href="https://github.com/zjd921692097"><img src="@/assets/img/f1.jpg" class="image"></a>
                </br>
  
                <span><pre>     花卉养成交流 | 我们是认真的

  </pre></span>
  
              </div>
            </el-card>
            <el-card :body-style="{ padding: '0px' }" class="side-cars">
              <div style="padding: 14px;">
                <ul style="list-style-type:none">
                  <li v-for="(ArticleType,index) in tableType" class="my-li" :class="{'my-li--active': index === active}" @click="getArticleByChooseType(ArticleType, index)">
                    <el-col>
                      <a>
                        <span style="text-align:center;"><pre>{{ ArticleType.typeName}}</pre></span>
                      </a>
                      </br>
                    </el-col>
                  </li>
                </ul>
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
        items: '',
        tableData: [],
        tableType: [],
        currentDate: new Date(),
        GetArticleParam: {
          typeId: "",
  
        },
        active: 0,
      };
  
  
    },
  
  
    methods: {
      viewArticle(todo) {
        console.log("this", todo)
        //  this.$router.push({name: 'read',params:{id:todo}})
        this.$router.push({
          name: `viewBlog`,
          params: {
            id: todo
          }
        })
      },
      getArticleByChooseType(ArticleType, index) {
        this.active = index;
        var self = this;
        self.GetArticleParam.typeId = ArticleType.id;
        console.log("typeid", self.GetArticleParam.typeId)
        $.ajax({
          url: 'http://localhost:18083/blog/article/getArticleByType',
          type: 'post',
          data: self.GetArticleParam,
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
        for (var i = 0; i < self.tableData.length; i++) {
          console.log(self.tableData[i].createdTime);
          var date = new Date(self.tableData[i].createdTime); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
          var Y = date.getFullYear() + '-';
          var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
          var D = date.getDate() + ' ';
          var h = date.getHours() + ':';
          var m = date.getMinutes() + ':';
          var s = date.getSeconds();
          self.tableData[i].createdTime = Y + M + D + h + m + s;
        }
      }
  
    },
    created: function() {
  
      var self = this;
      $.ajax({
        url: 'http://localhost:18083/blog/article/getArticleType',
        type: 'post',
        dataType: "text",
  
        xhrFields: {
          withCredentials: true
        },
        crossDomain: true,
        success: function(data) {
          data = JSON.parse(data)
          console.log("type", data)
          self.tableType = data.data
        },
        error: function(data) {
          //TODO 失败
          console.log("error", data)
        }
      })
      $.ajax({
        url: 'http://localhost:18083/blog/article/getArticleByType',
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
      for (var i = 0; i < self.tableData.length; i++) {
        console.log(self.tableData[i].createdTime);
        var date = new Date(self.tableData[i].createdTime); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
        var Y = date.getFullYear() + '-';
        var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
        var D = date.getDate() + ' ';
        var h = date.getHours() + ':';
        var m = date.getMinutes() + ':';
        var s = date.getSeconds();
        self.tableData[i].createdTime = Y + M + D + h + m + s;
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
    font-weight: 550
  }
  .my-li--active{
    color: blue;
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
