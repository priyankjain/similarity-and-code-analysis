function showMarketName(nameList) {

var data = {
    // title: '标签',
    // list: ['文艺', '博客', '摄影', '电影', '民谣', '旅行', '吉他']
    list: nameList
};
var html = template('test', data);
document.getElementById('storeList').innerHTML = html;
}