<template>
  <div v-title data-title="ForFun Find Yourself">
    <el-container>
  
      <el-main class="me-articles">
        <ul id="example-1">
          <li v-for="item in items">
  
            <el-col :span="12">
              <el-card shadow="hover">
                123
              </el-card>
  
            </el-col>
          </li>
        </ul>
  
  
      </el-main>
  
      <el-aside>
  
        <card-me class="me-area"></card-me>
        <card-tag :tags="hotTags"></card-tag>
        <h1>cccccccccccccccccccccc</h1>
  
  
      </el-aside>
  
    </el-container>
  </div>
</template>
<script>
    import $ from 'jquery'
    export default {
        data() {
            return {
               items:'',
            };
    
    
        },
        methods: {
            handleSelect(key, keyPath) {
                console.log(key, keyPath);
            },
            outLogin() {
                var self = this;
                $.ajax({
                    url: 'http://localhost:9090/user/outLogin',
                    type: 'post',
                    data: this.UserParam,
                    dataType: "text",
                    async: false,
                    xhrFields: {
                        withCredentials: true
                    },
                    crossDomain: true,
                    success: function(data) {
                        data = JSON.parse(data);
    
                    },
                    error: function(data) {
                        //TODO 失败
                        console.log("error", data)
                    }
                })
    
    
                console.log("1234")
                self.centerDialogVisible = false
                self.isLogin = true
                return this.$message.warning('注销成功', {
                    data: this.data
                })
    
    
    
    
            },
            handleLogin() {
                var self = this;
                var result = 'true';
                console.log("wode", self.UserParam.passWord);
                if (!self.UserParam.userName || !self.UserParam.passWord) {
                    return this.$message.warning('用户名和密码不能为空', {
                        data: this.data
                    })
                }
                $.ajax({
                    url: 'http://localhost:9090/user/login',
                    type: 'post',
                    data: this.UserParam,
                    dataType: "text",
                    async: false,
                    xhrFields: {
                        withCredentials: true
                    },
                    crossDomain: true,
                    success: function(data) {
                        data = JSON.parse(data);
                        self.account = data;
                        console.log("abcd", this.account.success)
                    },
                    error: function(data) {
                        //TODO 失败
                        console.log("error", data)
                    }
                })
    
                if (this.account.success === true) {
                    console.log("1234")
                    self.centerDialogVisible = false
                    self.isLogin = false
                    return this.$message.warning('登陆成功', {
                        data: this.data
                    })
    
    
                }
                return this.$message.warning(this.account.retMsg, {
                    data: this.data
                })
    
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
</style>
