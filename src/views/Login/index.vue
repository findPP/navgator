<template>
    <div class="login">
        <div class="login_bg"></div>
        <div class="login_stars"></div>
        <div class="login_box">
            <div class="login_box_log" v-show="!showRegister">
                <div class="flrg">
                    <h3>登录21321</h3>
                    <div class="login_input">
                        <span>账号:</span>
                        <input type="text" v-model="unumber" placeholder="请输入账号" />
                    </div>
                    <div class="login_input">
                        <span>密码:</span>
                        <input type="password" v-model="pwd" placeholder="请输入密码" />
                    </div>
                    <div class="login_input">
                        <button type="button" @click="login">登录</button>
                    </div>
                    <div class="login_input login_tips">
                        <!-- <span>忘记密码？</span> -->
                        <span class="register" @click="showRegister = !showRegister">注册账号</span>
                    </div>
                </div>
            </div>
            <div class="login_box_log login_box_register" v-show="showRegister">
                <div class="flrg">
                    <h3>
                        <i class="el-icon-back" @click="showRegister = !showRegister"></i>
                        <span>注册</span>
                    </h3>
                    <div class="login_input">
                        <span>账号:</span>
                        <input type="text" v-model="unumber" placeholder="您的用户名" />
                    </div>
                    <div class="login_input">
                        <span>密码:</span>
                        <input type="password" v-model="pwd" placeholder="输入密码" />
                    </div>
                    <div class="login_input">
                        <span>确认密码:</span>
                        <input type="password" v-model="pwds" placeholder="再次确认密码" />
                    </div>
                    <div class="login_input">
                        <span>手机号:</span>
                        <input type="text" v-model="phone" placeholder="输入手机号码" />
                    </div>
                    <div class="login_input">
                        <span>邮箱:</span>
                        <input type="email" v-model="email" placeholder="输入邮箱地址" />
                    </div>
                    <div class="login_input login_btn">
                        <button type="button" @click="register">确定</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
const EmailExp = new RegExp(/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/);
const TelExp = new RegExp(/^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\d{8}$/);
import md5 from 'md5';
import Api from '@/api/index.js';
import { state, mutations } from '@/store/index';
export default {
    data() {
        return {
            uname: '',
            pwd: '',
            email: '',
            phone: '',
            sex: '',
            unumber: '',
            input: '',
            pwds: '',
            showRegister: false,
        };
    },
    methods: {
        
        login() {
            if (this.unumber === '') {
                this.$message.warning('账号不能为空');
                return;
            }
            if (this.pwd === '') {
                this.$message.warning('密码不能为空');
                return;
            }
            let params = {
                unumber: md5(this.unumber),
                pwd: md5(this.pwd),
            };
            console.log(params)
            Api.login(params).then(res => {
                if (res.data.message == '登陆成功') {
                    this.$message.success('登陆成功');
                    sessionStorage.setItem('token', res.data.token);
                    mutations.saveUserData(res.data.userMessage);
                    this.$router.push('/navPage');
                } else {
                    this.$message.warning(res.data.message);
                }
            });
        },
        register() {
            if(this.unumber === ''){
                this.$message.warning('账号不能为空');
                return
            }
            if(this.pwd === ''){
                this.$message.warning('密码不能为空');
                return
            }
            if(this.pwd !== this.pwds){
                this.$message.warning('两次输入密码不相同');
                return
            }
            let params = {
                uname: this.uname,
                unumber: md5(this.unumber),
                email: this.email,
                sex: this.sex,
                phone: this.phone,
                pwd: md5(this.pwd),
            };
            Api.register(params).then(res => {
                if (res.data.message === '注册成功') {
                    sessionStorage.setItem('token', res.data.token);
                    mutations.saveUserData(res.data.userMessage);
                    this.$router.push('/navPage');
                }
                if (res.data.message === '该用户已存在') {
                    this.$message.info('该用户已存在');
                }
            });
        },
    },
};
</script>

