<template>
  <div>
    <!--<span class="text">打卡（星期六 12月29日）</span>-->
    <div class="location-check" id="location-check">
      <span class="text">打卡（{{week}} {{day}}）</span>
      <img src="../../assets/images/location-1.png" alt="">
    </div>
    <div>
      <button @click="make">生成</button>
    </div>
    <div v-for="(img, index) in imgList" :key="index" class="location-check">
      <img :src="img" alt="" :id="'img-' + index">
    </div>
  </div>
</template>

<script>
import html2canvas from 'html2canvas'
import dayjs from 'dayjs'
import axios from 'axios'

const aWeekTxt = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']

export default {
  name: 'LocationCheck',
  data() {
    return {
      day: '',
      week: '',
      imgList: [],
      start: 1,
      max: 200,
      time: null
    }
  },
  mounted() {
    this.time = dayjs().set('year', 2019).set('month', 0).set('date', 7)
  },
  methods: {
    make() {
      if (this.start >= this.max) {
        this.start = 1
        return
      }
      this.start++
      this.week = aWeekTxt[this.time.day()]
      this.day = this.time.format('MM月DD日')
      html2canvas(document.querySelector("#location-check")).then(canvas => {
        this.$nextTick(() => {
          let imgData = canvas.toDataURL('png')
          // this.imgList.push(imgData)
          this.time = this.time.add(1, 'day')
          let formData = new FormData();
          formData.append('date', this.day);
          formData.append('imgData', imgData);
          axios({
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            method: 'post',
            url: 'http://192.168.137.1:8083/upload',
            data: formData
          }).then(rs => {
            console.log(rs)
            this.make()
          })
        })
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.location-check {
  width: 1080px;
  height: 732px;
  position: relative;
}

.text {
  font-size: 50px;
  color: white;
  position: absolute;
  left: 145px;
  top: 25px;
}

img {
  width: 100%;
}

button {
  margin-top: 20px;
}
</style>
