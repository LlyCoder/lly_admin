<template>
    <div>
        <el-form :label-position="labelPosition" :model="formInput">
            <el-form-item label="标签名称">
                <el-input v-model="formInput.name"></el-input>
            </el-form-item>
            <el-form-item label="封面上传">
                <el-upload class="upload-demo" action="https://webblog.yolostudio.cn/api/file/upload" :on-remove="handleRemove" list-type="picture"
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
    export default {
        data() {
            return {
                labelPosition: 'top',
                formInput: {
                    name: '',
                    description: '',
                    cover: ' '
                }
            }
        },
        computed: {
            headers() {
                return {
                    'Authorization': 'Bearer ' + this.$store.state.access_token
                }
            }
        },
        methods: {
            backCoverSrc(response, file, fileList) {
                this.formInput.cover = response.data;
            },
            handleRemove() {

            },
            submit() {
                this.$http.post(`/api/tags/save`, {
                    name: this.formInput.name,
                    cover: this.formInput.cover,
                    description: this.formInput.description
                }).then(res => {
                    if (res.data.status) {
                        this.$message({
                            message: '增添标签成功',
                            type: 'success',
                            center: true
                        });
                        this.$router.push('/taglist');
                    } else {
                        this.$message.error('错了哦');
                    }
                }).catch(err => {
                    console.log(err)
                })
            },
        }
    }
</script>

<style scoped>

</style>