<template>
    <div class="form-warrp"> 
        <el-form :label-position="labelPosition"  :model="formInput">
            <el-form-item label="文章标题">
                <el-input v-model="formInput.title"></el-input>
            </el-form-item>
            <el-form-item label="文章作者">
                <el-input v-model="formInput.author"></el-input>
            </el-form-item>
            <!-- 通过尺寸控制是否启用富文本 -->
            <el-form-item label="编辑内容" v-show="!device.isMobile">
                <div ref="editor" class="editor_diy" name="file"></div>
            </el-form-item>
            <el-form-item label="编辑内容" v-show="device.isMobile">
                <el-input type="textarea" v-model="formInput.content" rows="4"></el-input>
            </el-form-item>
        </el-form>
        <el-row type="flex" justify="center">
            <el-button type="primary" round @click="submit">提交</el-button>
        </el-row>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    import E from 'wangeditor'

    export default {
        data() {
            return {
                labelPosition: 'top',
                num:  '123456',
                // editorContent: '',
                formInput: {
                    title: '',
                    author: '',
                    content: ''
                }
            }
        },
        computed: {
            ...mapGetters({
                sidebar: 'sidebar',
                device: 'device'
            })
        },
        mounted() {
            var editor = new E(this.$refs.editor)
            editor.customConfig.onchange = (html) => {
                this.formInput.content = html
            }
            editor.customConfig.uploadImgServer = 'http://127.0.0.1:3000/articles/uploads';
            editor.customConfig.uploadFileName = 'uploadImg';
            editor.create()
        },
        methods: {
            submit() {
                const num = this.num;
                this.$http.post(`/article/save/${num}`, {
                    author: this.formInput.author,
                    content: this.formInput.content,
                    number: num,
                    title: this.formInput.title
                }).then(res => {
                    if (res.data.status) {
                        this.$message({
                            message: '发布文章成功',
                            type: 'success',
                            center: true
                        });
                        this.$router.push('/articleList');
                    } else {
                        this.$message.error('错了哦');
                    }
                }).catch(err => {
                    console.log(err)
                })
            }
        }
    }
</script>

<style scoped>
   
</style>