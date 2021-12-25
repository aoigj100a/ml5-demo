// 載入模型
const checkpoint =
  "./model/image-model.json";
// 初始化變數
let classifier;
let video;
let resultsP;

// 載入之前的預處理
function preload() {
  // 創建相機
  video = createCapture(VIDEO);
  // 用imageClassifier()載入 checkpoint (模型)
  classifier = ml5.imageClassifier(checkpoint);
}
// 開始
function setup() {
  //  noCanvas() 清除畫布，用意是確保 setup() 之前沒有殘留上一偵的畫布
  noCanvas();
  // 在網頁上添加一個<p>標籤並給予內容 -> 是網頁載入影片之前要顯示的文字
  resultsP = createP("Loading model and video...");
  classifyVideo();
}

// 取得當時的影像，創建 classify 實體
function classifyVideo() {
  classifier.classify(video, gotResult);
}

// 當取得結果時要做的事
function gotResult(err, results) {
  // 暫時還不明白是在做什麼的程式碼
  resultsP.html(
    `Label: ${results[0].label} ${nf(results[0].confidence, 0, 2)}`
  );
  classifyVideo();
}
