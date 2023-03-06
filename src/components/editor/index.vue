<template>
  <div>
    <v-md-editor v-model="newValue"   :disabled-menus="[]" 
    left-toolbar="undo redo clear | h bold italic strikethrough quote | ul ol table hr | link image emoji code | save" 
      @upload-image="handleUploadImage"
      height="380px"></v-md-editor>
  </div>
</template>
<script setup lang='ts'>
import {ref,computed} from 'vue'
const props = defineProps<{
  content: string
}>()
const emit =defineEmits(['update:content'])

//去掉所有的html标记
const delHtmlTag=(str:any)=> { 
 return str.replace(/<[^>]+>/g, ""); 
}

const newValue=computed({
    get(){
        return delHtmlTag(props.content)
    },
    set(value:string){
        emit('update:content',value)
    }
})


const handleUploadImage=(event:any, insertImage:any, files:any) =>{
      // 拿到 files 之后上传到文件服务器，然后向编辑框中插入对应的内容
      console.log(files);

      // 此处只做示例
      insertImage({
        url:
          'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1269952892,3525182336&fm=26&gp=0.jpg',
        desc: '七龙珠',
        // width: 'auto',
        // height: 'auto',
      });
    }
</script>
<style>
 
</style>