<style lang="scss">
.login {
    width: 100vw;
    height: 100vh;
    position: relative;
    .login_bg {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        background: url('../../assets/background.jpeg') 50% 50% no-repeat;
        background-size: cover;
    }
    .login_stars {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        background: url('../../assets/midground.png');
        -webkit-animation: mygit 100s linear infinite;
        -o-animation: mygit 100s linear infinite;
        animation: mygit 100s linear infinite;
    }
    .login_box {
        .login_box_log {
            position: absolute;
            overflow: hidden;
            top: 25%;
            left: 50%;
            transform: translate(-50%, 0);
            .flrg {
                width: 400px;
                background: rgba(255, 255, 255, 0.6);
                text-align: center;
                -webkit-border-radius: 4px;
                -moz-border-radius: 4px;
                border-radius: 4px;
                box-sizing: border-box;
                padding: 15px;
                .login_input {
                    padding: 10px;
                    input {
                        outline: none;
                        opacity: 0.6;
                        width: 238px;
                        height: 33px;
                        border: none;
                        -webkit-border-radius: 3px;
                        -moz-border-radius: 3px;
                        border-radius: 3px;
                        font-size: 16px;
                        color: black;
                        padding-left: 15px;
                    }
                    button {
                        width: 91%;
                        padding: 10px;
                        border: none;
                        -webkit-border-radius: 10px;
                        -moz-border-radius: 10px;
                        border-radius: 10px;
                        cursor: pointer;
                        -webkit-box-shadow: 0 0 19px rgba(0, 0, 0, 0.1);
                        -moz-box-shadow: 0 0 19px rgba(0, 0, 0, 0.1);
                        box-shadow: 0 0 19px rgba(0, 0, 0, 0.1);
                        background: rgba(6, 127, 228, 0.71);
                        color: white;
                        font-weight: bold;
                        letter-spacing: 12px;
                        text-align: center;
                        outline: none;
                        -webkit-transition: all 2s;
                        -moz-transition: all 2s;
                        -ms-transition: all 2s;
                        -o-transition: all 2s;
                        transition: all 2s;
                        &:hover {
                            -webkit-box-shadow: 0 15px 30px 0 rgba(255, 255, 255, 0.15) inset, 0 2px 7px 0 rgba(0, 0, 0, 0.2);
                            -moz-box-shadow: 0 15px 30px 0 rgba(255, 255, 255, 0.15) inset, 0 2px 7px 0 rgba(0, 0, 0, 0.2);
                            box-shadow: 0 15px 30px 0 rgba(255, 255, 255, 0.15) inset, 0 2px 7px 0 rgba(0, 0, 0, 0.2);
                        }
                    }
                    span {
                        margin-right: 15px;
                        font-weight: bold;
                        color: #545454;
                        cursor: pointer;
                        user-select: none;
                    }
                    &.login_tips {
                        span {
                            text-decoration: none;
                            font-weight: bold;
                            color: #545454;
                        }
                    }
                }
            }
            &.login_box_register {
                .flrg {
                    .login_input {
                        span {
                            display: inline-block;
                            width: 70px;
                            text-align: right;
                        }
                    }
                    h3 {
                        position: relative;
                        .el-icon-back {
                            cursor: pointer;
                            position: absolute;
                            top: 50%;
                            left: 0;
                            font-size: 26px;
                            transform: translate(0, -50%);
                        }
                    }
                }
            }
        }
    }
}
/*荧光点点*/
@keyframes mygit {
    0% {
        background-position: 0 0;
        /*transform: translateY(0px);*/
    }
    100% {
        background-position: 0 -600%;
    }
}
@-o-keyframes mygit {
    0% {
        background-position: 0 0;
        /*transform: translateY(0px);*/
    }
    100% {
        background-position: 0 -600%;
    }
}
@-moz-keyframes mygit {
    0% {
        background-position: 0 0;
        /*transform: translateY(0px);*/
    }
    100% {
        background-position: 0 -600%;
    }
}
@-ms-keyframes mygit {
    0% {
        background-position: 0 0;
        /*transform: translateY(0px);*/
    }
    100% {
        background-position: 0 -600%;
    }
}
@-webkit-keyframes mygit {
    0% {
        background-position: 0 0;
        /*transform: translateY(0px);*/
    }
    100% {
        background-position: 0 -600%;
    }
}
</style>