 const canvas = document.getElementById('bg');
  const ctx = canvas.getContext('2d');
  let stars = [];
  function resizeCanvas(){ canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  function initStars(){
    stars = [];
    for(let i=0;i<250;i++){
      stars.push({
        x: Math.random()*canvas.width,
        y: Math.random()*canvas.height,
        radius: Math.random()*1.5,
        dx: (Math.random()-0.5)*0.3,
        dy: (Math.random()-0.5)*0.3,
        alpha: Math.random()
      });
    }
  }
  initStars();

  function animateStars(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    for(let s of stars){
      ctx.beginPath();
      ctx.arc(s.x,s.y,s.radius,0,Math.PI*2);
      ctx.fillStyle = `rgba(255,255,255,${s.alpha})`;
      ctx.fill();
      s.x += s.dx; s.y += s.dy;
      if(s.x<0)s.x=canvas.width;
      if(s.x>canvas.width)s.x=0;
      if(s.y<0)s.y=canvas.height;
      if(s.y>canvas.height)s.y=0;
    }
    requestAnimationFrame(animateStars);
  }
  animateStars();



  async function analyzeData() {
  const koi_duration = parseFloat(document.getElementById("koi_duration").value);
  const koi_ror = parseFloat(document.getElementById("koi_ror").value);
  const koi_srho = parseFloat(document.getElementById("koi_srho").value);
  const koi_dicco_msky = parseFloat(document.getElementById("koi_dicco_msky").value);
  const koi_dikco_msky = parseFloat(document.getElementById("koi_dikco_msky").value);

  if (
    isNaN(koi_duration) ||
    isNaN(koi_ror) ||
    isNaN(koi_srho) ||
    isNaN(koi_dicco_msky) ||
    isNaN(koi_dikco_msky)
  ) {
    alert("Please fill in all parameters before running the analysis.");
    return;
  }

  const payload = {
    koi_duration,
    koi_ror,
    koi_srho,
    koi_dicco_msky,
    koi_dikco_msky
  };

  try {
    const response = await fetch("https://fuzzy-broccoli-96pq9p5p9w6hxvrv-8000.app.github.dev/predict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || "Erro ao processar requisição");
    }

    const data = await response.json();
    console.log("Resposta do modelo:", data);

    document.getElementById("statClass").innerText = `Probabilidade: ${(data[0] * 100).toFixed(2)}%`;
    document.getElementById("result").style.display = "block";

  } catch (err) {
    alert("Erro: " + err.message);
  }
}


const track = document.querySelector('.carousel-track');
const items = document.querySelectorAll('.carousel-item');

let scrollPos = 0;
const speed = 0.5; // pixels por frame, ajuste para mais rápido ou mais lento

// Clona os itens para loop infinito
items.forEach(item => {
  const clone = item.cloneNode(true);
  track.appendChild(clone);
});

function animateCarousel() {
  scrollPos += speed;
  if (scrollPos >= track.scrollWidth / 2) scrollPos = 0; // reinicia loop
  track.style.transform = `translateX(-${scrollPos}px)`;
  requestAnimationFrame(animateCarousel);
}

animateCarousel();
/*
const sendBtn = document.getElementById("sendBtn");
const resultDiv = document.getElementById("result");

sendBtn.addEventListener("click", async () => {
  const fileInput = document.getElementById("csvFile");
  const file = fileInput.files[0];

  if (!file) {
    alert("Selecione um arquivo CSV primeiro.");
    return;
  }

  const formData = new FormData();
  formData.append("file", file);

  resultDiv.innerHTML = "<p>Enviando arquivo...</p>";

  try {
    const response = await fetch("http://localhost:8000/predict", {
      method: "POST",
      body: formData
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || "Erro ao processar requisição");
    }

    const data = await response.json();
    resultDiv.innerHTML = `
      <h3>Resultado:</h3>
      <pre>${JSON.stringify(data, null, 2)}</pre>
    `;
  } catch (err) {
    resultDiv.innerHTML = `<p style="color:red;">${err.message}</p>`;
  }
});*/
