interface IOpts {
    baseUrl: string;
    apiUrl: string;
    loginUrl: string;
}
interface IModel {
    uid: string;
    token: string;
    headimg: string;
    nickname: string;
    rules: string;
}
interface IReactSDK {
    init(): void;
    auth(fn: any): void;
    info(): IModel;
    check(name: string | string[]): void;
    login(): void;
}
export declare function factory(opts: IOpts): IReactSDK;
export {};
