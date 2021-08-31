"use strict";
{
  const btn = document.getElementById('btn');

  // タイマー用の宣言
  let timeoutId;
  // 回数の表示
  let no = 0;
  // 自分が正解した場合に数が増える（ゼロから開始）
  let score = 0;
  //スタートボタンの宣言
  let isStarted;
  //スコアの宣言
  let scored;
  //札に触れても反応しないようにする（基本設定）
  let isAnswered = true;



  //配列データの宣言(シャッフル関数始動)
  const karuta = shuffle([
    {
      clue: "Amazing giant green trees in a park with an ocean view.",
      efuda: "images/a.png",
      onsei: "sounds/A.mp3",
      hand: "images/hand-1.png",
      hand2: "images/aite-1.png",
    },
    {
      clue: "Bing Bong, everyone looks at the clock.",
      efuda: "images/b.png",
      onsei: "sounds/B.mp3",
      hand: "images/hand-2.png",
      hand2: "images/aite-2.png",
    },
    {
      clue: "Continue the walk all the way looking the paintings on the wall.",
      efuda: "images/c.png",
      onsei: "sounds/C.mp3",
      hand: "images/hand-3.png",
      hand2: "images/aite-3.png",
    },
    {
      clue: "Down at the seaside the spnning white blade",
      efuda: "images/d.png",
      onsei: "sounds/D.mp3",
      hand: "images/hand-4.png",
      hand2: "images/aite-4.png",
    },
    {
      clue: "Enjoy antiques in the 16th century.",
      efuda: "images/e.png",
      onsei: "sounds/E.mp3",
      hand: "images/hand-5.png",
      hand2: "images/aite-5.png",
    },
    {
      clue: "Feel at peace Mother nature",
      efuda: "images/f.png",
      onsei: "sounds/F.mp3",
      hand: "images/hand-6.png",
      hand2: "images/aite-6.png",
    },

    {
      clue: "Great guiding ship safely around the rocks.",
      efuda: "images/g.png",
      onsei: "sounds/G.mp3",
      hand: "images/hand-7.png",
      hand2: "images/aite-7.png",
    },

  ]).splice(0, 5);
  //↑のsplice絵札の表示枚数を設定（開始場所, 採用枚数）



  //----------シャッフル関数----------
  function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[j], arr[i]] = [arr[i], arr[j]];
    }
    return arr;
  }

  //----------ゲーム開始----------
  btn.addEventListener("click", () => {

    //スタートボタンを押した後は、反応しない
    if (isStarted) {
      return;
    }
    //スタートボタンを押したことを記録
    isStarted = true;

    //札に触れると反応するようにする
    isAnswered = false;

    //関数始動
    showClue();
    init();
    //player関数始動（タイマー設定）
    timeoutId = setTimeout(player, 5000);
  });



  //-------------読み句・ボタンの表示--------------  
  //読み句一文字ずつ表示する
  let msg = karuta[no].clue; // 読み句
  let speed = 100; // 表示スピード（1に近いほど速く）
  let flag = 1; // 繰り返し（0 = 繰り返す｜1 = 1回だけ）
  let count = 0;


  function showClue() {

    //最後の前の読み句まで、表示する
    if (no < karuta.length - 1) {

      // テキストフィールドにデータを渡す処理
      document.read.field.value = karuta[no].clue.substring(0, count);
      count++;
      let rep = setTimeout(showClue, speed);

      if (count > karuta[no].clue.length) {

        if (flag == 1) { clearTimeout(rep); }
        else { count = 0; }
      }
    }
    //ボタンの言葉表示
    //（開始～　no=0,1,2）
    if (no < karuta.length - 3) {
      //ボタンの言葉表示
      touchBtn.textContent = "次？";
    }

    //（残り札が2枚となった時, no = 2）
    if (no === karuta.length - 3) {
      //ボタンの言葉表示
      touchBtn.textContent = "次取れば、最後の1枚も獲得";
    }

    //（最後から2番目の札を、取った後, no = 3）
    if (no === karuta.length - 2) {
      //ボタンの言葉表示
      touchBtn.textContent = "結果を見る";
    }

  }



  //-------------句の読み上げ--------------  
  let music = new Audio();

  function init() {


    if (no < karuta.length - 1) {
      music.preload = "auto";
      music.src = karuta[no].onsei;
      music.load();
      music.loop = false;
      music.play();
    }
  }
  //？？
  function stop() {
    music.pause();
    music.currentTime = 0;
  }


  //-------------絵札の表示---------------
  //shuffle関数使う場合


  const shuffledCard = shuffle([...karuta]);
  shuffledCard.forEach((card, index) => {
    //shuffle関数使わない場合
    /* karuta.forEach((card, index) => {*/

    //（4）手の画像を埋め込む
    //絵札画像srcを作成
    const img = document.createElement("img");
    img.src = card.efuda;
    img.classList = "picture";

    //div1に絵札画像とclassを作成
    const div1 = document.createElement("div");
    div1.appendChild(img);
    div1.classList = "div1";

    //手の画像handとclassを作成
    const hand = document.createElement("img");
    hand.src = card.hand;
    hand.classList = "hand erase";

    //div2に手の画像handとclassを追加
    const div2 = document.createElement("div");
    div2.appendChild(hand);
    div2.classList = "div2";


    //手の画像hand2を作成
    const hand2 = document.createElement("img");
    hand2.src = card.hand2;
    hand2.classList = "hand2 erase";

    //div3に手の画像hand2を追加
    const div3 = document.createElement("div");
    div3.appendChild(hand2);
    div3.classList = "div3";


    //fuda直下のdiv0にdiv1, div2, div3を追加
    const div0 = document.createElement("div");
    div0.appendChild(div3);
    div0.appendChild(div2);
    div0.appendChild(div1);
    div0.classList = "div0";


    //fudaに子要素div0を追加（これで初めてHTMLに表示）
    const fuda = document.getElementById("fuda");
    fuda.appendChild(div0);


    //---------絵札をタッチ
    img.addEventListener("click", () => {
      judge(card);

      // 相手の手をとめる (Timeoutをクリアする)
      clearTimeout(timeoutId);

    });

  });

  //-------------取り札の正誤判定---------------
  function judge(card) {

    //（取り札が正しい場合）
    if (card.efuda === karuta[no].efuda) {

      //一度タッチして以降、他の札に触れても反応しない
      if (isAnswered) {
        return;
      }
      //札が取られたことを記録
      isAnswered = true;

      
      //音声ファイルを再生[play()]する
      document.getElementById('pat').play();

      //正誤ポップアップ画面を表示
      function popup() {

        //画面表示
        document.getElementById("touch").classList.remove("hidden");
        //メッセージを表示（ポップアップ上）
        document.getElementById("touchMessage").innerHTML = "取りました！";
        // 正解札を表示（ポップアップ上）
        document.getElementById("touchImage").src = karuta[no].efuda;
      }
      //関数始動（タイマー設定）
      setTimeout(popup, 500);

      // 手handのerase(hidden)状態を解除し、タッチした正解札と入れ替える

      const hand = document.querySelector("img[src = '" + karuta[no].hand + "']");
      hand.classList.remove("erase");
      hand.classList.add("large");

      const efuda = document.querySelector("img[src = '" + karuta[no].efuda + "']");
      efuda.classList.add("small");
      efuda.classList.remove("picture");
      /* efuda.classlist.add("size20");   */

      document.querySelector("img[src = '" + karuta[no].efuda + "']").src = karuta[no].hand;
      document.querySelector("img[src = '" + karuta[no].hand + "']").src = karuta[no].efuda;

      //スコア加点（自分が正解したので）
      score++;
      //自分が正解したので、true
      scored = true;

    }

    //お手付きの場合
    //一度タッチして以降、他の札に触れても反応しない
    //重要：isAnswered = trueとしない。Playerに移動するため
    else {
      if (isAnswered) {
        return;
      }

      // 正解札を手の画像に切り替える
      /* document.querySelectorAll("img")[index].src = "images/hand.png" */
      
      // 音声ファイルを再生[play()]する
      document.getElementById('boyon').play();
      //タイマー設定
      setTimeout(player, 100);
    }

  }
  //-------------相手が先に取る---------------
  function player() {
    // 音声ファイルを再生[play()]する
    document.getElementById('ippon').play();

    //一度タッチして以降、他の札に触れても反応しない
    if (isAnswered) {
      return;
    }
    //札が取られたことを記録
    isAnswered = true;

    

    //相手が正解なので、false
    scored = false;

    //正誤ポップアップ画面の表示
    function popup2() {
      //画面表示
      document.getElementById("touch").classList.remove("hidden");
      //メッセージ表示(ポップアップ上）
      document.getElementById("touchMessage").innerHTML = "残念、取られました！";
      //正解札を表示(ポップアップ上）
      document.getElementById("touchImage").src = karuta[no].efuda;
    }
    //関数始動（タイマー設定）
    setTimeout(popup2, 500);

    // 手hand2のerase(hidden)を解除し、
    const hand2 = document.querySelector("img[src = '" + karuta[no].hand2 + "']");
    hand2.classList.remove("erase");
    hand2.classList.add("large");

    //一番上に来る画像hand2を小さくする
    const efuda = document.querySelector("img[src = '" + karuta[no].efuda + "']");
    efuda.classList.add("small");
    efuda.classList.remove("picture");

    //正解の絵札と手hand2を入れ替える
    document.querySelector("img[src = '" + karuta[no].efuda + "']").src = karuta[no].hand2;
    document.querySelector("img[src = '" + karuta[no].hand2 + "']").src = karuta[no].efuda;

  }


  //-------------ボタンをクリック---------------------
  touchBtn.addEventListener("click", () => {

    //次の回に札をタッチできるようにする
    isAnswered = false;

    


    if (no === karuta.length - 2) {

      //最後に残った札を消す）
      const image = document.querySelector("img[src = '" + karuta[no + 1].efuda + "']")
      image.classList.add("erase");
    }
    //-------取り札ミニ画像を表示（自分が取った場合）
    if (scored === true) {
      //画像(HTML要素）の作成
      const img = document.createElement("img");
      img.src = karuta[no].efuda;

      //liに画像を追加
      const li = document.createElement("li");
      li.appendChild(img);
      //ulに子要素liを追加（これで初めてHTMLに表示）
      const win = document.getElementById("win");
      win.appendChild(li);

      //（最後から2枚目を取った場合）
      if (no === karuta.length - 2) {

        //スコア加点（最後に残った札の分）
        score++;

        //取札置き場に表示（最後に残った札）
        const img = document.createElement("img");
        img.src = karuta[no + 1].efuda;
        //liに画像を追加
        const li = document.createElement("li");
        li.appendChild(img);
        //ulに子要素liを追加（これで初めてHTMLに表示）
        const win = document.getElementById("win");
        win.appendChild(li);

      }

    } else
    //取り札ミニ画像を表示（相手が取った場合）
    {
      //画像(HTML要素）の作成
      const img = document.createElement("img");
      img.src = karuta[no].efuda;
      //liに画像を追加
      const li = document.createElement("li");
      li.appendChild(img);
      //ulに子要素liを追加（これで初めてHTMLに表示）
      const win2 = document.getElementById("win2");
      win2.appendChild(li);

      //（最後から2枚目を取った場合）
      if (no === karuta.length - 2) {

        //取札置き場に表示（最後に残った札のミニ画像)
        const img = document.createElement("img");
        img.src = karuta[no + 1].efuda;
        //liに画像を追加
        const li = document.createElement("li");
        li.appendChild(img);
        //ulに子要素liを追加（これで初めてHTMLに表示）
        const win2 = document.getElementById("win2");
        win2.appendChild(li);
      }
    }

    //表示を消す-----------------------
    //ボックス内の読み句を消す
    document.read.field.value = "";
    //正誤ポップアップを消す
    document.getElementById("touch").classList.add("hidden");

    //手handを、消す
    const hand = document.querySelector("img[src = '" + karuta[no].hand + "']");
    hand.classList.add("erase");

    //手hand2を、消す
    const hand2 = document.querySelector("img[src = '" + karuta[no].hand2 + "']");
    hand2.classList.add("erase");

    //絵札を消す
    const efuda = document.querySelector("img[src = '" + karuta[no].efuda + "']");
    efuda.classList.add("erase");

    //カウント追加
    no++;
    //読句の表示カウントをゼロに戻す（これがないと、2回目以降の１文字づつ表示がうまく機能しない）
    count = 0;

    //結果表示（no = 3の場合に稼働する）--------------------------
    if (no === karuta.length - 1) {

      //ゲーム終了→ポップアップ表示（結果）
      document.getElementById("result").classList.remove("hidden");
      //メッセ―ジ表示「（　枚取りました」--（勝ち負けに関わらず共通）
      document.getElementById("maisu").innerHTML = `(${score}枚取りました)`;
      // 取札の数が過半数の場合
      if (score >= karuta.length * 0.5) {
        //音声ファイルを再生[play()]する
        document.getElementById('rappa').play();

        //メッセージ表示「勝ちました」
        document.getElementById("resultMessage").innerHTML = "勝ちました！";
        //画像表示（金色のトロフィー）表示
        document.getElementById("resultImage").src = "images/gold.png";
        // 過半数以下の場合
      } else {
        //音声ファイルを再生[play()]する
        document.getElementById('chiin').play();
        //メッセ―ジ表示「残念、負けました」
        document.getElementById("resultMessage").innerHTML = "残念、負けました";
        //画像表示（銀のトロフィー）
        document.getElementById("resultImage").src = "images/silver.png";
      }
    }

    //次の準備----------------------
    //関数の始動
    showClue();
    init();

    //タイマー設定（No= 0,1,2に作動する。3になったら作動しない)
    if (no < karuta.length - 1) {
      timeoutId = setTimeout(player, 5000);
    }


  });

}
