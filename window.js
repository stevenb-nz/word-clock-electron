$(() => {
  function extract_hour (d) {
    return d.getHours() % 12;
  }
  function extract_5min (d) {
    return Math.floor(d.getMinutes()/5);
  }
  function display_time (c_hour, c_5min, c) {
    c.clearRect(0, 0, canvas.width, canvas.height);
    c.fillText(c_hour+' '+c_5min*5, 40, 40);
  }

  let on_colour = "#FF0000";
  let off_colour = "#EDADAD";

  const canvas = document.querySelector('canvas')

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const c = canvas.getContext("2d");
  c.fillStyle = off_colour;
  c.font = "24px System";

  let d = new Date();
  let c_hour = extract_hour(d);
  let c_5min = extract_5min(d);
  display_time(c_hour, c_5min, c);

  window.setInterval(function() {
    d = new Date();
    if (c_5min !== extract_5min(d)) {
      c.fillStyle = off_colour;
      c_5min = extract_5min(d);
      display_time(c_hour, c_5min, c);
      if (c_hour !== extract_hour(d)) {
        c.fillStyle = on_colour;
        c_hour = extract_hour(d);
        display_time(c_hour, c_5min, c);
      }
    }
  }, 500);
})
