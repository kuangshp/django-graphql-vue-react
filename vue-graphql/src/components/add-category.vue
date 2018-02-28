<template>
  <div class="container">
    <form class="form-horizontal">
      <div class="form-group">
        <label for="author" class="col-sm-2 control-label">分类</label>
        <div class="col-sm-10">
          <input type="text" class="form-control" id="author" placeholder="请输入分类" v-model="name">
        </div>
      </div>
      <div class="form-group">
        <div class="col-sm-offset-2 col-sm-10">
          <button type="button" class="btn btn-default" @click="subForm">提交</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
  export default {
    data() {
      return{
        name: ''
      }
    },
    methods: {
      subForm() {
        console.log(this.name)
        if( this.name ) {
          this.$graphql.request(`
            mutation{
              createCategory(name:"${this.name}"){
                status
              }
            }
          `).then(result => {
            if(result.createCategory.status == 200 ) {
              this.$router.push({
                path: '/'
              });
            }
          })
        }
      }
    }
  }
</script>

<style scoped>

</style>