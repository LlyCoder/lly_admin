<template>
    <div class="login-container">
        <el-container>
            <div class="title">管理员登录</div>
            <el-main>
                <el-form label-position="left" :model="loginForm">
                    <el-form-item>
                        <el-input v-model="loginForm.username"  prefix-icon="fa fa-id-card-o"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-input v-model="loginForm.password" 
                        prefix-icon="fa fa-key"
                        type="password"
                        @keyup.enter.native="login"></el-input>
                    </el-form-item>
                </el-form>
            </el-main>
            <el-footer>
                <el-row type="flex" justify="center">
                    <el-button type="primary" round @click="login">登录</el-button>
                </el-row>
            </el-footer>
        </el-container>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                loginForm: {
                    username: '',
                    password: ''
                }
            }
        },
        mounted() {

        },
        methods: {
            login() {
                const info = {
                    grant_type:  'password',
                    client_id: '3',
                    client_secret: 'he8rtcU6ceFlmiyf6fCilHfFaNyQkNLzfQPAw8KA',
                    username: this.loginForm.username,
                    password: this.loginForm.password,
                    scope: ''
                }
                this.$store.dispatch('createToken', info).then(res => {
                    if (res.data.access_token) {
                         this.$message({
                            message: '登录成功！',
                            type: 'success',
                            center: true
                        });
                        this.$router.push('/index');
                    }
                }).catch(err => {
                    console.log(err.response.status)
                    if (err.response.status === 401) {
                        this.$message({
                            showClose: true,
                            message: '登录出错，你的身份验证未通过',
                            type: 'error',
                            center: true
                        });
                    } else {
                       this.$message({
                            showClose: true,
                            message: '登录出错，请重新尝试',
                            type: 'error',
                            center: true
                        }); 
                    }
                    
                })
            }
        }
    }
</script>

<style>
    body {
        margin: 0;
    }
</style>
<style scoped>
    .login-container {
        background-color: #f5f7fc;
        margin: 0;
        padding: 0;
        overflow: hidden;
        height: 100vh;
    }
    .el-container {
        margin: 180px auto;
        background: #fff;
        width: 500px;
        border-radius: 5px;
        padding: 35px 35px 15px 35px;
        box-shadow: 0 0 25px #eaeaea;
    }
    .title {
        text-align: center;
        font-size: 25px;
        font-weight: 600;
        margin-bottom: 30px;
    }
    @media screen and (max-width: 800px) {
        .el-container {
            margin: 13rem auto;
            background: #fff;
            width: 25rem;
            border-radius: 5px;
            /* padding: 35px 35px 15px 35px; */
            box-shadow: 0 0 25px #eaeaea;
    }
        .title {
            font-size: 2rem;
            font-weight: bold;
            margin-bottom: 2rem;
        }
    }
    @media screen and (max-width: 400px) {
        .el-container {
            margin: 10rem auto;
            background: #fff;
            width: 20rem;
            border-radius: 5px;
            padding: 35px 35px 15px 35px;
            box-shadow: 0 0 25px #eaeaea;
        }
        .title {
            font-size: 1.3rem;
            font-weight: bold;
            margin-bottom: 1.3rem;
        }
    }
    
</style>