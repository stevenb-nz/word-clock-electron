$(() => {
  const phrases = {the_time_is: {phrase: "THE TIME IS", x: "20", y: "41"},
                   half: {phrase: "HALF", x: "203", y: "41"},
                   ten_min: {phrase: "TEN", x: "313", y: "41"},
                   quarter: {phrase: "QUARTER", x: "414", y: "41"},
                   twenty: {phrase: "TWENTY", x: "20", y: "80"},
                   five_min: {phrase: "FIVE", x: "155", y: "80"},
                   minutes: {phrase: "MINUTES", x: "248", y: "80"},
                   to: {phrase: "TO", x: "392", y: "80"},
                   past: {phrase: "PAST", x: "468", y: "80"},
                   one: {phrase: "ONE", x: "20", y: "119"},
                   two: {phrase: "TWO", x: "119", y: "119"},
                   three: {phrase: "THREE", x: "227", y: "119"},
                   four: {phrase: "FOUR", x: "356", y: "119"},
                   five: {phrase: "FIVE", x: "474", y: "119"},
                   six: {phrase: "SIX", x: "20", y: "158"},
                   seven: {phrase: "SEVEN", x: "140", y: "158"},
                   eight: {phrase: "EIGHT", x: "310", y: "158"},
                   nine: {phrase: "NINE", x: "470", y: "158"},
                   ten: {phrase: "TEN", x: "20", y: "197"},
                   eleven: {phrase: "ELEVEN", x: "124", y: "197"},
                   twelve: {phrase: "TWELVE", x: "271", y: "197"},
                   oclock: {phrase: "O'CLOCK", x: "426", y: "197"}};

  function display (phrase, c) {
    c.fillText(phrase.phrase, scale(phrase.x,scale_factor), scale(phrase.y,scale_factor));
  }
  function canvas_setup (canvas) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  function display_setup (c) {
    c.clearRect(0, 0, canvas.width, canvas.height);
    scale_factor = canvas.width/550;
    let fontsize = scale(24,scale_factor);
    c.font = `${fontsize}px System`;
    c.fillStyle = on_colour;
    for(let key in phrases) {
      let phrase = phrases[key];
      display(phrase,c);
    }
    c.fillStyle = off_colour;
    for(let key in phrases) {
      let phrase = phrases[key];
      display(phrase,c);
    }
    c.fillStyle = on_colour;
    display(phrases.the_time_is,c);
  }
  function reset_display (c) {
    d = new Date();
    c_5min = extract_5min(d);
    c_hour = extract_hour(d);
    display_5min(c_5min, c, on_colour);
    if (c_5min > 6) { // between 25-to and 5-to inclusive
      c_hour = increment_hour(c_hour);
    }
    display_hour(c_hour, c, on_colour);
  }

  function scale (value,scale_factor) {
    return Math.round(value*scale_factor);
  }

  function extract_hour (d) {
    return d.getHours() % 12;
  }
  function extract_5min (d) {
    return Math.floor(d.getMinutes()/5);
  }
  function increment_hour (c_hour) {
    return (c_hour + 1) % 12;
  }
  function display_5min (c_5min, c, display_colour) {
    c.fillStyle = display_colour;
    switch(c_5min) {
      case 0:
        display(phrases.oclock,c);
        break;
      case 1:
        display(phrases.five_min,c);
        display(phrases.minutes,c);
        display(phrases.past,c);
        break;
      case 2:
        display(phrases.ten_min,c);
        display(phrases.minutes,c);
        display(phrases.past,c);
        break;
      case 3:
        display(phrases.quarter,c);
        display(phrases.past,c);
        break;
      case 4:
        display(phrases.twenty,c);
        display(phrases.minutes,c);
        display(phrases.past,c);
        break;
      case 5:
        display(phrases.twenty,c);
        display(phrases.five_min,c);
        display(phrases.minutes,c);
        display(phrases.past,c);
        break;
      case 6:
        display(phrases.half,c);
        display(phrases.past,c);
        break;
      case 7:
        display(phrases.twenty,c);
        display(phrases.five_min,c);
        display(phrases.minutes,c);
        display(phrases.to,c);
        break;
      case 8:
        display(phrases.twenty,c);
        display(phrases.minutes,c);
        display(phrases.to,c);
        break;
      case 9:
        display(phrases.quarter,c);
        display(phrases.to,c);
        break;
      case 10:
        display(phrases.ten_min,c);
        display(phrases.minutes,c);
        display(phrases.to,c);
        break;
      case 11:
        display(phrases.five_min,c);
        display(phrases.minutes,c);
        display(phrases.to,c);
        break;
    }
  }
  function display_hour (c_hour, c, display_colour) {
    c.fillStyle = display_colour;
    switch(c_hour) {
      case 0:
        display(phrases.twelve,c);
        break;
      case 1:
        display(phrases.one,c);
        break;
      case 2:
        display(phrases.two,c);
        break;
      case 3:
        display(phrases.three,c);
        break;
      case 4:
        display(phrases.four,c);
        break;
      case 5:
        display(phrases.five,c);
        break;
      case 6:
        display(phrases.six,c);
        break;
      case 7:
        display(phrases.seven,c);
        break;
      case 8:
        display(phrases.eight,c);
        break;
      case 9:
        display(phrases.nine,c);
        break;
      case 10:
        display(phrases.ten,c);
        break;
      case 11:
        display(phrases.eleven,c);
        break;
    }
  }

  function onWindowResize () {
    canvas_setup(canvas);
    display_setup(c);
    reset_display(c);
  }

  let { remote } = require('electron');
  let win = remote.getCurrentWindow();

  let on_colour = "#FF0000";
  let off_colour = "#EDADAD";

  const canvas = document.querySelector('canvas');
  canvas_setup(canvas);

  const c = canvas.getContext("2d");
  let scale_factor;
  display_setup(c);

  let d;
  let c_5min;
  let c_hour;
  reset_display(c);

  window.addEventListener('resize', function(e){
    e.preventDefault();
    onWindowResize();
  });

  window.setInterval(function() {
    d = new Date();
    if (c_5min !== extract_5min(d)) {
      display_5min(c_5min, c, off_colour);
      c_5min = extract_5min(d);
      display_5min(c_5min, c, on_colour);
      if (c_5min == 7) { // at 25-to
        display_hour(c_hour, c, off_colour);
        c_hour = increment_hour(c_hour);
        display_hour(c_hour, c, on_colour);
      }
    }
  }, 500);
});
