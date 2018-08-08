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
