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
    export default {
        data() {
            return {
                labelPosition: top,
                formInput: {
                    name: '',
                    description: '',
                },
                fileList: []
            }
        },
        computed: {
            headers() {
                return {
                    'Authorization': 'Bearer ' + this.$store.state.access_token
                }
            }
        },
        created() {
            this.init()
        },
        methods: {
            init() {
                
            }
        }
    }
</script>

<style scoped>
</style>