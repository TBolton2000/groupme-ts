import { User } from "./user";

export interface GroupMetaData {
    phone_number: string;
    type: "private" | "public";
    description: string;
    image_url: string | null;
    creator: User | null;
    created_at: Date;
    updated_at: Date;
    muted_until: Date | null;
    office_mode: boolean;
    share_url: URL | null;
    share_qr_code_url: URL | null;
    message_count: number;
}

export class Group {
    public name: string;
    private id: string;
    private members: Array<User>;
    private meta: GroupMetaData;

    public constructor(name: string, id: string, members: Array<User>, meta: GroupMetaData) {
        this.name = name;
        this.id = id;
        this.meta = meta;
    }
}