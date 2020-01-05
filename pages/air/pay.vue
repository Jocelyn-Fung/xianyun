<template>
  <div class="container">
    <div class="main">
      <div class="pay-title">
        支付总金额
        <span class="pay-price">￥ {{data.price}}</span>
      </div>
      <div class="pay-main">
        <h4>微信支付</h4>
        <el-row type="flex" justify="space-between" align="middle" class="pay-qrcode">
          <div class="qrcode">
            <!-- 二维码 -->
            <canvas id="qrcode-stage"></canvas>
            <p>请使用微信扫一扫</p>
            <p>扫描二维码支付</p>
          </div>
          <div class="pay-example">
            <img src="http://157.122.54.189:9093/images/wx-sweep2.jpg" alt />
          </div>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import QRCode from "qrcode";
export default {
  data() {
    return {
      data: {},
      //   定时器
      timer: false
    };
  },
  methods: {
    checkPay() {
      let token = this.$store.state.user.userInfo.token;
      let { id } = this.$route.query;
      this.timer = setInterval(() => {
        this.$axios({
          method: "post",
          url: "/airorders/checkpay",
          headers: {
            Authorization: "Bearer " + token
          },
          data: {
            id: id,
            nonce_str: this.data.price,
            out_trade_no: this.data.orderNo
          }
        }).then(res => {
          //   console.log(res)
          if (res.data.statusTxt !== "订单未支付") {
            this.$alert("订单支付成功！", "提示：");
            window.clearInterval(this.timer);
            this.$router.push({
              path: "/"
            });
          }
        });
      }, 3000);
    }
  },
  mounted() {
    setTimeout(() => {
      let { id } = this.$route.query;
      let token = this.$store.state.user.userInfo.token;
      this.$axios({
        method: "get",
        headers: {
          Authorization: "Bearer " + token
        },
        url: "/airorders",
        query: id
      }).then(res => {
        // console.log(res);
        this.data = res.data[res.data.length - 1];
        let stage = document.getElementById("qrcode-stage");
        let payurl = this.data.payInfo.code_url;
        // 生成二维码
        QRCode.toCanvas(stage, payurl, {
          width: 200,
          color: {
            dark: "#010599FF",
            light: "#FFBF60FF"
          }
        });
        this.checkPay();
      });
    }, 1);
  },
  destroyed() {
    // 组件卸载时候清除定时器
    window.clearInterval(this.timer);
  }
};
</script>

<style scoped lang="less">
.container {
  background: #f5f5f5;
  padding: 30px 0;

  .main {
    width: 1000px;
    margin: 0 auto;

    .pay-title {
      text-align: right;
      span {
        font-size: 28px;
        color: orangered;
      }
    }

    .pay-main {
      background: #fff;
      margin-top: 10px;
      border-top: 5px orange solid;
      padding: 30px;

      h4 {
        font-size: 28px;
        font-weight: normal;
        margin-bottom: 10px;
      }

      .pay-qrcode {
        padding: 0 80px;
      }

      .qrcode {
        border: 1px #ddd solid;
        padding: 15px;
        height: fit-content;

        #qrcode-stage {
          width: 200px;
          height: 200px;
          margin-bottom: 10px;
        }

        p {
          line-height: 2;
          text-align: center;
        }
      }
    }
  }
}
</style>