<template>
    <div>
    
        <div class="title-input">
    
            <el-input v-model="input" placeholder="请输入标题"></el-input>
    
        </div>
    
        <div class="markdown-editor" style="width:900px">
    
            <mavon-editor v-model="value" :ishljs = "true" style="min-height:850px " />
    
        </div>
    
    </div>
</template>
<script>
 export default {
    data() {
        return {
            form: {
            },
            value: "<h1>aaa</h1> ",
        };
    },
    created: function() {
        this.form = this.$route.params;
        this.value = this.form.id.content;
        console.log("id", this.form)
    },
    methods: {
        // 绑定@imgAdd event
        $imgAdd(pos, $file){
            // 第一步.将图片上传到服务器.
           var formdata = new FormData();
           formdata.append('image', $file);
           axios({
               url: 'server url',
               method: 'post',
               data: formdata,
               headers: { 'Content-Type': 'multipart/form-data' },
           }).then((url) => {
               // 第二步.将返回的url替换到文本原位置![...](./0) -> ![...](url)
               /**
               * $vm 指为mavonEditor实例，可以通过如下两种方式获取
               * 1. 通过引入对象获取: `import {mavonEditor} from ...` 等方式引入后，`$vm`为`mavonEditor`
               * 2. 通过$refs获取: html声明ref : `<mavon-editor ref=md ></mavon-editor>，`$vm`为 `this.$refs.md`
               */
               $vm.$img2Url(pos, url);
           })
        }
    }
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
</style>
