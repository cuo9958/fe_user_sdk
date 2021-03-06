interface IOpts {
    baseUrl?: string;
    apiUrl: string;
    loginUrl: string;
}
interface IModel {
    uid: string;
    token: string;
    headimg: string;
    nickname: string;
    rules: string;
    username: string;
    tell: string;
}
interface IReactSDK {
    init(): void;
    auth(err: any, success: any): void;
    info(): IModel;
    check(name: string | string[]): boolean;
    login(): void;
}
export declare function factory(opts: IOpts): IReactSDK;
export {};
