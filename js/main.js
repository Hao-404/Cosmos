
var app = new Vue({
  el: "#player",
  data: {
    // 查询关键字
    query: "",
    // 歌曲数组
    musicList: [],
    // 歌曲地址
    musicUrl: "",
    // 歌曲封面
    musicCover: "",
    // 歌曲评论
    hotComments: [],
    // 动画播放状态
    isPlaying: false,
    // 遮罩层的显示状态
    isShow: false,
    // mv地址
    mvUrl: "",
    messages:[],
    comment:{
      "id":"",
      "message":""
    },
    api:"https://0fdhgquqp4.execute-api.ap-southeast-2.amazonaws.com/prod/board/"

  },
  created: function () {
    var that = this;
    axios.get(this.api).then(
      function(response) {
        // console.log(response);
        that.messages = response.data.body;
        console.log(response.data.body);
      },
      function(err) {}
    );
    console.log()
  },
  methods: {
    
    // 歌曲搜索
    searchMusic: function() {
      var that = this;
      axios.get("https://autumnfish.cn/search?keywords=" + this.query).then(
        function(response) {
          // console.log(response);
          that.musicList = response.data.result.songs;
          console.log(response.data.result.songs);
        },
        function(err) {}
      );
    },
    // 歌曲播放
    playMusic: function(musicId) {
      //   console.log(musicId);
      var that = this;
      // 获取歌曲地址
      axios.get("https://autumnfish.cn/song/url?id=" + musicId).then(
        function(response) {
          // console.log(response);
          // console.log(response.data.data[0].url);
          that.musicUrl = response.data.data[0].url;
        },
        function(err) {}
      );
      // that.musicUrl = "http://music.163.com/song/media/outer/url?id=" + musicId + ".mp3";
      // 歌曲详情获取
      axios.get("https://autumnfish.cn/song/detail?ids=" + musicId).then(
        function(response) {
          // console.log(response);
          // console.log(response.data.songs[0].al.picUrl);
          that.musicCover = response.data.songs[0].al.picUrl;
        },
        function(err) {}
      );

      // 歌曲评论获取
      axios.get("https://autumnfish.cn/comment/hot?type=0&id=" + musicId).then(
        function(response) {
          // console.log(response);
          // console.log(response.data.hotComments);
          that.hotComments = response.data.hotComments;
        },
        function(err) {}
      );
    },
    // 歌曲播放
    play: function() {
      // console.log("play");
      this.isPlaying = true;
    },
    // 歌曲暂停
    pause: function() {
      // console.log("pause");
      this.isPlaying = false;
    },
    // 播放mv
    playMV: function(mvid) {
      var that = this;
      axios.get("https://autumnfish.cn/mv/url?id=" + mvid).then(
        function(response) {
          // console.log(response);
          console.log(response.data.data.url);
          that.isShow = true;
          that.mvUrl = response.data.data.url;
        },
        function(err) {}
      );
    },
    // 隐藏
    hide: function() {
      this.isShow = false;
    },
    onSubmit: function() {
      /* json格式提交： */
      // let formData = JSON.stringify(this.formMess);
  
      /* formData格式提交： */
      let formData = this.api+"{'id':"+this.comment.id+"','message':'"+this.comment.message+"'}";
      
      // for(var key in this.formMess){
      //   formData.append(key,this.formMess[key]);
      // }
      let q = {
        "id":this.comment.id,
        "message":this.comment.message
      }
      console.log(this.comment.id)
      axios({
        'method': 'post',
        'url': this.api,
        //'Content-Type': 'application/json',
        headers:{'Content-Type': 'application/json'},
        //'data':JSON.stringify(q)
        data:q
      })
      .then((response) => {
          var that = this;
          axios.get(this.api).then(
          function(response) {
          // console.log(response);
          that.messages = response.data.body;
          console.log(response.data.body);
      },
      function(err) {}
    );
        return console.log('axiosResp', response);
      })
      .catch((err) => console.error('axios', err))
      //axios.put(this.api, q);
    }
  }



});
