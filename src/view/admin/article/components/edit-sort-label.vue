<template>
        <el-dialog title="修改分类和标签" v-model="props.showDialog" :before-close="handleClose">
    <!-- 表单 -->
    <el-form label-width="120px" label-position="left" ref="editForm" :model="form" :rules="rules">
    <el-form-item label="分类">
 <el-select v-model="form.sort" placeholder="请选择分类" @change="sortChange" >
    <el-option
      v-for="item in sorts"
      :key="item.sort_id"
      :label="item.sort_name"
      :value="item.sort_id"
    />
  </el-select>
  </el-form-item>
  <el-form-item label="标签">
 <el-select v-model="form.label" placeholder="请选择标签" @change="labelChange" >
    <el-option
      v-for="item in labels"
      :key="item.label_id"
      :label="item.label_name"
      :value="item.label_id"

    />
  </el-select>
  </el-form-item>

    </el-form>
    <!-- footer插槽 -->
    <template v-slot:footer>
      <el-row type="flex" justify="center">
        <el-col :span="6">
          <el-button size="medium" @click="btnCancel()">取消</el-button>
          <el-button type="primary" size="medium" @click="subForm()">确定</el-button>
        </el-col>
      </el-row>
    </template>
  </el-dialog>
</template>

<script>
import { reactive,ref,toRefs} from '@vue/reactivity'
import {ElMessageBox,ElMessage} from 'element-plus'
import {getLabels,getSorts,editArticleLabel,editArticleSort} from '@/api/article'
export default{
    props: {
        showDialog:{
            type:Boolean,
            default:false
        },
        articleItem:{
          type:Object,
        }
    },
    setup(props,{emit}){
      const item=toRefs(props.articleItem)
      const label_id=item.label_id._object.label_id
      const sort_id=item.sort_id._object.sort_id
      const label_name=item.label_name._object.label_name
      const sort_name=item.sort_name._object.sort_name
      const articleId=item.article_id._object.article_id
        //表单使用ref定义dom对象
        const editForm=ref(null)
        //存数据的
        const form =reactive({
          label_id:label_id,
            label:label_name,
            sort:sort_name,
            sort_id:sort_id,
        })
            //选择器
    const sorts=ref([])//存储分类
    const labels=ref([])//存储标签
    //获取分类
    const showSorts=async ()=>{
      const data=await getSorts()
      sorts.value=data.data
    }
    showSorts()
    //获取标签
    const showLabels=async ()=>{
      const data=await getLabels()
      labels.value=data.data
    }
    showLabels()
    //分类选择改变
    const sortChange=(val)=>{
      form.sort_id=val
    }
      const labelChange=(val)=>{
      form.label_id=val
    }
        //确定
        const subForm=()=>{
            editForm.value.validate(async(valid)=>{
                if(valid){
            await editArticleLabel({articleId:articleId,labelId:form.label_id})
           const data= await editArticleSort({articleId:articleId,sortId:form.sort_id})
            console.log(data)
                 //更新关闭表
            emit('update:showDialog',false)
            emit('reload')
            editForm.value?.resetFields()
            //重新加载页面
           
            ElMessage({
             message:'修改成功！',
              type:'success'
                })//关闭表后提示修改成功的信息
                }
        })
        }
        //取消
        const btnCancel=()=>{
            emit('update:showDialog',false)
           editForm.value?.resetFields()
        }
        //叉按钮
        const handleClose=(done)=>{
         ElMessageBox.confirm('确认关闭？',{ confirmButtonText: '确定',
          cancelButtonText: '取消',}).then(()=>{
          done();
         emit('update:showDialog',false)
         editForm.value?.resetFields()
        }).catch(()=>{})
      }

   
        return {props,form,editForm,sorts,labels,subForm,handleClose,btnCancel,sortChange,labelChange}
    }
}
</script>
