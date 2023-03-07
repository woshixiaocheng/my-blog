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


const handleUploadImage=async(event:any, insertImage:any, files:any) =>{
      
insertImage({
        url:
        'http://'+files,
        desc: files[0].name,
      });
    }
</script>
<style>
 
</style>
