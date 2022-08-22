function solution() {
 

    let listInfo = 'http://localhost:3030/jsonstore/advanced/articles/list'
    let main = document.getElementById("main");
    // print all information

    fetch(listInfo)
    .then(data => data.json())
    .then(token =>{



        for(let i = 0; i < token.length; i++){

            let currentObject = token[i];


            let divAccordion = document.createElement("div");
            divAccordion.classList.add("accordion");
            
            let divHead = document.createElement("div");
            divHead.classList.add("head");

            let spanTitle = document.createElement("span");
            spanTitle.innerHTML = currentObject.title;

            let moreButton = document.createElement("button");
            moreButton.classList.add("button");
            moreButton.id = currentObject._id;
            moreButton.innerHTML = "More"

         



            divHead.appendChild(spanTitle);
            divHead.appendChild(moreButton);
            divAccordion.appendChild(divHead);

            let divExtra = document.createElement("div");
            divExtra.classList.add("extra");

            let paragraph = document.createElement("p");

        
            

            divExtra.appendChild(paragraph);
            divAccordion.appendChild(divExtra);

       

            main.appendChild(divAccordion);



            
        moreButton.addEventListener("click",() => { 


            if(moreButton.innerHTML === "More"){

                fetch(`http://localhost:3030/jsonstore/advanced/articles/details/${currentObject._id}`)
               .then(details => details.json())
               .then(extractDetails =>{
                paragraph.innerHTML = extractDetails.content;
                });

                moreButton.innerHTML = "Less";
                divExtra.classList.remove("extra")

            }else if(moreButton.innerHTML === "Less"){
                paragraph.innerHTML = "";
                moreButton.innerHTML = "More";
                divExtra.classList.add("extra")
            
            }


        })
        }


    });


}
solution();