
export class Settings {
    public static address:string = "https://bcon-spring.herokuapp.com/"; //"http://192.168.0.199:8080/";
    public static allOrdersUrl:string = Settings.address+"orders";
    public static updateOrdersUrl:string = Settings.address+"orders";
    public static testCredentialsUrl:string = Settings.address+"private";
    public static LoginUrl:string = Settings.address+"oauth/token";
    public static AppBase64:string = "YmNvbi13ZWItYXBwOnNlY3JldA==";
}
