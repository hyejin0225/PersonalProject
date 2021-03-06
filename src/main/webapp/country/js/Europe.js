$(document).ready(function(){
	//유럽 리스트
	var dataList;
	var listIndex;
	var i = 0;
	var j;
	var dataListSize;
	$.ajax({
		type: 'POST',
		url: '/PersonalProject/country/EuropeList.do',
		data: {'countryid2': "유럽"},
		dataType: 'json',
		success: function(data){
			//alert(JSON.stringify(data));
			dataList = data.list;
			dataListSize = dataList.length;
			$('#Europe-list tr:ge(0)').remove();
			$.each(data.list, function(index,items){
				$('<div/>',{
					style : 'width: 380px; float: left;',
					class : 'countryImage',
					onclick : 'moveToWordname("'+items.wordname+'")'
				}).append($('<div/>',{
					style : 'width: 380px;'
				}).append($('<div/>',{
					class : 'imageDiv',
					style : 'width: 350px;'
					}).append($('<img/>',{
						style : 'border: 1px solid black;',
						src : '../country/storage/'+items.cityimage1,
						width : '330',
						height : '230'
					}))
				).append($('<div/>',{
					class : 'countryDiv',
					align : 'center',
					style : 'width: 330px; display: table; height: 45px; ',
					html : '<strong style="font-size: 16pt; display: table-cell; vertical-align: middle; ">'+items.cityid+' / '+items.wordname+'</strong>'
					})
				)).appendTo($('#Europe-list'));
		
				
				if((index%9) == 8){
					$('<div/>',{
						id : 'nextView',
						class : 'form-control',
						text : '더보기'
					}).appendTo($('.nextviewDiv'));
					listIndex = index;
					return false;
				}
			});//$.each
			i = i+9;
			$('#nextView').on('click',function(){
				$('#nextView').hide();
				for(j = i; j<i+9; j++){
					$('<div/>',{
						style : 'width: 380px; float: left;',
						class : 'countryImage',
						onclick : 'moveToWordname("'+dataList[j].wordname+'")'
					}).append($('<div/>',{
						style : 'width: 380px;'
					}).append($('<div/>',{
						class : 'imageDiv',
						style : 'width: 350px;'
						}).append($('<img/>',{
							style : 'border: 1px solid black;',
							src : '../country/storage/'+dataList[j].cityimage1,
							width : '330',
							height : '230'
						}))
					).append($('<div/>',{
						class : 'countryDiv',
						align : 'center',
						style : 'width: 330px; display: table; height: 45px; ',
						html : '<strong style="font-size: 16pt; display: table-cell; vertical-align: middle; ">'+dataList[j].cityid+' / '+dataList[j].wordname+'</strong>'
						})
					)).appendTo($('#Europe-list'));
	
				}
				$('#nextView').show();
			});
			
		},//success
		error: function(data){
			alert("error");
		}
	});
	
	//검색
	$('#search').click(function(){
		if($('#keyword').val()==""){
			alert("검색어를 입력해주세요");
		}else{
			$.ajax({
				type: 'POST',
				url: '/PersonalProject/country/Search.do',
				data : {
					'searchOption': $('#searchOption').val(),
					'keyword': $('#keyword').val()
				},
				dataType : 'json',
				success : function(data){
					//alert(JSON.stringify(data));
					dataList = data.list;
					dataListSize = dataList.length;
					$('#Europe-list div:gt(0)').remove();
					$('.nextviewDiv').remove();
					$.each(data.list, function(index,items){
						$('<div/>',{
							style : 'width: 380px; float: left;',
							class : 'countryImage',
							onclick : 'moveToWordname("'+items.wordname+'")'
						}).append($('<div/>',{
							style : 'width: 380px;'
						}).append($('<div/>',{
							class : 'imageDiv',
							style : 'width: 350px;'
							}).append($('<img/>',{
								style : 'border: 1px solid black;',
								src : '../country/storage/'+items.cityimage1,
								width : '330',
								height : '230'
							}))
						).append($('<div/>',{
							class : 'countryDiv',
							align : 'center',
							style : 'width: 330px; display: table; height: 45px; ',
							html : '<strong style="font-size: 16pt; display: table-cell; vertical-align: middle; ">'+items.cityid+' / '+items.wordname+'</strong>'
							})
						)).appendTo($('#Europe-list'));	
						
						if((index%9) == 8){
							$('<div/>',{
								id : 'nextView',
								class : 'form-control',
								text : '더보기'
							}).appendTo($('.nextviewDiv'));
							listIndex = index;
							return false;
						}
					});
					i = i+9;
					$('#nextView').on('click',function(){
						$('#nextView').hide();
						for(j = i; j<i+9; j++){
							$('<div/>',{
								style : 'width: 380px; float: left;',
								class : 'countryImage',
								onclick : 'moveToWordname("'+dataList[j].wordname+'")'
							}).append($('<div/>',{
								style : 'width: 380px;'
							}).append($('<div/>',{
								class : 'imageDiv',
								style : 'width: 350px;'
								}).append($('<img/>',{
									style : 'border: 1px solid black;',
									src : '../country/storage/'+dataList[j].cityimage1,
									width : '330',
									height : '230'
								}))
							).append($('<div/>',{
								class : 'countryDiv',
								align : 'center',
								style : 'width: 330px; display: table; height: 45px; ',
								html : '<strong style="font-size: 16pt; display: table-cell; vertical-align: middle; ">'+dataList[j].cityid+' / '+dataList[j].wordname+'</strong>'
								})
							)).appendTo($('#Europe-list'));
			
						}
						$('#nextView').show();
					});
				}
			});
		}
	});
	
});
function moveToWordname(wordname) {
	location.href="/PersonalProject/country/countryO_detail.do?wordname="+encodeURI(wordname);
}