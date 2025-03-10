
function allPets(data) {
    if (data.length === 0) {
        document.getElementById('card-container').innerHTML = ""
        document.getElementById('picture').innerHTML = ""
        const parent = document.getElementById('card-container');
        const div = document.createElement('div');
        div.classList.add('w-full', 'col-span-3')
        div.innerHTML = `
        
                        <div class="flex w-full mx-auto justify-center items-center">   

                            <img src="images/notfound.png" alt="">

                        </div>
                
        `
        parent.appendChild(div)

        return;
    }

    data.forEach(element => {


        const imgparent = document.getElementById('picture')
        const imagediv = document.createElement('div');


        imagediv.innerHTML = `
        <div class="border fresh-border rounded-md"><img src="${element.image}" alt=""></div>
        
        
        `
        imgparent.appendChild(imagediv);


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
                                <div onclick="details.showModal(),DetailsAnimels(${element.petId})"  class="border px-5 py-1 rounded-md fresh-colour   font-bold">Details</div>
                            </div>
                        </div>
                    </div>
    
    
    
    `
        parent.appendChild(div)
    });
}


function loadedAllCets() {
    document.getElementById('card-container').innerHTML = ""
    document.getElementById('picture').innerHTML = ""

    fetch('https://openapi.programming-hero.com/api/peddy/pets')
        .then((res) => res.json())
        .then((data) => allPets(data.pets))

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
        for (let item = 0; item < cetagory.length - 1; item++) {
            singularCetagory += cetagory[item].toLowerCase();
        }
        btn.classList.remove('rounded-lg')

        btn.classList.add('rounded-full', 'fresh', 'text-white')

        document.getElementById('card-container').innerHTML = ""
        document.getElementById('picture').innerHTML = ""
        fetch(`https://openapi.programming-hero.com/api/peddy/category/${singularCetagory}`)
            .then((res) => res.json())
            .then((items) => {
                allPets(items.data),
                    console.log(items.data)
            })

    })
}

function DetailsAnimels(id) {
    console.log('kio')
    fetch(`https://openapi.programming-hero.com/api/peddy/pet/${id}`)
        .then((res) => res.json())
        .then((data) => {
            const item = data.petData;

            console.log(item)
            const parent = document.getElementById('details-container')

            parent.innerHTML=`

            
                <form method="dialog">
                    <div class="card bg-base-100 w-full  my-3 shadow-sm">
                        <figure>
                            <img class="rounded-md w-full" src="${item.image}"
                                alt="Shoes" />
                        </figure>
                        <div class="card-body">
                            <h2 class="card-title">Pet Name: ${item.pet_name}</h2>
                            <div class="grid grid-cols-2">
                                <p class="text-gray-600">Gender: ${item.gender}</p>
                                <p class="text-gray-600">Date of Birth:${item.date_of_birth} </p>
                                <p class="text-gray-600">Cetagory: ${item.category}</p>
                                <p class="text-gray-600">Price: ${item.price}</p>
                                <p class="text-gray-600">Breed: ${item.breed} </p>
                            </div>
                            <p class="font-bold font-xl">Description: ${item.pet_details}</p>
                            <div class="card-actions justify-end">

                                <button class="btn  bg-emerald-300 text-black">Buy Now</button>
                                <button class="btn  bg-[#0E7A81] text-white">Add To Cart</button>

                            </div>
                        </div>
                    </div>

                    <button class="btn   w-full  text-white bg-[#0E7A81]  ">Close</button>
                </form>

            `
        })
}