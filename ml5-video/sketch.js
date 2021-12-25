// 初始化變數
let classifier;
let video;
let resultsP;

// 開始
function setup() {
// 創建一個攝影機
  video = createCapture(VIDEO);
//     創建 classify 實體
  classifier = ml5.imageClassifier('MobileNet', video, modelReady);
// 在網頁上添加一個<p>標籤並給予內容 -> 是網頁載入影片之前要顯示的文字
  resultsP = createP('Loading model and video...');
}

function modelReady() {
  console.log('Model Ready');
  classifyVideo();
}

// 當取得結果時要做的事
function gotResult(err, results) {
  // 暫時還不明白是在做什麼的程式碼
  resultsP.html(`Label: ${results[0].label  } ${nf(results[0].confidence, 0, 2)}`);
  classifyVideo();
}