<template>
  <div class="submit-box">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/homepage/userpage', }">返回</el-breadcrumb-item>
      <!-- <span class="submitapp"></span> -->
      <el-breadcrumb-item>提交作业</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form
      label-width="0px"
    >
      <el-form-item>
        <el-input type="file" ></el-input>
      </el-form-item>

      <el-form-item class="inputfirst">
        <el-input placeholder="作业编号"></el-input>
      </el-form-item>

      <el-form-item class="inputsecond">
        <el-input placeholder="作业名" type="password"></el-input>
      </el-form-item>
      <!-- 按钮区域 -->
      <el-form-item class="btns">
        <el-button type="primary" >提交</el-button>
        <el-button type="info" >重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
    };
  }
};
</script>
<style  scoped>
.submit-box{
  /* display: flex;
  justify-content: space-between; */
  width: 60%;
  margin: 0 auto;
  margin-top: 10px;
}
.inputfirst,
.inputsecond,
.btns,
.el-form-item{
  display: flex;
  justify-content: flex-start;
}
/* .el-form-item {
  margin-bottom: 5px;
  margin-top: 5px;
} */
.el-breadcrumb {
  /* display: flex;
  justify-content: flex-start; */
  
  font-size: 12px;
}

.el-form{
  padding-top: 20px;
  
}
</style>