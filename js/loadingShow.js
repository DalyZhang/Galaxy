// loadingShow.js
var RJO = RJO || {};

RJO.Loading = document.createElement('div');
RJO.Loading.id = 'loading';

RJO.Loading.style.position = "fixed";
RJO.Loading.style.top = 0;
RJO.Loading.style.left = 0;
RJO.Loading.style.right = 0;
RJO.Loading.style.bottom = 0;
RJO.Loading.style.zIndex = 50;
RJO.Loading.style.backgroundColor = '#000000';
RJO.Loading.style.backgroundImage = 'url(img/Loading.png)';
RJO.Loading.style.backgroundPosition = 'center';
RJO.Loading.style.backgroundRepeat = 'no-repeat';

document.body.appendChild(RJO.Loading);

RJO.hideLoading = function(){
	$('#loading').fadeOut(720);
}
RJO.showLoading = function(){
	$('#loading').fadeIn(360);
}

window.addEventListener("load",RJO.hideLoading);