// Authored by Joe Marks, 2019
/*eslint-env browser*/

//initialize function called when the script loads
function initialize(){
    cities();
    jQueryAjax();
    debugAjax();
};

// This function adds a city size column with values assigned based
// on a city's population
function addColumns(cityPop){
    // Loop through each table row
    $('tr').each(function(i){
        // If this is the first row
    	if (i == 0){
            // Create and append a header
            // ERROR: apend -> append
    		$(this).append('<th>City Size</th>');
    	} else {
            // If this is not the first row
            // Create a new variable named citySize
    		var citySize;
            // Assign a value to citySize based on the city's population
    		if (cityPop[i-1].population < 100000){
    			citySize = 'Small';
    		} else if (cityPop[i-1].population < 500000){
                // ERROR: citysize -> citySize
    			citySize = 'Medium';
    		} else {
    			citySize = 'Large';
    		};
            // Add citySize to the table row
            // ERROR: $this -> $(this)
            // ERROR: '<td' -> '<td>'
    		$(this).append('<td>' + citySize + '</td>');
    	};
    });
};

// This function creates various event listeners with effects
function addEvents(){
    // Alias method for the mouseover event listener on 'table'
    // ERROR: '#table" -> 'table'
	$('table').mouseover(function(){
		// Create a variable to hold the rgb color value
		var color = "rgb(";
        // For three iterations
		for (var i=0; i<3; i++){
            // Assign a random value from 0-255
			var random = Math.round(Math.random() * 255);
            // Add this value to our color variable
            // ERROR: "random" -> random
			color += random;
            // If this is one of the first two iterations
			if (i<2){
                // Add a comma after the color value
				color += ",";
			// If this was the last color value
			} else {
                // Add the closed parantheses
				color += ")";
            // ERROR: Missing bracket
            };
		};
        // Assign our randomly genereated color to the table
		$(this).css('color', color);
	});
    // A named handler function for a listener
	function clickme(){
        // On click, alert message
		alert('Hey, you clicked me!');
	};
    // Add the event listener for 'click' on 'table'
	$('table').on('click', clickme);
};

//function to create a table with cities and their populations
function cities(){
    //define two arrays for cities and population
    var cityPop = [
        { 
            city: 'Rochester',
            state: 'MN',
            population: 115733
        },
        {
            city: 'Rochester',
            state:'NY',
            population: 208046
        },
        {
            city: 'Chicago',
            state:'IL',
            population: 2716000
        },
        {
            city: 'Minneapolis',
            state:'MN',
            population: 422331
        }
    ];

    //append the table element to the div
    $("#mydiv").append("<table>");

    //append a header row to the table
    $("table").append("<tr>");

    //add the "City" and "Population" columns to the header row
    $("tr").append("<th>City</th><th>State</th><th>Population</th>");

    //loop to add a new row for each city
    for (var i = 0; i < cityPop.length; i++){
        //assign longer html strings to a variable
        var rowHtml = "<tr><td>" + cityPop[i].city + "</td><td>" + cityPop[i].state + "</td><td>" + cityPop[i].population + "</td></tr>";
        //add the row's html string to the table
        $("table").append(rowHtml);
    };
    addColumns(cityPop);
    addEvents();
};

// Simple JQueryAjax method
function jQueryAjax(){
    // Define a variable to hold the data
    var mydata;
    
    // Use jQuery ajax method to get MegaCities.geojson
    $.ajax("data/MegaCities.geojson", {
        dataType: "json",
        success: function(response){
            mydata = response;
            
            // Check the data inside the callback function
            console.log(mydata);
        }
    });
    
    // Check the data outside the callback function
    console.log(mydata);
}

function debugCallback(response){
	// ERROR: mydata not defined in this function
    var mydata = response;
	$(mydiv).append('GeoJSON data: ' + JSON.stringify(mydata));
};

function debugAjax(){
	
	var mydata;

	$.ajax("data/MegaCities.geojson", {
		dataType: "json",
		success: function(response){
			// ERROR: mydata still had no value
            mydata = response;
			debugCallback(mydata);
		}
	});
    // ERROR: Can not call mydata outside of callback function,
    // will result in printing:
    //    GeoJSON data:
    //    undefined
	//$(mydiv).append('<br>GeoJSON data:<br>' + JSON.stringify(mydata));
};
// ERROR: Can not call mydata outside of callback function
//$(mydiv).append('GeoJSON data: ' + JSON.stringify(mydata));


//call the initialize function when the document has loaded
$(document).ready(initialize);