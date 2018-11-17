
<template>
  <div>
    <Header />
    <Nav name="品牌信息" />
    <div class="form">
      <el-form style="margin-left:-20px;width:495px;" ref="form" label-position="right" label-width="100px">
        <el-form-item label="标题:">
          <el-input v-model="name" placeholder="请输入标题"></el-input>
        </el-form-item>
        <el-form-item label="内容:">
          <el-input v-model="introduce" type="textarea" rows="7" placeholder="请输入内容">
          </el-input>
        </el-form-item>
        <el-form-item label="社会信用代码:">
          <el-input v-model="creditNumber" placeholder="请输入社会信用代码"></el-input>
        </el-form-item>
        <el-form-item label="营业执照:">
          <el-upload class="avatar-uploader" action="/apis/small/sys/sts/uploadFile" :dialogVisible="false" :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="licenseImage" :src="licenseImage" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="推荐产品:">
          <el-input v-model="col1" type="textarea" rows="7" placeholder="请输入内容">
          </el-input>
        </el-form-item>
        <el-form-item label="电话:">
          <el-input v-model="phone" placeholder="请输入电话"></el-input>
        </el-form-item>
        <el-form-item label="城市:">
          <el-select v-model="cityId" placeholder="城市选择">
            <el-option-group v-for="group in options3" :key="group.label" :label="group.label">
              <el-option v-for="item in group.options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-option-group>
          </el-select>
        </el-form-item>
        <el-form-item label="地址:">
          <el-input  v-model="path" placeholder="请输入地址"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="submit" style="width:370px;height:58px;border-radius: 10px;background-color: #fdad17;font-size:26px;margin:32px 0 34px"
            type="warning">完成</el-button>
        </el-form-item>
      </el-form>
    </div>
    <Footer />
  </div>
</template>

<script>
  export default {
    data() {
      return {
        name:"",
        introduce:"",
        creditNumber:"",
        licenseImage: "",
        col1:"",
        phone:"",
        cityId: '',
        path:"",
        dialogVisible: false,
        options3: [{
          label: '热门城市',
          options: [{
            value: 'Shanghai',
            label: '上海'
          }, {
            value: 'Beijing',
            label: '北京'
          }]
        }, {
          label: '城市名',
          options: [{
            value: 'Chengdu',
            label: '成都'
          }, {
            value: 'Shenzhen',
            label: '深圳'
          }, {
            value: 'Guangzhou',
            label: '广州'
          }, {
            value: 'Dalian',
            label: '大连'
          }]
        }]
      }
    },
    methods: {
      handleAvatarSuccess(res, file) {
        this.licenseImage = res.data;
        console.log(this.licenseImage);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
      submit() {
        this.$confirm('确认是否提交', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.asyncSubimt()
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消操作！'
          });
        });
      },
      async asyncSubimt() {  //修改品牌信息
        let data = await fetch(`/apis/equipment/storeupdate/${window.localStorage.storeId}?name=${this.name}
        &introduce=${this.introduce}&creditNumber=${this.creditNumber}&licenseImage=${this.licenseImage}
        &col1=${this.col1}&phone=${this.phone}&cityId=${this.cityId}&path=${this.path}`, {
          method: "get",
          headers: {
            "Content-type": "application/json"
          },
        }).then(response => {
          return response.json()
        });
        this.$message({
          type: 'success',
          message: '提交成功'
        });
      }
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .form {
    width: 495px;
    margin: auto;
  }

  .avatar-uploader,
  .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader,
  .el-upload:hover {
    border-color: #409eff;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }

  .avatar-uploader,
  .avatar {
    width: 78px;
    height: 78px;
    display: block;
  }
</style>
