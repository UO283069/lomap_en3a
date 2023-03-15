import {
    buildThing,
    createSolidDataset,
    createThing,
    getPodUrlAll, getSolidDataset,
    saveSolidDatasetAt,
    setThing,
} from "@inrupt/solid-client";
import {SCHEMA_INRUPT} from "@inrupt/vocab-common-rdf";
import MapPoint from "../../domain/MapPoint";
import SolidSessionManager from "./SolidSessionManager";

export default class MapPointManager {

    private readonly MAPPOINTSURL: string = "LoMap/MapPoints";
    private sessionManager: SolidSessionManager = SolidSessionManager.getManager();

    /**
     * It stores a MapPoint in the POD of the current user logged in
     *
     * */
    public async createNewMapPoint(newLocation: MapPoint): Promise<void> {
        const podURL = await getPodUrlAll(this.sessionManager.getWebID(), {fetch: fetch});
        try{
            await this.appendToDataSet(podURL[0] + "public/" + this.MAPPOINTSURL, newLocation);
        } catch(fe){
            await this.createNewDataSet(podURL[0] + "public/" + this.MAPPOINTSURL, newLocation);
        }
    }

    /**
     * It creates a new DataSet file and adds the map point
     * */
    private async createNewDataSet(podURL: string, newLocation: MapPoint): Promise<null> {
        let courseSolidDataset = createSolidDataset();
        let placemark = buildThing(createThing({name: crypto.randomUUID()}))
            .addStringNoLocale(SCHEMA_INRUPT.name, newLocation.title)
            .addInteger(SCHEMA_INRUPT.latitude, newLocation.latitude)
            .addInteger(SCHEMA_INRUPT.longitude, newLocation.longitude)
            .build();
        courseSolidDataset = setThing(courseSolidDataset, placemark);
        await saveSolidDatasetAt(
            podURL[0],
            courseSolidDataset,
            {fetch: this.sessionManager.getSessionFetch()}// fetch from authenticated Session
        );
        return null;
    }

    /**
     * This method append the information to an existing file in the POD's user
     * */
    private async appendToDataSet(podURL: string, newLocation: MapPoint): Promise<null> {
        let courseSolidDataset = await getSolidDataset(podURL[0], {fetch: this.sessionManager.getSessionFetch()});
        let placemark = buildThing(createThing({name: crypto.randomUUID()}))
            .addStringNoLocale(SCHEMA_INRUPT.name, newLocation.title)
            .addInteger(SCHEMA_INRUPT.latitude, newLocation.latitude)
            .addInteger(SCHEMA_INRUPT.longitude, newLocation.longitude)
            .build();
        courseSolidDataset = setThing(courseSolidDataset, placemark);
        await saveSolidDatasetAt(
            podURL,
            courseSolidDataset,
            {fetch: this.sessionManager.getSessionFetch()}// fetch from authenticated Session
        );
        return null;
    }
}