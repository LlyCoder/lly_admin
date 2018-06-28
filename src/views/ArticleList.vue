<template>
    <div>
        <div class="table-responsive-lg">
            <table class="table table-hover">
                <thead>
                    <tr class="">
                        <th scope="col">#</th>
                        <th scope="col">文章标题</th>
                        <th scope="col">文章作者</th>
                        <th scope="col">创建时间</th>
                        <th scope="col">最近更新</th>
                        <th scope="col">内容</th>
                        <th scope="col">操作</th>
                    </tr>
                </thead>
                <tbody>
                    <template v-for="(item, key) in articleLists.data">
                        <tr>
                            <th scope="row">{{item.id}}</th>
                            <td>{{item.title}}</td>
                            <td>{{item.author}}</td>
                            <td>{{item.created_at}}</td>
                            <td>三天前</td>
                            <td class="text-content" v-text="item.content"></td>
                            <td>
                                <button type="button" class="btn btn-outline-primary btn-sm" @click="$router.push('/edit/'+item.id)">编辑</button>
                            </td>
                        </tr>
                    </template>
                </tbody>
            </table>
        </div>
        <div class="th-pagination">
            <nav aria-label="Page navigation example">
                <ul class="pagination">
                    <li class="page-item">
                        <a class="page-link" href="#">Previous</a>
                    </li>
                    <li class="page-item">
                        <a class="page-link" href="#">1</a>
                    </li>
                    <li class="page-item">
                        <a class="page-link" href="#">Next</a>
                    </li>
                </ul>
            </nav>
        </div>
    </div>
</template>

<script>
    //import store
    import {mapGetters, mapActions, mapMutations} from 'vuex'
    export default {
        data() {
            return {
                page: '1',
            }
        },
        computed: {
            ...mapGetters({
                articleLists: 'articleLIst'
            })
        },
        created() {
            this.getData();
        },
        methods: {
            getData() {
                this.$store.dispatch('loadList',this.page);
            }
        }
    }
</script>

<style scoped src="../../node_modules/_bootstrap@4.1.1@bootstrap/dist/css/bootstrap.min.css">
  
</style>

<style scoped>
     .th-pagination {
		width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
	}
</style>