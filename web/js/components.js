function init_xmarker() {
	var c =0;
	$.each($(".xmarker"), function() {
		for(var i=0; i<3;i++) {
			var span = $('<span class="marker'+(c)+'" style="cursor:pointer; position:relative; top:-5px; padding-left: 4px; padding-right: 4px">X</span>');
			var span = $('<span class="marker'+(c)+'" style="cursor:pointer; position:relative; top:-5px; padding-left: 4px; padding-right: 4px">X</span>');

			console.log("sow"+i);
			(function() {
				var cc = c;
				span.click(function() {
					if(!display) {
						console.log("click"+cc);
						wsSend("setFail",cc);
					}
				});
			})();
			$(this).append(span);
			c++;
		}
	});
}