<template>
    <div class="form-warrp"> 
        <el-form :label-position="labelPosition"  :model="formInput">
            <el-form-item label="文章标题">
                <el-input v-model="formInput.title"></el-input>
            </el-form-item>
            <el-form-item label="封面上传">
                <el-upload class="upload-demo" action="https://webblog.yolostudio.cn/api/file/upload" :on-remove="handleRemove"
                    list-type="picture"
                    :headers=headers
                    :limit="1"
                    :on-success="backCoverSrc">
                    <el-button size="small" type="primary">点击上传</el-button>
                </el-upload>
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
                // editorContent: '',
                formInput: {
                    title: '',
                    content: '',
                    articleCover: '',
                    checkTags: []
                }
            }
        },
        computed: {
            ...mapGetters({
                sidebar: 'sidebar',
                device: 'device'
            }),
            headers() {
                return {
                    'Authorization': 'Bearer ' + this.$store.state.access_token
                }
            }
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
                this.$http.post(`/api/article/save`, {
                    content: this.formInput.content,
                    title: this.formInput.title,
                    cover: this.formInput.articleCover,
                    tags: this.formInput.checkTags
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
            },
            backCoverSrc(response, file, fileList) {
                console.log(response)
                this.formInput.articleCover = response.data;
            },
            handleRemove(file, fileList) {

            }
        }
    }
</script>

<style scoped>
   
</style>