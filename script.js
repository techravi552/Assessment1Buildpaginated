

const rowsPerPage = 10
let currentPage = 1
let sortColumn = ""
let sortDirection = "asc"

const searchInput = document.getElementById("searchInput")
const roleFilter = document.getElementById("roleFilter")
const statusFilter = document.getElementById("statusFilter")

const tableBody = document.querySelector("tbody")
const pagination = document.getElementById("pagination")


let users = []

for(let i=1;i<=500;i++){

users.push({
id:i,
name:"User "+i,
email:"user"+i+"@mail.com",
role:["Admin","User","Manager"][Math.floor(Math.random()*3)],
status:["Active","Inactive"][Math.floor(Math.random()*2)],
joinedAt:"2023-"+((i%12)+1)+"-"+((i%28)+1)
})

}

let filteredData = [...users]

function renderTable(){

tableBody.innerHTML=""

let start=(currentPage-1)*rowsPerPage
let end=start+rowsPerPage

let pageData=filteredData.slice(start,end)

pageData.forEach(user=>{

let row=`<tr>

<td>${user.id}</td>
<td>${user.name}</td>
<td>${user.email}</td>
<td>${user.role}</td>
<td>${user.status}</td>
<td>${user.joinedAt}</td>

</tr>`

tableBody.innerHTML+=row

})

renderPagination()

}

function renderPagination(){

pagination.innerHTML=""

let totalPages=Math.ceil(filteredData.length/rowsPerPage)

for(let i=1;i<=totalPages;i++){

let btn=document.createElement("button")
btn.innerText=i

btn.onclick=()=>{

currentPage=i
renderTable()

}

pagination.appendChild(btn)

}

}

function applyFilters(){

let search=searchInput.value.toLowerCase()
let role=roleFilter.value
let status=statusFilter.value

filteredData=users.filter(user=>{

let matchSearch=
user.name.toLowerCase().includes(search) ||
user.email.toLowerCase().includes(search)

let matchRole=!role || user.role===role
let matchStatus=!status || user.status===status

return matchSearch && matchRole && matchStatus

})

if(sortColumn){
sortData()
}

currentPage=1
renderTable()

}

function sortData(){

filteredData.sort((a,b)=>{

let valA=a[sortColumn]
let valB=b[sortColumn]

if(valA<valB) return sortDirection==="asc"?-1:1

if(valA>valB) return sortDirection==="asc"?1:-1
return 0

})

}

document.querySelectorAll("th").forEach(th=>{

th.addEventListener("click",()=>{

let column=th.dataset.column

if(sortColumn===column){
sortDirection=sortDirection==="asc"?"desc":"asc"
}else{
sortColumn=column
sortDirection="asc"
}

sortData()
renderTable()

})

})

roleFilter.onchange=applyFilters
statusFilter.onchange=applyFilters



let debounceTimer

searchInput.addEventListener("input",()=>{

clearTimeout(debounceTimer)

debounceTimer=setTimeout(()=>{

applyFilters()

},300)

})

renderTable()