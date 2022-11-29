import { QueryRowFormat } from "@itwin/core-common";
import { DecorateContext, Decorator, IModelConnection, Marker, ScreenViewport } from "@itwin/core-frontend";
import { SmartDeviceMarker } from "../marker/SmartDeviceMarker";

// if we don't use 'implements Decorator' then still this will work
export class SmartDeviceDecorator implements Decorator {
    private _iModel : IModelConnection;
    private _markerSet : Marker[];

    constructor(vp: ScreenViewport){
        this._iModel= vp.iModel;
        this._markerSet = [];

        this.addMarkers();
    }

    private async getSmartDeviceData () {
        const query  = `   
            SELECT 
            SmartDeviceType,
            SmartDeviceId,
            Origin
            FROM DgnCustomItemTypes_HouseSchema.SmartDevice
            WHERE Origin IS NOT NULL
        `
        const results = this._iModel.query(query, undefined, {rowFormat:QueryRowFormat.UseJsPropertyNames});
        const values = [];
        for await(const row of results)
            values.push(row)

        return values;
    }

    private async addMarkers(){
        const values = await this.getSmartDeviceData();

        values.forEach(value =>{
            const smartDeviceMarker = new SmartDeviceMarker(
                {x:value.origin.x , y:value.origin.y ,z:value.origin.z },
                {x:20 , y:20},
                value.smartDeviceId,
                value.smartDeviceType
            );

           this._markerSet.push(smartDeviceMarker);
        })        
    }
 
    public decorate(context : DecorateContext):void {
        this._markerSet.forEach(marker =>{
            marker.addDecoration(context);
        })
    }
}