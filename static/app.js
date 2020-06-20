let sites = [];
let siteCycler=0;

function loadSite(){
   if (siteCycler>=sites.length){
      siteCycler=0;
   }
   [title, url] = Object.entries(sites[siteCycler])[0]
   document.getElementById('siteTitle').innerHTML=title
   iframe = document.getElementById('bsif')
   iframe.src = url 
   siteCycler+=1;
}


function cycleIframe(){setInterval(loadSite,8000)}

$.ajax({
    type: 'GET',
    url: `data/site_data.json`,
    beforeSend: function(xhr){
       console.log("sending request")
    },

    success: function(msg){
       console.log(msg);
       tdata = document.getElementById('tableData')
       msg.projects.forEach(p=>{
        tr = document.createElement("tr")
        s = new Object
        s[p.name]=p.rawurl
        sites.push(s)
           Object.entries(p).forEach(([k,v])=>{
               
               if (k=='rawurl'){}
               else{
                  td = document.createElement("td")
                  td.innerHTML = v
                  tr.appendChild(td)
               }
           })
           tdata.appendChild(tr)
       }
       )
       loadSite()
       cycleIframe()
    }
  });


  