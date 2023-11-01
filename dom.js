const amount = document.getElementById("amount");
const dd = document.getElementById("drop-down");
const catogery = document.getElementById("catogery");
const form = document.querySelector("form")

const food = document.querySelector("#food");
const elec = document.querySelector("#elect");
const care = document.querySelector("#care");

function createButton(classes) {

    const button = document.createElement('button');
    button.className = classes;
    button.innerHTML = "Delete Product";
    button.id = "del";

    return button;
}

form.addEventListener("submit", (e) => {
    e.preventDefault();

    var li = document.createElement("li");
    li.innerHTML = `${catogery.value} - ${amount.value} - ${dd.value} - `;

    const delButton = createButton("btn btn-outline-secondary");
    li.appendChild(delButton);


    delButton.addEventListener('click', () => {
        li.remove();
    });

    if (dd.value == "Food Product") {
        food.appendChild(li);
    }
    else if (dd.value == "Skin Care") {
        care.appendChild(li);
    }
    else {
        elec.appendChild(li);
    }

    axios
        .post("https://crudcrud.com/api/e282c4a8276740fe9df0cba771635381/Products", {
            name: catogery.value,
            amount: amount.value,
            type: dd.value,

        })
        .then((response) => console.log(response))
        .catch((err) =>
            console.log(err)
        );

    form.reset();
})

window.addEventListener("DOMContentLoaded", () => {
    axios.get("https://crudcrud.com/api/e282c4a8276740fe9df0cba771635381/Products")
        .then((res) => {

            for (let i = 0; i < res.data.length; i++) {

                displayUser(res.data[i]);
            }
        })
        .catch((err) => console.log(err))
})

function displayUser(user) {
    var li = document.createElement("li");
    li.innerHTML = `${user.name} - ${user.amount} - ${user.type} -`

    const delButton = createButton("btn btn-outline-secondary");
    li.appendChild(delButton);

    if (user.type == "Food Product") {
        food.appendChild(li);
    }
    else if (user.type == "Skin Care") {
        care.appendChild(li);
    }
    else {
        elec.appendChild(li);
    }

    const id = user._id;

    delButton.addEventListener('click', () => {

        deleteUser(id, li);

    });

}

function deleteUser(id, li) {

    axios
        .delete(`https://crudcrud.com/api/e282c4a8276740fe9df0cba771635381/Products/${id}`)
        .then((res) => li.remove())
        .catch((err) => console.log(err))

}