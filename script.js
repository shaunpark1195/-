const $ = id => document.getElementById(id);

const nameInput = $("nameInput");
const revealPwBtn = $("revealPwBtn");
const nameHint = $("nameHint");

const pwBox = $("pwBox");
const namePreview = $("namePreview");
const pwInput = $("pwInput");
const unlockBtn = $("unlockBtn");
const pwHint = $("pwHint");

const formPanel = $("formPanel");
const confessPanel = $("confessPanel");

const finalTitle = $("finalTitle");
const typeText = $("typeText");
const cursor = $("cursor");
const answerTitle = $("answerTitle");
const choices = $("choices");
const yesBtn = $("yesBtn");
const noBtn = $("noBtn");
const finalHint = $("finalHint");

const hearts = $("hearts");

// 🔐 접근 코드(원하는 걸로 바꿔)
const PASSWORD = "0817";

let targetName = "";

// 조사(은/는)
function hasFinalConsonant(word){
  const code = word.charCodeAt(word.length - 1) - 44032;
  return code % 28 !== 0;
}
function eunNeun(name){
  return hasFinalConsonant(name) ? "은" : "는";
}

// 하트
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

// 타이핑
async function typeWriter(text, speed=55){
  typeText.textContent = "";
  cursor.style.display = "inline-block";

  for(let i=0;i<text.length;i++){
    typeText.textContent += text[i];
    const ch = text[i];
    const extra = (ch === "." || ch === "!" || ch === "?" || ch === "\n") ? 180 : 0;
    await new Promise(r => setTimeout(r, speed + extra));
  }

  answerTitle.style.display = "block";
  choices.style.display = "grid";
  popHearts(14);
}

/** 1) 이름 확인 → 비번 입력창 “등장” */
revealPwBtn.onclick = () => {
  const v = nameInput.value.trim();
  if(!v){
    nameHint.textContent = "이름을 입력해주세요";
    return;
  }
  targetName = v;
  nameHint.textContent = "";
  namePreview.textContent = targetName;

  pwBox.classList.add("open");
  pwBox.setAttribute("aria-hidden", "false");
  pwInput.focus();
};

/** 엔터로도 진행 */
nameInput.addEventListener("keydown", (e)=>{
  if(e.key === "Enter") revealPwBtn.click();
});
pwInput.addEventListener("keydown", (e)=>{
  if(e.key === "Enter") unlockBtn.click();
});

/** 2) 비번 통과 → 고백 패널로 전환 + love 모드 ON */
unlockBtn.onclick = () => {
  const pw = pwInput.value.trim();
  if(pw !== PASSWORD){
    pwHint.textContent = "코드가 일치하지 않습니다. 다시 입력해주십시오.";
    return;
  }
  pwHint.textContent = "";

  // 설문지 느낌 → 고백 느낌으로 전환
  document.body.classList.add("love");

  // 패널 전환
  formPanel.classList.add("hidden");
  confessPanel.classList.remove("hidden");

  // 선택지 숨기고 타이핑 시작
  finalHint.textContent = "";
  answerTitle.style.display = "none";
  choices.style.display = "none";

  finalTitle.textContent = `💫`;

  const msg =
`나 ${targetName}${eunNeun(targetName)} 당신을 좋아합니다.

"나랑 사귀자!"`;

  // 처음 전환 순간에도 살짝만(과하지 않게)
  popHearts(8);
  typeWriter(msg, 55);
};

/** 3) 선택 → 결과 페이지 이동 */
yesBtn.onclick = () => {
  sessionStorage.setItem("targetName", targetName);
  location.href = "result-yes.html";
};
noBtn.onclick = () => {
  sessionStorage.setItem("targetName", targetName);
  location.href = "result-no.html";
};
