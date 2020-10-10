const Cafelist = document.querySelector('#cafe-list');
const form = document.querySelector('#add-cafe-form');  
function renderCafe(doc){
    let li = document.createElement('li');
    let name = document.createElement('span');
    let city = document.createElement('span');
    let cross = document.createElement('div');

    li.setAttribute('data-id' ,doc.id);
    name.textContent = doc.data().name;
    city.textContent = doc.data().location;
    cross.textContent = 'x';

    li.appendChild(name);
    li.appendChild(city);
    li.appendChild(cross);
    Cafelist.appendChild(li);

    //delete data

    cross.addEventListener('click',(e)=>{
        e.stopPropagation();
        let id = e.target.parentElement.getAttribute('data-id');
        db.collection('cafes').doc(id).delete();
    });
}



// (to get the details for out need )=> db.collection('cafes').where('location','==','jaffna').get().then((snapshot)=>{
//db.collection('cafes').where('location','==','jaffna').orderBy('name').get().then((snapshot)=>{
// db.collection('cafes').get().then((snapshot)=>{
//    // console.log(snapshot.docs);
//    snapshot.docs.forEach(doc=>{
//       // console.log(doc.data());
//       renderCafe(doc);
//    })
// });

//saving data

form.addEventListener('submit' ,(e)=>{
    e.preventDefault();
    db.collection('cafes').add({
        name:form.name.value,
        location:form.location.value
    });
    
    form.name.value="";
    form.location.value="";
});

db.collection('cafes').onSnapshot(snapshot=>{
    let changes = snapshot.docChanges();
    changes.forEach(change=>{
        if(change.type == 'added'){
            renderCafe(change.doc);
        }else if(change.type == 'removed') {
            let li = Cafelist.querySelector('[data-id='+change.doc.id +']');
            Cafelist.removeChild(li);
        }
    })
})