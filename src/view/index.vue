<template>
    <div class="upload">
        <div class="el-upload__tip">{{ placeholder }}</div>

        <el-upload
            v-if="listType == 'picture'"
            class="upload-demo"
            :data="uploadData"
            :action="action"
            :http-request="onUpload"
            :multiple="multiple"
            :limit="limit"
            :drag="drag"
            :disabled="disabled"
            :before-upload="beforeUploadHandler"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :on-exceed="handleExceed"
            :file-list="currentValue"
            :on-change="onUpload"
            :on-success="onSuccess"
            list-type="picture">
            <el-button v-show="!limit || limit > currentValue.length" size="small" type="primary">点击上传</el-button>
        </el-upload>

        <template v-else-if="listType == 'picture-card'">
            <el-upload
                :class="[{'hide-btn': limit && limit === currentValue.length}, {'hide-btn': hideBtn}, 'demo']"
                list-type="picture-card"
                :data="uploadData"
                :multiple="multiple"
                :action="action"
                :http-request="onUpload"
                :limit="limit"
                :drag="drag"
                :disabled="disabled"
                :before-upload="beforeUploadHandler"
                :on-change="onUpload"
                :on-success="onSuccess"
                :on-preview="handlePreview"
                :on-exceed="handleExceed"
                :file-list="currentValue"
                :on-remove="handleRemove">
                <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
        </template>

        <el-upload
            v-else
            class="upload-demo"
            :data="uploadData"
            :action="action"
            :http-request="onUpload"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :multiple="multiple"
            :limit="limit"
            :before-upload="beforeUploadHandler"
            :on-change="onUpload"
            :on-success="onSuccess"
            :on-exceed="handleExceed"
            :file-list="currentValue"
            :disabled="disabled">
            <div v-show="!limit || limit > currentValue.length" class="el-upload--picture-card">
                <i class="el-icon-plus"></i>
            </div>
            <!--<el-button size="small" type="primary">点击上传</el-button>-->
        </el-upload>

        <el-dialog :visible.sync="previewer.visible">
            <img style="width: 100%" :src="previewer.img">
        </el-dialog>
    </div>
</template>

<script type="text/babel">
export default {
    name: 'zzuUpload',
    props: {
        value: Array, // 图片列表
        url: { // 图片上传地址
            type: String,
            default: ''
        },
        maxSize: {
            type: Number,
            default: 5000
        },
        modCode: {
            type: String, // UDC_M00_T01
            default: 'UDC_M00_T01'
        },
        multiple: {
            type: Boolean,
            default: false
        },
        drag: {
            type: Boolean,
            default: false
        },
        listType: { // text/picture/picture-card 具体参考element
            type: String,
            default: 'picture-card'
        },
        disabled: {
            type: Boolean,
            default: false
        },
        limit: Number,
        onExceed: Function,
        placeholder: String,
        uploadData: {
            type: Object,
            default: function () {
                return {
                    filetype: 0
                };
            }
        },
        action: {
            type: String,
            default: 'api'
        },
        hideBtn: {
            type: Boolean,
            default: false
        }
    },
    data () {
        return {
            dialogVisible: false,
            dialogImageUrl: '',
            // uploadData: {
            //     token: ''
            // },
            currentValue: this.value ? this.value : [],
            previewer: {
                visible: false,
                img: ''
            },
            imgBaseUrl: '',
            pdfThumbnail: require('../assets/images/pdf.png')
        };
    },
    watch: {
        'value': {
            handler (newValue, oldValue) {
                this.setCurrentValue(newValue);
            },
            deep: true
        },
        'currentValue': {
            handler (newValue, oldValue) {
                console.log(newValue);
                this.$emit('input', newValue);
            },
            deep: true
        },
        showBtn (newValue, oldValue) {
            if (!newValue) {
            }
        }
    },
    created () {
        this.imgBaseUrl = process.env.API_ROOT_MAIN + '/trade/v1/companies/images?filePath=';
    },
    methods: {
        // 上传之前钩子函数
        beforeUploadHandler (file) {
            if ((this.listType === 'picture' || this.listType === 'picture-card') && file.type !== 'image/png' && file.type !== 'image/jpeg' && file.type !== 'image/jpg' && file.type !== 'application/pdf') {
                this.$message({
                    showClose: true,
                    message: `文件扩展名错误`,
                    type: 'error'
                });
                return false;
            }
            // if(file.size > this.maxSize * 1024) {
            //     this.$message({
            //         showClose: true,
            //         message: `文件大小不能超过${ this.maxSize | this.kbTrans }`,
            //         type: 'error'
            //     });
            //     return false
            // }
        },
        handleRemove (file, fileList) {
            // 删除
            this.$emit('remove', file);
            this.setCurrentValue(fileList);
        },
        handlePreview (file) {
            console.log(file.filePath);
            // 点击文件列表中已上传的文件时的钩子
            if (file.filePath.indexOf('.pdf') === -1) {
                this.previewer.visible = true;
                this.previewer.img = file.filePath;
            } else {
                window.open(file.filePath, '_blank');
            }
        },
        setCurrentValue (value) {
            // 设置当前值
            if (value === this.currentValue) return;
            this.currentValue = value;
        },
        onUpload (file) {
            let formData = new FormData();
            let headers = {
                'Content-Type': 'multipart/form-data'
            };
            formData.append('file', file.file);
            formData.append('storage', 'platform-mgmt');
            this.$http.post(this.url || this.$api.account.upload, formData, headers)
                .then(res => {
                    if (res.data && res.data.code !== 500) {
                        let path;
                        path = (res.data.indexOf('.pdf') === -1) ? res.data : this.pdfThumbnail;
                        this.currentValue.push({
                            name: file.file.name,
                            fileType: file.data && file.data.filetype,
                            filePath: res.data,
                            url: path
                        });
                    }
                });
        },
        onSuccess (file, fileList) {
            // 上传成功
            console.log(file);
            fileList = [];
        },
        handlePictureCardPreview () {

        },
        handleExceed (files, fileList) {
            this.$message.warning(`当前限制选择 ${this.limit} 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
        }
    }
};
</script>

<style lang="scss">
    .upload {
        .hide-btn {
            .el-upload--picture-card {
                display: none !important; // 外部因数影响造成
            }
        }
    }
</style>

<style scoped lang="scss">
    .el-dialog__wrapper {
        text-align: center;
    }

</style>
