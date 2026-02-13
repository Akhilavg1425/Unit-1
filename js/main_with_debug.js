// ===============================
// INITIALIZE FUNCTION
// ===============================
function initialize() {

	var cityPop = [
		{ city: 'Madison', population: 233209 },
		{ city: 'Milwaukee', population: 594833 },
		{ city: 'Green Bay', population: 104057 },
		{ city: 'Superior', population: 27244 }
	];

	// Create table element
	var table = document.createElement("table");

	// Create header row
	var headerRow = document.createElement("tr");

	// Add headers
	headerRow.insertAdjacentHTML("beforeend", "<th>City</th><th>Population</th>");

	table.appendChild(headerRow);

	// Loop to add rows
	for (var i = 0; i < cityPop.length; i++) {

		var rowHtml =
			"<tr><td>" +
			cityPop[i].city +
			"</td><td>" +
			cityPop[i].population +
			"</td></tr>";

		table.insertAdjacentHTML('beforeend', rowHtml);
	}

	// Add table to webpage
	document.querySelector("#myDiv").appendChild(table);

	// Add extra features
	addColumns(cityPop);
	addEvents();

	// Load GeoJSON
	debugAjax();
}


// ===============================
// ADD CITY SIZE COLUMN
// ===============================
function addColumns(cityPop) {

	document.querySelectorAll("tr").forEach(function (row, i) {

		if (i === 0) {

			row.insertAdjacentHTML('beforeend', '<th>City Size</th>');

		} else {

			var citySize;

			if (cityPop[i - 1].population < 100000) {
				citySize = 'Small';
			}
			else if (cityPop[i - 1].population < 500000) {
				citySize = 'Medium';
			}
			else {
				citySize = 'Large';
			}

			row.insertAdjacentHTML('beforeend', '<td>' + citySize + '</td>');
		}
	});
}


// ===============================
// ADD EVENTS TO TABLE
// ===============================
function addEvents() {

	document.querySelector("table").addEventListener("mouseover", function () {

		var color = "rgb(";

		for (var i = 0; i < 3; i++) {

			var random = Math.round(Math.random() * 255);
			color += random;

			if (i < 2) {
				color += ",";
			} else {
				color += ")";
			}
		}

		document.querySelector("table").style.color = color;
	});


	function clickme() {
		alert('Hey, you clicked me!');
	}

	document.querySelector("table").addEventListener("click", clickme);
}


// ===============================
// AJAX DEBUGGING SCRIPT
// Loads GeoJSON and displays it
// ===============================

// Display GeoJSON data
function debugCallback(myData) {

	document.querySelector("#myDiv")
		.insertAdjacentHTML(
			'beforeend',
			'<br>GeoJSON data:<br>' + JSON.stringify(myData)
		);
}


// Load GeoJSON file
function debugAjax() {

	fetch("data/MegaCities.geojson")

		.then(function (response) {
			return response.json();
		})

		.then(function (data) {
			debugCallback(data);
		})

		.catch(function (error) {
			console.log("Error loading GeoJSON:", error);
		});
}


// ===============================
// RUN INITIALIZE WHEN PAGE LOADS
// ===============================
document.addEventListener('DOMContentLoaded', initialize);
