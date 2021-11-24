const modalAdd = new bootstrap.Modal(modalFurniture);
const modalModify = new bootstrap.Modal(modalDescription);
const token = localStorage.token;

logout.onclick = () => {
    Swal.fire("Goodbye", "", "success").then( () => {
        localStorage.removeItem("token");
        window.location.href = "../index.html";
    })
}

const showFurnitures = async () => {
    if(!token || token === "null") return Swal.fire("Error", "You can't into this page without a acount", "error").then( () => window.location.href = "../index.html");
    try{
        const response = await axios.get("http://localhost:8000/api/furniture/read", {
            headers:{
                "authorization": token
            }
        });
        const furnitures =await  response.data;
        furnitures.forEach(element => 
            furnituresContainer.innerHTML += `
            <div class="card-furniture" onclick="showFurnituresDescription('${element.name}', '${element.brand}', '${element.furniture_type}', ${element.price}, ${element.stock}, ${element.id})">
                <h2 class="furniture-header">${element.name}</h2>
                <div class="furniture-body">
                    <h2 class="furniture-text">${element.brand}</h2>
                </div>
            </div>
            `
        );
    }catch(err){
        console.log(err)
        window.location.href = "../index.html";
    }
}
showFurnitures();

const showFurnituresDescription = (Name, Brand, Type, Price, Stock, Id) => {
    modalModify.show();

    txtName.value = Name;
    brand.value = Brand;
    type.value = Type;
    price.value = Price;
    stock.value = Stock;
    id.value = Id;
}

addFurniture.onclick = () => {
    modalAdd.show();
}

saveFurniture.onclick = async () => {
    if(!nameCreate.value || !Brand.value || !Type.value || !Price.value || !Stock.value) return Swal.fire("Error", "First write your data", "error");
    const data = {
        name : nameCreate.value,
        brand : Brand.value,
        furniture_type : Type.value,
        price : Price.value,
        stock : Stock.value
    }
    try{
        const response = await axios.post("http://localhost:8000/api/furniture/add", data,  {
            headers : {
                "authorization" : token
            }});
        Swal.fire(response.data, "", "success").then( () => window.location.reload())
    }catch(err){
        console.log(err);
        window.location.href = "../index.html";
    }
}

modifyFurniture.onclick = async () => {
    const data = {
        name : txtName.value,
        brand : brand.value,
        furniture_type : type.value,
        price : price.value,
        stock : stock.value,
        id : id.value
    };
    try{
        const response = await axios.put("http://localhost:8000/api/furniture/modify", data, {
            headers : {
                "authorization" : token
            }
        });
        Swal.fire(response.data, "", "success").then( () => window.location.reload());
    }catch(err){
        console.log(err);
        window.location.href = "../index.html";
    }
}

deleteFurniture.onclick = async () => {
    const options = {
        headers : {
            "authorization" : token,
            "id" : id.value
        }
    };
    try{
        const response = await axios.delete("http://localhost:8000/api/furniture/delete", options);
        Swal.fire(response.data, "", "success").then( () => window.location.reload());
    }catch(err){
        console.log(err);
        window.location.href = "../index.html";
    }

}