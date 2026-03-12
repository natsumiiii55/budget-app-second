function loadChart(pair){

document.getElementById("exchange-chart").innerHTML=`
<iframe
src="https://s.tradingview.com/widgetembed/?symbol=FX:${pair}&interval=D&theme=light"
width="100%"
height="400"
frameborder="0">
</iframe>
`

}

window.onload=()=>{
loadChart("USDJPY")
}