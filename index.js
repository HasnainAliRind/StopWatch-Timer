
let all_counts = []
let time = 0


const ExactTime = (params) => {
  const totalSeconds = params;
  // Get the number of full hours
  const hours = Math.floor(totalSeconds / 3600);
  // Get the remaining minutes after subtracting the hours
  const remainingMinutes = Math.floor((totalSeconds % 3600) / 60);
  // Get the remaining seconds after subtracting the hours and minutes
  const seconds = totalSeconds % 60;
  function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
  }
  // Format as HH:MM:SS
  return `${padTo2Digits(hours)}:${padTo2Digits(remainingMinutes)}:${padTo2Digits(seconds)}`;
}


let milliseconds = 1




const settime = (status) => {
  if (status === false) {
    console.log('stopped');
    clearInterval(intervals);
    return;
  }

  intervals = setInterval(() => {
    time = time + 1;
    let nowTime = ExactTime(time);
    
    if (nowTime.startsWith('00:')) {
      let newStr = nowTime.slice(3,)
      document.getElementById('time').innerText = newStr;
    }else{
      document.getElementById('time').innerText = nowTime;
    }
  }, 1000);
};




const StartTime = () => {
  let startBtn = document.getElementById('start');
  let countBtn = document.getElementById('count');
  countBtn.style.display = 'block'
  startBtn.style.display = 'none'
  settime(true)
 
  // millisecondsIntervals = 
}


const StopTime = () => {
  let startBtn = document.getElementById('start');
  let countBtn = document.getElementById('count');
  let reset = document.getElementById('reset');
  startBtn.style.display = 'block'
  countBtn.style.display = 'none'
  reset.style.display = 'block'
  settime(false)
}

const counts = () =>{
  document.getElementById('nocounts').style.display = 'none'
  let newElement = document.createElement('div')
  all_counts.push('count')
  newElement.setAttribute('class', 'count');
  newElement.innerHTML = `<p>Count${all_counts.length}</p> <p>${ExactTime(time)}</p>`
  document.getElementById('counts').append(newElement)
}
const reset = () =>{
  time = 0
  document.getElementById('time').innerText = '00:00';
  settime(false)
  let startBtn = document.getElementById('start');
  let countBtn = document.getElementById('count');
  countBtn.style.display = 'none'
  startBtn.style.display = 'block'
}


function showTimer() {
  document.getElementById('Timer').style.display = 'flex'
  document.getElementById('showTimer').classList.add('active')
  document.getElementById('showStopwatch').classList.remove('active')
  document.getElementById('Stopwatch').style.display = 'none'
}

function showStopwatch() {
  document.getElementById('Timer').style.display = 'none'
  document.getElementById('showTimer').classList.remove('active')
  document.getElementById('showStopwatch').classList.add('active')
  document.getElementById('Stopwatch').style.display = 'flex'
}



// -------------------- for stopwatch ----------------------



function convertTimeToSeconds(timeString) {
  const [hours , minutes , seconds] = timeString.split(':').map(Number)
  let totalSeconds = (hours * 60 * 60) + (minutes * 60) + seconds;
  return totalSeconds
}

function EnableResetButton(status) {
  if (status == true) {
    document.getElementById('resetThisTime').addEventListener('click',()=>{
      resetThisTime()
    }) 
    document.getElementById('resetThisTime').style.background = 'linear-gradient(#fba21d,#ff6321)';
    
  }else{
    document.getElementById('resetThisTime').style.background = 'linear-gradient(#f6cd8f,#fdb292)';
  }
}
EnableResetButton(false)

let countDowntime = 0

const ExactCountDown = (params) => {
  const totalSeconds = params;
  const hours = Math.floor(totalSeconds / 3600);
  const remainingMinutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
  }
  return `${padTo2Digits(hours)}:${padTo2Digits(remainingMinutes)}:${padTo2Digits(seconds)}`;
}


const startCountDown = (status) =>{
  if (status === false) {
    clearInterval(countDown);
    return;
}

  countDown = setInterval(() => {
    countDowntime = countDowntime - 1;
    let nowTime = ExactCountDown(countDowntime);
    if (nowTime === '00:00:00') {
      clearInterval(countDown)
      function Alarm() {
        let audio = document.createElement("audio")
        audio.setAttribute('src','TimeOver.mp3')
        audio.autoplay = true
        audio.loop = false
        
        audio.style.display = 'none'
        document.getElementById("Timer").append(audio)
      }
      document.getElementById('RemainingTime').innerText = '00:00';
      Alarm()
      setTimeout(() => {
        document.getElementById('RemainingTime').innerText = '00:00';
        document.getElementById('RemainingTime').style.display = 'none'
        document.getElementById('fields').style.display = 'flex'
        document.getElementById('RemainingTime').innerText = '00:00';
        document.getElementById('pauseThisTime') .style.display = 'none'
        document.getElementById('startThisTime') .style.display = 'block'
      }, 5000);
    }else{
      if (nowTime.startsWith('00:')) {
        let newStr = nowTime.slice(3,)
        document.getElementById('RemainingTime').innerText = newStr;
      }else{
        document.getElementById('RemainingTime').innerText = nowTime;
      }
    }
  }, 1000);
}

let isPauseEventFired = false

const StartThisTime = () =>{
  let hours = document.getElementById('totalhours').value
  let minutes = document.getElementById('totalminutes').value
  let seconds = document.getElementById('totalseconds').value
  
  let hoursString = hours.length === 0 ? '00' : `${hours.length === 1 ? '0' + hours : hours}`
  let minutesString = minutes.length === 0 ? '00' : `${minutes.length === 1 ? '0' + minutes : minutes}`
  let secondsString = seconds.length === 0 ? '00' : `${seconds.length === 1 ? '0' + seconds : seconds}`
  let totalTimingString = `${hoursString}:${minutesString}:${secondsString}`
  if (totalTimingString !== '00:00:00') {
    EnableResetButton(true)
    document.getElementById('RemainingTime').style.display = 'block'
    document.getElementById('fields').style.display = 'none'
    document.getElementById('pauseThisTime') .style.display = 'block'
    document.getElementById('startThisTime') .style.display = 'none'
    let getSeconds = convertTimeToSeconds(totalTimingString)
    if (isPauseEventFired) {
      startCountDown(true)
      isPauseEventFired = false
    
    }else{
      countDowntime = getSeconds + 1
      startCountDown(true)
    }
  }else{
    alert('Please Enter the timer')
  }
}

const pauseThisTime = () =>{
  document.getElementById('pauseThisTime') .style.display = 'none'
  document.getElementById('startThisTime') .style.display = 'block'
  isPauseEventFired = true
  startCountDown(false)
}


const resetThisTime = () =>{
  document.getElementById('pauseThisTime') .style.display = 'none'
  document.getElementById('startThisTime') .style.display = 'block'
  document.getElementById('RemainingTime').style.display = 'none'
  document.getElementById('fields').style.display = 'flex'
  let inputFields = document.querySelectorAll('.fields input')
  isPauseEventFired = false
  startCountDown(false)
  countDowntime = 0
  document.getElementById('RemainingTime').innerText = '00:00'
  for (const item in inputFields) {
    inputFields[item].value = ''
  }
  EnableResetButton(false);
}