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
    c.fillText(phrase.phrase, phrase.x, phrase.y);
  }
  function display_setup (c) {
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
    // let new_width = window.width / 19;
    // let new_height = window.height / 10;
    // if (new_height > new_width) {
    //   win.setSize(window.width,new_width*10);
    // } else {
    //   win.setSize(new_height*19,window.height);
    // }
  }

  let { remote } = require('electron');
  let win = remote.getCurrentWindow();

  let on_colour = "#FF0000";
  let off_colour = "#EDADAD";

  const canvas = document.querySelector('canvas');

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const c = canvas.getContext("2d");
  c.font = "24px System";
  display_setup(c);

  let d = new Date();
  let c_5min = extract_5min(d);
  let c_hour = extract_hour(d);
  display_5min(c_5min, c, on_colour);
  if (c_5min > 6) { // between 25-to and 5-to inclusive
    c_hour = increment_hour(c_hour);
  }
  display_hour(c_hour, c, on_colour);

  window.addEventListener('resize', function(e){
    e.preventDefault();
    win.setSize(window.innerWidth,Math.round((window.innerWidth*2)/5)+22);
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
