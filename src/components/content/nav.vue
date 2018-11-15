<template>
  <div class="nav">
    <p>{{name}}</p>
    <span @click="()=>{this.$router.go(-1)}">返回</span>
  </div>
</template>

<script>
  export default {
    data() {
      return {

      }
    },
    props:["name"]
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.nav {
  width: 1202px;
  height: 125px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: auto;
  color: #fdad17;
}
.nav > span {
  display: block;
  width: 106px;
  height: 40px;
  border: 2px solid #fdad17;
  line-height: 40px;
  cursor: pointer;
  font-size: 22px;
  text-align: center;
  border-radius: 10px;
}
.nav > p {
  font-size: 24px;
}
</style>