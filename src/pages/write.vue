<template>
    <div>
        <div class="title-input">
            <el-input v-model="input" placeholder="请输入标题"></el-input>
            
        </div>
        <div class="markdown-editor" style="width:900px">
            <mavon-editor ref="md" @imgAdd="$imgAdd" @imgDel="$imgDel" v-model="value" :ishljs="true" style="min-height:850px " />
        </div>
        <div>
            <el-button id="my-button2" @click="centerDialogVisible = true">提交</el-button>
            <el-dialog title="提交博客" :visible.sync="centerDialogVisible" width="30%" center>
                <el-form>
                    <el-form-item label="类型" :label-width="formLabelWidth" style="margin-left:20%;">
                        <el-select v-model="editForm.id" placeholder="请选择">
                            <el-option v-for="item in tableType" :key="item.id" :label="item.typeName" :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                                                      <el-button @click="centerDialogVisible = false">取 消</el-button>
                                                     <el-button type="primary" @click="wirteArticle">确 定</el-button>
                                                    </span>
            </el-dialog>
        </div>
    </div>
</template>
<script>
    import $ from 'jquery'
    import axios from 'axios'
    export default {
        data() {
            return {
                centerDialogVisible: false,
                form: {},
                value: "",
                input:'',
                tableType: [],
                editForm: {
                    id: null,
                    bookName: null
                },
                writeParam: {
                    title:'',
                    content:'',
                    typeId:'',
                }
            };
        },
        methods: {
            wirteArticle() {
                var self = this;
                var result = null;
                self.writeParam.content=self.value;
                self.writeParam.title=self.input;
                self.writeParam.typeId=self.editForm.id;
                $.ajax({
                    url: 'http://47.106.219.141:9090/article/wirteArticle',
                    type: 'post',
                    data: self.writeParam,
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
                            return self.$message.warning(data.retMsg, {
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
            // 绑定@imgAdd event
            $imgAdd(pos, $file) {
                // 第一步.将图片上传到服务器.
                var formdata = new FormData();
                formdata.append('file', $file);
                
                axios({
                    url: 'http://47.106.219.141:9090/file/uploadFile',
                    method: 'post',
                    data: formdata,
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    },
                }).then((url) => {
                    // 第二步.将返回的url替换到文本原位置![...](./0) -> ![...](url)
                    /**
                     * $vm 指为mavonEditor实例，可以通过如下两种方式获取
                     * 1. 通过引入对象获取: `import {mavonEditor} from ...` 等方式引入后，`$vm`为`mavonEditor`
                     * 2. 通过$refs获取: html声明ref : `<mavon-editor ref=md ></mavon-editor>，`$vm`为 `this.$refs.md`
                     */
                    
                   // $vm.$img2Url(pos, 'file:///'+url.data.filePath);
                    this.$refs.md.$img2Url(pos,url.data.data.filePath)
                })
            }
        },
        created: function() {
            console.log(111);
            var self = this;
            $.ajax({
                url: 'http://47.106.219.141:9090/article/getArticleType',
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
                    self.tableType.splice(0, 1);
                },
                error: function(data) {
                    //TODO 失败
                    console.log("error", data)
                }
            })
        },
    }
</script>

<style>
    .title-input {
        width: 30%;
        margin-left: 35%;
    }
    .markdown-editor {
        margin-top: 3%;
        z-index: 10;
    }
    #my-button2 {
        margin-top: 3%;
        margin-left: 92.5%;
    }
</style>
