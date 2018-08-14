<template>
    <div class="markdown-editor2">    
        <mavon-editor  :editable=false :ishljs=true :subfield=false :toolbarsFlag=false defaultOpen="preview" v-model="value" style="min-height:850px;width:900px " />   
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
    }
}
</script>
<style>
.markdown-editor2 {
    margin-left: 20%;
    margin-right: 20%;
    border-style: none;
    box-shadow: 0ch;
    z-index: 100;
}
</style>
