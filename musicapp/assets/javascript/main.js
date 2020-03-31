window.addEventListener("load", initEvent);
var audio,s_id;
var flag = false;

function initEvent() {
    loadSongs();
    audio = document.querySelector("#audio");
    playBtn = document.querySelector("#play");
    playBtn.addEventListener("click", togglePlay);
    slider = document.querySelector("#slider");
    slider.addEventListener("change", seekSong);
    song_total_time = document.querySelector(".song_total_time");
    song_curr_time = document.querySelector(".song_curr_time");
    song_curr = document.querySelector("#cur_song");
    document.getElementById("prev").addEventListener("click",PlayPrev);
    document.getElementById("next").addEventListener("click",Playnext);
    loadplaylist();
}



function loadSongs() {
   
    songs.forEach(function(obj) {
       print(obj);
       
})}
function print(obj){
 ul = document.querySelector("#songsList");
var li = document.createElement("li");
var span = document.createElement("span");
span.innerHTML = obj.song_name;
var btn = document.createElement("button");
btn.innerHTML = 'Add to Playlist';
btn.className = "btn btn-primary d-block w-100";
var img = document.createElement("img");
img.setAttribute('src', obj.song_thumb);
img.setAttribute('title', obj.song_id);
li.appendChild(img);
// console.log(obj);
li.appendChild(span);
li.appendChild(btn);
ul.appendChild(li);
img.addEventListener("click", song);
btn.addEventListener("click", addSong);
        }


        function search(obj){
            ul.innerHTML=" ";
        console.log(obj.value);
            var text=obj.value;
            search1=text.toLowerCase();
            for (var i = 0; i < songs.length; i++) {
               var name=songs[i].song_name.toLowerCase()
                if (name.includes(search1)) {
                    var songObj = songs[i];
                    print(songObj);
                }
            }
        }


function song (){
     s_id = event.srcElement.title;
    playSong(s_id);
    
}


function playSong(s_id) {
    for (var i = 0; i < songs.length; i++) {
        if (songs[i].song_id == s_id) {
            songimg.setAttribute('src', songs[i].song_thumb);
            var songName=songs[i].song_name;
            var songUrl = songs[i].song_url;
            break;
        }
    }
    audio.src = songUrl;

song_curr.innerHTML=songName;
    audio.play();
    setInterval(function() {
        slider.value = audio.currentTime;
        var min = parseInt(slider.value / 60);
        var sec = parseInt(slider.value % 60);
        if(sec<10){
            song_curr_time.innerHTML = "0" + min + ":" + "0"+sec;
        }
        else{
        song_curr_time.innerHTML = "0" + min + ":" + sec;}
    }, 1000);
    setTimeout(function() {
        var duration = audio.duration;
        slider.max = duration;
        var min = parseInt(duration / 60);
        var sec = parseInt(duration % 60);
        
        song_total_time.innerHTML = "0" + min + ":" + sec;
       // song_total_time.innerHTML = song_total_time.innerHTML -song_curr_time;
    }, 500);
    flag = true;
    togglePlay();
}

function seekSong() {
    audio.currentTime = slider.value;
}

function togglePlay() {
    if (!flag) {
        playBtn.innerHTML = '<i class="fas fa-play"></i>';
        audio.pause();
    } else {
        playBtn.innerHTML = '<i class="fas fa-pause"></i>';
        audio.play();
    }
     flag = !flag;
}

function addSong() {
     var s_id_2= event.srcElement.parentElement.children[0].title;
    for (var i = 0; i < songs.length; i++) {
        if (songs[i].song_id == s_id_2) {
            var songObj = songs[i];
            obj.addSong(songObj.song_id, songObj.song_name, songObj.song_url, songObj.song_thumb);
            break;
        }
    }
    showPlaylist();
    saveplaylist();
}
function saveplaylist(){
    if(window.localStorage){
        var json=JSON.stringify(obj.playList);
        localStorage.setItem("playlist",json);
    }
}
function loadplaylist(){
    if(window.localStorage){
        var arr=localStorage.getItem("playlist");
        obj.playList=JSON.parse(arr);
        showPlaylist();
    }
}
function deleteSong() {
    var s_id_3 = event.srcElement.parentElement.children[0].title;
    for (var i = 0; i < obj.playList.length; i++) {
        // console.log(obj.playList[i].id, s_id);
        if (obj.playList[i].id == s_id_3) {
            var songObj = obj.playList[i];
            obj.deleteSong(songObj.id);
            break;
        }
    }
    showPlaylist();
    saveplaylist();
}
function showPlaylist(){
    var ul = document.querySelector("#playList");
    ul.innerHTML = "";
    obj.playList.forEach(function(obj) {
        var li = document.createElement("li");
        var span = document.createElement("span");
        span.innerHTML = obj.name;
        var btn = document.createElement("button");
        btn.innerHTML = '<i class="fas fa-trash"></i>';
        btn.className = "btn btn-danger";
        var img = document.createElement("img");
        img.setAttribute('src', obj.image);
        img.setAttribute('title', obj.id);
        li.appendChild(img);
        // console.log(obj);
        li.appendChild(span);
        li.appendChild(btn);
        ul.appendChild(li);
        img.addEventListener("click", song);
        btn.addEventListener("click", deleteSong);
   })
}   

function PlayPrev(){
    s_id=--s_id;
    playSong(s_id);
        }


function Playnext(){
    s_id=++s_id;
    playSong(s_id);
}
  

