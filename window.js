$(() => {
  const phrases = [{phrase: "THE TIME IS", x: "20", y: "47"}];

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
