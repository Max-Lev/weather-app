export class WeatherModel {

    clouds?: string = '';
    temprature?: any = '';
    formatted_address?: string = '';
    img?: string = '';
    ID?: number;
    lat: number;
    lon: number;
    
    constructor(infoMap?: any, infoTemp?: any) {

        let MapInfo = infoMap;
        let TempInfo = infoTemp;

        this.clouds = TempInfo.clouds.all + `${'%'}`;
        this.temprature = Math.max(TempInfo['main'].temp - 273.15).toFixed(2) + `°C`;

        this.img = MapInfo.img;
        this.formatted_address = MapInfo.formatted_address;
        this.lat = MapInfo.lat;
        this.lon = MapInfo.lon;        
    }

}