$(function () {
	$.ajax({
		url: "font/codepoints",
		type: 'GET',
		dataType: 'text',
		success: function (data) {
			data = txtToJSON(data);
			showIcons(data);
		}
	}).done(function () {
		$('.icon-wrapper div').on('click', function () {
			$(this).siblings().removeClass('selected');
			$(this).addClass('selected').showHint();
		});

		$.ajax({
			url: "font/keywords",
			type: 'GET',
			dataType: 'text',
			success: function (data) {
				data = txtToJSON(data);
				tagKeywords(data);
			}
		}).done(function () {
			$('#search').keyup(function () {
				$(this).filterIcons();
			});
		});

	});

	$('.icon-wrapper').css({ 'margin-top': $('header').height() + 65 });

	$('textarea').on('click', function () {
		if ($(this).val()) {
			$(this).select();
		}
	});

});

var txtToJSON = function (txt) {
	var pairArray = txt.split('\n');
	var data = [];

	pairArray.forEach(function (d) {
		var pair = d.split(' ');
		data.push({ 'name': pair[0], 'code': pair[1] });
	});
	return data.slice(0, data.length);
}

var showIcons = function (dataArray) {

	dataArray.forEach(function (d) {
		var icon = `
		<div data-code=${d.code} data-name=${d.name}>
			<i class="material-icons dp48">${d.name}</i>
		</div>
		`;
		$('.icon-wrapper').append(icon);
	})
}

var tagKeywords = function (dataArray) {
	dataArray.forEach(function (d) {
		var target = $(`.icon-wrapper div[data-name = ${d.name}]`),
			keywords = target.data('keywords') ? target.data('keywords') + d.code : d.code;
		target.attr('data-keywords', keywords);
	});
}

$.fn.extend({
	showHint: function () {
		var copy_txt = `&#x${this.data('code')}`,
			css_txt =
				`span:before {
  font-family: 'Material Icons';
  content: '&#92;${this.data('code')}'
}`,
			html_txt =
				`<i class='material-icons'>
  ${this.data('name')}
</i>`,
			ie9_txt = `<i class='material-icons'>&#38;#x${this.data('code')}</i>`;

		$('.hint .copy').html(copy_txt);
		$('.hint .css').html(css_txt);
		$('.hint .html').html(html_txt);
		$('.hint .ie9').html(ie9_txt);
	},
	filterIcons: function () {
		var icons = $('.icon-wrapper div'),
			query = new RegExp(this.val(), "gi");

		if (!this.val()) {
			icons.show();
		} else {
			icons.hide().filter(function (index) {
				var str = $(this).data('name'),
					tag = $(this).data('keywords') ? $(this).data('keywords') : '';
				return str.match(query) || tag.match(query);
			}).show();
		}
	}
});
