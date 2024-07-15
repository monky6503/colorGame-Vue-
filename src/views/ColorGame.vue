<script>
import AOS from 'aos'
import 'aos/dist/aos.css'
import 'animate.css';
export default{
  //儲存資料
  data(){
    return{
     gridSize:2,
     score:0,
     timeleft:60,
     maxGridSize: 10,
     isPaused:false, //是否暫停
     isGameStarted:false,//是否開始
     isGameOver:false,//是否結束
     opacity:0.6,
     cells:[],
     isdisable:false, //暫停後cell消失
    }
  },
  mounted(){
    AOS.init()
  },
  methods:{
    getRandomColor(){
      const colors = [
        "bg-slate-300",
        "bg-slate-400",
        "bg-slate-500",
        "bg-slate-600",
        "bg-slate-700",
        "bg-gray-300",
        "bg-gray-400",
        "bg-gray-500",
        "bg-gray-600",
        "bg-gray-700",
        "bg-stone-300",
        "bg-stone-400",
        "bg-stone-500",
        "bg-stone-600",
        "bg-stone-700",
        "bg-red-300",
        "bg-red-400",
        "bg-red-500",
        "bg-red-600",
        "bg-red-700",
        "bg-orange-300",
        "bg-orange-400",
        "bg-orange-500",
        "bg-orange-600",
        "bg-orange-700",
        "bg-rose-300",
        "bg-rose-400",
        "bg-rose-500",
        "bg-rose-600",
        "bg-rose-700",
        "bg-amber-300",
        "bg-amber-400",
        "bg-amber-500",
        "bg-amber-600",
        "bg-amber-700",
        "bg-yellow-300",
        "bg-yellow-400",
        "bg-yellow-500",
        "bg-yellow-600",
        "bg-yellow-700",
        "bg-lime-300",
        "bg-lime-400",
        "bg-lime-500",
        "bg-lime-600",
        "bg-lime-700",
        "bg-green-300",
        "bg-green-400",
        "bg-green-500",
        "bg-green-600",
        "bg-green-700",
        "bg-emerald-300",
        "bg-emerald-400",
        "bg-emerald-500",
        "bg-emerald-600",
        "bg-emerald-700",
        "bg-teal-300",
        "bg-teal-400",
        "bg-teal-500",
        "bg-teal-600",
        "bg-teal-700",
        "bg-blue-300",
        "bg-blue-400",
        "bg-blue-500",
        "bg-blue-600",
        "bg-blue-700",
        "bg-cyan-300",
        "bg-cyan-400",
        "bg-cyan-500",
        "bg-cyan-600",
        "bg-cyan-700",
        "bg-sky-300",
        "bg-sky-400",
        "bg-sky-500",
        "bg-sky-600",
        "bg-sky-700",
        "bg-indigo-300",
        "bg-indigo-400",
        "bg-indigo-500",
        "bg-indigo-600",
        "bg-indigo-700",
        "bg-violet-300",
        "bg-violet-400",
        "bg-violet-500",
        "bg-violet-600",
        "bg-violet-700",
        "bg-purple-300",
        "bg-purple-400",
        "bg-purple-500",
        "bg-purple-600",
        "bg-purple-700",
        "bg-fuchsia-300",
        "bg-fuchsia-400",
        "bg-fuchsia-500",
        "bg-fuchsia-600",
        "bg-fuchsia-700",
        "bg-pink-300",
        "bg-pink-400",
        "bg-pink-500",
        "bg-pink-600",
        "bg-pink-700"
      ] 
      const index = Math.floor(Math.random()*colors.length);
      return colors[index];
    },
    createGrid(size) {
      this.cells = Array.from({ length: size * size }, () => ({ class: '', color: '',opacity:'' }));
    },
    distributeColor() {
      const color = this.getRandomColor();
      const unique = Math.floor(Math.random() * this.cells.length);
      this.cells.forEach((cell, index) => {
        cell.color = color;
        if (index === unique) {
          cell.class = 'answer';
          cell.opacity = this.opacity;
          if (this.opacity <0.9) {
            this.opacity += 0.025;
          }
        } else {
          cell.class = '';
          cell.opacity = 1;
        }
      });
    },
    checkColor(index){
      if(this.cells[index].class === 'answer'){
        this.score++
        if(this.gridSize<this.maxGridSize){
          this.gridSize++
        }
        this.createGrid(this.gridSize);
        this.distributeColor()
      }else{
        this.score--;
        if(this.score<=0) this.score = 0
      }
    },
    cellStyle(cell){
      return {
        opacity: cell.opacity
      }
    },
    startTime(){
      const timeInterval = setInterval(() =>{
      if(!this.isPaused){
        this.timeleft--;
        if(this.timeleft <=0){
          clearInterval(timeInterval);
         this.isGameOver = true;
         this.isGameStarted = false;
        }
      } 
    },1000);
    },
    pauseTime() {
      this.isPaused = !this.isPaused;
      this.isdisable = !this.isdisable;
    },
    startGame() {
      this.gridSize = 2;
      this.score = 0;
      this.timeleft = 60;
      this.opacity = 0.6;
      this.isGameStarted = true;
      this.isGameOver = false;
      this.createGrid(this.gridSize);
      this.distributeColor();
      this.startTime();
    },
  },
  computed: {
    gridStyle() {
      return {
        display: 'grid',
        gridTemplateColumns: `repeat(${this.gridSize}, 1fr)`,
        gridTemplateRows: `repeat(${this.gridSize}, 1fr)`,
      };
    }
  },
}
</script>

<template>
  <main class="w-full min-h-screen bg-gradient-to-b from-[#FFF9D0] via-[#A0DEFF] to-[#5AB2FF]">
    <div>
      <h1 class="text-center text-[55px] sm:text-[80px] bg-gradient-to-b from-[#ec2f4b] via-[#f5af19] to-[#009fff] text-transparent bg-clip-text">Color Game change</h1>
      <div class="flex items-center justify-center gap-3">
        <div class="flex items-center gap-3">
          <div class="text-xl">Time left: <span>{{ timeleft }}</span>s</div>
          <div class="text-xl">Score: <span>{{ score }}</span></div>
        </div>
        <div v-show="!isGameStarted" class="my-4">
          <button  class="btn btn-neutral w-[100px] h-10 text-white" @click="startGame">Start</button>
        </div>
        <div v-show="isGameStarted"  class="my-4">
          <button class="btn btn-neutral w-[100px] h-10 text-white" @click="pauseTime">Pause</button>
        </div>
      </div>
      <div v-if="isGameStarted && !isGameOver && !isdisable" :style="gridStyle"  class="w-11/12 h-auto aspect-square sm:w-[570px] sm:h-[570px] m-auto bg-white border-4 border-solid border-white rounded-xl gap-1 " data-aos="zoom-in">
        <span v-for="(cell, index) in cells" :key="index" :class="['cell', cell.class, cell.color]" :style="cellStyle(cell)" @click="checkColor(index)" class="rounded-md cursor-pointer"></span>
      </div>
      <div v-else-if="isGameOver" class="text-center text-[55px] sm:text-[70px] text-red-500 animate__animated animate__backInUp">Time's UP!!!</div>
    </div>
  </main>
</template>