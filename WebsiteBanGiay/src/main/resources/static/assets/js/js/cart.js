	var carts = [];
			
function addToCart(id){
	var cart={
		action: 'add',
		id: id,
		numb: 1
	}
		carts.push(cart)
	document.cookie = "cart="+ carts;
		var zcats = []
		zcarts= JSON.stringify(carts)
			console.log(carts)
			console.log(zcarts)
		var z = encodeURIComponent(carts);
		var xz = [];
		xz = decodeURI(z);
		xz = JSON.stringify(carts);
		console.log(z);
		console.log(xz);
		var ds = [];
		ds = JSON.parse(xz);
		var prd=[];
		for(var i=0; i<ds.length; i++){
			prd = console.log(ds[i].id);
		}
		
}



