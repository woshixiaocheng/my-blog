<template>
    <div style="border: 1px solid #ccc">

<Toolbar style="border-bottom: 1px solid #ccc" :editor="editorRef"
  />
<Editor style="height:300px; overflow-y: hidden;font-size:16px;" v-model="valueHTML"
 :defaultConfig="editorConfig"  @onCreated="handleCreated"
 @onChange="handleChange" />
</div>
</template>
<script setup lang="ts">
import { onBeforeUnmount, ref, shallowRef, watch,defineEmits,defineProps } from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'

const props=defineProps({
    content:{
        default:''
    }
})
//子传父把valueHtml传给父处理
const emit=defineEmits(['update'])
// 编辑器实例，必须用 shallowRef，重要！
const editorRef = shallowRef()

const valueHTML=ref(props.content)//同步内容

//监听实时更新父组件传入的值
watch(()=>props.content,(newVal,oldVal)=>{
valueHTML.value=newVal
})

// 编辑器配置
const editorConfig = {
    placeholder: '请输入内容...',
    MENU_CONF: { /* 菜单配置，下文解释 */ }
}

const handleCreated = (editor:any) => {
    editorRef.value = editor
    // 记录 editor 实例，重要！
}
//获得输入的内容,改变的时候把值传回去
const handleChange=(editor:any)=>{
    let html=editor.getHtml()
    emit('update',html)
}
// 组件销毁时，及时销毁编辑器
onBeforeUnmount(() => {
    const editor = editorRef.value
    if (editor == null) return
    editor.destroy()
})
</script>

<!-- 别忘了引入样式 -->
<style src="@wangeditor/editor/dist/css/style.css"></style>