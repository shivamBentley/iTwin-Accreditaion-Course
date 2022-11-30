import { XAndY, XYAndZ } from "@itwin/core-geometry";
import { BeButtonEvent, IModelApp, Marker, NotifyMessageDetails, OutputMessagePriority, StandardViewId } from "@itwin/core-frontend";

export class SmartDeviceMarker extends Marker {
    private _smartDeviceId: string;
    private _smartDeviceType : string;
    private _elementId : string;

    constructor(location: XYAndZ, size: XAndY, smartDeviceId: string , smartDeviceType: string , elementId : string) {
        super(location, size);

        this._smartDeviceId = smartDeviceId;
        this._smartDeviceType = smartDeviceType;   
        this._elementId = elementId;

        this.setImageUrl(`/${this._smartDeviceType}.png`)
    }

    public onMouseButton(_ev: BeButtonEvent): boolean {
        if (!_ev.isDown) return true;
        IModelApp.notifications.outputMessage(new NotifyMessageDetails(OutputMessagePriority.Info, "Element " + this._smartDeviceId + " was clicked on"));
        IModelApp.viewManager.selectedView!.zoomToElements(this._elementId, { animateFrustumChange: true, standardViewId: StandardViewId.RightIso });
        return true;
      }

}