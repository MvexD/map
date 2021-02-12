require([
    "esri/Map",
    "esri/views/MapView",
    "esri/layers/CSVLayer",
    "esri/layers/support/LabelClass",
    "esri/widgets/ScaleBar",
], function (Map, MapView, CSVLayer, LabelClass, ScaleBar) {

    const map = new Map({
        basemap: "topo-vector"
    });

    const url =
        "./covid_stats.csv"

    const csvLayer = new CSVLayer({
        url: url,
        copyright: "Covid",
    });

    const statesLabelClass = new LabelClass({
        labelExpressionInfo: {expression: "$feature.Today"},
        symbol: {
            type: "text",
            color: "black",
            haloSize: 1,
            haloColor: "white"
        },
        font: {
            family: "Ubuntu Mono",
            size: 14,
            weight: "bold"
        },
    });

    csvLayer.labelingInfo = [statesLabelClass];

    map.add(csvLayer);

    const view = new MapView({
        container: "viewDiv",
        map: map,
        center: [-118.71511, 34.09042],
        zoom: 11
    });

    document.querySelector("#poland").onclick = () => {
        view.center = [20, 51]
        view.zoom = 6
    }

    const scalebar = new ScaleBar({
        view: view
    });

    view.ui.add(scalebar, "bottom-left");
});
