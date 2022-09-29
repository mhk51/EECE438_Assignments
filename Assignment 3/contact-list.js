const setEditModal = (id) => {
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", "http://localhost:3000/contact/"+id, false);
    xhttp.send();
    const contact = JSON.parse(xhttp.responseText);
    console.log(contact);
    const x = `<div class="modal-dialog" role="document">
    <div class="modal-content">
        <div class="modal-header">
            <h5 class="modal-title">Edit Contact</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>

        <div class="modal-body">
                <form action="http://localhost:3000/contact/${contact._id}" method="POST">
                    <div class="form-group">
                        <label for="exampleInputPassword1">Contact Name</label>
                        <input type="text" class="form-control" name="contact_name" id="contact_name" value="${contact.contact_name}">
                    </div>
        
                    <div class="form-group">
                        <label for="exampleInputPassword1">Contact Tel Number</label>
                        <input type="tel" class="form-control" name="contact_Tel_number" id="contact_Tel_number" value="${contact.contact_Tel_number}">
                    </div>
        
                    <div class="form-group">
                        <label for="exampleInputPassword1">Cotnact Mobile Number</label>
                        <input type="tel" class="form-control" name="contact_mobile_number" id="contact_mobile_number" value="${contact.contact_mobile_number}">
                    </div>
        
                    <div class="form-group">
                        <label for="exampleInputPassword1">Contact Profession</label>
                        <input type="text" class="form-control" name="contact_profession" id="contact_profession" value="${contact.contact_profession}">
                    </div>
        
                    <div class="form-group">
                        <label for="exampleInputPassword1">Contact Email</label>
                        <input type="email" class="form-control" name="contact_email" id="contact_email" value="${contact.contact_email}">
                    </div>

                    <button type="submit" class="btn btn-primary">Submit</button>
                </form>
        </div>

    </div>
</div>`

document.getElementById('editBookModal').innerHTML = document.getElementById('editBookModal').innerHTML + x;

}

const  deleteContact  =  (id) => {
    const xhttp = new XMLHttpRequest();
    console.log(id);
    xhttp.open("DELETE", "http://localhost:3000/contact/"+id, false);
    xhttp.send();
    location.reload();
}


const loadContacts = async () => {
    const xhttp = new XMLHttpRequest();

    xhttp.open("GET", "http://localhost:3000/contact", false);
    xhttp.send();

    const contacts = JSON.parse(xhttp.responseText);

    for (let contact of contacts) {
        console.log(contact);
        const x = `
            <div class="col-4">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">${contact.contact_name}</h5>
                        <div>Profession: ${contact.contact_profession}</div>

                        <div>Tel Number: ${contact.contact_Tel_number}</div>
                        <div>Mobile Number: ${contact.contact_mobile_number}</div>
                        <div>Email: ${contact.contact_email}</div>

                        <hr>

                        <button type="submit" class="btn btn-primary" data-toggle="modal" onclick=deleteContact('${contact._id}') style="margin: 5px 10px;">
					Delete
                    </button>
                        <button type="button" class="btn btn-primary" data-toggle="modal" onclick=setEditModal('${contact._id}') style="margin: 5px 10px;">
                            Edit
                        </button>
                    </div>
                </div>
            </div>
        `

        document.getElementById('contacts').innerHTML = document.getElementById('contacts').innerHTML + x;
    }
}

loadContacts();