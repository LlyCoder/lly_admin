<template>
    <div>
        <el-table :data="articleLists.data" border style="width: 100%">
            <el-table-column  prop="id" label="#ID" width="100" align="center">
            </el-table-column>
            <el-table-column  label="文章封面" width="150" align="center">
                <template slot-scope="scope">
                    <img :src="scope.row.cover" alt="封面" class="cover">
                </template>
            </el-table-column>
            <el-table-column prop="title" label="文章标题" width="120" align="center">
            </el-table-column>
            <el-table-column prop="content" label="文章内容" width="120" align="center">
            </el-table-column>
            <el-table-column label="所属标签" width="120" align="center">
                <template slot-scope="scope">
                    <div v-if="scope.row.tags.length === 0">未分类</div>
                    <el-tag v-for="(tag,index) in scope.row.tags" :key="index" v-else>  
                        {{tag}}
                    </el-tag>
                    <!-- <div>{{scope.row.tags | tags}}</div> -->
                </template>
            </el-table-column>
            <el-table-column  label="创建时间" width="180" align="center">
                <template slot-scope="scope">
                    <div>{{scope.row.created_at}}</div>
                </template>
            </el-table-column>
            <el-table-column label="最近更新" width="120" align="center">
                <template slot-scope="scope">
                    <div>{{scope.row.updated_at | timeAgo}}</div>
                </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="100" align="center">
                <template slot-scope="scope">
                    <el-button @click="del(scope.row.id)" type="text" size="small">删除</el-button>
                    <el-button type="text" size="small" @click="$router.push('/edit/'+scope.row.id)">编辑</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-row type="flex" justify="center" class="pagenation">
            <el-pagination background layout="prev, pager, next" 
            :current-page=page  
            :page-count="pageNum" 
             @current-change="handleCurrentChange">
            </el-pagination>
        </el-row>   
    </div>
</template>

<script>
    //import store
    
    import {mapGetters, mapActions, mapMutations} from 'vuex'
    import * as filters from '../until/filters'
    export default {
        data() {
            return {
                pageNum: 0,
                page: 0,
            }
        },
        filters: {
            timeAgo: filters.timeAgo,
            // tagFilter(tag) {
            //     if (tag === '') {
            //         console.log('tag：' + tag)
            //         return "未归类"
            //     }
            // }
        },
        computed: {
            ...mapGetters({
                articleLists: 'articleLIst',
                currentPage: 'currentPage'
            })
        },
        created() {
            this.page = Number(sessionStorage.getItem('current-page') || 1);
            console.log('page: '+ this.page)
        },
        mounted() {
            this.getData(); 
        },
        methods: {
            getData() {
                this.$store.dispatch('loadList',this.page);
                this.pageNum = this.articleLists.pageNum;
            },
            handleClick() {

            },
            del(id) {
                this.$confirm('此操作将永久删除该文章, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$http.post('/api/article/delete', {id: id}).then(res => {
                        if (res.data.status) {
                            this.$message({
                                type: 'success',
                                message: '删除成功!',
                                center: true
                            });
                            this.getData();
                        } else {
                             this.$message({
                                showClose: true,
                                message: '错了哦，请稍后再试',
                                type: 'error',
                                center: true
                            });
                        }
                    })   
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            handleCurrentChange(page) {
                this.page = page;
            //    this.$store.commit('CURRENT_PAGE', page);
               sessionStorage.setItem('current-page', page)
               this.getData(); 
            }
        }
    }
</script>

<style scoped src="../../node_modules/_bootstrap@4.1.1@bootstrap/dist/css/bootstrap.min.css">
  
</style>

<style scoped>
    .cover {
        display: inline-block;
        width: 80px;
        height: 80px;
    }
     .th-pagination {
		width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
	}
    .pagenation {
        margin-top: 15px;
    }
</style>