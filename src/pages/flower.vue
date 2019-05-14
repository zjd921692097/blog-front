
<template>
  <div class="my-div">
    <el-container>
      <el-main style="width:750px">
       
        <el-select
          v-model="onlineflowerId"
          placeholder="我的花卉"
          style="margin-left:30%;"
          @change="getFlowerPlan()"
        >
          <el-option
            v-for="item in tableDataOnlineFlower"
            :key="item.id"
            :label="item.flowerName"
            :value="item.id"
          ></el-option>
        </el-select>
        </br>
        <el-tag style=" margin-top:3%;">今日计划</el-tag>
        <el-steps :active="1" style=" margin-top:2%;" >
          <el-step :title="'步骤'+plan.stepnum" :description="plan.todo" v-for="plan in plans1.plansteps"></el-step>

        </el-steps>
        <el-tag style=" margin-top:3%;">明日计划</el-tag>
         <el-steps :active="1" style=" margin-top:2%;">
         <el-step :title="'步骤'+plan.stepnum" :description="plan.todo" v-for="plan in plans2.plansteps"></el-step>
        </el-steps>
        <el-tag style=" margin-top:3%;">后天计划</el-tag>
         <el-steps :active="1" style=" margin-top:2%;">
          <el-step :title="'步骤'+plan.stepnum" :description="plan.todo" v-for="plan in plans3.plansteps"></el-step>
        </el-steps>
      </el-main>
      <el-aside >
        <el-button style="margin-left: 0%;margin-top: 0%;" @click="centerDialogVisible = true">我要养花</el-button>
          <div>
        <el-dialog title="代养花卉" :visible.sync="centerDialogVisible" width="70%" center>
          <el-form>
            <el-form-item label="花名" :label-width="formLabelWidth" style="margin-left:20%;">
              <el-select placeholder="请选择" v-model="OnlineFlowerParam.flowerid" style="margin-left:5%;">
                <el-option
                  v-for="item in flowers"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
              <el-form-item label="已养殖天数" :label-width="formLabelWidth" style="margin-left:0%;margin-top:5%;">
                      <el-col :span="7" style="margin-left:0%">
                        <el-input v-model="OnlineFlowerParam.useday" auto-complete="off" ></el-input>
                      </el-col>
                    </el-form-item>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="centerDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="addOnlineFlower()">确 定</el-button>
          </span>
        </el-dialog>
      </div>
      </el-aside>
    </el-container>
  </div>
</template>
<script>
  import $ from 'jquery'
  export default {
    data() {
      return {
        centerDialogVisible: false,
        centerDialogVisible2: false,
        items: '',
        statistic:'',
        tableData: [],
        tableType: [],
        currentDate: new Date(),
        flowers:'',
       
        onlineflower: {
          id: null,
          useday: null,
          flowerid: null,
        },
        OnlineFlowerParam: {
        flowerid: "",
        flowerName: "",
        useday:"",
        options: [
          {
            value: "1",
            label: "1"
          },
          {
            value: "2",
            label: "2"
          },
          {
            value: "3",
            label: "3"
          },
          {
            value: "4",
            label: "4"
          },
          {
            value: "5",
            label: "5"
          }
        ]
      },
        tableDataOnlineFlower: [],
        plans1:[],
        plans2:[],
        plans3:[],
        onlineflowerId:'',
        result:'',
       

      };
    },
    methods: {
      addOnlineFlower(){
        var self=this;
         $.ajax({
                url: 'http://10.10.102.60:18083/foster/addOnlineFlower',
                type: 'post',
                dataType: "text",
                data:self.OnlineFlowerParam,
                async: false,
                xhrFields: {
                  withCredentials: true
                },
                crossDomain: true,
                success: function(data) {
                  data = JSON.parse(data)
                  self.result = data;
                  console.log(2132)
                  if (self.result.success === false) {
              return self.$message.warning('please login', {
                data: self.data
              })
            }
            if (self.result.success === true) {
              self.centerDialogVisible = false;
              self.$message.warning('添加成功', {
                data: self.data
              })
             
            }
            
                },
                error: function(data) {
                  //TODO 失败
                  console.log("error", data)
                }
              })
      },
      getFlowerPlan(){
        var self=this;
        self.onlineflower.id=self.onlineflowerId;
         $.ajax({
                url: 'http://10.10.102.60:18083/foster/getFlowerPlan',
                type: 'post',
                dataType: "text",
                data:self.onlineflower,
                async: false,
                xhrFields: {
                  withCredentials: true
                },
                crossDomain: true,
                success: function(data) {
                  data = JSON.parse(data)
                  console.log(data)
                  self.plans1 = data.data[0]
                  self.plans2 = data.data[1]
                  self.plans3 = data.data[2]
                  console.log("abc", self.tableData)
                },
                error: function(data) {
                  //TODO 失败
                  console.log("error", data)
                }
              })

      },
   
      
      
      
    },
    created: function() {
      var self = this;
      console.log("woshizhu")
      $.ajax({
      url: "http://10.10.102.60:18083/foster/getFlowers",
      type: "post",
      dataType: "text",
      async: false,
      xhrFields: {
        withCredentials: true
      },
      crossDomain: true,
      success: function(data) {
        data = JSON.parse(data);
        self.flowers = data;
      },
      error: function(data) {
        //TODO 失败
        console.log("error", data);
      }
    });
       $.ajax({
          url: 'http://10.10.102.60:18083/foster/getOnlineFlowersByUserId',
          type: 'post',
          dataType: "text",
          xhrFields: {
            withCredentials: true
          },
          crossDomain: true,
          success: function(data) {
            data = JSON.parse(data)
            console.log(data)
            self.tableDataOnlineFlower = data.data;
            console.log("tableDataOnlineFlower",self.tableDataOnlineFlower)
          },
          error: function(data) {
            //TODO 失败
            console.log("error", data)
          }
        })
    }
  }
</script>
