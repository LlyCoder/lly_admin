<template>
    <div>
        <el-form :label-position="labelPosition" :model="detail">
            <el-form-item label="文章标题">
                <el-input v-model="detail.title"></el-input>
            </el-form-item>
            <el-form-item label="封面上传">
                <el-upload class="upload-demo" action="https://webblog.yolostudio.cn/api/file/upload" :on-remove="handleRemove" list-type="picture"
                    :headers=headers :limit="1" 
                    :file-list="fileList"
                    :on-success="backCoverSrc">
                    <el-button size="small" type="primary">点击上传</el-button>
                </el-upload>
            </el-form-item>
            <!-- 通过尺寸控制是否启用富文本 -->
            <el-form-item label="编辑内容" v-show="!device.isMobile">
                <div ref="editor" class="editor_diy" name="file">
                    <p v-html="detail.content"></p>
                </div>
            </el-form-item>
            <el-form-item label="编辑内容" v-show="device.isMobile">
                <el-input type="textarea" v-model="detail.content" rows="4"></el-input>
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
                articleId: this.$route.params.id,
                detail: {
                    title: '',
                    author: '',
                    content: '',
                    tags: []
                },
                fileList:[]
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
            this.init();
            var editor = new E(this.$refs.editor)
            editor.customConfig.onchange = (html) => {
                this.detail.content = html
            }
            editor.customConfig.uploadImgServer = 'http://127.0.0.1:3000/articles/uploads';
            editor.customConfig.uploadFileName = 'uploadImg';
            editor.create()
        },
        methods: {
            init() {
                let articleId = this.articleId;
                if(articleId) {
                    this.$http.get(`/api/article/detail/${articleId}`).then(res => {
                        this.detail = res.data.data;
                        this.fileList.push({url: res.data.data.cover})
                    })
                }
            },
            submit() {
                this.$http.post(`/api/article/save`, {
                    content: this.detail.content,
                    cover: this.fileList[0].url,
                    id: this.articleId,
                    title: this.detail.title,
                    tags: this.detail.tags
                }).then(res => {
                    if (res.data.status) {
                        this.$message({
                            message: '修改成功',
                            type: 'success'
                        });
                        this.$router.push('/articleList');
                    } else {
                        this.$message.error('错了哦');
                    }
                }).catch(err => {
                    if (err.response.status === 500) {
                        this.$message.error('错了哦，有选项尚未填写');
                    } else {
                        this.$message.error('错了哦，请稍后再试');
                    }
                    
                })
            },
            backCoverSrc(response, file, fileList) {
                console.log(response)
                this.fileList = [{url: response.data}];
            },
            handleRemove(file, fileList) {
                this.fileList.pop();
            }
        }
    }
</script>

<style scoped src="../../node_modules/_bootstrap@4.1.1@bootstrap/dist/css/bootstrap.min.css">

</style>