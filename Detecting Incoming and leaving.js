const scriptName = "DB test";

//DataBase 세팅

const SQLiteDatabase = android.database.sqlite.SQLiteDatabase;

let db = null;
let db2 = null;

function updateDB() {
    db = SQLiteDatabase.openDatabase("/data/data/com.kakao.sans/databases/KakaoTalk.db", null, SQLiteDatabase.CREATE_IF_NECESSARY);
    db2 = SQLiteDatabase.openDatabase("/data/data/com.kakao.sans/databases/KakaoTalk2.db", null, SQLiteDatabase.CREATE_IF_NECESSARY);
}
updateDB();

function decrypt(userId, enc, text) {
    try {
        let iv = toByteArray([15, 8, 1, 0, 25, 71, 37, -36, 21, -11, 23, -32, -31, 21, 12, 53]);
        let password = toCharArray([22, 8, 9, 111, 2, 23, 43, 8, 33, 33, 10, 16, 3, 3, 7, 6]);
        let prefixes = ["", "", "12", "24", "18", "30", "36", "12", "48", "7", "35", "40", "17", "23", "29", "isabel", "kale", "sulli", "van", "merry", "kyle", "james", "maddux", "tony", "hayden", "paul", "elijah", "dorothy", "sally", "bran"];
        let salt = new _String((prefixes[enc] + userId).slice(0, 16).padEnd(16, "\x00")).getBytes("UTF-8");
        let secretKeySpec = new SecretKeySpec(SecretKeyFactory.getInstance("PBEWITHSHAAND256BITAES-CBC-BC").generateSecret(new PBEKeySpec(password, salt, 2, 256)).getEncoded(), "AES");
        let ivParameterSpec = new IvParameterSpec(iv);
        let cipher = Cipher.getInstance("AES/CBC/PKCS5Padding");
        cipher.init(2, secretKeySpec, ivParameterSpec);
        return String(new _String(cipher.doFinal(Base64.decode(text, 0)), "UTF-8"));
    } catch (e) {
        return (", 복호화 실패....");
    }
}

function toByteArray(bytes) {
    let res = _Array.newInstance(_Byte.TYPE, bytes.length);
    for (var i = 0; i < bytes.length; i++) {
        res[i] = new _Integer(bytes[i]).byteValue();
    }
    return res;
}

function toCharArray(chars) {
    return new _String(chars.map((e) => String.fromCharCode(e)).join("")).toCharArray();
}

const Context = android.content.Context;
const DatabaseUtils = android.database.DatabaseUtils;
const PowerManager = android.os.PowerManager;
const Base64 = android.util.Base64;
const _Array = java.lang.reflect.Array;
const _Byte = java.lang.Byte;
const _Integer = java.lang.Integer;
const Runtime = java.lang.Runtime;
const _String = java.lang.String;
const Timer = java.util.Timer;
const TimerTask = java.util.TimerTask;
const Cipher = javax.crypto.Cipher;
const IvParameterSpec = javax.crypto.spec.IvParameterSpec;
const PBEKeySpec = javax.crypto.spec.PBEKeySpec;
const SecretKeyFactory = javax.crypto.SecretKeyFactory;
const SecretKeySpec = javax.crypto.spec.SecretKeySpec;
const JSONObject = org.json.JSONObject;
//방이름 불러오는놈
function getRoomName(chat_id) {

try {

let room = "";

let cursor = db.rawQuery("SELECT link_id FROM chat_rooms WHERE id=" + chat_id, null);

cursor.moveToNext();

let link_id = cursor.getString(0);

cursor.close();

if (link_id != null) {

let cursor2 = db2.rawQuery("SELECT name FROM open_link WHERE id=" + link_id, null);

cursor2.moveToNext();

room = cursor2.getString(0);

cursor2.close();

} else {

return null;

}

return room;

} catch (e) {

Log.error(e.lineNumber + ": " + e);

return null;

}

}

//사람이름 불러오기 My_Key에 봇 user_id 넣어야함

