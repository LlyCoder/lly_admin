<template>
    <div>
        <el-form :label-position="labelPosition" :model="formInput">
            <el-form-item label="标签名称">
                <el-input v-model="formInput.name"></el-input>
            </el-form-item>
            <el-form-item label="封面上传">
                <el-upload class="upload-demo" action="https://webblog.yolostudio.cn/api/file/upload" :on-remove="handleRemove" list-type="picture"
                    :file-list="fileList"
                    :headers=headers :limit="1" :on-success="backCoverSrc">
                    <el-button size="small" type="primary">点击上传</el-button>
                </el-upload>
            </el-form-item>
            <el-form-item label="标签简述">
                <el-input type="textarea" v-model="formInput.description" rows="4"></el-input>
            </el-form-item>
        </el-form>
        <el-row type="flex" justify="center">
            <el-button type="primary" round @click="submit">提交</el-button>
        </el-row>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    export default {
        data() {
            return {
                labelPosition: 'top',
                id: '',
                formInput: {
                    name: '',
                    description: '',
                },
                fileList: []
            }
        },
        computed: {
            ...mapGetters({
                tagDetail: 'tagDetail'
            }),
            headers() {
                return {
                    'Authorization': 'Bearer ' + this.$store.state.access_token
                }
            }
        },
        mounted() {
            this.init()
        },
        methods: {
            init() {
                let tagDetail = JSON.parse(this.tagDetail);
                console.log(JSON.parse(this.tagDetail));
                this.formInput.name = tagDetail.name;
                this.fileList = [{url: tagDetail.cover}];
                this.formInput.description = tagDetail.description;
                this.id = tagDetail.id;
            },
            backCoverSrc(response, file, fileList) {
                console.log(response)
                this.fileList = [{ url: response.data }];
            },
            handleRemove(file, fileList) {
                this.fileList.pop();
            },
            submit() {
                    this.$http.post(`/api/tags/save`, {
                    id:this.id,
                    name: this.formInput.name,
                    description: this.formInput.description,
                    cover: this.fileList[0].url
                }).then(res => {
                    if (res.data.status) {
                        this.$message({
                            message: '修改标签成功',
                            type: 'success',
                            center: true
                        });
                        this.$router.push('/taglist');
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
        }
    }
</script>

<style scoped>
</style>