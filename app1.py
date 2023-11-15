import json
from linebot import LineBotApi
from linebot.models import TextSendMessage

# info.jsonにアクセストークンなどを格納
file = open("info.json","r")
info = json.load(file)

CHANNEL_ACCESS_TOKEN = info["CHANNEL_ACCESS_TOKEN"]
line_bot_api = LineBotApi(CHANNEL_ACCESS_TOKEN)

def main():
    USER_ID = info["USER_ID"]
    message = TextSendMessage(text = "Good Morning!! \nHave a nice day!!")
    line_bot_api.push_message(USER_ID,messages=message)

if __name__ == "__main__":
    main()