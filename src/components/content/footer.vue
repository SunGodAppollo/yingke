<template>
  <footer>
    <div>
      <p>Copyright &copy www.AxureUX，All Rights Reserved.</p>
      <p>Email：<a href="#">5698401@qq.com</a> &nbspQQ：5698401</p>
    </div>
  </footer>

</template>

<script>
  export default {
    data() {
      return {

      }
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  footer{
    height: 100px;
    width: 100%;
    min-width: 1202px;
    color: #fff;
    background-color: #2f8dfe;
    font-size: 12px;
    display:flex;
    justify-content: center;
    align-items: center;
  }
  footer>div{
    width: 310px;
    height: 40px;
    display:flex;
    flex-wrap: wrap;
    justify-content: center;
    align-content: space-between;
  }
  footer>div>p{
    height: auto;
  }
  footer a{
    color:#fff;
    text-decoration: none;
  }

</style>