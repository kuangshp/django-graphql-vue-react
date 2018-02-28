<template>
  <div class="container">
    <form class="form-horizontal">
      <div class="form-group">
        <label for="book" class="col-sm-2 control-label">书籍</label>
        <div class="col-sm-10">
          <input type="text" class="form-control" id="book" placeholder="请输入书名" v-model="formData.name">
        </div>
      </div>
      <div class="form-group">
        <label for="price" class="col-sm-2 control-label">价格</label>
        <div class="col-sm-10">
          <input type="text" class="form-control" id="price" placeholder="请输入价格" v-model="formData.price">
        </div>
      </div>
      <div class="form-group">
        <label for="category" class="col-sm-2 control-label">分类</label>
        <div class="col-sm-10">
          <select class="form-control" v-model="formData.category">
            <template v-if="category.length > 0" v-for="item of category">
              <option :value="item.id">{{item.name}}</option>
            </template>
          </select>
        </div>
      </div>
      <div class="form-group">
        <label for="author" class="col-sm-2 control-label">作者</label>
        <div class="col-sm-10">
          <select class="form-control" v-model="formData.author">
            <template v-if="author.length > 0" v-for="item of author">
              <option :value="item.id">{{item.name}}</option>
            </template>
          </select>
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
        id: this.$route.params.id,
        author: [],
        category: [],
        formData: {
          name:'',
          price:'',
          category:'',
          author:''
        }
      }
    },
    mounted(){
      this.getAllCategory();
      this.getAllAuthor();
      this.getBookById();
    },
    methods: {
      getAllCategory() {
        this.$graphql.request(`
            query{
              allCategory{
                id,
                name
              }
            }
          `).then(result => {
            this.category = result.allCategory;
        })
      },
      getAllAuthor() {
        this.$graphql.request(`
            query{
              allAuthor{
                id,
                name
              }
            }
          `).then(result => {
            this.author = result.allAuthor;
            // console.log(result);
        })
      },
      // 根据id获取数据
      getBookById() {
        this.$graphql.request(`
          query{
            book(id:${this.id}){
              name,
              price,
              category{
                id,
                name
              },
              author{
                id,
                name
              }
            }
          }
        `).then(result => {
          const {book} = result;
          this.formData = {
            name: book.name,
            price: book.price,
            category: book.category.id,
            author: book.author.id
          }
        })
      },
      // 提交修改
      subForm(){
        console.log(this.formData)
        if(this.formData.name && this.formData.price && this.formData.category && this.formData.author) {
          this.$graphql.request(`
            mutation{
              updateBook(id:${this.id},bookData:{name:"${this.formData.name}",price:${this.formData.price},author:2,category:${this.formData.category}}){
                status
              }
            }
          `).then(result => {
            if(result.updateBook.status == 200) {
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