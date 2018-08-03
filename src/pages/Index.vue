<template>
  <div class="my-div">
  
    <el-container class="index-container">
      <el-main>
        <ul style="list-style-type:none">
          <li v-for="todo in tableData" class="my-li">
            <el-col :span="20">
              <el-card shadow="hover" class="my-card" :body-style="{ padding: '5%' }">
                <div class="in-title">
                  <span>{{ todo.title}}</span>
                  <span>{{ todo.createdTime}}</span>
                </div>
              </el-card>
            </el-col>
          </li>
        </ul>
      </el-main>
      <el-aside width="10%">
  
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
      };
  
  
    },
  
    methods: { 
     
    },
    created: function() {
      var self = this;
      $.ajax({
        url: 'http://localhost:9090/article/getArticleByType',
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
        self.tableData[i].createdTime =Y + M + D + h + m + s;
      }
    }
  }
</script>

<style scoped>
  .el-container {
    width: 960px;
  }
  
  .el-aside {
    margin-left: 20px;
    width: 260px;
  }
  
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
  
  .my-li {
    margin-top: 5%;
    height: 30%;
  }
  
  .my-card {
    margin-top: 0.5%;
  }
  
  .index-container {
    width: 80%;
  }
  
  .my-div {
    width: 80%;
  }
  
  .in-title {
    font-size: 180%;
  }
</style>
