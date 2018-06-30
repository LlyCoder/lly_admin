<template>
    <div>
        <el-table :data="list" border style="width: 100%">
            <el-table-column prop="id" label="#ID" width="130" align="center"> 
            </el-table-column>
            <el-table-column label="文章封面" width="150" align="center">
                <template slot-scope="scope">
                    <img :src="scope.row.cover" alt="封面" class="cover">
                </template>
            </el-table-column>
            <el-table-column  label="名称" width="120" align="center">
                <template slot-scope="scope">
                    <el-tag>{{scope.row.name}}</el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="description" label="简述" width="180" align="center">
            </el-table-column>
            <el-table-column label="创建时间" width="180" align="center">
                <template slot-scope="scope">
                    <div>{{scope.row.created_at}}</div>
                </template>
            </el-table-column>
            <el-table-column label="最近更新" width="120" align="center">
                <template slot-scope="scope">
                    <div>{{scope.row.updated_at}}</div>
                </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="100">
                <template slot-scope="scope">
                    <el-button @click="del(scope.row.id)" type="text" size="small">删除</el-button>
                    <el-button @click="toEdit(scope.row)" type="text" size="small">编辑</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    import {mapMutations } from 'vuex'
    import types from '../store/mutation-types'
    export default {
        data() {
            return {
                list: [],
                detail: {}
            }
        },
        created() {
            this.init();
        },
        methods: {
            ...mapMutations({
                currentTag: types.CURRENT_TAG
            }),
            init() {
                this.$http.get('/api/tags/list').then(res => {
                    if (res.data.data.length) {
                        this.list = res.data.data;
                    }
                }).catch(err => {
                    console.log(err)
                })
            },
            del(id) {
                this.$confirm('此操作将永久删除该标签, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$http.post('/api/tags/delete', { id: id }).then(res => {
                        if (res.data.status) {
                            this.$message({
                                type: 'success',
                                message: '删除成功!',
                                center: true
                            });
                            this.init();
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
            toEdit(detail) {
                this.$router.push('/editTag/' + detail.id);
                //一定要序列化数据，否则会保存成 [object object]
                detail = JSON.stringify(detail)
                // sessionStorage.setItem('tag-detail', detail)
                this.currentTag(detail);
                
            }
        }
    }
</script>

<style scoped>
    .cover {
        display: inline-block;
        width: 80px;
        height: 80px;
    }
</style>