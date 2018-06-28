<template>
    <div>
        <form>
            <div class="form-group">
                <label for="exampleFormControlInput1">标题</label>
                <input type="text" class="form-control" v-model="detail.title">
            </div>
            <div class="from-group" v-show="!device.isMobile">
                <label for="exampleFormControlTextarea1">内容</label>
                <div ref="editor" class="editor_diy" name="file">
                    <p v-html="this.detail.content"></p>
                </div>
            </div>
            <div class="form-group" v-show="device.isMobile">
                <label for="exampleFormControlTextarea1">内容</label>
                <textarea class="form-control" rows="5" v-model="detail.content"></textarea>
            </div>
            <button type="submit" class="btn btn-primary" @click="submit">修改</button>
        </form>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    import E from 'wangeditor'
    export default {
        data() {
            return {
                articleId: this.$route.params.id,
                detail: {
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
                let num = this.num;
                let articleId = this.articleId;
                if(articleId) {
                    this.$http.get(`/api/article/detail/${articleId}`).then(res => {
                        this.detail = res.data.data;
                    })
                }
            },
            submit() {
                const num = this.num;
                this.$http.post(`/article/save/${num}`, {
                    author: this.detail.author,
                    content: this.detail.content,
                    id: this.articleId,
                    number: num,
                    title: this.detail.title
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
                    console.log(err)
                })
            }
        }
    }
</script>

<style scoped src="../../node_modules/_bootstrap@4.1.1@bootstrap/dist/css/bootstrap.min.css">

</style>