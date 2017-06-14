<?php 
//  /*PHP正则提取图片img标记中的任意属性*/ $str = '<center><img src="/uploads/images/20100516000.jpg" height="120" width="120"><br />PHP正则提取或更改图片img标记中的任意属性</center>'; 
//  //1、取整个图片代码 preg_match('/<\s*img\s+[^>]*?src\s*=\s*(\'|\")(.*?)\\1[^>]*?\/?\s*>/i',$str,$match); echo $match[0]; 
//  //2、取width preg_match('/<img.+(width=\"?\d*\"?).+>/i',$str,$match); echo $match[1]; 
//  //3、取height preg_match('/<img.+(height=\"?\d*\"?).+>/i',$str,$match); echo $match[1]; 
//  //4、取src preg_match('/<img.+src=\"?(.+\.(jpg|gif|bmp|bnp|png))\"?.+>/i',$str,$match); echo $match[1]; 
//  /*PHP正则替换图片img标记中的任意属性*/ //1、将src="/uploads/images/20100516000.jpg"替换为src="/uploads/uc/images/20100516000.jpg") 
// print preg_replace('/(<img.+src=\"?.+)(images\/)(.+\.(jpg|gif|bmp|bnp|png)\"?.+>)/i',"\${1}uc/images/\${3}",$str); echo "<hr/>"; 
//  //2、将src="/uploads/images/20100516000.jpg"替换为src="/uploads/uc/images/20100516000.jpg",并省去宽和高 
// print preg_replace('/(<img).+(src=\"?.+)images\/(.+\.(jpg|gif|bmp|bnp|png)\"?).+>/i',"\${1} \${2}uc/images/\${3}>",$str); 
  








  $str = 'download_url="abcdef.mp3"'; 

preg_match('/download_url=\"(.+?)\"/',$str,$match); 

echo $match[1]; 
?>