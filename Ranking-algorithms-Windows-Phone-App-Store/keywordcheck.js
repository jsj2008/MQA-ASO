var linkArray = ['http://www.windowsphone.com/pt-ao','http://www.windowsphone.com/es-ar','http://www.windowsphone.com/en-am','http://www.windowsphone.com/en-au','http://www.windowsphone.com/az-latn-az','http://www.windowsphone.com/en-bd','http://www.windowsphone.com/nl-be','http://www.windowsphone.com/fr-be','http://www.windowsphone.com/fr-bj','http://www.windowsphone.com/es-bo','http://www.windowsphone.com/pt-br','http://www.windowsphone.com/fr-bf','http://www.windowsphone.com/fr-bi','http://www.windowsphone.com/en-cm','http://www.windowsphone.com/en-ca','http://www.windowsphone.com/fr-ca','http://www.windowsphone.com/cs-cz','http://www.windowsphone.com/es-cl','http://www.windowsphone.com/es-co','http://www.windowsphone.com/fr-cd','http://www.windowsphone.com/es-cr','http://www.windowsphone.com/fr-ci','http://www.windowsphone.com/da-dk','http://www.windowsphone.com/de-de','http://www.windowsphone.com/es-ec','http://www.windowsphone.com/et-ee','http://www.windowsphone.com/es-sv','http://www.windowsphone.com/es-es','http://www.windowsphone.com/ca-es','http://www.windowsphone.com/fr-fr','http://www.windowsphone.com/en-gh','http://www.windowsphone.com/es-gt','http://www.windowsphone.com/fr-gn','http://www.windowsphone.com/fr-ht','http://www.windowsphone.com/es-hn','http://www.windowsphone.com/en-hk','http://www.windowsphone.com/hr-hr','http://www.windowsphone.com/is-is','http://www.windowsphone.com/en-in','http://www.windowsphone.com/id-id','http://www.windowsphone.com/en-ie','http://www.windowsphone.com/it-it','http://www.windowsphone.com/en-ke','http://www.windowsphone.com/en-kw','http://www.windowsphone.com/lv-lv','http://www.windowsphone.com/de-li','http://www.windowsphone.com/lt-lt','http://www.windowsphone.com/fr-mg','http://www.windowsphone.com/hu-hu','http://www.windowsphone.com/en-mw','http://www.windowsphone.com/ms-my','http://www.windowsphone.com/en-my','http://www.windowsphone.com/fr-ml','http://www.windowsphone.com/es-mx','http://www.windowsphone.com/pt-mz','http://www.windowsphone.com/nl-nl','http://www.windowsphone.com/en-nz','http://www.windowsphone.com/es-ni','http://www.windowsphone.com/fr-ne','http://www.windowsphone.com/en-ng','http://www.windowsphone.com/nb-no','http://www.windowsphone.com/de-at','http://www.windowsphone.com/uz-latn-uz','http://www.windowsphone.com/en-pk','http://www.windowsphone.com/es-py','http://www.windowsphone.com/es-pe','http://www.windowsphone.com/en-ph','http://www.windowsphone.com/fil-ph','http://www.windowsphone.com/pl-pl','http://www.windowsphone.com/pt-pt','http://www.windowsphone.com/es-do','http://www.windowsphone.com/ro-ro','http://www.windowsphone.com/fr-rw','http://www.windowsphone.com/de-ch','http://www.windowsphone.com/fr-sn','http://www.windowsphone.com/sq-al','http://www.windowsphone.com/en-sl','http://www.windowsphone.com/en-sg','http://www.windowsphone.com/sl-si','http://www.windowsphone.com/sk-sk','http://www.windowsphone.com/en-so','http://www.windowsphone.com/en-za','http://www.windowsphone.com/sr-latn-cs','http://www.windowsphone.com/fr-ch','http://www.windowsphone.com/fi-fi','http://www.windowsphone.com/sv-se','http://www.windowsphone.com/it-ch','http://www.windowsphone.com/en-tz','http://www.windowsphone.com/fr-td','http://www.windowsphone.com/fr-tg','http://www.windowsphone.com/tr-tr','http://www.windowsphone.com/en-ug','http://www.windowsphone.com/en-gb','http://www.windowsphone.com/en-us','http://www.windowsphone.com/es-ve','http://www.windowsphone.com/vi-vn','http://www.windowsphone.com/en-zm','http://www.windowsphone.com/en-zw','http://www.windowsphone.com/el-gr','http://www.windowsphone.com/be-by','http://www.windowsphone.com/bg-bg','http://www.windowsphone.com/kk-kz','http://www.windowsphone.com/mk-mk','http://www.windowsphone.com/ru-ru','http://www.windowsphone.com/ru-tj','http://www.windowsphone.com/ru-tm','http://www.windowsphone.com/uk-ua','http://www.windowsphone.com/he-il','http://www.windowsphone.com/ar-jo','http://www.windowsphone.com/ar-ae','http://www.windowsphone.com/ar-bh','http://www.windowsphone.com/ar-dz','http://www.windowsphone.com/ar-iq','http://www.windowsphone.com/ar-kw','http://www.windowsphone.com/ar-ma','http://www.windowsphone.com/ar-sa','http://www.windowsphone.com/ar-ye','http://www.windowsphone.com/ar-tn','http://www.windowsphone.com/ar-om','http://www.windowsphone.com/ar-qa','http://www.windowsphone.com/ar-eg','http://www.windowsphone.com/hi-in','http://www.windowsphone.com/th-th','http://www.windowsphone.com/ko-kr','http://www.windowsphone.com/zh-cn','http://www.windowsphone.com/zh-tw','http://www.windowsphone.com/ja-jp','http://www.windowsphone.com/zh-hk'];
var keyWord = 'ninja';
var result = '';
$.each( linkArray, function( key, value ) {
    var requetLink = value + '/store/search?q=' + keyWord;

    $.get( requetLink, function( data ) {
        var titles = $(data).find(".title");
        //.title  index
        var ranked = true;
        titles.each(function( index ) {
            if(index<5){
                result += (requetLink+'排名'+(index+1)+' '+'游戏名称:'+$(this).text()+' 星级:'+$($(data).find('.ratingSmall')[index]).attr('class').substring(12)+'几人评分:'+$($(data).find('.ratingCount')[index]).text().trim()+'                                                                                                                                                      ');

                ranked = false;
            }
        });
        if(value == "http://www.windowsphone.com/zh-hk"){
            console.log(result);
        }
    });

});












//why


var linkArray = ['http://www.windowsphone.com/zh-hk'];
var keyWord = 'ninja';
var result = '';
$.each( linkArray, function( key, value ) {
    var requetLink = value + '/store/search?q=' + keyWord;

    $.get( requetLink, function( data ) {
        var titles = $(data).find(".title");  console.log(titles);
        var ranked = true;
        titles.each(function( index ) {
            if(index<5){
                result += (requetLink+'排名'+(index+1)+' '+'游戏名称:'+$(this).text()+' 星级:'+$($(data).find('.ratingSmall')[index]).attr('class').substring(12)+'几人评分:'+$($(data).find('.ratingCount')[index]).text().trim()+'                                                                                                                                                      ');

                ranked = false;
            }
        });
        if(value == "http://www.windowsphone.com/zh-hk"){
            console.log(result);
        }
    });

});