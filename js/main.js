window.addEventListener("load", function(){
	let menuList=document.querySelectorAll(".controller li");
	let pageList=document.querySelectorAll(".container > div");

	let n=0;
	let targety=0;
	let moving=false;
	let winh;
	let total=menuList.length;

	if(isMobile){
		document.body.classList.add("ismobile");

		pageList[n].classList.add("active");
		menuList[n].classList.add("on");

		function scrollInteraction(t){
			if(t < pageList[1].offsetTop){
				n=0;
			}
			else if(t < pageList[2].offsetTop){
				n=1;
			}
			else if(t < pageList[3].offsetTop){
				n=2;
			}
			else if(t < pageList[4].offsetTop){
				n=3;
			}
			else if(t < pageList[5].offsetTop){
				n=4;

				if(window.innerHeight+t == document.body.scrollHeight){
					n=5;
				}
			}
			else{
				n=5;
			}

			for(let i=0; i<menuList.length; i++){
				if(i == n){
					if(menuList[i].classList.contains("on") == false){
						menuList[i].classList.add("on");
					}
				}
				else{
					if(menuList[i].classList.contains("on") == true){
						menuList[i].classList.remove("on");
					}
				}
			}
		}

		const trigger=new ScrollTrigger.default({
			trigger: {
				once: true,
				toggle: {
					class: {
						in: "active",
						out: "inactive"
					}
				},
				offset: {
					viewport: {
						y: 0.25
					}
				}
			},
			scroll: {
				callback: offset => scrollInteraction(offset.y)
			}
		});

		trigger.add(".main_area, .sub");

		for(let i=0; i<menuList.length; i++){
			menuList[i].addEventListener("click", function(e){
				e.preventDefault();

				targety=pageList[i].offsetTop;

				gsap.to(window, {scrollTo: targety+1, duration: 0.5});
			});
		}
	}
	else{
		winh=window.innerHeight;
		menuList[n].classList.add("on");
		pageList[n].classList.add("active");

		window.addEventListener("resize", function(){
			winh=window.innerHeight;
			targety=n*winh;

			gsap.to(window, {scrollTo: targety, duration: 0.5});
		});

		document.body.addEventListener("mousewheel", function(e){
			if(moving == true) return;

			if(e.wheelDeltaY > 0){ // up
				if(n > 0){
					n-=1;
				}
				else{
					return;
				}
			}
			else{ // down
				if(n < total-1){
					n+=1;
				}
				else{
					return;
				}
			}

			moving=true;

			targety=n*winh;

			gsap.to(window, {scrollTo: targety, duration: 0.5, onComplete: function(){
				moving=false;

				for(let i=0; i<menuList.length; i++){
					if(i == n){
						menuList[i].classList.add("on");
						pageList[i].classList.add("active");
					}
					else{
						menuList[i].classList.remove("on");
						pageList[i].classList.remove("active");
					}
				}
			}});
		});
	}
});