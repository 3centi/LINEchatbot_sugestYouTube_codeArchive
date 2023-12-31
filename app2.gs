function doPost(e) {
  //LINE Messaging APIのチャネルアクセストークンを設定
  let token = "「アクセストークン」";

  // WebHookで取得したJSONデータをオブジェクト化し、取得
  let eventData = JSON.parse(e.postData.contents).events[0];

  //取得したデータから、応答用のトークンを取得
  let replyToken = eventData.replyToken;

  //取得したデータから、メッセージ種別を取得
  let messageType = eventData.message.type;

  //取得したデータから、ユーザーが投稿したメッセージを取得
  let userMessage = eventData.message.text;

  // 応答メッセージ用のAPI URLを定義
  let url = "https://api.line.me/v2/bot/message/reply";
  let replyMessage = "";
  if (messageType != "text") {
    replyMessage = "文字列を送信してください";
  } else {
    let results = YouTube.Search.list("snippet", {
      q: userMessage,
      maxResults: 2,
    });

    replyMessage =
      results.items[0].snippet.title +
      "\n https://www.youtube.com/embed/" +
      results.items[0].id.videoId +
      "\n\n" +
      results.items[1].snippet.title +
      "\n https://www.youtube.com/embed/" +
      results.items[1].id.videoId;
  }

  //APIリクエスト時にセットするペイロード値を設定する
  let payload = {
    replyToken: replyToken,
    messages: [
      {
        type: "text",
        text: replyMessage,
      },
    ],
  };
  //HTTPSのPOST時のオプションパラメータを設定する
  let options = {
    payload: JSON.stringify(payload),
    myamethod: "POST",
    headers: { Authorization: "Bearer " + token },
    contentType: "application/json",
  };
  //LINE Messaging APIにリクエストし、ユーザーからの投稿に返答する
  UrlFetchApp.fetch(url, options);
}
