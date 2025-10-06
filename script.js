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

  // Função de mock análise
  async function analyzeData() {
    
  const fileInput = document.getElementById("csvFile");

  const file = fileInput.files[0];

  if (!file) {
    alert("First of all, select a CSV file.");
    return;
  }
  
  const formData = new FormData();
  formData.append("file", file);

  //resultDiv.innerHTML = "<p>Enviando arquivo...</p>";

    try {
        const response = await fetch("https://planetornotplanet.onrender.com/predict", {
        method: "POST",
        body: formData
        });

        if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || "Erro ao processar requisição");
        }

        const data = await response.json();
        console.log(typeof( data));

        document.getElementById('statName').innerText= data.Name;
        document.getElementById('statPeriod').innerText= data.Period+' days';
        document.getElementById('statRadius').innerText= data.Radius + ' R⊕';
        document.getElementById('statMass').innerText='≈'+ data.Mass + ' M⊕';
        document.getElementById('statMagnitude').innerText= data.Magnitude;
        document.getElementById('statClass').innerText= data.Classification;
        /*resultDiv.innerHTML = `
        <h3>Resultado:</h3>
        <pre>${JSON.stringify(data, null, 2)}</pre>
        `;*/
    } catch (err) {
        //resultDiv.innerHTML = `<p style="color:red;">${err.message}</p>`;
        alert("Error: "+err.message);
    }
    /*const time = Array.from({length:100},(_,i)=>i);
    const flux = time.map(t=>1+0.05*Math.sin(2*Math.PI*t/20));
    const model = time.map(t=>1+0.05*Math.sin(2*Math.PI*t/20+0.1));

    Plotly.newPlot('lightCurveGraph',[
      {x:time,y:flux,mode:'lines+markers',name:'Observed',line:{color:'cyan'}},
      {x:time,y:model,mode:'lines',name:'Model',line:{color:'red',width:3}}
    ],{
      plot_bgcolor:'#0f1f3d',
      paper_bgcolor:'#0f1f3d',
      font:{color:'#fff'},
      title:'Light Curve with AI Model',
      xaxis:{title:'Time'},
      yaxis:{title:'Flux'}
    });*/


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
