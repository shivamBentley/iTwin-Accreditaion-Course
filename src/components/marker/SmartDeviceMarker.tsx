import { XAndY, XYAndZ } from "@itwin/core-geometry";
import { Marker } from "@itwin/core-frontend";

export class SmartDeviceMarker extends Marker {
    private _smartDeviceId: string;

    constructor(location: XYAndZ, size: XAndY, smartDeviceId: string) {
        super(location, size);

        this._smartDeviceId = smartDeviceId;

        const htmlElement = document.createElement('div');
        htmlElement.innerHTML = `
        <h3>${this._smartDeviceId}</h3>
    `
        this.htmlElement = htmlElement;
    }

}