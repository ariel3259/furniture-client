
login.onclick = async () => {
    if(!email.value || !password.value) return Swal.fire("Error", "First write your data", "error");
    const data = {
        email : email.value,
        password : password.value
    };
    try{
        const response = await axios.post("http://localhost:8000/api/users/auth", data);
        const message = response.data;
        if(!message.token) return Swal.fire("Error", message, "error");
        Swal.fire("Congratulations", message.text, "success").then( () => {
            localStorage.token = message.token;
            window.location.href = "./public/furniture.html";
        });
    }
    catch(err){
        console.log(err);
    }
}
