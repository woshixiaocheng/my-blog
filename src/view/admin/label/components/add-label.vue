<template>
     <el-dialog :title="title" v-model="props.showDialog" :before-close="handleClose">
    <!-- 表单 -->
    <el-form label-width="120px" label-position="left" ref="labelForm" :model="form" :rules="labelRules">
      <el-form-item label="名称" prop="label_name">
        <el-input style="width:65%" placeholder="请输入标签名称" size="medium" v-model="form.label_name"/>
      </el-form-item>
      <el-form-item label="描述" prop="label_description">
        <el-input style="width:60%" placeholder="请输入标签描述" size="medium" v-model="form.label_description"/>
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
import { reactive,ref, toRefs } from '@vue/reactivity'
import {ElMessageBox,ElMessage} from 'element-plus'
import {getLabels,addLabel,editLabel} from '@/api/article'
export default{
    props: {
        showDialog:{
            type:Boolean,
            default:false
        },
        editContent:{
            type:Object
        }
    },
    setup(props,{emit}){
        const title=ref('新增标签')
        //表单使用ref定义dom对象
        const labelForm=ref(null)
        //存数据的
        const form =reactive({
            label_id:'',//修改编辑时要用
            label_name:'',
            label_description:''
        })
           //编辑分类
      //接收最新传入的editContent值
      const edit=toRefs(props.editContent)
       const newLabel=ref()
      if(props.editContent){
        title.value='编辑标签'
           newLabel.value=edit.label_id._object
           form.label_id=newLabel.value.label_id
           form.label_name=newLabel.value.label_name
           form.label_description=newLabel.value.label_description             
      }
        //表单额外规则，不能和原来的名称重名
        //在改id时不检测原id
        const checkName=async(rule,value,callback)=>{
            const {data}=await getLabels()
            //编辑下
            if(form.label_id){
                data.forEach(item=>{
                if(item.label_name===value&&item.label_name!=newLabel.value.label_name){
                    return callback(new Error('已有此分类！'))
                    }
                })
                return callback()
            }else{
             //新增下   
            //如果有分类
            if(data){
            data.forEach(item=>{
            if(item.label_name===value){
                return callback(new Error('已有此分类！'))
                }
            })
            return callback()
            }else{
                //没数据也是
            return callback() 
            }
            }
        
        }
        //表单数据规则
        const labelRules=reactive({
            label_name:[
                {required:true,message:'标签名不能为空',trigger:'blur'},
                {validator:checkName,trigger:'blur'}
            ],
            label_description:[
                {required:true,message:'标签描述不能为空',trigger:'blur'}
            ]
        })
        //确定
        const subForm=()=>{
            labelForm.value.validate(async(valid)=>{
                if(valid){
                try{
            //编辑
            if(form.label_id){
            await editLabel({name:form.label_name,description:form.label_description,id:form.label_id})
            }else{  
                console.log(form) 
                 await addLabel({name:form.label_name,description:form.label_description})
            }
            }catch(err){
                ElMessage({
                message:'修改失败！',
                 type:'error'
                   })
                 } 
                 //更新关闭表
            emit('update:showDialog',false)
            emit('reload')
            labelForm.value?.resetFields()
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
            labelForm.value?.resetFields()
        }
        //叉按钮
        const handleClose=(done)=>{
         ElMessageBox.confirm('确认关闭？',{ confirmButtonText: '确定',
          cancelButtonText: '取消',}).then(()=>{
          done();
         emit('update:showDialog',false)
         labelForm.value?.resetFields()
        }).catch(()=>{})
      }

   
        return {props,form,labelForm,labelRules,subForm,handleClose,btnCancel,title}
    }
}
</script>

<style scoped>
.el-form-item{
    margin-bottom: 15px;
}
</style>
