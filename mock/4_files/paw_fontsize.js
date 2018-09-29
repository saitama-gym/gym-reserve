jQuery(function($){
	var INSET = 'inset white 2px';
	var OUTSET = 'outset white 2px';
	var fonthis = $.cookie('fsize');
	var colorhis = $.cookie('color');
	var fontflg;
	var colorflg;
	var clicksize;
	var clickcolor;
	var size;
	if ( null != fonthis ) {
		try {
			if ( 1 == fonthis ) {
				size = gSmallSize;
				$('#small a').css('border',INSET);
				fontflg=1;
			} else if ( 3 == fonthis ) {
				size = gLargeSize;
				$('#large a').css('border',INSET);
				fontflg=3;
			} else {
				size = gMiddleSize;
				$('#middle a').css('border',INSET);
				fontflg=2;
			}
			$('table.head,table.tcontent,table.tablelist,table.m_akitablelist,table.akitablelist,table.akitablelist2,table.se_akitablelist,table.lotselectlist,table.lottablelist,table.lotapplylist').css('font-size',size);
			$('p.pcontent').css('font-size',size);
			$('div.dcontent').css('font-size',size);
			$('caption.ccontent').css('font-size',size);
			$('td.s-24m,td.s-24').css('font-size',size);
		} catch(e) {
			size = gMiddleSize;
			$('table.head,table.tcontent,table.tablelist,table.m_akitablelist,table.akitablelist,table.akitablelist2,table.se_akitablelist,table.lotselectlist,table.lottablelist,table.lotapplylist').css('font-size',size);
			$('p.pcontent').css('font-size',size);
			$('div.dcontent').css('font-size',size);
			$('caption.ccontent').css('font-size',size);
			$('td.s-24m,td.s-24').css('font-size',size);
			$('#middle a').css('border',INSET);
			fontflg=2;
		}
	}
	if ( null != colorhis ) {
		$('#csschange').attr({href:"prs_color" + colorhis + ".css"});
		$("#color" + colorhis + " a").css('border',INSET);
		if ( 0 == parseInt(colorhis)%2 ) {
			$('#label1').attr('src','image/lw_fontchange2.gif');
			$('#label2').attr('src','image/lw_colorchange2.gif');
		}
		colorflg=colorhis;
	}
	$('li','#fontChange').click(
	function(){
		if ( 'li-label1' != this.id ) {
			if ( 'small' == this.id ) {
				clicksize=gSmallSize;
				$('.afont').css('border',OUTSET);
				$('#small a').css('border',INSET);
				fontflg=1;
			} else if ( 'middle' == this.id ) {
				clicksize=gMiddleSize;
				$('.afont').css('border',OUTSET);
				$('#middle a').css('border',INSET);
				fontflg=2;
			} else if ( 'large' == this.id ) {
				clicksize=gLargeSize;
				$('.afont').css('border',OUTSET);
				$('#large a').css('border',INSET);
				fontflg=3;
			}
			$('table.head,table.tcontent,table.tablelist,table.m_akitablelist,table.akitablelist,table.akitablelist2,table.se_akitablelist,table.lotselectlist,table.lottablelist,table.lotapplylist').css('font-size',clicksize);
			$('p.pcontent').css('font-size',clicksize);
			$('div.dcontent').css('font-size',clicksize);
			$('caption.ccontent').css('font-size',clicksize);
			$('td.s-24m,td.s-24').css('font-size',clicksize);
			$.cookie('fsize',fontflg,{expires:7});
		}
	});
	$('li','#colorChange').click(
	function(){
		if ( 'li-label2' != this.id ) {
			clickcolor=this.id.substring(5,this.id.length);
			$('#csschange').attr({href:"prs_color" + clickcolor + ".css"});
			$('.acolor').css('border',OUTSET);
			$("#color" + clickcolor + " a").css('border',INSET);
			if ( 0 == parseInt(clickcolor)%2 ) {
				$('#label1').attr('src','image/lw_fontchange2.gif');
				$('#label2').attr('src','image/lw_colorchange2.gif');
			} else {
				$('#label1').attr('src','image/lw_fontchange1.gif');
				$('#label2').attr('src','image/lw_colorchange1.gif');
			}
			colorflg=clickcolor;
			$.cookie('color',clickcolor,{expires:7});
		}
	});
	$('li','#fontChange').hover(
	function(){
		if ( 'small' == this.id ) {
			$('#small a').css('border',INSET);
		} else if ( 'middle' == this.id ) {
			$('#middle a').css('border',INSET);
		} else if ( 'large' == this.id ) {
			$('#large a').css('border',INSET);
		}
	},
	function(){
		if ( 'small' == this.id ) {
			if ( 1 != fontflg ) {
				$('#small a').css('border',OUTSET);
			}
		} else if ( 'middle' == this.id ) {
			if ( 2 != fontflg ) {
				$('#middle a').css('border',OUTSET);
			}
		} else if ( 'large' == this.id ) {
			if ( 3 != fontflg ) {
				$('#large a').css('border',OUTSET);
			}
		}
	});
	$('li','#colorChange').hover(
	function(){
		hovercolor=this.id.substring(5,this.id.length);
		$('#color' + hovercolor + ' a').css('border',INSET);
	},
	function(){
		hovercolor=this.id.substring(5,this.id.length);
		if ( hovercolor != colorflg ) {
			$('#color' + hovercolor + ' a').css('border',OUTSET);
		}
	});
});
