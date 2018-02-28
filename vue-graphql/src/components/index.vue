<template>
  <div class="container">
    <router-link to="/add" class="btn btn-info" style="margin:20px 0">新增图书</router-link>
    <router-link to="/add_author" class="btn btn-info" style="margin:20px 0">新增作者</router-link>
    <router-link to="/add_category" class="btn btn-info" style="margin:20px 0">新增分类</router-link>
    <table class="table table-bordered">
      <tr>
        <th>No</th>
        <th>书名</th>
        <th>价格</th>
        <th>分类</th>
        <th>作者</th>
        <th>创建时间</th>
        <th>更新时间</th>
        <th>操作</th>
      </tr>
      <tr v-if="tableData.length > 0" v-for="(item, index) of tableData" :key="index">
        <td>{{index+1}}</td>
        <td>{{item.name}}</td>
        <td>{{item.price}}</td>
        <td>{{item.author.name}}</td>
        <td>{{item.category.name}}</td>
        <td>{{item.createAt | moment }}</td>
        <td>{{item.updateAt | moment }}</td>
        <td>
          <input class="btn btn-info" type="button" value="修改" @click="edit(item.id)">
          <input class="btn btn-danger" type="button" value="删除" @click="del(item.id)">
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tableData: []
    }
  },
  mounted(){
    this.getGraphQlData();
  },
  methods: {
    getGraphQlData() {
      this.$graphql.request(`
          query{
            allBook{
              id,
              name,
              price,
              createAt,
              updateAt,
              author{
                name
              },
              category{
                name
              }
            }
          }
        `).then(result => {
          this.tableData = result.allBook;
          // console.log(result);
      })
    },
    del(id){
      console.log(id);
      this.$graphql.request(`
          mutation{
            delBook(id:${id}){
              status
            }
          }
        `).then(result => {
        console.log(result);
        if(result.delBook.status == 200) {
          this.getGraphQlData();
        }
      })
    },
    //修改
    edit(id) {
      this.$router.push({
        path: `/updata/${id}`
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
