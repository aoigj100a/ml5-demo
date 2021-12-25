# ml5.js

## overview
[ml5.js](https://ml5js.org/) 是基於 [TensorFlow](https://www.tensorflow.org/js?hl=zh-tw) 開發的函式庫，用較為簡單的 API 就能在 web 上面做一些關於機器學習的事情。

能做到：
- 執行模型
- 重新訓練模型
- 開發基於 javaScript 的機器學習

[Demo 一覽](https://examples.ml5js.org/)

## 起手式
參考：[Geting Started](https://learn.ml5js.org/#/)

用最最最少的 code 來體驗一下 ml5 吧。

只要有一頁靜態網頁。
- index.html

**index.html 的內容**
這段網頁內容是在開發者工具的consloe裡面顯示ml5的版本號。
```htmlembedded
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>Getting Started with ml5.js</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://unpkg.com/ml5@latest/dist/ml5.min.js"></script>
  </head>

  <body>
    <script>
      // Your code will go here
      // open up your console - if everything loaded properly you should see the correct version number
      console.log('ml5 version:', ml5.version);
    </script>
  </body>
</html>
```

**利用 CDN 的方式引入**
添加這一段程式碼就能在網頁中使用ml5。
```htmlembedded
<script src="https://unpkg.com/ml5@latest/dist/ml5.min.js"></script>
```

### 添加 p5.js 來做繪圖

**index.html**

```htmlembedded
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>Getting Started with ml5.js</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- p5 -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.0.0/p5.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.0.0/addons/p5.sound.min.js"></script>
    <!-- ml5 -->
    <script src="https://unpkg.com/ml5@latest/dist/ml5.min.js"></script>
  </head>

  <body>
    <script>
      // Your code will go here
      // open up your console - if everything loaded properly you should see the latest ml5 version
      console.log('ml5 version:', ml5.version);

      function setup() {
        createCanvas(400, 400);
      }

      function draw() {
        background(200);
      }
    </script>
  </body>
</html>
```

## imageClassifier API

imageClassifier 用來載入模型（圖片或者影片），創建一組可用來做分類的物件實體。

### 載入圖片

**基本用法**
```javascript
// 初始化圖片分類方法語與模型
const classifier = ml5.imageClassifier('MobileNet', modelLoaded);

// 當模型載入之後要執行的 function
function modelLoaded() {
  console.log('Model Loaded!');
}

// 用指定的圖像來進行圖片預測
classifier.classify(document.getElementById('image'), (err, results) => {
  console.log(results);
});
```

### 載入影像
[範例](https://github.com/ml5js/ml5-library/tree/main/examples/p5js/ImageClassification/ImageClassification_Video)是在網頁上開啟webcam，並提供錄像顯示（於是能看到自己被拍攝）。

**我們需要**
- index.html -> 一頁用來顯示的網頁
- sketch.js -> 做繪圖的 js 腳本

**index.html 的內容**
```htmlembedded
<html>

<head>
  <meta charset="UTF-8">
  <title>Webcam Image Classification using MobileNet and p5.js</title>

  <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.9.0/p5.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.9.0/addons/p5.dom.min.js"></script>

  <script src="https://unpkg.com/ml5@latest/dist/ml5.min.js"></script>

</head>

<body>
  <h1>Webcam Image Classification using MobileNet and p5.js</h1>
  <script src="sketch.js"></script>
</body>

</html>
```

**sketch.js 的內容**

```javascript
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

```
sketch.js 看完整體之後，來拆解一下：
1. 初始化變數
2. 入口 `function setup()`
3. 取得結果 `function gotResult()`

### 有影片之後做的事情

有做些許調整，想一想還是創一個 repo 來放程式碼好了。
範例的模型是用來偵測 webcam 被阻擋的程度，鏡頭全部都被擋住就會顯示 1。

**一樣兩個檔案：**
- index.html -> 一頁用來顯示的網頁
- sketch.js -> 做繪圖的 js 腳本

**index.html**

```htmlembedded
<html>

<head>
  <meta charset="UTF-8">
  <title>Webcam Image Classification using a pre-trianed customized model and p5.js</title>

  <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.9.0/p5.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.9.0/addons/p5.dom.min.js"></script>

  <script src="https://unpkg.com/ml5@latest/dist/ml5.min.js"></script>
</head>

<body>
  <h1>Webcam Image Classification using a pre-trianed customized model and p5.js</h1>
  <p>If you cover your webcam, this model will classify it as "1", otherwise will classify anything else else "0" </p>
  <script src="sketch.js"></script>
</body>

</html>
```

**sketch.js**

```javascript
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
  resultsP = createP('Loading model and video...');
  classifyVideo();
}

// 取得當時的影像，創建 classify 實體
function classifyVideo() {
  classifier.classify(video, gotResult);
}

// 當取得結果時要做的事
function gotResult(err, results) {
  // 暫時還不明白是在做什麼的程式碼
  resultsP.html(`Label: ${results[0].label  } ${nf(results[0].confidence, 0, 2)}`);
  classifyVideo();
}
```

## 總結

[筆記裡的程式碼 repo 在這](https://github.com/aoigj100a/ml5-demo)

學會 ml5.js 做影像分析的初步的使用方式。將模型丟進 ml5.imageClassifier 就能夠創造能被運算的目標的影像或者圖片，之後在使用 classify 取得運算結果。

ml5.js 與 p5.js 配合得相當好，一次能知道兩個函式庫還不錯。

ml5.js -> 做機器學習（基於 TensorFlow)
p5.js -> 做繪圖（基於 HTML5 API - canvas)

**個人學習用筆記，歡迎指教，指正錯誤。**

## 參考資料

* [ml5.js examples](https://examples.ml5js.org/)
* [Getting Started](https://learn.ml5js.org/#/)
* [學習用範例所在網址](https://github.com/ml5js/ml5-library/tree/main/examples/p5js/ImageClassification/ImageClassification_Video)
