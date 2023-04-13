import React from "react";
import Place from "../domain/Place";
import ImageList from "../components/ImageList";
import "../styles/pointInfo.css";
import Map from "../domain/Map";
import LeafletMapAdapter from "../adapters/map/LeafletMapAdapter";
import ReviewsPage from "../components/place/ReviewsPage";
import OverviewPage from "../components/place/OverviewPage";
import Placemark from "../domain/Placemark";
import PODManager from "../adapters/solid/PODManager";

interface PointInformationProps {
    placemark: Placemark;
    map: Map;
}

interface PointInformationState {
    goBack: boolean;
    component : JSX.Element;
}

export default class PointInformation extends React.Component<PointInformationProps, PointInformationState> {

    private point: Place;
    private pod = new PODManager();

    public constructor(props: any) {
        super(props);
        this.point = new Place("Loading...", 0, 0, "", undefined, undefined, "");
        this.state = {goBack: false,
            component: <h2>Loading...</h2>
        };
        this.goBack = this.goBack.bind(this);
        this.handleClickReview = this.handleClickReview.bind(this);
        this.handleClickOverview = this.handleClickOverview.bind(this);
    }

    public async componentDidMount(): Promise<void> {
        this.point = await this.pod.getPlace(this.props.placemark.getPlaceUrl());
        this.setState({
            component: <OverviewPage place={this.point} />
        });
    }

    private goBack() {
        this.setState({goBack: true});
    }

    private handleClickReview(){
        this.setState({component: <ReviewsPage place={this.point} placeUrl={this.props.placemark.getPlaceUrl()}/>});
        
    };

    private handleClickOverview(){
        this.setState({component: <OverviewPage place = {this.point}/>});
    }

    /**
     * Returns the point information view, the ImageList returns a Slider
     * with the given images and the Link is just a button to go back to
     * the home page.
     * @author UO283069
     */
    public render(): JSX.Element {
        if (this.state.goBack) {
            return <LeafletMapAdapter map={this.props.map}/>;
        }
        return (
            <section>
                <div className="pointInformation">
                    <h1>Title: {this.point.title}</h1>
                    <div id="images">
                        <ImageList images={this.point.photos}></ImageList>
                    </div>
                    <p>Location: {this.point.latitude + ", " + this.point.longitude}</p>
                </div>
                <div>


                    <button 
                    id={this.state.component.type === OverviewPage ? 'selected' : 'unselected'
                    } onClick={this.handleClickOverview}>Overview</button>

                    <button 
                    id={this.state.component.type === ReviewsPage ? 'selected' : 'unselected'
                    } onClick={this.handleClickReview}>Reviews</button>

                    {this.state.component}
                    </div>
                <input type="button" id="back" value="Back" onClick={this.goBack}/>
            </section>
        );
    }

}