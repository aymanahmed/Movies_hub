var clusterIndexes = [0,26,57,67,110,1053,2031,2402,3145,3640,3659,3888,4394,4507,4588,4808,4863,4886,5013,5030,5052,5405,5419,5441,5461,5478,5887,6257,6307,6834,7589,7841,7857,7898,8119,8191,8304,8338,8364,8664,8733,8770,8833,8967,9171,9293,9305,9328,9374,9390,9398,9418,9454,9461,9547,9635,9905,9926,9937,10109,10150,10186,10250,10256,10319,10442,10481,10631,10689,10746,11077,11119,11154,11159,11753,11774,12025,12084,12183,12354,12402,12610,12621,13348,13435,13526,13573,13602,13657,13686,13769,13794,13814,13843,13912,13934,13949,13965,13969,13996,14019,14023,14037,14118,14166,14175,14499,14724,14779,14798,14831,14979,14999,15076,15104,15112,15129,15500,15658,15681,15725,15733,16202,16290,16406,16429,16459,16479,16924,16955,16990,17025,17162,17201,17285,17324,17334,17396,17417,17532,17543,17566,17571,17710,18105,18124,18139,18257,18408,18484,18534,18558,18578,18598,18613,18643,18678,18900,18923,19008,19117,19156,19403,19430,19501,19677,19795,19947,19995,20469,20587,20715,20771,20811,20825,21447,21856,21912,22025,22219,22361,24348,25186,25265,25330,25516,25595,25659,26524,26794,26879,27201,27734,28202,28423,28496,28877,28976,29013,29125,29158,29174,29184,29570,30371,31111,38294,38446,38697,38710,38829,39464,39822,39872,40122,40394,40663,40681,40764,40851,40887,40928,41178,41290,41430,41616,41813,42826,43140,43250,43731,43747,45004,45070,46133,47608,48019,48060,48097,48161,49623,51341,51531,56382,56455,58210,60225,64201,65581,66332];
var titles = "";
var data = "";
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
      input.placeholder = "e.g. datalist";		
	}

	function create(results) {
    var frag = document.createDocumentFragment(),
        temp = document.createElement('div');
    if (document.contains(document.getElementById("wrapper"))) {
        document.getElementById("wrapper").remove();
	}
	listElements = "";
	for(i=0;i<results.length;i++){
		listElements+= ' <li> <a href="http://www.imdb.com/title/'+results[i].imdbID+'"> <img src='+results[i].Poster+' /> <h3>'+results[i].Title+'</h3>  <p>'+results[i].imdbRating+'</p> </a></li>';
	}
    temp.innerHTML = '<div class="wrapper" id = "wrapper"> <div class="container"> <h1>Similar Movies </h1>   <hr />   <div id="four-columns" class="grid-container" style="display:block;"> <ul class="rig columns-4">'+ listElements+'   </ul> </div> <!--/#four-columns-->  <hr />  </div> <!--/.container--> </div> <!--/.wrapper-->';
    while (temp.firstChild) {
        frag.appendChild(temp.firstChild);
    }
    return frag;
}


	$(document).ready(function() {
	$('#searchForm').submit( function(event){
		event.preventDefault();
		var input = document.getElementById("s");
		console.log(input.value);
		var clusters = titles.filter(function( obj ) {
		  return obj.Title == input.value;
		});


		if(clusters.length != 0 ){
			var clusterNo = clusters[0].Cluster;
			console.log(clusterNo);

			var results  = [];
			for(i=0;i<12;i++){
				results[i] = data[clusterIndexes[clusterNo-1]+i];
				console.log(i);
				console.log(results[i]);
			}
			// for(x in results){
			// 	console.log(x);
			// }
			var fragment = create(results);
			// You can use native DOM methods to insert the fragment:
			document.body.insertBefore(fragment, document.nextSibling);



		}else{
			console.log("not in the database");
		}
		$('.grid-container').fadeOut(500, function(){
			$('#four-columns').fadeIn(500);
		});		
	
	});
});
function setData(response){
	data = JSON.parse(response);
	console.log("data set");
	console.log(data[0]);
}
httpGetAsync(main , "titles.json");
httpGetAsync(setData , "test.json");