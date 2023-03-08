<template>
  <el-dialog title="修改分类和标签" v-model="props.showDialog" @close="btnCancel">
    <!-- 表单 -->
    <el-form label-width="120px" label-position="left" ref="editForm" :model="form" >
      <el-form-item label="分类">
        <el-select v-model="form.sort" placeholder="请选择分类" @change="sortChange">
          <el-option v-for="item in sorts" :key="item.sort_id" :label="item.sort_name" :value="item.sort_id" />
        </el-select>
      </el-form-item>
      <el-form-item label="标签">
        <el-select v-model="form.label" placeholder="请选择标签" @change="labelChange">
          <el-option v-for="item in labels" :key="item.label_id" :label="item.label_name" :value="item.label_id" />
        </el-select>
      </el-form-item>

    </el-form>
    <!-- footer插槽 -->
    <template v-slot:footer>
      <el-row type="flex" justify="center">
        <el-col :span="6">
          <el-button size="medium" @click="btnCancel()">取消</el-button>
          <el-button type="primary" size="medium" @click="subForm(editForm)">确定</el-button>
        </el-col>
      </el-row>
    </template>
  </el-dialog>
</template>
<script lang="ts">
    export default {
      name: 'editsortlabeldaily',
    };
</script>
<script setup lang="ts">
import { reactive, ref, defineProps,withDefaults } from 'vue'
import { ElMessageBox, ElMessage, FormInstance } from 'element-plus'
import { getLabels, getSorts, editArticleLabel, editArticleSort } from '@/api/article'
import {sorts,labels} from '@/utils/type'
//props
type Props = {
  showDialog: boolean,
  articleItem?: object
}
const props = withDefaults(defineProps<Props>(), {
  showDialog: false,
})

//定义emit事件
const emit = defineEmits(['update:showDialog','reload'])
//表单使用ref定义dom对象
const editForm = ref<FormInstance>()

//获取该文章id
const articleId=(props as any).articleItem.article_id
//存数据的
const form = reactive({
  label_id: (props as any).articleItem.label_id,
  label: (props as any).articleItem.label_name,
  sort: (props as any).articleItem.sort_name,
  sort_id: (props as any).articleItem.sort_id,
})
//选择器
const sorts = ref<sorts[]>([])//存储分类
const labels = ref<labels[]>([])//存储标签
//获取分类
const showSorts = async () => {
  sorts.value = await getSorts()
}
showSorts()
//获取标签
const showLabels = async () => {
  labels.value = await getLabels()
}
showLabels()
//分类选择改变
const sortChange = (val:number) => {
  form.sort_id = val
}
const labelChange = (val:number) => {
  form.label_id = val
}
//确定
const subForm = (formEl: FormInstance | undefined) => {
  if(!formEl) return
  formEl.validate(async (valid) => {
    if (valid) {
      await editArticleLabel({ articleId: articleId, labelId: form.label_id })
      const data = await editArticleSort({ articleId: articleId, sortId: form.sort_id })
      console.log(data)
      //更新关闭表
      emit('update:showDialog', false)
      emit('reload')
      editForm.value?.resetFields()
      //重新加载页面
      ElMessage({
        message: '修改成功！',
        type: 'success'
      })//关闭表后提示修改成功的信息
    }
  })
}
//取消
const btnCancel = () => {
  emit('update:showDialog', false)
  editForm.value?.resetFields()
}


</script>
