<template>
  <header>
    <div class="header-box1">
      <div class="header-left">
        <img @click="()=>{this.$router.push('/content');}" style="cursor: pointer;" src="../../images/瑞眸LOGO.png" alt="">
        <p>会员智能管理系统</p>
      </div>
      <div class="header-right">
        <div class="wifi">
          <p style="font-size: 16px;height: auto;">Xiaomi-5G</p>
          <img style="width: 28px;height: 20px;" src="../../images/Combined Shape.png" alt="">
        </div>
        <img @click="open" style="width: 28px;height: 28px;cursor: pointer;" src="../../images/退出.png" alt="">
        <div class="lang">
          <p style="color:#dea760;font-weight: 700">中</p>
          <p style="border-left: 2px solid #fff;padding-left: 13px;">English</p>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
  export default {
     methods: {
      open() {
         this.$confirm('是否退出当前登录？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          delete window.localStorage.storeId
          this.$router.push('/');
          this.$message({
            type: 'success',
            message: '已退出!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消操作！'
          });
        });
      }
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
header {
  height: 100px;
  width: 100%;
  min-width: 1202px;
  color: #fff;
  background-color: #2f8dfe;
  font-family: '宋体';
}

.header-box1 {
  width: 1182px;
  margin: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-left {
  width: 280px;
  height: 100px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-left > img {
  height: 65px;
  width: 56px;
}

.header-left > p {
  font-size: 24px;
  height: auto;
}

.header-right {
  width: 328px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.wifi {
  display: flex;
  justify-content: space-between;
  width: 120px;
  height: auto;
}

.lang {
  display: flex;
  justify-content: space-between;
  width: 115px;
  height: auto;
  font-size: 20px;
}

.lang > p:hover {
  color: #dea760;
}
</style>
