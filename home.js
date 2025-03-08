function loadedAllCets(){
    document.getElementById('card-container').innerHTML=""
    fetch('https://openapi.programming-hero.com/api/peddy/pets')
    .then((res) => res.json())
    .then((data) => {
        data.pets.forEach(element => {
    
            const parent = document.getElementById('card-container');

            const div = document.createElement('div');

            div.innerHTML = `
        <div class="card bg-base-100 w-80 shadow-sm">
                            <figure>
                                <img src="${element.image}"
                                    alt="Shoes" />
                            </figure>


                            <div class="card-body">
                                <h2 class="card-title">
                                    <div class="badge badge-secondary">NEW</div>
                                </h2>

                                <div class="flex gap-2">
                                    <div>
                                        <i class="fa-solid fa-dice-four fa-xl" style="color: #b0b0b0;"></i>
                                    </div>
                                    <p class="font-bold text-gray-500">Breed: ${element.breed}</p>
                                </div>
                                <div class="flex gap-2">
                                    <div>
                                        <i class="fa-solid fa-cake-candles fa-xl"></i>
                                    </div>
                                    <p class="font-bold text-gray-600">Birth:${element.date_of_birth}</p>
                                </div>

                                <div class="flex gap-2">
                                    <div>
                                        <i class="fa-solid fa-venus fa-xl" style="color: #949699;"></i>
                                    </div>
                                    <p class="font-bold">Gender: ${element.gender}</p>
                                </div>

                                <div class="flex gap-2">
                                    <div>
                                        <i class="fa-solid fa-money-bill fa-xl" style="color: #8c9097;"></i>
                                    </div>
                                    <p class="font-bold">price: ${element.price}</p>
                                </div>



                                <div class="card-actions ">
                                    <div class="border px-5 py-1 rounded-md"><i class="fa-solid fa-thumbs-up fa-2xl"
                                            style="color: #c4cad4;"></i></div>
                                    <div class="border px-5 py-1 rounded-md fresh-colour font-bold">Adoft</div>
                                    <div class="border px-5 py-1 rounded-md fresh-colour  font-bold">Details</div>
                                </div>
                            </div>
                        </div>
        
        
        
        `
            parent.appendChild(div)
        });
    })
}
loadedAllCets()


const allCetagoryBtn = document.querySelectorAll('.fresh-border')


for (const btn of allCetagoryBtn) {

    btn.addEventListener('click', function (event) {

        console.log(event.target.className)
        for (const againBtn of allCetagoryBtn) {

            againBtn.classList.remove('rounded-full', 'text-white', 'fresh-border')
            againBtn.classList.add('rounded-lg', 'text-black')
            againBtn.classList.remove('fresh')


        }
        const cetagory = event.target.innerText;
        let singularCetagory = '';
        for (let item = 0;item<cetagory.length-1 ;item++) {
            singularCetagory+=cetagory[item].toLowerCase();
        }
        btn.classList.remove('rounded-lg')

        btn.classList.add('rounded-full', 'fresh', 'text-white')

        document.getElementById('card-container').innerHTML=""
        fetch(`https://openapi.programming-hero.com/api/peddy/category/${singularCetagory}`)
        .then((res) => res.json())
        .then((items) =>loadedAllCets(items.data))

    })
}