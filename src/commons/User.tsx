import { CommonProps } from "./CommonProps";

export type UserProps = CommonProps & {
    username: string,
    fullName: string,
    password: string,
    token: string
}
