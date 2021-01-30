//REQUIRED PACKAGES


const request = require("request-promise");
const fetch = require("isomorphic-fetch");
const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");
const json2csv = require("json2csv").Parser;
const { gzip } = require("zlib");


//REQUIRED PACKAGES


(async () => {
    let currData = [];
    let urls = []
        console.log("finding URLS .....");
        let pg = 1

        //URL SELECTOR ->>

        const baseURL = "https:/xyz/en/houses.html?page="+pg; 

        //GIVE THE BASE WEB URL CONTAINING ALL LISTINGS AND EDIT IN A WAY THAT PAGE VALUE IS DYNAMICALLY ALLOTED


        while (pg!=3) //SET pg!=(last page number)
         {
            await axios.get(baseURL).then((resp)=>{
                let $ = cheerio.load(resp.data);
                
                let j = 1
                while(true){

                    // LISTING SELECTOR ->>


                    let p= "#content-wrap > main > article:nth-child("+j+") > section > section > h2 > a"  

                    //SET THE SELECTER OF EACH LISTING IN A WAY THAT THE EVERY CARD'S URL IS FETCHED . FOR THIS YOU HAVE TO INSPECT AND TRY TO FINE TUNE THE SELECTOR FOR CARD URL.
                    
                    if ($(p).length == 0) {
                        console.log("Completed URL FINDING")
                        break
                    } else {
                        urls.push($(p)[0].attribs.href)
                        j = j + 1
                        console.clear();
                        console.log(j);
                    }
                }
        
                
                
            })




            pg = pg + 1
        }
    
    
        let c=1
    for(let indo of urls){
        console.clear();
        console.log("finding..."+c);
        await axios.get(indo).then((res)=>{
            let $ = cheerio.load(res.data);
            

            //NOW INSPECT AND FIND SELECTORS AND DROP THEM BELOW TO BE SCRAPPED.

            /*-----------------------------NOTE---------------------------

             SOME ELEMENTS ARE SCATTERED OR HAVE AN ARRAY LIKE PICTURES 

             YOU HAVE FIND THE INTERGER CONTROL AND DEN LOOP THROUGH THOSE

             -------------------------------------------------------------

            */

            const title = null //TITLE SELECTOR

            let address = null //ADDRESS SELECTOR    
            
            const agent_phn = null //AGENT PHONE NUMBER SELECTOR
        
            const agent_name = null //AGENT NUMBER SELECTOR
        
            const desc = null //DESCRIPTION SELECTOR
        
            const property_type = null //PROPERTY TYPE SELECTOR
        
            const price = null //PRICE SELECTOR 
        
            const property_area = null //PROPERTY SELECTOR

            let pic_primary = null //PRIMARY IMAGE SELECTOR
            
    
            currData.push({
                title,
                address,
                agent_phn,
                agent_name,
                desc,
                property_type,
                price,
                property_area,
                pic_primary
            });
            
        })
        c = c+1
    }



    console.log("making a csv");
    const j2cp = new json2csv()
    const csv = j2cp.parse(currData)

    let fileName  = null //GIVE FILE NAME e.g /country.csv

    fs.writeFileSync(fileName,csv,"utf-8");
    

   console.log("success!!!!");



    


    

}


)();