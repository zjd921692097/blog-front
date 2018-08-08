<template>
    <el-header class="me-area">
        <el-row class="me-header">
    
            <el-col :span="4" class="me-header-left">
                <router-link to="/" class="me-title">
                    <img src="@/assets/img/logo.png" />
                </router-link>
            </el-col>
            <el-col :span="16">
                <el-menu :default-active="activeIndex" menu-trigger="click" router=true class="el-menu-demo" mode="horizontal" @select="handleSelect">
                    <el-menu-item index="/">我的文章</el-menu-item>
                    <el-menu-item index="/read">我的阅读</el-menu-item>
                    <el-menu-item index="3">标签</el-menu-item>
                    <el-menu-item index="/diary">日记</el-menu-item>
                    <el-col :span="8" :offset="8">
                        <el-menu-item index="/write"><i class="el-icon-edit"></i>写博客</el-menu-item>
                    </el-col>
                </el-menu>
            </el-col>
            <el-col :span="4">
                <el-menu :router=true menu-trigger="click" mode="horizontal" active-text-color="#5FB878">
                    <el-menu-item v-if="isLogin">
                        <el-button type="text" @click="centerDialogVisible = true">登录</el-button>
                        <el-dialog title="登陆" :visible.sync="centerDialogVisible" width="21%" center :modal="false">
                            <el-form>
                                <el-form-item label="账号" :label-width="formLabelWidth">
                                    <el-col :span="18">
                                        <el-input v-model="UserParam.userName" auto-complete="on" disabled="disabled"></el-input>
                                    </el-col>
                                </el-form-item>
                                <el-form-item label="密码" :label-width="formLabelWidth">
                                    <el-col :span="18">
                                        <el-input type="password" v-model="UserParam.passWord" auto-complete="off"></el-input>
                                    </el-col>
                                </el-form-item>
                            </el-form>
                            <span slot="footer" class="dialog-footer">
                                                                  <el-button @click="centerDialogVisible = false">取 消</el-button>
                                                                  <el-button type="primary" @click="handleLogin()">确 定</el-button>
                                                            </span>
                        </el-dialog>
                    </el-menu-item>
                    <el-menu-item v-if="!isLogin">
                        <el-button type="text" @click="outLogin">注销</el-button>
                    </el-menu-item>
                </el-menu>
            </el-col>
        </el-row>
    </el-header>
</template>

<script>
    import $ from 'jquery'
    export default {
        data() {
            return {
                activeIndex: '1',
                activeIndex2: '1',
                isLogin: true,
                centerDialogVisible: false,
                UserParam: {
                    userName: 'admin',
                    passWord: ''
    
                },
                account: ''
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

<style>
    .el-header {
        position: fixed;
        z-index: 1024;
        min-width: 100%;
        box-shadow: 0 2px 3px hsla(0, 0%, 7%, .1), 0 0 0 1px hsla(0, 0%, 7%, .1);
    }
    
    .me-title {
        margin-top: 10px;
        font-size: 24px;
    }
    
    .me-header-left {
        margin-top: 10px;
    }
    
    .me-title img {
        max-height: 2.4rem;
        max-width: 100%;
    }
    
    .me-header-picture {
        width: 36px;
        height: 36px;
        border: 1px solid #ddd;
        border-radius: 50%;
        vertical-align: middle;
        background-color: #5fb878;
    }
</style>
