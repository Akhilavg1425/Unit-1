/* This array stores city names and population values */
var cityPop = [
    { city: 'Madison1', population: 233209 },
    { city: 'Milwaukee', population: 594833 },
    { city: 'Green Bay', population: 104057 },
    { city: 'Superior', population: 27244 }
];

/* This function adds a new column called City Size */
function addColumns(cityPop){

    // Loop through each table row
    document.querySelectorAll("tr").forEach(function(row, i){

        // If header row, add column title
        if (i == 0){
            row.insertAdjacentHTML('beforeend', '<th>City Size</th>');

        } else {

            // Determine city size based on population
            var citySize;

            if (cityPop[i-1].population < 100000){
                citySize = 'Small';

            } else if (cityPop[i-1].population < 500000){
                citySize = 'Medium';

            } else {
                citySize = 'Large';
            };

            // Add new column value to row
            row.insertAdjacentHTML('beforeend', '<td>' + citySize + '</td>');
        };
    });
};

/* This function adds hover and click interactions */
function addEvents(){

    // Change table text color on hover
    document.querySelector("table").addEventListener("mouseover", function(){

        var color = "rgb(";

        // Create random RGB color
        for (var i=0; i<3; i++){

            var random = Math.round(Math.random() * 255);

            color += random;

            if (i<2){
                color += ",";
            } else {
                color += ")";
            };
        };

        // Apply color to table
        document.querySelector("table").style.color = color;
    });

    /* Alert when table is clicked */
    function clickme(){
        alert('Hey, you clicked me!');
    };

    document.querySelector("table").addEventListener("click", clickme)
};

/* Initialize function builds the table */
function initialize(){

    // Create table element
    var table = document.createElement("table");

    // Create header row
    var headerRow = document.createElement("tr");

    // Add header columns
    headerRow.insertAdjacentHTML("beforeend", "<th>City</th><th>Population</th>");

    table.appendChild(headerRow);

    // Add data rows
    for (var i=0; i<cityPop.length; i++){
        var rowHtml = "<tr><td>" + cityPop[i].city + "</td><td>" + cityPop[i].population + "</td></tr>";
        table.insertAdjacentHTML('beforeend', rowHtml);
    }

    // Add table to webpage
    document.querySelector("#myDiv").appendChild(table);

    // Call functions
    addColumns(cityPop);
    addEvents();
}

/* Run script after page loads */
document.addEventListener('DOMContentLoaded', initialize);

console.log("Debug JavaScript is connected!");
