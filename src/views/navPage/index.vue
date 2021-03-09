<template>
    <div class="nav_page">
        <div class="nav_page_header"></div>
        <div class="nav_page_box">
            <ul class="clearfix">
                <li v-for="item in urlList" :key="item._id">
                    <div class="nav_list_box" :title="item.title">
                        <div @click.stop="openUrl(item)">
                            <div class="nav_list_box_img">
                                <img :src="item.imgUrl" alt="" />
                            </div>
                            <div class="nav_list_box_text">{{ item.title }}</div>
                            <div class="nav_list_delete el-icon-circle-close" @click.stop="deleteUrl(item._id)"></div>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <div class="page-change">
            <el-pagination background layout="prev, pager, next" :total="total" @current-change="currentChange" :page-size="60"> </el-pagination>
        </div>
        <div class="nav_page_add" @click="dialogVisible = true">
            <span class="el-icon-plus"></span>
        </div>
        <el-dialog title="添加网址" :visible.sync="dialogVisible" width="60%" center class="element-dialog" :close-on-press-escape="false" :close-on-click-modal="false" @close="closeDialog">
            <div class="add_url_img">
                <span class="el-icon-plus" v-show="urlImg === ''"></span>
                <img v-show="urlImg !== ''" :src="urlImg" alt="可替换" />
                <input type="file" accept="image/*" @change="replaceImg" />
            </div>
            <div class="add_url_desc">
                <span>网址:</span>
                <el-input v-model.trim="urlInput" placeholder="请输入内容"></el-input>
                <span class="el-icon-refresh" @click="analysisUrl"></span>
            </div>
            <div class="add_url_title">
                <span>标题:</span>
                <el-input v-model.trim="urlTitle" placeholder="请输入内容"></el-input>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="addUserUrl">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import Api from '@/api/index.js';
import { state } from '@/store/index';
export default {
    data() {
        return {
            dialogVisible: false,
            urlInput: '',
            urlTitle: '',
            urlImg: '',
            userData: state.userData,
            pageData: {
                page: 0,
                size: 60,
            },
            urlList: [],
            tempFile: null,
            total:0,
        };
    },
    created() {
        this.getUrlList();
        // let str = 'http://www.mongoosejs.net/'
        // let test = new RegExp(/\/$/g)
        // if(test.test(str)){
        //     console.log(1)
        // }else{
        //     console.log(2)
        // }
    },
    methods: {
        closeDialog() {
            this.tempFile = null;
        },
        currentChange(page){
            this.pageData.page = page - 1;
            this.getUrlList()
        },
        replaceImg(e) {
            let file = e.target.files[0];
            let fileReader = new FileReader();
            fileReader.onload = () => {
                this.urlImg = fileReader.result;
            };
            if (file) {
                fileReader.readAsDataURL(file);
            }
            this.tempFile = file;
        },
        async getUrlList() {
            let params = {
                page: this.pageData.page,
                size: this.pageData.size,
                id: this.userData._id,
            };
            let res = await Api.getUrlList(params);
            console.log(res)
            this.urlList = res.data.data;
            this.total = res.data.total;
        },
        openUrl(item) {
            window.open(item.url);
        },
        async deleteUrl(urlId) {
            let params = {
                id: this.userData._id,
                urlId: urlId,
            };
            this.$confirm('确认删除该url？')
                .then(async () => {
                    let res = await Api.deleteUrl(params);
                    if (res.data.data === 'success') {
                        this.$message.success(res.data.message);
                        this.getUrlList();
                    }
                })
                .catch(_ => {
                    this.$message.success('删除失败');
                });
        },
        async analysisUrl() {
            if (this.urlInput === '') {
                this.$message.warning('请填写相关url');
                return;
            }
            let res = await Api.getUrlMessage({ url: this.urlInput, id: this.userData._id });
            console.log(res);
            if (res.data.data) {
                this.urlImg = res.data.data.icon;
                this.urlTitle = res.data.data.title;
            } else {
                this.$message.warning(res.data.message);
            }
        },
        async addUserUrl() {
            let params = {
                icon: this.urlImg,
                title: this.urlTitle,
                url: this.urlInput,
                id: this.userData._id,
            };
            let formData, res;
            if (this.tempFile) {
                formData = new FormData();
                formData.append('file', this.tempFile);
                res = await Api.addUserUrl(params, formData);
            } else {
                res = await Api.addUserUrl(params);
            }
            this.tempFile = null;
            if (res.data.data === 'success') {
                this.$message.success(res.data.message);
                this.getUrlList();
                this.dialogVisible = false;
                this.urlImg = '';
                this.urlInput = '';
                this.urlTitle = '';
            } else {
                this.$message.warning(res.data.message);
            }
        },
    },
};
</script>

<style lang="scss">
.nav_page {
    width: 100vw;
    height: 100vh;
    position: relative;
    .nav_page_box {
        width: 1200px;
        min-height: 80vh;
        margin: 0 auto;
        ul {
            li {
                float: left;
                .nav_list_box {
                    padding-top: 16px;
                    box-sizing: border-box;
                    position: relative;
                    border-radius: 4px;
                    width: 112px;
                    height: 112px;
                    &:hover {
                        background-color: rgba(32, 33, 36, 0.06);
                        div {
                            .nav_list_delete {
                                opacity: 1;
                            }
                        }
                    }
                    div {
                        cursor: pointer;
                        display: block;
                        .nav_list_box_img {
                            img {
                                width: 48px;
                                height: 48px;
                                margin: 0 auto 16px;
                                border-radius: 50%;
                                display: flex;
                                justify-content: center;
                                align-items: center;
                                background-color: rgb(241, 243, 244);
                            }
                        }
                        .nav_list_box_text {
                            user-select: none;
                            text-align: center;
                            width: 88px;
                            margin: 0 auto;
                            white-space: nowrap;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            font-weight: 500;
                            font-size: 12px;
                            height: 24px;
                            color: #333;
                            line-height: 24px;
                        }
                        .nav_list_delete {
                            opacity: 0;
                            position: absolute;
                            top: 8px;
                            right: 8px;
                            font-size: 18px;
                            cursor: pointer;
                        }
                    }
                }
            }
        }
    }
    .nav_page_header {
        width: 100%;
        height: 50px;
    }
    .page-change{
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .nav_page_add {
        width: 112px;
        height: 112px;
        background: rgb(241, 243, 244);
        border-radius: 4px;
        text-align: center;
        line-height: 112px;
        cursor: pointer;
        position: fixed;
        bottom: 50px;
        right: 50px;
        span {
            font-size: 38px;
            font-weight: 500;
            color: #999;
        }
    }
    .element-dialog {
        /deep/ .el-input {
            width: 80%;
        }
        .add_url_img {
            margin: 0 auto;
            width: 80px;
            height: 80px;
            background: rgb(222, 222, 222);
            text-align: center;
            cursor: pointer;
            position: relative;
            span {
                font-size: 25px;
                line-height: 80px;
            }
            img {
                display: block;
                width: 100%;
                height: 100%;
            }
            input {
                display: block;
                width: 100%;
                height: 100%;
                position: absolute;
                top: 0;
                left: 0;
                opacity: 0;
            }
        }
    }
}
</style>