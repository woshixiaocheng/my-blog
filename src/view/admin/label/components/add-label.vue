<template>
  <el-dialog :title="title" v-model="props.showDialog" @close="btnCancel">
    <!-- 表单 -->
    <el-form label-width="120px" label-position="left" ref="labelForm" :model="form" :rules="labelRules">
      <el-form-item label="名称" prop="label_name">
        <el-input style="width:65%" placeholder="请输入标签名称" size="medium" v-model="form.label_name" />
      </el-form-item>
      <el-form-item label="描述" prop="label_description">
        <el-input style="width:60%" placeholder="请输入标签描述" size="medium" v-model="form.label_description" />
      </el-form-item>
    </el-form>
    <!-- footer插槽 -->
    <template v-slot:footer>
      <el-row type="flex" justify="center">
        <el-col :span="6">
          <el-button size="medium" @click="btnCancel()">取消</el-button>
          <el-button type="primary" size="medium" @click="subForm(labelForm)">确定</el-button>
        </el-col>
      </el-row>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { reactive, ref, toRefs, defineProps } from 'vue'
import { ElMessageBox, ElMessage, FormInstance } from 'element-plus'
import { getLabels, addLabel, editLabel } from '@/api/article'
type Props = {
  showDialog: boolean
  editContent: object
}
const props = withDefaults(defineProps<Props>(), {
  showDialog: false
})
const emit =defineEmits(['update:showDialog','reload'])

const title = ref('新增标签')
//表单使用ref定义dom对象
const labelForm = ref<FormInstance>()
//存数据的
let form = reactive<any>({
  label_name: '',
  label_description: ''
})
//编辑分类
if (props.editContent && (props as any).editContent.label_id) {
  title.value = '编辑标签'
  form = props.editContent
}
//表单额外规则，不能和原来的名称重名
//在改id时不检测原id
const checkName = async (rule: any, value: any, callback: any) => {
  const data = await getLabels()
  //编辑下
  if (form.label_id) {
    data.forEach((item: any) => {
      if (item.label_name === value && item.label_name != (props as any).editContent.label_name) {
        return callback(new Error('已有此分类！'))
      }
    })
    return callback()
  } else {
    //新增下   
    //如果有分类
    if (data) {
      data.forEach((item: any) => {
        if (item.label_name === value) {
          return callback(new Error('已有此分类！'))
        }
      })
      return callback()
    } else {
      //没数据也是
      return callback()
    }
  }

}
//表单数据规则
const labelRules = reactive({
  label_name: [
    { required: true, message: '标签名不能为空', trigger: 'blur' },
    { validator: checkName, trigger: 'blur' }
  ],
  label_description: [
    { required: true, message: '标签描述不能为空', trigger: 'blur' }
  ]
})
//确定
const subForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate(async (valid) => {
    if (valid) {
      try {
        //编辑
        if (form.label_id) {
          await editLabel({ name: form.label_name, description: form.label_description, id: form.label_id })
        } else {
          console.log(form)
          await addLabel({ name: form.label_name, description: form.label_description })
        }
        //更新关闭表
        emit('update:showDialog', false)
        emit('reload')
        labelForm.value?.resetFields()
        //重新加载页面

        ElMessage({
          message: '修改成功！',
          type: 'success'
        })//关闭表后提示修改成功的信息
      } catch (err) {
        ElMessage({
          message: '修改失败！',
          type: 'error'
        })
      }

    }
  })
}
//取消
const btnCancel = () => {
  emit('update:showDialog', false)
  labelForm.value?.resetFields()
}

</script>

<style scoped>
.el-form-item {
  margin-bottom: 15px;
}
</style>
