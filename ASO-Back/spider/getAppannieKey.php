<?php



$shuheng=$_POST['shuheng'];



if($shuheng==1)
{
	// 获取链接的HTML代码
$html = file_get_contents('http://use14.com/puzzlecollection/shu.html');
}

else if($shuheng==2)
{
	$html = file_get_contents('http://use14.com/spider/test.html');
}

else

	$html = file_get_contents('http://use14.com/spider/test.html');

$dom = new DOMDocument();
@$dom->loadHTML($html);

$xpath = new DOMXPath($dom);

 

// $hrefs = $xpath->evaluate('//*[@class="link2"]');
$hrefs = $xpath->evaluate('/html/body//a');


$links=array();

for ($i = 0; $i < $hrefs->length; $i++) {
$href = $hrefs->item($i);
$url = $href->getAttribute();




// 保留以http开头的链接
//if(substr($url, 0, 4) == 'http')
// echo $url.'<br />';

array_push($links,$url);


}


$randomone=array_rand($links,1);


//random one

echo $links[$randomone];



 
//echo json_encode($links);

?>