import {Request, Response} from "express";
import {PlaceType} from "../../types/PlaceType";
import Place from "../../models/Place";

const getPlaces = async (req: Request, res: Response): Promise<void> => {
    try {
        const places: PlaceType[] = await Place.find();
        res.json({places});
    }
    catch (error) {
        console.log("An error has occurred while retrieving the list of places: " + error)
    }
}
export { getPlaces }