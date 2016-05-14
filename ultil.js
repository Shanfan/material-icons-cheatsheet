var txtToJSON = function(txt){
	var pairArray = txt.split('\n');
	var data = [];

	pairArray.forEach(function(d){
		var pair = d.split(' ');
		data.push({'name': pair[0], 'code': pair[1]});
	});
	return data.slice(0, data.length - 1);
}

var showIcons = function(dataArray){

	dataArray.forEach(function(d){
		var icon = `
		<div data-code=${d.code} data-name=${d.name}>
			<i class="material-icons dp48">${d.name}</i>
		</div>
		`;
		$('.icon-wrapper').append(icon);
	})
}

$.fn.extend({
	showHint: function(){
		var copy_txt = `&#x${this.data('code')}`,
				css_txt =
`span:before {
  font-family: 'Material Icons';
  content: '&#92;${this.data('code')}'
}`,
				html_txt = `<i class='material-icons'>
  ${this.data('name')}
</i>`,
				ie9_txt = `<i class='material-icons'>&#38;#x${this.data('code')}</i>`;
		$('.hint .copy').html(copy_txt);
		$('.hint .css').html(css_txt);
		$('.hint .html').html(html_txt);
		$('.hint .ie9').html(ie9_txt);
	},
	toClipboard: function(){
		var txt = this.val();
		if (txt) {
				this.select();
		}
	},
	filterIcons: function(){
		var icons = $('.icon-wrapper div'),
				query = new RegExp(this.val(), "gi");

		if (!this.val()){
			icons.show();
		} else {
			icons.hide().filter(function(index){
				var str = $(this).data('name');
				return str.match(query);
			}).show();
		}
	}
});
