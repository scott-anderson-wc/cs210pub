<!doctype html>
<html lang="en">
<head>
<title>Form Echo</title>
</head>
<body>

     <p>Here is what was in the form you submitted:

     <?php

 function formDisplay($kind,$array) {
     // echo "<p>array count ". count($array);
     if( count($array) > 0 ) {
         echo "<p>$kind:\n<ul>\n";
         foreach( $array as $key => $value) {
             if( is_array($value) ) {
                 echo "<li>$key: <ul>\n";
                 foreach( $value as $val ) {
                     echo "<li>$val\n";
                 }
                 echo "</li>\n";
             } else {
                 echo "<li>$key &rarr; $value</li>\n";
             }
         }
         echo "</ul>\n";
     }
 }

     formDisplay("GET",$_GET);
     formDisplay("POST",$_POST);

?>
</body>
</html>
