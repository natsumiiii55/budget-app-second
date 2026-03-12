// ===== タブ切替 =====

document.querySelectorAll(".bottom-tab button").forEach(btn=>{
btn.onclick=()=>{
document.querySelectorAll(".tab").forEach(t=>t.classList.remove("active"))
document.querySelectorAll(".bottom-tab button").forEach(b=>b.classList.remove("active"))

document.getElementById(btn.dataset.tab).classList.add("active")
btn.classList.add("active")
}
})


// ===== カテゴリー =====

const categories={
income:["給料","仕送り","奨学金","副収入","その他"],
expense:["食費","交通","買い物","家賃","娯楽","学費","その他"]
}

let selectedCategory="給料"

function renderCategories(type){

const div=document.getElementById("category-buttons")
div.innerHTML=""

categories[type].forEach(c=>{

const btn=document.createElement("button")
btn.textContent=c

if(c===selectedCategory)btn.classList.add("active")

btn.onclick=()=>{
selectedCategory=c
renderCategories(type)
}

div.appendChild(btn)

})

}

renderCategories("income")

document.querySelectorAll('input[name="type"]').forEach(r=>{
r.onchange=()=>{
selectedCategory=categories[r.value][0]
renderCategories(r.value)
}
})


// ===== 数字キーボード =====

let amount=""
const display=document.getElementById("amount-display")

document.querySelectorAll("#keypad button").forEach(btn=>{

btn.onclick=()=>{

if(btn.id==="delete"){
amount=amount.slice(0,-1)
}else{
amount+=btn.textContent
}

display.textContent=amount||"0"

}

})


// ===== 為替レート（固定） =====

const rates={
JPY:1,
TWD:4.7,
USD:150,
EUR:160,
KRW:0.11
}


// ===== 保存 =====

document.getElementById("save-record").onclick=()=>{

const date=document.getElementById("record-date").value
const type=document.querySelector('input[name="type"]:checked').value
const currency=document.getElementById("currency").value

if(!date||!amount){
alert("日付と金額を入力してください")
return
}

const jpy=Math.round(amount*rates[currency])

let records=JSON.parse(localStorage.getItem("records")||"[]")

records.push({
date,
type,
category:selectedCategory,
amount:Number(amount),
currency,
jpy
})

localStorage.setItem("records",JSON.stringify(records))

amount=""
display.textContent="0"

renderCalendar()
renderHistory()
renderChart()

}


// ===== 履歴 =====

function renderHistory(){

const list=document.getElementById("record-history")
list.innerHTML=""

let records=JSON.parse(localStorage.getItem("records")||"[]")

records.slice().reverse().forEach((r,i)=>{

const div=document.createElement("div")

div.textContent=`${r.date} ${r.category} ${r.amount}${r.currency}`

div.onclick=()=>{
if(confirm("削除しますか？")){

records.splice(records.length-1-i,1)
localStorage.setItem("records",JSON.stringify(records))

renderHistory()
renderCalendar()
renderChart()

}
}

list.appendChild(div)

})

}

renderHistory()



// ===== 分析グラフ =====

let chart

function renderChart(){

const ctx=document.getElementById("monthly-chart")

let records=JSON.parse(localStorage.getItem("records")||"[]")

let months={}
records.forEach(r=>{

const m=r.date.slice(0,7)

if(!months[m])months[m]=0

if(r.type==="expense") months[m]+=r.jpy

})

const labels=Object.keys(months)
const data=Object.values(months)

if(chart)chart.destroy()

chart=new Chart(ctx,{
type:"bar",
data:{
labels:labels,
datasets:[{
label:"月支出",
data:data
}]
}
})

}

renderChart()


// ===== データ削除 =====

document.getElementById("delete-data").onclick=()=>{

if(confirm("データ削除しますか？")){

localStorage.removeItem("records")

renderHistory()
renderCalendar()
renderChart()

}

}