var nG = document.getElementById('newGame')
var btnc = document.getElementById('btn-c')
var createbtn = document.getElementById('create')
nG.style.visibility = 'hidden'
var user = document.getElementById('user').value
var pass = document.getElementById('pass').value

list()
btnc.addEventListener('click',()=>{
    if(btnc.id == 'edit'){
      editGame()
}else{
    if(btnc.id == 'cadastro')
    create()
}
})
function editGame(){
    var inName = document.getElementById('name').value 
    var inauthor = document.getElementById('author').value 
    var inano = document.getElementById('ano').value 
    var inpricing = document.getElementById('pricing').value 
    var id = document.getElementById('pricing').value 
    var game ={
        name:inName,
        author:inauthor,
        pricing:inpricing ,
    }
    
    axios.put('http://localhost:5/games/'+id,game).then((response)=>{
        list()
    }).catch(err=>{
        console.log(err)
    })
}
function LoadEditGame(item,game) {
    console.log(item)
    nG.style.visibility = 'visible'
    btnc.innerHTML = "editar"
    btnc.id = 'edit'
    var inName = document.getElementById('name').value = game.name
    var inauthor = document.getElementById('author').value = game.author
    var inano = document.getElementById('ano').value = game.ano
    var inpricing = document.getElementById('pricing').value = game.pricing
    var inpricing = document.getElementById('pricing').value = game.id

    
}
function deleteGame(item) {
   var id = item.getAttribute('data-id')
   axios.delete('http://localhost:5/games/'+id)
   .then((response)=>{
    list()
   }).catch(err=>{
     console.log(err)
   })
}
function create(){
    var inName = document.getElementById('name').value
    var inauthor = document.getElementById('author').value
    var inano = document.getElementById('ano').value
    var inpricing = document.getElementById('pricing').value
  
    var game = {
        name:inName,
        author:inauthor,
        ano:inano ,
        pricing:inpricing
    }
    console.log(game)
    axios.post('http://localhost:5/games',game).then(()=>{
        list()
        
    }).catch(()=>{
        alert('erro')
    })
}
function list() {


        var axiosConfig = {
            headers:{
                Authorization: "Bearer "+"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoicm54IiwiaWQiOjEsImlhdCI6MTY5NzU5MDc3OCwiZXhwIjoxNjk3NTk3OTc4fQ.mmFW2OeMZa8uC_WRGZ7myQgX8zj-mF1meb79_MCrYcM"
            }
        }
        
        
        axios.get('http://localhost:5/games',axiosConfig)
    .then(response => {
        console.log(response)
        var games = response.data.name;
        var list = document.getElementById('games');
        list.innerHTML =''
        games.forEach(game => {
            var item = document.createElement('li');
            var btn_Delete = document.createElement('button') 
            var btn_Edit = document.createElement('button') 
            item.innerHTML = `${game.id} ${game.name} $${game.pricing}`;
            item.setAttribute("data-id",game.id)
            item.setAttribute("data-author",game.author)
            item.setAttribute("data-name",game.name)
            item.setAttribute("data-pricing",game.pricing)
            item.setAttribute("data-ano",game.ano)
            list.appendChild(item);
            btn_Delete.innerHTML = 'delete'
            btn_Edit.innerHTML = 'Editar'
            btn_Edit.style.width='100px'
            btn_Edit.style.class = '4'
            btn_Delete.style.width='100px'
            btn_Delete.style.backgroundColor='red'
            btn_Delete.style.marginLeft='100px'
            btn_Delete.style.marginRight='20px'
            btn_Delete.addEventListener('click',()=>{
                deleteGame(item)
            })
            btn_Edit.addEventListener('click',()=>{
                LoadEditGame(item,game)
            })
            item.appendChild(btn_Delete)
            item.appendChild(btn_Edit)
            console.log(game.name);
            });
    })
    .catch(err => {
        console.log('erro: ' + err);
    });
}
function showInfo(){
  createbtn.style.visibility = 'hidden'
nG.style.visibility = 'visible'
btnc.innerHTML ='Cadastrar'
btnc.id ='cadastro'

} 
function hiddenform(){
nG.style.visibility = 'hidden'
createbtn.style.visibility = 'visible'
}
