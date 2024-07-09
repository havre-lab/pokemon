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
                `${spaces}${key}: `
           )
           var spaceP=document.createElement("p");
           
           if (`${jsonObject[key]}`.startsWith(`https:`)){
                spaceP.appendChild(textNode);
                var linkP=document.createElement("a");
                linkP.appendChild(document.createTextNode( `${jsonObject[key]}`))
                if(`${jsonObject[key]}`.startsWith(`https://pokeapi.co`)){
                    linkP.addEventListener("click",function(){getPokemon(`${jsonObject[key]}`,`${jsonObject[key]}`.slice(26))})
                }
                else{
                    linkP.href=`${jsonObject[key]}`
                }
                spaceP.appendChild(linkP)
           }
           else{
            textNode.nodeValue+=`${jsonObject[key]}`
            spaceP.append(textNode);
           }
           
           
           returnable.appendChild(spaceP)
        }
        
        
    }
    return returnable;
}
function iterateStats(jsonObject){
    let space=document.getElementById("space");
    space.innerHTML=""
    space.appendChild(getStats(jsonObject))
}
function getPokemon(urlName,reset="blank__"){
    if (reset!="blank__"){
        document.getElementById("pokemon").value=""
        document.getElementById("label").innerHTML=reset
    }
    fetch(urlName)
    .then(x=>x.json())
    .then(y=>{iterateStats(y)})
    .catch(error=>{document.getElementById("space").innerHTML="Not Found"})
}
function updatePokemon(){
    let value=document.getElementById("pokemon").value;
    document.getElementById("label").innerHTML=`${value}`;
    let urlName=`https://pokeapi.co/api/v2/${value.toLowerCase()}`
    getPokemon(urlName)
}