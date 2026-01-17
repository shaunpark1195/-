const $ = id => document.getElementById(id);

const step1 = $("step1");
const step2 = $("step2");
const step3 = $("step3");

const nameInput = $("nameInput");
const toPwBtn = $("toPwBtn");
const nameHint = $("nameHint");

const namePreview = $("namePreview");
const pwInput = $("pwInput");
const unlockBtn = $("unlockBtn");
const pwHint = $("pwHint");
const backBtn = $("backBtn");

const finalTitle = $("finalTitle");
const typeText = $("typeText");
const cursor = $("cursor");
const answerTitle = $("answerTitle");
const choices = $("choices");

const yesBtn = $("yesBtn");
const noBtn = $("noBtn");

const hearts = $("hearts");

// 🔐 비밀번호(원하는 걸로 바꿔)
const PASSWORD = "0214";

let targetName = "";

// 조사(은/는)
function hasFinalConsonant(word){
  const code = word.charCodeAt(word.length - 1) - 44032;
  return code % 28 !== 0;
}
function eunNeun(name){
  return hasFinalConsonant(name) ? "은" : "는";
}

function show(a,b,c){
  step1.classList.toggle("hidden", !a);
  step2.classList.toggle("hidden", !b);
  step3.classList.toggle("hidden", !c);
}

function popHearts(count=10){
  for(let i=0;i<count;i++){
    const h = document.createElement("div");
    h.className = "heart";
    h.textContent = Math.random()>0.5 ? "💗" : "✨";
    h.style.left = Math.random()*100 + "vw";
    h.style.top = (70 + Math.random()*25) + "vh";
    h.style.fontSize = (14 + Math.random()*12) + "px";
    hearts.appendChild(h);
    setTimeout(()=>h.remove(), 2400);
  }
}

// 타이핑 효과
async function typeWriter(text, speed=55){
  typeText.textContent = "";
  cursor.style.display = "inline-block";

  for(let i=0;i<text.length;i++){
    typeText.textContent += text[i];
    const ch = text[i];
    const extra = (ch === "." || ch === "!" || ch === "?" || ch === "\n") ? 180 : 0;
    await new Promise(r => setTimeout(r, speed + extra));
  }

  // 끝나면 선택지 표시
  answerTitle.style.display = "block";
  choices.style.display = "grid";
  popHearts(14);
}

toPwBtn.onclick = () => {
  const v = nameInput.value.trim();
  if(!v){
    nameHint.textContent = "이름을 입력해줘!";
    return;
  }
  targetName = v;
  nameHint.textContent = "";
  namePreview.textContent = targetName;
  pwInput.value = "";
  pwHint.textContent = "";
  show(false,true,false);
};

backBtn.onclick = () => show(true,false,false);

unlockBtn.onclick = () => {
  const pw = pwInput.value.trim();
  if(pw !== PASSWORD){
    pwHint.textContent = "비밀번호가 틀렸어… 다시 입력해줘!";
    return;
  }

  // 고백 화면으로 이동(분리)
  pwHint.textContent = "";
  answerTitle.style.display = "none";
  choices.style.display = "none";

  show(false,false,true);

  finalTitle.textContent = `${targetName}에게`;

  const msg =
`나 ${targetName}${eunNeun(targetName)} 당신을 좋아합니다.
나랑 사귀자.`;

  typeWriter(msg, 55);
};

// ✅ 선택 시 "다음 페이지"로 이동
yesBtn.onclick = () => {
  // 이름 전달(결과 페이지에서 표시하고 싶으면 사용)
  sessionStorage.setItem("targetName", targetName);
  location.href = "result-yes.html";
};

noBtn.onclick = () => {
  sessionStorage.setItem("targetName", targetName);
  location.href = "result-no.html";
};