<template>
    <div class="button" >
        <el-button :round="isRound" size="large" >
            <el-button :round="isRound" size="large" class="buttonChange" />
            {{text}}</el-button>
    </div>
</template>
<script setup lang='ts'>
import { defineProps,computed } from
    'vue';
    //按钮的内容和宽度都由外界决定，还有按钮的框架
const props = defineProps<{
    text: string
    width?:string
    isRound:boolean
}>()
const buttonWidth=computed(()=>{
    if(props.width){
        return props.width
    }else{
        return '100px'
    }
})
const buttonLeft=computed(()=>{
    if(props.width){
        return `-${props.width}`
    }else{
        return '-100px'
    }
})

</script>
<style scoped lang="less">
.button{
    width: v-bind(buttonWidth);
/deep/ .el-button{
position: relative;
height: 35px;
width: v-bind(buttonWidth);
overflow: hidden;
border: 0;
color: #fff;
font-weight: 600;
font-size: 15px;
background-color: #626aef;
z-index: 10;
}
.buttonChange{
        position: absolute;
        left: v-bind(buttonLeft);
        border: 0;
        background-color: var(--buttonHover);
        z-index: -1;
    }
&:hover  .buttonChange{
animation: buttonChange 0.5s forwards ;
animation-timing-function: cubic-bezier(.45,1.64,.47,.66);//写好了可以实现回弹
}
}
</style>
