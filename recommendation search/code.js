//starting indexes for each cluster
var clusterIndexes = [0,157,800,980,1891,1896,1920,1985,2016,2083,2090,2770,5627,5632,5969,6977,6997,7044,7046,7049,7053,7055,7109,7127,7131,7428,7520,7524,7526,7545,7546,7557,12012,13440,13462,13496,13906,13910,13918,13975,13987,14186,14369,14406,14426,14436,14439,14526,14532,14534,14573,14601,14849,14851,14979,14992,15198,15210,15366,15540,15738,15754,15755,16068,16070,16075,16155,16464,16511,17670,17684,17841,17862,17871,17875,17967,17974,17986,18313,18387,18400,18401,18402,18405,18410,18433,18447,18449,18452,19750,19882,19925,19932,19952,19957,22709,24718,24722,24724,24729,24731,24735,24766,24767,24777,24833,25004,25078,25171,25173,25890,25893,26194,26222,26393,26398,26400,26438,26872,26882,26902,26906,27153,27190,27322,27891,28464,28477,29247,29298,29781,30037,30058,30064,30067,30164,30264,30267,30272,30297,30307,30313,30381,30389,30393,30411,31463,31465,31578,31590,31616,31876,31877,31879,31890,32362,32434,33284,33512,33518,33543,33577,33582,33648,33671,33715,34078,34090,34094,34105,34495,34901,34994,35050,35271,35490,35491,35519,35584,35600,35627,35631,35635,35637,35715,35716,35729,35731,35849,35851,35976,35992,36021,36023,36030,36037,36045,36561,36565,36569,36574,36578,36581,36582,36803,36807,36826,36856,37084,37223,37264,37266,37269,37336,37461,37464,37487,37495,37534,37591,37913,38254,38265,38407,38634,38641,38646,38703,38715,38721,38724,38805,38813,38822,39005,39032,39344,39348,39352,39354,39377,39499,39514,39543,39961,39966,39970,40009,40011,40013];
var titles = "";
var data = "";
var choice = "";
//used for loading local json files to the web site we used json files as our data source
function httpGetAsync(callback , file)
	{
	    var xmlHttp = new XMLHttpRequest();
	    xmlHttp.onreadystatechange = function() { 
	        if (xmlHttp.readyState == 4 && xmlHttp.status == 200){
	        	console.log("before callback");
	            callback(xmlHttp.responseText);

	        }
	    }
	    xmlHttp.open("GET", file, true); // true for asynchronous 
	    xmlHttp.send(null);
	    console.log("here");
	}
	//call back after loading the titles file
	function main(response){

		titles =  JSON.parse(response);
		

		// Get the <datalist> and <input> elements.
		var dataList = document.getElementById('json-datalist');
		var input = document.getElementById('s');
		var sug = document.getElementById("suggestions");

		var jsonOptions = titles;

      // Loop over the JSON array.
      jsonOptions.forEach(function(item) {
        // Create a new <option> element.
        var option = document.createElement('option');
        // Set the value using the item in the JSON array.
        option.value = item.Title;
        // Add the <option> element to the <datalist>.
        dataList.appendChild(option);
      });

      // Update the placeholder text.
      input.placeholder = "Movie Title";		
	}
	//clears the screen from old results
	function clear(){
		if (document.contains(document.getElementById("wrapper"))) {
	        document.getElementById("wrapper").remove();
		}
		if (document.contains(document.getElementById("choice"))) {
	        document.getElementById("choice").remove();
		}

		$('#field').css({'float' : 'unset'})
		$('#main').css({'margin' : '24px 0px 0px 43%'})

	}
	// handles the choice and generating the movie cards after submitting a search
	function create(results) {
	    var frag = document.createDocumentFragment(),
	        temp = document.createElement('div');
	    clear();
		listElements = "";
		size = 12;
		for(i=0;i<results.length && i<size;i++){
			if(results[i].imdbID == choice.imdbID)
			{
				size++;
				continue;
			}
			genres = "";
			if(results[i].Genre_1 != "N/A"){
				genres += results[i].Genre_1;
				if(results[i].Genre_2 != "N/A"){
					genres += " , " + results[i].Genre_2;
					if(results[i].Genre_3 != "N/A"){
						genres += " , " + results[i].Genre_3;
					}
				}

			}
			listElements+= ' <li> <a href="http://www.imdb.com/title/'+results[i].imdbID+'"> <img src='+results[i].Poster+' /> <h3>'+results[i].Title+'</h3>  <p>Rating : '+ results[i].imdbRating +'</br>'+ genres +'</p> </a></li>';
		}
		cgenres = "";
			if(choice.Genre_1 != "N/A"){
				cgenres += choice.Genre_1;
				if(choice.Genre_2 != "N/A"){
					cgenres += " , " + choice.Genre_2;
					if(choice.Genre_3 != "N/A"){
						cgenres += " , " + choice.Genre_3;
					}
				}

			}
		temp.innerHTML = ' <div id="choice"> <a href="http://www.imdb.com/title/'+choice.imdbID+'"> <img src='+choice.Poster+' /> <h3>'+choice.Title+'</h3>  <p>Rating : '+ choice.imdbRating +'</br>'+ cgenres +'</p> </a></div>';
	    temp.innerHTML += '<div class="wrapper" id = "wrapper"> <div class="container"> <h1>Similar Movies </h1>   <hr />   <div id="four-columns" class="grid-container" style="display:block;"> <ul class="rig columns-4">'+ listElements+'   </ul> </div> <!--/#four-columns-->  <hr />  </div> <!--/.container--> </div> <!--/.wrapper-->';
	    while (temp.firstChild) {
	        frag.appendChild(temp.firstChild);
	    }
	    return frag;
	}


	$(document).ready(function() {
		//handling submitting the form
	$('#searchForm').submit( function(event){
		event.preventDefault();
		var input = document.getElementById("s");
		console.log(input.value);
		var clusters = titles.filter(function( obj ) {
		  return obj.Title.toLowerCase() == input.value.toLowerCase();
		});


		if(clusters.length != 0 ){
			var clusterNo = clusters[0].Cluster;
			console.log(clusterNo);
			choices = data.filter(function(obj){
				return obj.Title.toLowerCase() == clusters[0].Title.toLowerCase()
			});
			choice = choices[0];
			console.log(choices[0]);
			var results  = [];
			for(i=0;i<13 && data[clusterIndexes[clusterNo-1]+i].cluster_number == clusterNo && data[clusterIndexes[clusterNo-1]+i].Poster != "N/A" ;i++){
				results[i] = data[clusterIndexes[clusterNo-1]+i];
			}
			console.log(results);
			var fragment = create(results);
			// You can use native DOM methods to insert the fragment:
			rec = document.getElementById("rec");
			rec.insertBefore(fragment , rec.childNodes[10]);

		$('#choice').css({'margin' : '0px 17% 0px 0px', 'float': 'right'})
		$('#field').css({'float' : 'right'})
		$('#main').css({'margin' : '13% 0px 0px 22%'})

		$('#wrapper').css({'float' : 'right'})
		
		$('.grid-container').fadeOut(500, function(){
			$('#four-columns').fadeIn(500);
		});	

		}else{
			clear();
		    var fragment = document.createDocumentFragment(),
	        temp = document.createElement('div');
		    temp.innerHTML = '<div class="wrapper" id = "wrapper"> <div class="container"><br/><br/><br/> <h2>Unfortunately , we can\'t find this movie</h2>     </div> <!--/.container--> </div> <!--/.wrapper-->';
		    while (temp.firstChild) {
		        fragment.appendChild(temp.firstChild);
		    }
			rec.insertBefore(fragment , rec.childNodes[10]);
			$('#field').css({'float' : 'unset'})

			console.log("not in the database");
		}
			
	
	});
});
function setData(response){
	data = JSON.parse(response);
	console.log("data set");
	console.log(data[0]);
}
httpGetAsync(main , "recommendation search/titles.json");
httpGetAsync(setData , "recommendation search/test.json");