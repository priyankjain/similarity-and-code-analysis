 <?php
   include_once 'site_includes/db_connect.php';
  $sql = "SELECT * from fruits";
   $result = $mysqli->query($sql);
 
 ?>
         height: 100%;
       }
     </style>
    <link href="site_includes/bootstrap.min.css" rel="stylesheet">
    <script language="javascript" type="text/javascript" src="site_includes/jquery-2.1.1.min.js"></script>
    <script src="site_includes/bootstrap.min.js"></script>
   </head>
   <body>
   <?php
 	<h1>hello world</h1>
         <div id="div1"><h2>Let jQuery AJAX Change This Text</h2></div>
 	<div id="div2"></div> 
	<div class="btn-group" data-toggle="buttons">
	  <label class="btn btn-primary active">
	    <input type="radio" name="food" id="option1" value="fruits" autocomplete="off">Fruits
	  </label>
	  <label class="btn btn-primary">
	    <input type="radio" name="food" id="option2" value="veggies" autocomplete="off" checked>Vegetables
	  </label>
 	</div>

 	<br />
 	<select id="selector" class="form-control"/>
 	<script id="source" language="javascript" type="text/javascript">
	  $("input[name=food]:radio").change(function () {
	    $('#selector').html("");
            $.ajax({                                      
             url: "api.php",                  //the script to call to get data          
             type: 'post',
             datatype: "json",
             data : {"column":"*",
                 "table": $('input:radio[name=food]:checked').val()},
             success: function(data)          //on recieve of reply
             {
               var id;
               var fname;
               for (x = 0; x < data.length; x++) {
                 fname = data[x]['food_name'];
                 $('#selector').append($('<option />').val(data[x]['food_name']).text(data[x]['food_name']));
               }
               $('#div1').html("<b>id: </b>"+id+"<b> name: </b>"+fname);
             }
           });
	});
 	$(function()
 	{
	  $('#div1').html("test: " + $('input:radio[name=food]:checked').val());
 	  $.ajax({                                      
             url: "api.php",                  //the script to call to get data          
 	    type: 'post',
 	    datatype: "json",
 	    data : {"column":"*",
		"table": $('input:radio[name=food]:checked').val()},
 	    success: function(data)          //on recieve of reply
       	    {
 	      var id;
