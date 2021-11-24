
register.onclick = async () => {
    if (!Name.value || !lastName.value || !email.value || !password.value) return Swal.fire("Error", "First write your data", "error");
    const data = {
        name : Name.value,
        last_name : lastName.value,
        email : email.value,
        password : password.value
    };
    try{
        const response = await axios.post("http://localhost:8000/api/users/register", data);
        Swal.fire(response.data, "you're going to sign in page", "success").then( () => window.location.href = "../index.html");
    }catch(err){
        console.log(err);
    }
}