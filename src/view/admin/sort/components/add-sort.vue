<template>
  <el-dialog :title="title" v-model="props.showDialog" @close="btnCancel">
    <!-- 表单 -->
    <el-form label-width="120px" label-position="left" ref="sortForm" :model="form" :rules="sortRules">
      <el-form-item label="名称" prop="sort_name">
        <el-input style="width:65%" placeholder="请输入分类名称" size="default" v-model="form.sort_name" />
      </el-form-item>
      <el-form-item label="描述" prop="sort_description">
        <el-input style="width:60%" placeholder="请输入分类描述" size="default" v-model="form.sort_description" />
      </el-form-item>
    </el-form>
    <!-- footer插槽 -->
    <template v-slot:footer>
      <el-row type="flex" justify="center">
        <el-col :span="6">
          <el-button size="default" @click="btnCancel()">取消</el-button>
          <el-button type="primary" size="default" @click="subForm(sortForm)">确定</el-button>
        </el-col>
      </el-row>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { reactive, ref, defineProps, withDefaults, defineEmits } from 'vue'
import { ElMessageBox, ElMessage, FormInstance } from 'element-plus'
import { getSorts, addSort, editSort } from '@/api/article'
type Props = {
  showDialog: boolean
  sort?: object
}
const props = withDefaults(defineProps<Props>(), {
  showDialog: false
})
const emit = defineEmits(['update:showDialog', 'reload'])
const title = ref('新增分类')//title初始默认值
//表单使用ref定义dom对象
let sortForm = ref<FormInstance>()
//存数据的
let form = reactive<any>({
  sort_name: '',
  sort_description: ''
})
//编辑分类
//通过传入id获取分类详情
console.log(props.sort)
if (props.sort && (props as any).sort.sort_id) {
  form = props.sort
}

//表单额外规则，不能和原来的名称重名
//在改id时不检测原id
const checkName = async (rule: any, value: any, callback: any) => {
  const data = await getSorts()
  //编辑下
  if ((form as any).sort_id) {
    data.forEach((item: any) => {
      if (item.sort_name === value && item.sort_name != (props as any).sort.sort_name) {
        return callback(new Error('已有此分类！'))
      }
    })
    return callback()
  } else {
    //新增下   
    //如果有分类
    if (data) {
      data.forEach((item: any) => {
        if (item.sort_name === value) {
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
const sortRules = reactive({
  sort_name: [
    { required: true, message: '分类名不能为空', trigger: 'blur' },
    { validator: checkName, trigger: 'blur' }
  ],
  sort_description: [
    { required: true, message: '分类描述不能为空', trigger: 'blur' }
  ]
})
//确定
const subForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate(async (valid) => {
    try {
    if (valid) {
        //编辑
        if (form .sort_id) {
          console.log(form)
          const data=await editSort({ name: form.sort_name, description: form.sort_description, id: form.sort_id })
          console.log(data)
        } else {
          console.log(form)
          const data1=await addSort({ name: form.sort_name, description: form.sort_description })
          console.log(data1)
        }
    }
     //更新关闭表
     emit('update:showDialog', false)
        emit('reload')
        sortForm.value?.resetFields()
        //重新加载页面
        ElMessage({
          message: '成功！',
          type: 'success'
        })//关闭表后提示修改成功的信息
  } catch (err) {
        ElMessage({
          message: '修改失败！',
          type: 'error'
        })
      }
  })
}
//取消
const btnCancel = () => {
  emit('update:showDialog', false)
  sortForm.value?.resetFields()
}

</script>

<style scoped>
.el-form-item {
  margin-bottom: 15px;
}
</style>
