let currentDate=new Date()

function renderCalendar(){

const grid=document.getElementById("calendar-grid")
const title=document.getElementById("calendar-title")

grid.innerHTML=""

const year=currentDate.getFullYear()
const month=currentDate.getMonth()

title.textContent=year+"年"+(month+1)+"月"

const firstDay=new Date(year,month,1).getDay()
const days=new Date(year,month+1,0).getDate()

for(let i=0;i<firstDay;i++){
grid.appendChild(document.createElement("div"))
}

const records=JSON.parse(localStorage.getItem("records")||"[]")

for(let d=1;d<=days;d++){

const cell=document.createElement("div")
cell.className="day"

const dateStr=
year+"-"+String(month+1).padStart(2,"0")+"-"+String(d).padStart(2,"0")

cell.innerHTML="<b>"+d+"</b>"

let dayRecords=records.filter(r=>r.date===dateStr)

let income=0
let expense=0
let currencies=[]

dayRecords.forEach(r=>{

if(r.type==="income")income+=r.jpy
if(r.type==="expense")expense+=r.jpy

if(r.currency!=="JPY"){
currencies.push(r.amount+r.currency)
}

})

if(currencies.length){

const c=document.createElement("div")
c.textContent=currencies.join(",")
cell.appendChild(c)

}

if(income>0){

const div=document.createElement("div")
div.className="income"
div.textContent="+"+income+"円"
cell.appendChild(div)

}

if(expense>0){

const div=document.createElement("div")
div.className="expense"
div.textContent="-"+expense+"円"
cell.appendChild(div)

}

grid.appendChild(cell)

}

}



document.getElementById("prev-month").onclick=()=>{
currentDate.setMonth(currentDate.getMonth()-1)
renderCalendar()
}

document.getElementById("next-month").onclick=()=>{
currentDate.setMonth(currentDate.getMonth()+1)
renderCalendar()
}

renderCalendar()