var My_Key = "";
function getUserName(user_id, json) {

try {

let cursor = db2.rawQuery("SELECT * FROM friends WHERE id=" + user_id, null);

cursor.moveToNext();

let data = {};

let columns = ["_id", "contact_id", "id", "type", "uuid", "phone_number", "raw_phone_number", "name", "phonetic_name", "profle_image_url", "full_profile_image_url", "original_profile_image_url", "status_message", "chat_id", "brand_new", "blocked", "favorite", "position", "v", "board_v", "ext", "nick_name", "user_type", "story_user_id", "accout_id", "linked_services", "hidden", "purged", "suspended", "member_type", "involved_chat_ids", "contact_name", "enc", "created_at", "new_badge_updated_at", "new_badge_seen_at", "status_action_token"];

for (let i = 0; i < columns.length; i++) {

data[columns[i]] = cursor.getString(i);

}

cursor.close();

return decrypt(My_Key, data.enc, data.name);

} catch (e) {

return e;

}

};

getUserData = function (user_id) {
        try {
            let cursor = db_2.rawQuery(('SELECT * FROM friends WHERE id=' + user_id), null),
                data = new Object(),
                columns = [
                    '_id', 'contact_id', 'id', 'type', 'uuid', 'phone_number', 'raw_phone_number','name',
                    'phonetic_name','profle_image_url', 'full_profile_image_url', 'original_profile_image_url',
                    'status_message', 'chat_id', 'brand_new', 'blocked', 'favorite', 'position', 'v', 'board_v',
                    'ext', 'nick_name', 'user_type', 'story_user_id', 'accout_id', 'linked_services', 'hidden',
                    'purged', 'suspended', 'member_type', 'involved_chat_ids', 'contact_name', 'enc', 'created_at',
                    'new_badge_updated_at', 'new_badge_seen_at', 'status_action_token'
                ];
    
    
            cursor.moveToNext();
            columns.forEach((e, i) => data[e] = cursor.getString(i));
            cursor.close();

            return decrypt(this.key, data.enc, data.name);
        } catch (e) {
            return null;
        }
};
//============================================================

const n = "\n";



const Kartroom = {"18303788426883321":"카톡봇 테스트방","18298386343786206^^":"레전드군단 텟 테스트"};

var allsee = "\u200d".repeat (500);

const Jsoup = org.jsoup.Jsoup;




let go = false;

function response(room, msg, sender, isGroupChat, replier, imageDB, packageName) {
  
    if (msg == ".중지") {
      replier.reply("현재 상태: "+go);
      go = false;
      replier.reply("현재 상태: "+go);
    }
    
    if (msg == ".시작") {
      replier.reply("현재 상태: "+go);
      go = true;
      replier.reply("현재 상태: "+go);
      while (go) {
        
        java.lang.Thread.sleep(2000);


let chatdata = db.rawQuery("SELECT * FROM chat_logs", null);
chatdata.moveToLast();

let keys = ["_id", "id", "type", "chat_id", "user_id", "message", "attachment", "created_at", "deleted_at", "client_message_id", "prev_id", "referer", "supplement", "v"];

try {
  let json = {};
  for (i in keys) {
    json[keys[i]] = chatdata.getString(i);
  }
  
  //복호화
  try {
  json["message"] =
    JSON.parse(decrypt(json["user_id"], JSON.parse(json["v"]).enc, json["message"]));
    } catch (e) {}
  try {
  json["attachment"] =
    JSON.parse(decrypt(json["user_id"], JSON.parse(json["v"]).enc, json["attachment"]));
    } catch (e) {}
    
  json["v"] = JSON.parse(json["v"]);
    
  chatdata.moveToPrevious();
  //if (json.type == "0") replier.reply(json.v.origin);
  //var a = json.v.origin;
  var Room = getRoomName(json.chat_id);
  
switch (json.message.feedType) {
  
  case 2:
  replier.reply(Room);
    replier.reply(Room, "안녕히가세요, "+json.message.member.nickName+"님!");
    break;
  case 4:
  replier.reply(Room);
    replier.reply(Room, "안녕하세요, "+json.message.members[0].nickName+"님!");
     //------------------------------------
     //replier.reply(Object.keys(Kartroom));
    
   //------------------------------------
    break;
  case 6:
  replier.reply(Room);
    replier.reply(Room, "다시는 오지 마세요, "+json.message.member.nickName+"님!");
    break;
}

} catch(e) {replier.reply(e+e.lineNumber);}

      }
    }
  }

