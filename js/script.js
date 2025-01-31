

let angelNumbers = [];

// 🌐 加载 JSON 数据
async function loadAngelNumbers() {
  try {
    const response = await fetch('data/angelNumbers.json');
    if (!response.ok) throw new Error("Failed to fetch JSON");

    angelNumbers = await response.json();
    console.log("✅ Loaded angel numbers:", angelNumbers); // Debugging
  } catch (error) {
    console.error("❌ Error loading angel numbers:", error);
  }
}

// 🔍 搜索天使数字
async function searchAngelNumber() {
  const userInput = document.getElementById("searchInput").value.trim();
  if (!/^\d+$/.test(userInput)) {
    alert("Please enter a valid angel number.");
    return;
  }

  if (!angelNumbers.length) await loadAngelNumbers();

  console.log("🔍 Searching for:", userInput); // Debugging

  const foundNumber = angelNumbers.find(item => item.number.trim() === userInput);
  
  if (foundNumber) {
    displayResult(foundNumber);
  } else {
    alert("Number not found!");
  }
}

// 📌 显示结果
function displayResult(angelNumberObj) {
    document.getElementById("resultArea").innerHTML = `
      <div class="result-card">
        <h2>Angel Number: ${angelNumberObj.number}</h2>
        <p>${angelNumberObj.meaning}</p>
      </div>
    `;
  }
  

// 🎲 随机推荐天使数字
function randomNumber() {
  if (!angelNumbers.length) return;
  const randomIndex = Math.floor(Math.random() * angelNumbers.length);
  displayResult(angelNumbers[randomIndex]);
}


// 🎯 绑定事件监听
document.getElementById("searchBtn").addEventListener("click", searchAngelNumber);
document.getElementById("searchInput").addEventListener("keypress", e => {
  if (e.key === "Enter") searchAngelNumber();
});

// 🔄 加载 JSON 数据
loadAngelNumbers();
