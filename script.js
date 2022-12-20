let url = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=100&page=1&sparkline=true"
let result = fetch(url)
result.then((res)=>{
  return res.json()
}).then((data)=>{
   //console.log(data)
   ihtml = ""
  for(i in data){
    ihtml += ` 
      <div class="card mx-3 bg-dark my-3 text-light">
        <div class="card-body">
          <div class="header">
            <div class="header-left">
              <div class="image">
                 <img src="${data[i].image}"/>
              </div>
              <div class="symbol">
                 <div class="s-up">
                     <h4 class="card-title">${data[i].symbol.toUpperCase()}</h4>
                 </div>
                 <div class="s-down">
                     <span>${data[i].name}</span>
                 </div>
              </div>
            </div>

            <div class="header-right">
               <div class="p-up">
                     <h4 class="card-title">₹${data[i].current_price}</h4>
                 </div>
                 <div class="p-down">
                     <span id="percentage" class="${data[i].price_change_percentage_24h>0?"green":"red"}">${data[i].price_change_percentage_24h}%</span>
                 </div>
            </div>
        
          </div>
  
           <div class="watch">
             <div class="rank">
                <h1>#${data[i].market_cap_rank}<h5 class="small">MarketCap Rank</h5></h1>
             </div>
             <div>
             <button type="button" class="btn btn-light mt-3" data-bs-toggle="modal" onClick="Showgraph('${encodeURIComponent(JSON.stringify(data[i]))}')" data-bs-target="#staticBackdrop">
  Watch 
             </button>            
             </div>                            
          </div>
             <!-- Modal -->
<div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content bg-dark">
      
      <div class="modal-body" id="clear">
        <canvas id="myGraph"> </canvas>
      </div>      
      <div class="modal-footer">
        <button type="button" onClick="location.reload(true)" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>
           </div>
   
<div class="watch-body" id="clear">
        <h6>MarketCap Rank: #${data[i].market_cap_rank}</h6>
        <h6>Current Price: ₹${data[i].current_price}</h6>
        <h6>Market Cap: ₹${data[i].market_cap}</h6>
        <h6>24h High: <span class="green"> ₹${data[i].high_24h} </span> </h6>
        <h6>24h Low: <span class="red"> ₹${data[i].low_24h} </span> </h6>
        <h6>Change of Price in 24h: <span class=" ${data[i].price_change_percentage_24h>0?"green":"red"}"> ${data[i].price_change_percentage_24h}% </span> </h6>
      </div>
      </div>
        </div>
     </div>
    `
}
  container.innerHTML = ihtml;
});


function Showgraph(obj){
  let createChart 
  obj = JSON.parse(decodeURIComponent(obj))
      let price = obj.sparkline_in_7d.price
      var hoursPerDay = 168;
      var time = [];
      var formattedTime;
      for(i =0; i < hoursPerDay+1 ; i++){
        formattedTime = (moment().subtract(i, "hours")).format("hA");            time.unshift(formattedTime);  
    }                           

    let times = time
    const ctx = document.getElementById('myGraph');
    createChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: times,
      datasets: [{
        label: obj.name,
        data: price,
        borderColor: 'red',
        borderJoinStyle: 'round',
        borderCapStyle: 'round',
        borderWidth: 2,
        pointRadius: 0,
        pointHitRadius: 10,
        lineTension: .2,
      }]
    }   
 })
}