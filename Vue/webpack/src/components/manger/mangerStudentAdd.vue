<template>
    <div>
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="学生姓名">
                <el-input v-model="form.mname"></el-input>
            </el-form-item>
            <el-form-item label="班级">
                <el-select v-model="form.cname" placeholder="请选择">
                    <el-option
                            v-for="item in options"
                            :key="item.cid"
                            :label="item.cname"
                            :value="item.cname">
                    </el-option>
                </el-select>
            </el-form-item >

            <el-form-item>
                <el-button type="primary" @click="subimt(form)">添加</el-button>
            </el-form-item>
        </el-form>
        <el-form ref="form" label-width="80px"
                 style="padding:40px 30px 20px 20px;background: #ffffff;border-radius: 5px;box-shadow: 0 0 5px rgba(0,0,0,0.5)">
            <el-form-item label="姓名">
                <div @drop="_drop" @dragenter="_suppress" @dragover="_suppress">
                    <input type="file" class="form-control" id="file" :accept="SheetJSFT" @change="_change" />
                </div>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmitAll">提交</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
    const _XLSX = require('xlsx');
    const X = typeof XLSX !== 'undefined' ? XLSX : _XLSX;
    const make_cols = refstr => Array(X.utils.decode_range(refstr).e.c + 1).fill(0).map((x,i) => ({name:X.utils.encode_col(i), key:i}));
    /* see Browser download file example in docs */
    function s2ab(s) {
        const buf = new ArrayBuffer(s.length);
        const view = new Uint8Array(buf);
        for (let i=0; i!=s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
        return buf;
    }
    const _SheetJSFT = [
        "xlsx", "xlsb", "xlsm", "xls", "xml", "csv", "txt", "ods", "fods", "uos", "sylk", "dif", "dbf", "prn", "qpw", "123", "wb*", "wq*", "html", "htm"
    ].map(function(x) { return "." + x; }).join(",");
    export default {
        data(){
            return{
                form:{
                },
                options:[

                ],
                cname:'',
                data:[],
                SheetJSFT: _SheetJSFT
            }
        },
        methods:{
            subimt(form){
                this.$http.post('/home/StudentAdd.php',this.form).then(res=>{
                    if(res.body=='yes'){
                        this.$message({
                            message: '添加成功',
                            type: 'success'
                        });
                        this.$router.push('mangerStudent');
                    }else if(res.body=='no'){
                        this.$message({
                            message: '添加失败',
                            type: 'warning'
                        });
                    }
                })
            },
            onSubmitAll(){
                this.$http.post('/home/StudentAddAll.php',{data:this.data}).then(res=>{
                    if (res.body == 'yes') {
                        this.$message({
                            message: '插入成功',
                            type: 'success'
                        });
                        this.$router.push('manageStudent');
                    } else if (res.body == 'no') {
                        this.$message({
                            message: '插入失败',
                            type: 'warning'
                        });
                    }
                })
            },
            _suppress(evt) { evt.stopPropagation(); evt.preventDefault(); },
            _drop(evt) {
                evt.stopPropagation(); evt.preventDefault();
                const files = evt.dataTransfer.files;
                if(files && files[0]) this._file(files[0]);
            },
            _change(evt) {
                const files = evt.target.files;
                if(files && files[0]) this._file(files[0]);
            },
            _export(evt) {
                /* convert state to workbook */
                const ws = X.utils.aoa_to_sheet(this.data);
                const wb = X.utils.book_new();
                X.utils.book_append_sheet(wb, ws, "SheetJS");
                /* generate X file */
                const wbout = X.write(wb, {type:"binary", bookType:"xlsx"});
                /* send to client */
                saveAs(new Blob([s2ab(wbout)],{type:"application/octet-stream"}), "sheetjs.xlsx");
            },
            _file(file) {
                /* Boilerplate to set up FileReader */
                const reader = new FileReader();
                reader.onload = (e) => {
                    /* Parse data */
                    const bstr = e.target.result;
                    const wb = X.read(bstr, {type:'binary'});
                    /* Get first worksheet */
                    const wsname = wb.SheetNames[0];
                    const ws = wb.Sheets[wsname];
                    /* Convert array of arrays */
                    const data = X.utils.sheet_to_json(ws, {header:1});
                    /* Update state */
                    this.data = data.slice(1);
                    this.cols = make_cols(ws['!ref']);
                };
                reader.readAsBinaryString(file);
            },
        },


        mounted(){
            this.$http.post('/home/mangerClass.php').then(res=>{
                this.options=res.body;

            })
        }
    }
</script>
<style>

</style>