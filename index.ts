import { Group, GroupMetaData } from "./group";
import { User } from "./user";

const got = require("got");

const groupme_api = got.extend({
    prefixUrl: "https://api.groupme.com/v3",
});

const token = process.env.GM_TOKEN;
console.log(token);

async function getGroups(): Promise<Array<Group>> {
    const response = await groupme_api(`groups?token=${token}`);
    const responseObj = JSON.parse(response.body);
    let groups: Array<Group> = responseObj.response.map((group)=>{
        let meta: GroupMetaData = {
            phone_number: group.phone_number,
            type: group.type,
            description: group.description,
            image_url: group.image_url,
            creator: null,
            created_at: new Date(group.created_at),
            updated_at: new Date(group.updated_at),
            muted_until: group.muted_until,
            office_mode: group.office_mode,
            share_url: group.share_url ? new URL(group.share_url) : null,
            share_qr_code_url: group.share_qr_code_url ? new URL(group.share_qr_code_url) : null,
            message_count: group.messages.count,
        }
        let members: Array<User> = group.members.map((member)=>{
            return new User(member.name, member.id, member.image_url);
        });
        return new Group(group.name, group.id, members, meta);
    });

    return groups;
};

// async function getUserFromID(user_id: number): Promise<User> {
//     const response = await groupme_api(`users/${user_id}?token=${token}`)
//     const user = new User()
//     return user;
// }

let groups: Array<Group>;
getGroups().then((_groups)=>{
    groups = _groups;
    groups.forEach((value) => {
        console.log(value.name);
    });
});
