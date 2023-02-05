<template>
     <el-dialog :title="title" v-model="props.showDialog" :before-close="handleClose">
    <!-- 表单 -->
    <el-form label-width="120px" label-position="left" ref="sortForm" :model="form" :rules="sortRules">
      <el-form-item label="名称" prop="sort_name">
        <el-input style="width:65%" placeholder="请输入分类名称" size="medium" v-model="form.sort_name"/>
      </el-form-item>
      <el-form-item label="描述" prop="sort_description">
        <el-input style="width:60%" placeholder="请输入分类描述" size="medium" v-model="form.sort_description"/>
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
import {getSorts,addSort,editSort} from '@/api/article'
export default{
    props: {
        showDialog:{
            type:Boolean,
            default:false
        },
        sort:{
            type:Object
        }
    },
    setup(props,{emit}){
        const title=ref('新增分类')
        //表单使用ref定义dom对象
        const sortForm=ref(null)
        //存数据的
        const form =reactive({
            sort_id:'',//修改编辑时要用
            sort_name:'',
            sort_description:''
        })
           //编辑分类
      //接收最新传入的sort值
      const edit=toRefs(props.sort)
       const newSort=ref()
      if(props.sort){
        title.value='编辑分类'
           newSort.value=edit.sort_id._object
           form.sort_id=newSort.value.sort_id
           form.sort_name=newSort.value.sort_name
           form.sort_description=newSort.value.sort_description             
      }
        //表单额外规则，不能和原来的名称重名
        //在改id时不检测原id
        const checkName=async(rule,value,callback)=>{
            const {data}=await getSorts()
            //编辑下
            if(form.sort_id){
                data.forEach(item=>{
                if(item.sort_name===value&&item.sort_name!=newSort.value.sort_name){
                    return callback(new Error('已有此分类！'))
                    }
                })
                return callback()
            }else{
             //新增下   
            //如果有分类
            if(data){
            data.forEach(item=>{
            if(item.sort_name===value){
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
        const sortRules=reactive({
            sort_name:[
                {required:true,message:'分类名不能为空',trigger:'blur'},
                {validator:checkName,trigger:'blur'}
            ],
            sort_description:[
                {required:true,message:'分类描述不能为空',trigger:'blur'}
            ]
        })
        //确定
        const subForm=()=>{
            sortForm.value.validate(async(valid)=>{
                if(valid){
                try{
            //编辑
            if(form.sort_id){
            await editSort({name:form.sort_name,description:form.sort_description,id:form.sort_id})
            }else{  
                console.log(form) 
                 await addSort({name:form.sort_name,description:form.sort_description})
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
            sortForm.value?.resetFields()
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
            sortForm.value?.resetFields()
        }
        //叉按钮
        const handleClose=(done)=>{
         ElMessageBox.confirm('确认关闭？',{ confirmButtonText: '确定',
          cancelButtonText: '取消',}).then(()=>{
          done();
         emit('update:showDialog',false)
         sortForm.value?.resetFields()
        }).catch(()=>{})
      }

   
        return {props,form,sortForm,sortRules,subForm,handleClose,btnCancel,newSort,title}
    }
}
</script>

<style scoped>
.el-form-item{
    margin-bottom: 15px;
}
</style>
