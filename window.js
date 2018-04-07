$(() => {
  const phrases = [{phrase: "THE TIME IS", x: "20", y: "47"},
                   {phrase: "HALF", x: "203", y: "47"},
                   {phrase: "TEN", x: "313", y: "47"},
                   {phrase: "QUARTER", x: "414", y: "47"},
                   {phrase: "TWENTY", x: "20", y: "85"},
                   {phrase: "FIVE", x: "155", y: "85"},
                   {phrase: "MINUTES", x: "248", y: "85"},
                   {phrase: "TO", x: "392", y: "85"},
                   {phrase: "PAST", x: "468", y: "85"},
                   {phrase: "ONE", x: "20", y: "123"},
                   {phrase: "TWO", x: "119", y: "123"},
                   {phrase: "THREE", x: "227", y: "123"},
                   {phrase: "FOUR", x: "356", y: "123"},
                   {phrase: "FIVE", x: "474", y: "123"},
                   {phrase: "SIX", x: "20", y: "161"},
                   {phrase: "SEVEN", x: "140", y: "161"},
                   {phrase: "EIGHT", x: "310", y: "161"},
                   {phrase: "NINE", x: "470", y: "161"},
                   {phrase: "TEN", x: "20", y: "199"},
                   {phrase: "ELEVEN", x: "124", y: "199"},
                   {phrase: "TWELVE", x: "271", y: "199"},
                   {phrase: "O'CLOCK", x: "426", y: "199"}];

  function display (phrase, c) {
    c.fillText(phrase.phrase, phrase.x, phrase.y);
  }

  function extract_hour (d) {
    return d.getHours() % 12;
  }
  function extract_5min (d) {
    return Math.floor(d.getMinutes()/5);
  }
  function display_5min (c_5min, c, display_colour) {
    c.fillStyle = display_colour;
    /*switch(expression) {
      case n:
        code block
        break;
      case n:
        code block
        break;
      default:
        code block
    }*/
    c.fillText(c_5min*5, 10*c_5min, 40);
  }
  function display_hour (c_hour, c, display_colour) {
    c.fillStyle = display_colour;
    /*switch(expression) {
      case n:
        code block
        break;
      case n:
        code block
        break;
      default:
        code block
    }*/
    c.fillText(c_hour, 40, 10*c_hour);
  }

  let on_colour = "#FF0000";
  let off_colour = "#EDADAD";

  const canvas = document.querySelector('canvas')

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const c = canvas.getContext("2d");
  c.font = "24px System";
  c.fillStyle = on_colour;

  let d = new Date();
  let c_hour = extract_hour(d);
  let c_5min = extract_5min(d);
  display(phrases[0],c);
  display_hour(c_hour, c, on_colour);
  display_5min(c_5min, c, on_colour);

  window.setInterval(function() {
    d = new Date();
    if (c_5min !== extract_5min(d)) {
      display_5min(c_5min, c, off_colour);
      c_5min = extract_5min(d);
      display_5min(c_5min, c, on_colour);
      if (c_hour !== extract_hour(d)) {
        display_hour(c_hour, c, off_colour);
        c_hour = extract_hour(d);
        display_hour(c_hour, c, on_colour);
      }
    }
  }, 500);
})
