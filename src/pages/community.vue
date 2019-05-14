<template>
  <el-container style="height: 100%">
    <el-main>
      <!-- <h1 style="text-align:left; color: blue">我的花卉</h1> -->

      <el-select
        v-model="editForm.id"
        placeholder="我的花卉"
        style="margin-left:30%"
        @change="getFoster()"
      >
        <el-option
          v-for="item in tableDataFoster"
          :key="item.id"
          :label="item.flowerName"
          :value="item.id"
        ></el-option>
      </el-select>
      <el-form style="margin-left:1%;margin-top: 1%;">
        <el-form-item label="健康等级(1-7，高代表健康)：" :label-width="formLabelWidth">
          <el-col :span="15">{{f1.healthleavel}}</el-col>
          <el-col :span="15">起止时间： {{f1.startdateString}} - {{f1.enddateString}}</el-col>
        </el-form-item>
      </el-form>
      <swiper :options="swiperOption">
        <swiper-slide v-for="(slide, index) in f1.fosterImgs" :key="index" class="box">
          <img :src="slide.src">
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
    </el-main>
    <el-aside width="35%">
      <el-form style="margin-left:20%;margin-top: 5%;">
        <el-form-item label="我的积分：" :label-width="formLabelWidth">
          <el-col :span="15">{{sum}}</el-col>
        </el-form-item>
      </el-form>
      <el-button style="margin-left: 20%;margin-top: 10%;" @click="centerDialogVisible = true">一键代养</el-button>
      <div>
        <el-dialog title="代养花卉" :visible.sync="centerDialogVisible" width="70%" center>
          <el-form>
            <el-form-item label="数量" :label-width="formLabelWidth" style="margin-left:20%;">
              <el-select placeholder="请选择" v-model="fosterParam.options.id" style="margin-left:5%;">
                <el-option
                  v-for="item in fosterParam.options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-col :span="25"></el-col>
            </el-form-item>
            <el-form-item label="地区" :label-width="formLabelWidth" style="margin-left:20%;">
              <area-select
                type="text"
                :placeholders="placeholders"
                level="1"
                v-model="send_search_form.selected"
                :data="pcaa"
                style="margin-left:9%;"
              ></area-select>
            </el-form-item>
            <el-form-item label="开始时间" :label-width="formLabelWidth" style="margin-left:20%;">
              <el-col :span="15">
                <div class="block">
                  <span class="demonstration"></span>
                  <el-date-picker v-model="fosterParam.startdate" type="date" placeholder="选择日期"></el-date-picker>
                </div>
              </el-col>
            </el-form-item>
              <el-form-item label="结束时间" :label-width="formLabelWidth" style="margin-left:20%;">
              <el-col :span="15">
                <div class="block">
                  <span class="demonstration"></span>
                  <el-date-picker v-model="fosterParam.enddate" type="date" placeholder="选择日期"></el-date-picker>
                </div>
              </el-col>
            </el-form-item>
            <el-form-item label="详细地址" :label-width="formLabelWidth" style="margin-left:20%;">
              <el-col :span="15">
                <el-input v-model="fosterParam.address" style="margin-left:2%;"></el-input>
              </el-col>
            </el-form-item>
            <el-form-item label="花名" :label-width="formLabelWidth" style="margin-left:20%;">
              <el-select placeholder="请选择" v-model="fosterParam.flowerid" style="margin-left:5%;">
                <el-option
                  v-for="item in flowers"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="centerDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="addFoster()">确 定</el-button>
          </span>
        </el-dialog>
      </div>
    </el-aside>
  </el-container>
</template>

<script>
import { pca, pcaa } from "area-data";
export default {
  name: "carrousel",
  data() {
    return {
      editForm: {
        id: null,
        flowerName: null
      },
      pca: pca,
      pcaa: pcaa,
      placeholders: [" ", " ", " "],
      send_search_form: {
        orderCode: "",
        itemName: "",
        orderTime: [],
        consigneeName: "",
        state: "",
        selected: []
      },
      formLabelWidth: 5,
      swiperOption: {
        pagination: {
          el: ".swiper-pagination"
        }
      },
      swiperSlides: [1, 2, 3, 4, 5],
      centerDialogVisible: false,
      sum: "",
      f1: "",
      fosterParam: {
        flowerid: "",
        startdate: "",
        enddate: "",
        flowerName: "",
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
      centerDialogVisible: false,
      tableData2: [],
      tableDataFoster: [],
      imgs: [],
      flowers: []
    };
  },
  methods: {
    addFoster() {
      var self = this;

      console.log("fosterParam", self.fosterParam);
      $.ajax({
        url: "http://10.10.102.60:18083/foster/foster",
        type: "post",
        data: self.fosterParam,
        dataType: "text",
        async: false,
        xhrFields: {
          withCredentials: true
        },
        crossDomain: true,
        success: function(data) {
          data = JSON.parse(data);
          console.log(data);
          self.f1 = data;
          console.log("abc", self.tableData);
        },
        error: function(data) {
          //TODO 失败
          console.log("error", data);
        }
      });
    },
    getFoster() {
      var self = this;
      console.log("fosterId", self.editForm.id);
      $.ajax({
        url: "http://10.10.102.60:18083/foster/getFosterById",
        type: "post",
        data: self.editForm,
        dataType: "text",
        async: false,
        xhrFields: {
          withCredentials: true
        },
        crossDomain: true,
        success: function(data) {
          data = JSON.parse(data);
          console.log(data);
          self.f1 = data;
          console.log("abc", self.tableData);
        },
        error: function(data) {
          //TODO 失败
          console.log("error", data);
        }
      });
    }
  },
  created: function() {
    var self = this;
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
      url: "http://10.10.102.60:18083/foster/getFosterByUserId",
      type: "get",
      dataType: "text",

      xhrFields: {
        withCredentials: true
      },
      crossDomain: true,
      success: function(data) {
        data = JSON.parse(data);
        console.log("type", data);
        self.tableDataFoster = data;
      },
      error: function(data) {
        //TODO 失败
        console.log("error", data);
      }
    });
    $.ajax({
      url: "http://10.10.102.60:18083/intergration/intergration/get",
      type: "get",
      dataType: "text",
      async: false,
      xhrFields: {
        withCredentials: true
      },
      crossDomain: true,
      success: function(data) {
        data = JSON.parse(data);
        console.log("intergration", data);
        self.sum = data.data;
        console.log("tableDate", self.imgs);
      },
      error: function(data) {
        //TODO 失败
        console.log("error", data);
      }
    });
  },

  mounted() {
    setInterval(() => {
      console.log("simulate async data");
      // if (this.swiperSlides.length < 10) {
      //   this.swiperSlides.push(this.swiperSlides.length + 1);
      // }
    }, 3000);
  }
};
</script>
<style>
.box {
  position: relative;
  padding-top: 55%;
  overflow: hidden;
  width: 25%;
  float: left;
}
.box img {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
}
.area-select .area-selected-trigger {
  position: center;
  display: block;
  font-size: 10px;
  cursor: pointer;
  margin: 0;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  height: 100%;
  padding: 0px 10px 7px 12px;
}
</style>
