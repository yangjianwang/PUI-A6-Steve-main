
function product(name, price, description, amount, png) {
	this.name = name;
	this.price = price;
	this.description = description;
	this.amount = amount;
	this.png = png
	return {
		name, price, description, amount, png
	}
}
var vanilla = new product("vanilla", "1.99", "Best seller, with gluten", 0, 'c1.jpg');
var caramel = new product("caramel", "1.99", "Super sweet", 0, 'c2.jpeg');
var pumpkin = new product("pumpkin", "1.99", "Nice taste", 0, 'c3.jpg');
var walnut = new product("walnut", "1.99", "Good Stuff", 0, 'c4.jpg');
var blueberry = new product("blueberry", "1.99", "healthy", 0, 'c5.jpg');
var rainbow = new product("rainbow", "1.99", "happy feelings", 0, 'c6.jpg');
var vanillagf = new product("vanilla(gf)", "1.99", "Best seller, without gluten", 0, 'c7.jpg');
var original = new product("original", "1.99", "nice old taste", 0, 'c8.jpg');
/* products */
var maindata = [vanilla, caramel, pumpkin, walnut, blueberry, rainbow, vanillagf, original];
console.log(maindata)

// product.prototype.add = function () {
// 	this.amount = this.amount + 1;
// 	console.log("add " + this.amount + " " + this.name + " to cart");

// }

/* init cart */
var carddata = readdata();
carddata == null ? carddata = [] : carddata;
console.log(carddata);
cardsum(carddata);/* change cart num */
shopcard()
/* fetch data */
dom()
function dom() {
	let html = ''
	maindata.forEach((ele, i) => {
		html += `<div class="product">
				<div class="product-content">
					<div class="product-img">
						<a href="javascript:;" onclick="shadowbox('${ele.price}','${ele.png}','${ele.name}','${ele.description}','${i}')"><img src="./img/${ele.png}" alt="cinnamon picture"></a>
					</div>
				</div>
				<div class="product-info">
					<div class="product-info-top">
						<h2 class="flavor">${ele.name}</h2>
						<div class="num-sold">
							<p> ${ele.description}</p>
						</div>
					</div>
					<p class="price">$ ${ele.price}</p>
				</div>
				<!-- <div class="number">
					<h2 class="flavor">3</h2>
				 </div>-->
			</div>`
	})
	document.querySelector('.product-items').innerHTML = html
}
/* show popup */
function shadowbox(price, png, name, desc, uid) {
	console.log('ccc')
	document.querySelector('.spec-text .price h1').innerHTML = "$"+price;
	document.querySelector('.spec-text >h1').innerHTML = name;
	document.querySelector('.spec-img img').setAttribute('src', `./img/${png}`);
	document.querySelector('.spec-img img').setAttribute('src', `./img/${png}`);
	document.querySelector('.spec-text .num-sold p').innerHTML = desc;
	document.querySelector('.cardbtn').setAttribute('uid', uid);
	document.querySelector('.spec').style.display = 'flex';
}

/* close it */
document.querySelector('.closebtn').addEventListener('click', function () {
	document.querySelector('.spec').style.display = 'none';
})
/* cart pop up */
document.querySelector('.showcard').addEventListener('click', function () {
	document.querySelector('.shopshadow').style.display = 'block'
})
/* close */
document.querySelector('.closeshopcard').addEventListener('click', function () {
	document.querySelector('.shopshadow').style.display = 'none';
})

document.querySelector('.clickbtn').addEventListener('click', function () {
	document.querySelector('.shopshadow').style.display = 'none';
})
/* add to cart */
document.querySelector('.cardbtn').addEventListener('click', function () {

	var index = this.getAttribute("uid");
	adddata(index)
})

function adddata(index) {
	if (document.querySelector('#quantity').value == '' || !document.querySelector('.glazing .sure')) {
		return false;
	}
	var adddata = maindata[index];
	adddata.amount = document.querySelector('#quantity').value;
	adddata.choose = document.querySelector('.glazing .sure').innerHTML;
	if (carddata.length == 0) {
		carddata.push(adddata);

	} else {
		var choosedata = carddata.filter((ele) => {
			return ele.name == maindata[index].name && ele.choose == document.querySelector('.glazing .sure').innerHTML
		});
		console.log(choosedata);
		if (choosedata.length == 0) {

			carddata.push(adddata);
		} else {
			var findindex = carddata.findIndex((ele) => {
				return ele.name == maindata[index].name && ele.choose == document.querySelector('.glazing .sure').innerHTML
			});
			carddata[findindex].amount = carddata[findindex].amount * 1 + adddata.amount * 1
		}

	}
	savedata(carddata)
	/* change num */
	cardsum(carddata);
	/* recal cart */
	shopcard();
	alert('success');
	document.querySelector('.spec').style.display = 'none';
	document.querySelectorAll('.glazing button').forEach((e) => {
		e.classList = ''
	})
	document.querySelector('#quantity').value = '';
}
/* store data */
function savedata(card) {
	sessionStorage.setItem("card", JSON.stringify(card));
}
/* read data */
function readdata() {
	var data = sessionStorage.getItem("card");
	return JSON.parse(data);
}
/* show num */
function cardsum(data) {
	document.querySelector('.cardsum').innerHTML = data.length;
}


// show cart list
function shopcard() {
	var html = '';
	carddata.forEach((ele, i) => {
		html += `
		<li class="fn-clear">
			<div class="name fl">${ele.name}<em>(${ele.choose})</em></div>
			<div class="sum fl">
				<a href="javascript:;" onclick='reducesum(${i})'>-</a>
				<span class="sumnum">${ele.amount}</span>
				<a href="javascript:;"  onclick='addsum(${i})'>+</a>
			</div>
			<div class="price fl">$${ele.price}</div>
			<a href="javascript:;" class="delete fl" onclick='deletedata(${i})'><img src="./delete.svg" alt=""></a>
		</li>`
	})
	document.querySelector('.cardline ul').innerHTML = html;
	sumdata()
}
/* sum of price */
function sumdata() {
	var sum = 0;
	carddata.forEach((ele) => {
		sum += ele.amount * ele.price;
	})
	document.querySelector('.summoney').innerHTML = sum;
}

document.querySelectorAll('.glazing button').forEach((ele) => {
	ele.addEventListener('click', function () {
		document.querySelectorAll('.glazing button').forEach((e) => {
			e.classList = ''
		})
		this.classList = 'sure';
	})
})
/* reduction */
function reducesum(index) {
	if (carddata[index].amount != 1) {
		carddata[index].amount--;
		shopcard()
		savedata(carddata)
	}

}
/* addition */
function addsum(index) {
	carddata[index].amount++;
	shopcard()
	savedata(carddata)
}
/* delete */
function deletedata(index) {
	carddata.splice(index, 1);
	shopcard()
	savedata(carddata)
}
