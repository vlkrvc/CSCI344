
const toggleDyslexiaMode = () => {
  const body = document.querySelector("body");
  body.classList.toggle("dyslexia-mode");

 
  if (body.classList.contains("dyslexia-mode")) {
      localStorage.setItem("dyslexiaMode", "enabled");
  } else {
      localStorage.setItem("dyslexiaMode", "disabled");
  }
};


document.getElementById("dyslexia-toggle").addEventListener("click", toggleDyslexiaMode);


window.addEventListener("load", () => {
  if (localStorage.getItem("dyslexiaMode") === "enabled") {
      document.querySelector("body").classList.add("dyslexia-mode");
  }
});
