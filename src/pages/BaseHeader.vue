<template>
    <el-header class="me-area">
        <el-row class="me-header">
    
            <el-col :span="4" class="me-header-left">
                <router-link to="/" class="me-title">
                    <img src="@/assets/img/logo.png" />
                </router-link>
            </el-col>
            <el-col :span="16">
                <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
                    <el-menu-item index="1">我的文章</el-menu-item>
                    <el-menu-item index="2">我的阅读</el-menu-item>
                    <el-menu-item index="3">标签</el-menu-item>
                    <el-menu-item index="4">日记</el-menu-item>
                    <el-col :span="8" :offset="8">
                        <el-menu-item index="/write"><i class="el-icon-edit"></i>写博客</el-menu-item>
                    </el-col>
                </el-menu>
            </el-col>
            <el-col :span="4">
                <el-menu :router=true menu-trigger="click" mode="horizontal" active-text-color="#5FB878">
                    <el-menu-item v-if="isLogin">
                        <el-button type="text" @click="centerDialogVisible = true">登录</el-button>
                        <el-dialog title="登陆" :visible.sync="centerDialogVisible" width="21%"  center :modal="false">
                            <el-form :model="form">
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
                                              <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
                                        </span>
                        </el-dialog>
                    </el-menu-item>
                </el-menu>
            </el-col>
        </el-row>
    </el-header>
</template>

<script>
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
    
                }
            };
    
    
        },
        methods: {
            handleSelect(key, keyPath) {
                console.log(key, keyPath);
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
