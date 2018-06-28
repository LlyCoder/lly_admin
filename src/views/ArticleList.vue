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
                    <div>{{scope.row.tags | tags}}</div>
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
                    <el-button @click="handleClick(scope.row)" type="text" size="small">删除</el-button>
                    <el-button type="text" size="small" @click="$router.push('/edit/'+scope.row.id)">编辑</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    //import store
    import {mapGetters, mapActions, mapMutations} from 'vuex'
    import * as filters from '../until/filters'
    export default {
        data() {
            return {
                page: '1',
            }
        },
        filters: {
            timeAgo: filters.timeAgo,
            tags(tags) {
                if (tags.length === 0) {
                    return "未归类"
                } else {

                }
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
            },
            handleClick() {

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
</style>