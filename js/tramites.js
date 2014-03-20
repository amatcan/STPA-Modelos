var CSS_QUERY_CORTE_TABLET = 430;
var CSS_QUERY_CORTE_DESKTOP = 730;
var POS_INICIAL_AYUDA_TOP = 0;
var POS_INICIAL_AYUDA_LEFT = 0;
var WIDTH_AYUDA = 0;

/**
Inicialización del interface de tramitación.
*/
function inicializa(){
	POS_INICIAL_AYUDA_TOP = $('#ventana-ayuda').offset().top;
	POS_INICIAL_AYUDA_LEFT = $('#ventana-ayuda').offset().left;
	WIDTH_AYUDA = $('#ventana-ayuda').width();
	console.log(POS_INICIAL_AYUDA_TOP+","+POS_INICIAL_AYUDA_LEFT+","+WIDTH_AYUDA);
	addClicksAyuda();
	colapsaAyuda(0);
}

/**
Añade los clicks a las cabeceras de la ayuda.
*/
function addClicksAyuda(){
	$("section[id^='ayd_']").each(function(index){
		$(this).click(function(){
			var aspa=$(this).find(".expansor").text();
			colapsaAyuda(-1);			
			if (aspa.indexOf("+")!=-1){
				$(this).find("p").show('fast');
				$(this).find(".expansor").text("- ");
			}else{
				$(this).find("p").hide('fast');
				$(this).find(".expansor").text("+ ");
			}
		});
	});
}
/**
Posiciona el cajetín de la ayuda en función del scroll
*/
function posicionaAyuda(top){
	console.log("posicionaAyuda ");
	if ($(window).width() >= CSS_QUERY_CORTE_DESKTOP){
		var altura_formulario = $("#colA75").height();
		var altura_columna = $("#colB25").height();
		if (altura_columna >= altura_formulario)
			return;
		var altura_min = $("header[role^='banner']").height();
		var altura_max = $("footer[role^='contentinfo']").offset().top -16;
		var altura_ayuda = $('#ventana-ayuda').height();
		var top_ayuda = $('#ventana-ayuda').offset().top;
		console.log("Ayuda situada en: " +  top_ayuda + " y altura " +altura_ayuda);
		console.log("footer en " +  altura_max);
		var parte_abajo_ayuda = top_ayuda + altura_ayuda;
		console.log(top_ayuda +" :: "+parte_abajo_ayuda+" :: "+ altura_ayuda + " ::: "+ altura_max);
		if (altura_min < top){
			if (parte_abajo_ayuda <= altura_max){
				console.log("1 no llega al pie");
				$('#ventana-ayuda').attr("style","position:fixed;top:0px;width:"+WIDTH_AYUDA+"px");
				console.log("1");
			}
			else{
				var top_fixed = altura_ayuda - (altura_max - top);
				console.log("3 toca el pie");
				$('#ventana-ayuda').attr("style","position:fixed;top:-"+top_fixed+"px;width:"+WIDTH_AYUDA+"px");
			}
		}else{
			console.log("2 es relativo");
			$('#ventana-ayuda').attr("style","position:relative");
		}
	}
}

function calculaTamanyoAyuda(){
	console.log("calculaTamanyoAyuda ");
	console.log($(window).width() +","+$(window).height());
	if ($(window).width() >= CSS_QUERY_CORTE_DESKTOP){
		WIDTH_AYUDA = ($("#colA75").width() / 3)-16;
		console.log("ANCHO:"+WIDTH_AYUDA);
		$('#ventana-ayuda').attr("style","position:fixed;top:0px;width:"+WIDTH_AYUDA+"px");		
	}
}

//Gestión de la carga inicial
$(window).load(
//window.onload=
function(){
	console.log("load");
	console.log("scroll top:"+$(window).scrollTop());
	//calculaTamanyoAyuda();
	//posicionaAyuda($(window).scrollTop());
	$(window).scrollTop(0);
	//Gestion del resize
	$(window).resize(function(){
		calculaTamanyoAyuda();
		posicionaAyuda($(window).scrollTop());
	});
	
	//Gestión de la posición de la ayuda
	$(window).scroll(function(){
		console.log("scroll "+$(window).scrollTop());
		posicionaAyuda($(window).scrollTop());
	});
}
);
/**
Abre la ayuda con el identificador dado y cierra el resto
@param id Identificador de la ayuda a abrir
*/
function abreAyudaPorId(id){
	console.log("abriendo la ayuda para "+id);
	colapsaAyuda(-1);
	var aspa=$('#ayd_'+id).find(".expansor").text();
	if (aspa.indexOf("+")!=-1){
		$('#ayd_'+id).find("p").show('fast');
		$('#ayd_'+id).find(".expansor").text("- ");
	}else{
		$('#ayd_'+id).find("p").hide('fast');
		$('#ayd_'+id).find(".expansor").text("+ ");
	}
}
/**
Colapsa todas las secciones de la ayuda y mantiene la indicada
@param indice Indice de la ayuda que se mantiene, si es -1 se cierra todo
*/
function colapsaAyuda(indice){
	$("section[id^='ayd_']").each(function(index){
		if (index != indice){
			$(this).find("p").hide('fast');		
			$(this).find(".expansor").text('+ ');
		}else{
			$(this).find(".expansor").text('- ');
		}
	});
}
/**
Adaptación específica del modelo 008
*/
function ayudaModelo008(){
	$("a[href^='#obligadoTributario']").click(function(){
		abreAyudaPorId('obligadoTributario');
	});
	$("a[href^='#conyuge']").click(function(){
		abreAyudaPorId('conyuge');
	});
	$("a[href^='#nuevoDomiciliio']").click(function(){
		abreAyudaPorId('nuevoDomiciliio');
	});
	$("a[href^='#representante']").click(function(){
		abreAyudaPorId('representante');
	});
	$("a[href^='#fsFechaFirma']").click(function(){
		abreAyudaPorId('fsFechaFirma');
	});
}
