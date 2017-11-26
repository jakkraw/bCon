
export class Settings {
    public static socketPrepend = "ws://";
    public static httpsPrepend = "https://";
    public static httpPrepend = "http://";
    public static base = 
    //"bcon-spring.herokuapp.com/";
    "192.168.0.199:8080/";
    public static address:string = Settings.httpPrepend+ Settings.base;
    public static allOrdersUrl:string = Settings.address+"orders";
    public static updateOrdersUrl:string = Settings.address+"orders";
    public static testCredentialsUrl:string = Settings.address+"private";
    public static LoginUrl:string = Settings.address+"oauth/token";
    public static AppBase64:string = "YmNvbi13ZWItYXBwOnNlY3JldA==";
    public static WebsocketEndpoint:string = Settings.address+"stomp-endpoint";
    public static RestaurantInfo:string = Settings.address+"user/restaurant";
}
