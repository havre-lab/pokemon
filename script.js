function getStats(jsonObject,level=0){
    let returnable=document.createElement("div")
    let br=document.createElement("br");
    for (let key in jsonObject){
        if(Array.isArray(jsonObject[key])){
            var container=document.createElement("details");
            var spaces=`\u00A0`.repeat(4*level)
            var summary=document.createElement("summary");
            summary.appendChild(document.createTextNode(`${spaces}${key}`))
            container.appendChild(summary)
            for (let i=0; i<jsonObject[key].length; i++) {
                var minitaner=document.createElement("div");
                minitaner.appendChild(getStats(jsonObject[key][i],level+1))
                container.appendChild(minitaner);
            }
            returnable.appendChild(container);
        }
        else if (typeof jsonObject[key]=="object"){
            var container=document.createElement("details");
            var spaces=`\u00A0`.repeat(4*level)
            var summary=document.createElement("summary");
            summary.appendChild(document.createTextNode(`${spaces}${key}`))
            container.appendChild(summary)
            container.appendChild(getStats(jsonObject[key],level+1))
            returnable.appendChild(container);
        }
        
        else{
            var spaces=`\u00A0`.repeat(4*(level+1))
            var textNode=document.createTextNode(
                `${spaces}${key}: ${jsonObject[key]}`
           ) 
           returnable.appendChild(textNode)
           returnable.append(br.cloneNode())
        }
        
        
    }
    return returnable;
}
function iterateStats(jsonObject){
    let space=document.getElementById("space");
    space.innerHTML=""
    space.appendChild(getStats(jsonObject))
}
function updatePokemon(){
    let value=document.getElementById("pokemon").value;
    let urlName=`https://pokeapi.co/api/v2/pokemon/${value.toLowerCase()}`
    fetch(urlName)
    .then(x=>x.json())
    .then(y=>{iterateStats(y)})
    .catch(error=>{document.getElementById("space").innerHTML="Pokemon Not Found"})
}