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
