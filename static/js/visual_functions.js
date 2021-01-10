/* Process Order:

1. Get csv with image names and affect values

2. User inputs 3 emotions to cross-reference 
    (for now we'll start with Anger, Anxiety, and Sadness)

3. Read the 3 emotions into an array

4. Plot 3D graph

*/


// 1. Get csv with image names and affect values

var affect_csv_path = "../data/liwc_toParse.csv";


// 2. User inputs 3 emotions to cross-reference


// 3. Read the 3 emotions into an array


// 4. Plot 3D graph
// start with basic 2d graph



real = document.getElementById("real_graph");
Plotly.d3.csv(affect_csv_path, function(err, rows){
    function unpack(rows, key) {
        return rows.map(function(row)
        { return row[key]; });}


var trace1 = {
	x:unpack(rows, 'anger'), y: unpack(rows, 'anx'), z: unpack(rows, 'sad'),
	mode: 'markers',
	marker: {
		size: 12,
		line: {
		color: 'rgba(217, 217, 217, 0.14)',
		width: 0.5},
		opacity: 0.8},
	type: 'scatter3d'
};

var data = [trace1];
var layout = {
    scene: {
        xaxis: {title: "Anger"},
        yaxis: {title: "Anxiety"},
        zaxis: {title: "Sadness"}
    }
};
Plotly.newPlot(real, data, layout);
});

