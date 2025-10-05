export type FormDataUpdateUser = {
    firstName: string;
    lastName: string;
    phone: string;
    gender: string;
    avatar?: File | null;
}
interface User {
    id: number;
    fullName: string;
    email: string;
    role: string;
    avatar?: string;
}
export interface UserState {
    user: User | null;
}