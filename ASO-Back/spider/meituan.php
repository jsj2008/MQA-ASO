<?php
 

 

	$html = file_get_contents('http://use14.com/ApiGame/spider/2.html');

$dom = new DOMDocument();
@$dom->loadHTML($html);

$xpath = new DOMXPath($dom);
$hrefs = $xpath->evaluate('/html/body//td');


$links=array();

for ($i = 0; $i < $hrefs->length; $i++) {
$href = $hrefs->item($i);
// $url = $href->getAttribute('href');




// 保留以http开头的链接
//if(substr($url, 0, 4) == 'http')
// echo $url.'<br />';

array_push($links,$href);


}


$randomone=array_rand($links,1);


//random one

echo $links[$randomone];



 
//echo json_encode($links);

?>