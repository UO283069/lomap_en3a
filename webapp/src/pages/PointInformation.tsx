import React from "react";
import MapPoint from "../domain/MapPoint";
import ImageList from "../components/ImageList";
import { Link } from "react-router-dom";
import "../styles/pointInfo.css";

interface PointInformationProps{
    point : MapPoint;
}

interface PointInformationState {

}

export default class PointInformation extends React.Component<PointInformationProps, PointInformationState> {

    private point: MapPoint;

    public constructor(props: any) {
        super(props);
        this.point = props.point;
    }

    /**
     * Returns the point information view, the ImageList returns a Slider
     * with the given images and the Link is just a button to go back to
     * the home page.
     * @author UO283069
     */
    public render(): JSX.Element {
        return (
            <section>
                <div className="pointInformation">
                    <h1>Title: {this.point.title}</h1>
                    <div id="images">
                        <ImageList images={this.point.images}></ImageList>
                    </div>
                    <p>Location: {this.point.location}</p>
                    <h2>Description</h2>
                    <p>{this.point.description}</p>
                </div>
                <Link to={"/home"} role="button" className="backButton"><button className="back">Back</button></Link>
            </section>
        );
    }

}