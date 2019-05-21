// Import data
var tableData = data;

// Function defined to populate the data to the webpage
function generateTable(dataSet) {
    var tbodyElement = d3.select('tbody').html('');
    // Handle possibility of no results
    if (dataSet.length == 0) {
        var row = tbodyElement.append('tr');
        var cell = row.append('td');
        cell.text('No results found.')
    } else {
        dataSet.forEach((sighting) => {
            var row = tbodyElement.append('tr');
            Object.entries(sighting).forEach(([key, value]) => {
                var cell = row.append("td");
                cell.text(value);
            });
        });
    };
};

function generateDropdown(dataSet){
    var shapesSeen = [];
    Object.entries(dataSet).forEach((datum) => shapesSeen.push(datum[1].shape));
    var uniqueShapes = Array.from(new Set(shapesSeen));
    uniqueShapes.unshift('UFO Shape');
    console.log(uniqueShapes);
    var dropDown = d3.select('#shapes-dropdown');
    dropDown.selectAll('option').data(uniqueShapes).enter().append('option').text(function (d) { return d; }).attr('value', (function (d) { return d; }));
}

generateDropdown(tableData);

// Initial population of all data when page first loads
generateTable(tableData);

var button = d3.select('#filter-btn');

// Apply filters when the button is clicked, then display result set
button.on('click', function() {
    d3.event.preventDefault();
    var filterDate = d3.select('#datetime').property('value');
    var filterCity = d3.select('#city').property('value').toLowerCase();
    var filterState = d3.select('#state').property('value').toLowerCase();
    var filterCountry = d3.select('#country').property('value').toLowerCase();
    var filterShape = d3.select('#shapes-dropdown').property('value');
    // var filterShape = d3.select('#shape').property('value');
    var filteredData = tableData;
    if (filterDate) {
        filteredData = filteredData.filter(sighting => sighting.datetime === filterDate);
    };
    if (filterCity) {
        filteredData = filteredData.filter(sighting => sighting.city === filterCity);
    };
    if (filterCountry) {
        filteredData = filteredData.filter(sighting => sighting.country === filterCountry);
    };
    if (filterState) {
        filteredData = filteredData.filter(sighting => sighting.state === filterState);
    };
    if (filterShape !== 'UFO Shape') {
        filteredData = filteredData.filter(sighting => sighting.shape === filterShape);
    }
    generateTable(filteredData);
});