const { val } = require("cheerio/lib/api/attributes")

const mergeeee = document.getElementById("mergerPDFs")





const filePath2 = " "
const fileName2 = " "

let nameArr = []
const mySet1 = new Set()
const combinedRFISET = new Set()


let masterObject = {}
let promiseArray2 = []

const drawingsSet = new Set()

const   combinePDF = async()=>{
    
    let drawingsListOfObjects ={}
    console.log("clcoked")
    await dialog.showOpenDialog( {
        properties: ['openFile',   "multiSelections" ,],
        filters :[
          { name: 'pdf', extensions: ['pdf'] },
      
        ],
        title :"Select pdf files only", 
        defaultPath :"desktop",
        buttonLabel :"Select pdf files only",    
      }).then(result => {
        console.log('reasulte.filePaths :' , result.filePaths)
        for(let i=0; i<result.filePaths.length; i++){
      const  prom1 = new Promise(function(resolve, reject) {

          const filestr =  result.filePaths[i]
          
          const regexPath = /^(.*[\\\/])(.*)$/;
          const match = regexPath.exec(filestr);
      if (match !== null) {
          const filePath2 
          = match[1];                      const fileName2 = match[2];
    //       console.log("filestr :"+ filestr)
    //       console.log("filePath2 :"+ filePath2)
    //   console.log("fileName2 :"+ fileName2)
      // console.log("file path when jined" + path.join(filePath, fileName))
      }
      masterObject[`filepath :${i}`]=filestr
    
       const name = path.parse(filestr).name;
       const dirr = path.parse(filestr).dir;
       direcmaster = dirr
       nameArr.push(name)
      
       if(name.includes("drawing")){

        if(!name.includes(",")){
          drawingsSet.add((name.replace("drawings--","")).replace(/ /g, '')+","+(name.replace("drawings--","")).replace(/ /g, ''))
          drawingsListOfObjects[name.replace("drawings--","").replace(/ /g, '')+","+(name.replace("drawings--","")).replace(/ /g, '')]=filestr
        }else{
          drawingsSet.add((name.replace("drawings--","")).replace(/ /g, ''))
          drawingsListOfObjects[name.replace("drawings--","")]=filestr
        }
       
       }
    

       if(name.includes("--output")){
        mySet1.add( (name.replace("--output","")).replace(/ /g, ''))
       }else   if(name.includes("drawing") ){
        if(!name.includes(",")){
          mySet1.add((name.replace("drawings--","")).replace(/ /g, '')+","+(name.replace("drawings--","")).replace(/ /g, ''))
        }else{
          mySet1.add((name.replace("drawings--","")).replace(/ /g, ''))
        }


        // mySet1.add((name.replace("drawings--","")).replace(/ /g, ''))
       }
       else{
        mySet1.add( (name.substring(15).replace("--","")).replace(/ /g, ''))
        if(name.includes(",") && !name.includes("drawing") ){
          combinedRFISET.add( (name.substring(15).replace("--","")).replace(/ /g, ''))
        }
       
       }
       
       resolve({ "filearray":result.filePaths,"mySet1":mySet1, "drawingsSet":drawingsSet,"drawingsListOfObjects":drawingsListOfObjects, "combinedRFISET":combinedRFISET} )
}) // end fprom,ise
promiseArray2.push(prom1)

 } // endfor
//  console.log("nameArr : ", nameArr)
//  console.log("mySet1 : ", mySet1)
//  console.log("masterObject : ", masterObject)


//  await mergerFunc(result.filepaths, mySet1)
   
    })// end then 

    

 //console.log("promiseArray2 : ", promiseArray2)

  await mergerFunc()

  


}// end fucntion 




const  mergerFunc = async()=>{
    let totalCounter = 0

    console.log(promiseArray2)
 Promise.race(promiseArray2).then( async (value) =>{

//  value.masterObject
console.log(" value.filearray  :",  value.filearray)
console.log(" value.mySet1  :",  value.mySet1)
console.log(" value.drawingsSet  :",  value.drawingsSet)
console.log(" value.drawingsListOfObjects  :",  value.drawingsListOfObjects)
console.log(" value.combinedRFISET  :",  value.combinedRFISET)



// Promise.all(promiseArray2).then( async (value) =>{

// }).cat

  
let arr2= Array.from(value.mySet1)
let arr3 = Array.from(value.mySet1)
let arrDrawing=[] /// arrray for list of drawings
arrDrawing = Array.from(value.drawingsSet)

const mergedPdf = await PDFDocument.create();
let farr =[...arr2]
let resarr =[]
console.log("arr2",arr2)
const mySet2 = new Set()
for (let i = 0; i < arr2.length; i++) {
    for (let j = 0; j < farr.length; j++) {
        if(!arr2[i].includes(farr[j]+",")){
            resarr.push(farr[j])
            mySet2.add(farr[j])
        }else{

        }
        
    }

    
}
// console.log("readrr :",resarr)

resarr = Array.from(mySet2)
resarr.sort()
console.log("readrr :",resarr)
arr2 = resarr


value.filearray.sort()

arr2 =arr3
let combinedRFIArray = []
console.log("arr2-BEFORE FILTER drawings",arr2)
console.log("arr2-BEFORE FILTER arrDrawing",arrDrawing)
//(!arrDrawing.includes(val) && !val.includes("drawings"))
arr2 =arr2.filter(val=>!arrDrawing.includes(val))
// let karr =[]
// arr2.map(val =>{

//   for (let tt = 0; tt < arrDrawing.length; tt++) {
//     if( !val.includes("drawings")){
//       karr.push(val)
//     }
    
    
//   }

// }  );
// console.log("karr-afterremoving drawings",karr)
// arr2 =karr

// combinedRFIArray = arr2.filter(val=>val.includes(","))
combinedRFIArray = Array.from(value.combinedRFISET)
combinedRFIArray  =combinedRFIArray.map(val=>val.trim())
let  masterRFIArray  = []
let masterRFISTring =0
for (let ee = 0; ee < combinedRFIArray.length; ee++) {

  masterRFIArray.push(combinedRFIArray[ee])
  masterRFISTring =masterRFISTring +","+ combinedRFIArray[ee]
  // 
  if(!arr2.includes(combinedRFIArray[ee])){
    arr2 =arr2.concat(combinedRFIArray[ee])
    console.log('conacation done')
  }
  
}
if( masterRFISTring !==0){
  masterRFISTring = masterRFISTring.substring(2);

}
console.log( "masterRFIArray", masterRFIArray)
console.log( "masterRFISTring", masterRFISTring)




console.log("arr2-afterremoving drawings",arr2)
arr2.sort()
console.log("arr2 at the sorting " , arr2)
console.log("arr2 at the combinedRFIArray " , combinedRFIArray)
console.log("arr2 at the arrDrawing " , arrDrawing)
// console.log("arr2 at the promiseArray2 " , promiseArray2)

    // arr2.sort((a, b) => (b.includes(a)) ? 1 : -1)
//     var output = [];
//     var inserted;
    
//     for (var i = 0, ii = arr2.length ; i < ii ; i++){
//       inserted = false;
//       for (var j = 0, jj = output.length ; j < jj ; j++){
//         if (input[i] < output[j]){
//           inserted = true;
//           output.splice(j, 0, input[i]);
//           break;
//         }
//       }
      
//       if (!inserted)
//         output.push(input[i])
//     }


// console.log("output-custom sort output",output)
// let combinesRFI_Data = arr2.filter((val) => val.includes(","));
combinesRFI_Data = combinedRFIArray
console.log("combinesRFI_Data", combinesRFI_Data);
for (var i = 0, ii = arr2.length; i < ii; i++) {
 
    for (let oo = 0; oo < arr2.length; oo++) {
  
  // && combinesRFI_Data[kk]!==arr2[i]
      for (let kk = 0; kk < combinesRFI_Data.length; kk++) {
          let indexofCombinedRFIinArr2Array = arr2.indexOf(combinesRFI_Data[kk])
           console.log("indexofCombinedRFIinArr2Array",indexofCombinedRFIinArr2Array)
          if (combinesRFI_Data[kk].includes(arr2[i]) && combinesRFI_Data[kk]!==arr2[i] && i >indexofCombinedRFIinArr2Array) {

         
            let fromIndex = i;
            let toIndex = i -1;
            const element = arr2.splice(fromIndex, 1)[0];
            console.log("element", element); // ['css']
            console.log("arr2[i}", arr2[i]);
      
            arr2.splice(toIndex, 0, element);



          }
        }
    }
   
 
  }

let karr = [...arr2]
console.log("karr after custom sorting ",karr)
console.log("arr2 after custom sorting ",arr2)
console.log("combinedRFIArray-",combinedRFIArray)
  let rfiRepeatCounterArray = []
  const rfiRepeatCounterSet = new Set() // for checing the RFI no checkist and test report already processed
// console.log("after sort value.filearray",value.filearray)
for (let i = 0; i < arr2.length; i++) {
    let repeaterNo = 0
  totalCounter=0
    for (let j = 0; j < value.filearray.length; j++) {

      
       

        const regex = new RegExp(`${arr2[i]}.pdf`);
        const regex2 = new RegExp(`${arr2[i]}--output.pdf`);
        if((value.filearray[j].replace("MASTER","").replace("FINAL","").replace("--output","").includes(arr2[i]+'.pdf') && regex.test(value.filearray[j])) 
        ||
        (value.filearray[j].replace("MASTER","").replace("FINAL","").replace("--output","").includes(arr2[i]+'.pdf') && regex2.test(value.filearray[j]) 
        
       
        )

        ){
 
                   if((!(value.filearray[j].includes("drawings--")))){
                        //console.log("valru arrfor writng :",value.filearray[j] )

                                    const pdfA = await PDFDocument.load(fs.readFileSync(value.filearray[j]));
                                    // const pdfB = await PDFDocument.load(fs.readFileSync('b.pdf'));
                                   
                                    totalCounter++

                                value.filearray[j]= "done"
                                rfiRepeatCounterSet.add(arr2[i])
                                    
                                    console.log("arr[i] mmain",arr2[i])
                                    
                                    const copiedPagesA = await mergedPdf.copyPages(pdfA, pdfA.getPageIndices());
                                    copiedPagesA.forEach((page) => mergedPdf.addPage(page));
                                    console.log("herer")




                                    
                                    // const copiedPagesB = await mergedPdf.copyPages(pdfB, pdfB.getPageIndices());
                                    // copiedPagesB.forEach((page) => mergedPdf.addPage(page));
                                    
                                    // const mergedPdfFile = await mergedPdf.save();


                   }
       
         

        }
        
        rfiRepeatCounterArray = Array.from(rfiRepeatCounterSet)






//    console.log("rfiRepeatCounterArray",rfiRepeatCounterArray)
//         for (let p = 0; p < rfiRepeatCounterArray.length; p++) {


      
            
            

        // }

 
        
        
    }

      if(combinedRFIArray.length ===0 ){

        for (let k = 0; k < arrDrawing.length; k++) {
          //|| arr2[i]!==arrDrawing[k]

     if((!arr2[i].includes("MASTER")) || (!arr2[i].includes("FINAL"))  ){

   

           let splitNames =[]
           
           splitNames= arrDrawing[k].split(",")
           // console.log("inside valie.filearray loop ")
           // console.log("splitNames---",splitNames)
           
           // if(x===0){
           //     repeaterNo=1
           //     x++
           // }

   

           for (let l = 0; l < splitNames.length; l++) {
               
               console.log("kkkkkkkkkkkkkkkkkkkkkkkkkkkkkk")
           
                   if(arr2[i].includes(splitNames[l].replace(/ /g, '')) && repeaterNo ===0 ){
                   //    console.log("splitNames---",splitNames[l].replace(/ /g, '') )
                   // value.filearray[j]= "done"
                   repeaterNo++
                   console.log("arr2",arr2)
                   console.log("repeaterNo",repeaterNo)
                   console.log("arr2[i]",arr2[i])
                   console.log("arrDrawing[k]", arrDrawing[k])
                
                    let splitRFIS =[]
                    let lenSplitRFI=0
                   
                       
                  //  for (let hh = 0; hh < combinedRFIArray.length; hh++) {
                  //      splitRFIS= combinedRFIArray[hh].split(",")
                  //      splitRFIS = splitRFIS.map(function (el) {
                  //          return el.trim();
                  //        });
                  //            let combinedRFICounter =1
                   
                  //         lenSplitRFI = splitRFIS.length 
                     
                       //    console.log("splitRFIS",splitRFIS)
                       //    console.log("lenSplitRFI",lenSplitRFI)
                       //    console.log("arr2[i]",arr2[i])
                       //    console.log("combinedRFICounter",combinedRFICounter)
                       //    console.log("combinedRFIArray[hh]",combinedRFIArray[hh])
                       //    console.log("combinedRFIArray[hh]===(arr2[i])",combinedRFIArray[hh]===(arr2[i]))
                          //  let counteStopper =0
                          // for (let yy = 0; yy < splitRFIS.length; yy++) {
                          //      combinedRFICounter++
                              
                          //     console.log("combinedRFICounter",combinedRFICounter)
                              

                              //  totalCounter
                               //  console.log("totalCounter",totalCounter)
                               //  console.log("lenSplitRFI",lenSplitRFI)
                                
                               //combinedRFICounter=== lenSplitRFI &&
                               // && arr2[i].endsWith(","+splitRFIS[yy])
                                   if( ( arrDrawing[k].includes(arr2[i])) ){ 
                                      //  console.log("arr2[i].endsWith(","+splitRFIS[yy]", arr2[i].endsWith(","+splitRFIS[yy]))

                                        // console.log("splitRFIS[yy]",splitRFIS[yy])
                                      //  console.log( "combinedRFIArray[hh]===(arr2[i])",combinedRFIArray[hh]===(arr2[i]))   
                                       console.log( " if arryas are equalllllllllllllll no combinedRFI arrayarr2[i]",arr2[i])  
                                          // console.log("combinedRFICounter",combinedRFICounter)
                                       //    console.log("combinedRFIArray",combinedRFIArray)
                                          console.log("arrDrawing[k]",arrDrawing[k])

                                        



                                       const pdfA = await PDFDocument.load(fs.readFileSync(value.drawingsListOfObjects[arrDrawing[k]]));
                                       // const pdfB = await PDFDocument.load(fs.readFileSync('b.pdf'));
                               
                                       //  value.filearray[j]= "done"
                                       
                                       const copiedPagesA = await mergedPdf.copyPages(pdfA, pdfA.getPageIndices());
                                       copiedPagesA.forEach((page) => mergedPdf.addPage(page));
                                       console.log("herer22222222 no combinedRFIarry ccccccc")


//(combinedRFIArray[hh]!==(arr2[i]))
                                   } 
                                   
                                   
                                   else {

                                          for (let rr = 0; rr < splitRFIS.length; rr++) {
                                               if(!combinedRFIArray[hh].includes(arr2[i]) && counteStopper===0){
                                                   counteStopper++
                                                 //  console.log("combinedRFIArray[hh]",combinedRFIArray[hh])
                                                   console.log( "  arr2[i]  when array not equal",arr2[i])
                                                   console.log("splitRFIS[rr]",splitRFIS[rr])
                                                  // console.log( "  arr2[i].includes(splitRFIS[yy])", arr2[i].includes(splitRFIS[yy]))
                                                  console.log("value.drawingsListOfObjects", value.drawingsListOfObjects)
                                                  console.log("arrDrawing",arrDrawing)
                                                  console.log("value of k", k)
                                                  console.log("value.drawingsListOfObjects[arrDrawing[k]]", value.drawingsListOfObjects[arrDrawing[k]])
                                                   counteStopper++
                                                  const pdfA = await PDFDocument.load(fs.readFileSync(value.drawingsListOfObjects[arrDrawing[k]]));
                                                  // const pdfB = await PDFDocument.load(fs.readFileSync('b.pdf'));
                                          
                                                  //  value.filearray[j]= "done"
                                                  
                                                  const copiedPagesA = await mergedPdf.copyPages(pdfA, pdfA.getPageIndices());
                                                  copiedPagesA.forEach((page) => mergedPdf.addPage(page));
                                                  console.log("here3333 with no combinedRFI array")
  



                                               } 
                                            
                                          }
                                       


                                   }

                              //  } //end for for combinedaarry

                      

                       
                  //  } // end ffor for combineaaRFi
                       

           
                   } ;
           }
       }
}




      }else{


        for (let k = 0; k < arrDrawing.length; k++) {
          //|| arr2[i]!==arrDrawing[k]

     if((!arr2[i].includes("MASTER")) || (!arr2[i].includes("FINAL"))  ){

   

           let splitNames =[]
           
           splitNames= arrDrawing[k].split(",")
           // console.log("inside valie.filearray loop ")
           // console.log("splitNames---",splitNames)
           
           // if(x===0){
           //     repeaterNo=1
           //     x++
           // }

   

           for (let l = 0; l < splitNames.length; l++) {
               
               console.log("jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj")
           
                   if(arr2[i].includes(splitNames[l].replace(/ /g, '')) && repeaterNo ===0 ){
                      console.log("splitNames---",splitNames[l].replace(/ /g, '') )
                   // value.filearray[j]= "done"
                   repeaterNo++
                   console.log("arr2",arr2)
                   console.log("repeaterNo",repeaterNo)
                   console.log("arr2[i]",arr2[i])
                   console.log("arrDrawing[k]", arrDrawing[k])
                
                    let splitRFIS =[]
                    let lenSplitRFI=0
                   
                    let counteStopper 
                    counteStopper=0
               
                   for (let hh = 0; hh < combinedRFIArray.length; hh++) {
                       splitRFIS= combinedRFIArray[hh].split(",")
                       splitRFIS = splitRFIS.map(function (el) {
                    
                           return el.trim();
                         
                         });
                             let combinedRFICounter = 0
                   
                          lenSplitRFI = splitRFIS.length 
                         
                          // console.log("splitRFIS",splitRFIS)

                       //    console.log("lenSplitRFI",lenSplitRFI)
                       //    console.log("arr2[i]",arr2[i])
                       //    console.log("combinedRFICounter",combinedRFICounter)
                          console.log("combinedRFIArray[hh]",combinedRFIArray[hh])
                       //    console.log("combinedRFIArray[hh]===(arr2[i])",combinedRFIArray[hh]===(arr2[i]))
                       let total_tageer  = 0
                          for (let yy = 0; yy < splitRFIS.length; yy++) {
                               combinedRFICounter++
                            
                              // console.log("combinedRFICounter",combinedRFICounter)
                              

                               totalCounter
                               //  console.log("totalCounter",totalCounter)
                                // console.log("lenSplitRFI",lenSplitRFI)
                                // console.log("arr2[i].endsWith(","+splitRFIS[yy]", arr2[i].endsWith(","+splitRFIS[yy]))
                                
                               //&& arrDrawing[k].endsWith(","+arr2[i])  && total_tageer === splitRFIS.length
                                   if(  arrDrawing[k].includes(arr2[i])   &&  arrDrawing[k]!==arr2[i] && total_tageer===0  ){ 
                                      //  console.log("arr2[i].endsWith(","+splitRFIS[yy]", arr2[i].endsWith(","+arr2[i]))
                                      console.log(`arr2[i].toString()+","`,arr2[i].toString()+",")
                                      console.log(`arrDrawing[k].includes(arr2[i].toString()+","`,arrDrawing[k].includes(arr2[i]+","))
                                      console.log( " if arryas are equalllllllllllllll arr2[i]",arr2[i])  
                                      console.log( " arrDrawing[k]",arrDrawing[k])  
                                      console.log( " before brake combinedRFIArray[hh]",combinedRFIArray[hh]) 
                                      console.log( "ssssssssssssssssssssssssssssssssssssssssssssssssss")  

                                      console.log( " arrDrawing[k].includes(arr2[i]+"," )",arrDrawing[k].includes(arr2[i]+"," ))  
                                      console.log( " arrDrawing[k].includes(","+arr2[i])",arrDrawing[k].includes(","+arr2[i]))  
                                       console.log("masterRFIArray",masterRFIArray)
                                      if(!masterRFIArray.includes(arr2[i])){
                                        // if(masterRFIArray.includes(arr2[i])){
                                     console.log("QQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQ")
                                      
                                         if(masterRFISTring.includes(arr2[i])){
                                           console.log( " zzzzzzzzzzz breaking arr2[i]",arr2[i])  
                                         console.log( "zzzzzzzzzzzzzzz breaking combinedRFIArray[hh]",combinedRFIArray[hh]) 
                                       
                                          break


                                         }

                                          

                                        // }
                                       
                                      }
                                        

                                      
                                          
                                        console.log("splitRFIS[yy]",splitRFIS[yy])
                                        //  console.log( "combinedRFIArray[hh]===(arr2[i])",combinedRFIArray[hh]===(arr2[i]))   
                                         console.log( " if arryas are equalllllllllllllll arr2[i]",arr2[i])  
                                         //   console.log("combinedRFICounter",combinedRFICounter)
                                         //    console.log("combinedRFIArray",combinedRFIArray)
                                           // console.log("arrDrawing[k]",arrDrawing[k])
  
                                           total_tageer++
  
  
  
                                         const pdfA = await PDFDocument.load(fs.readFileSync(value.drawingsListOfObjects[arrDrawing[k]]));
                                         // const pdfB = await PDFDocument.load(fs.readFileSync('b.pdf'));
                                 
                                         //  value.filearray[j]= "done"
                                         
                                         const copiedPagesA = await mergedPdf.copyPages(pdfA, pdfA.getPageIndices());
                                         copiedPagesA.forEach((page) => mergedPdf.addPage(page));
                                         console.log("herer222222222222222222222222222222222222222222222222222222222222222222222222222222222")
                                            arr2[i]= "done"
  

                                   
                                      
//(combinedRFIArray[hh]!==(arr2[i]))
                                   } 
                                   
                                   else {


                                     

                                          // for (let rr = 0; rr < splitRFIS.length; rr++) {
                                            // console.log("arrDrawing[k].includes(arr2[i]+","",arrDrawing[k].includes(arr2[i]+","))
                                               if(arrDrawing[k].includes(arr2[i])  && arrDrawing[k]===arr2[i] ){
                                                total_tageer++
                                               //   console.log("combinedRFIArray[hh]",combinedRFIArray[hh])
                                               //  console.log("counteStopper--",counteStopper)
                                                   console.log( "  arr2[i]  when array not equal",arr2[i])
                                                  //  console.log("splitRFIS[rr]",splitRFIS[rr])
                                                  // console.log( "  arr2[i].includes(splitRFIS[yy])", arr2[i].includes(splitRFIS[yy]))
                                               //   console.log("value.drawingsListOfObjects", value.drawingsListOfObjects)
                                                 // console.log("arrDrawing",arrDrawing)
                                                 // console.log("value of k", k)
                                               //   console.log("value.drawingsListOfObjects[arrDrawing[k]]", value.drawingsListOfObjects[arrDrawing[k]])
                                                   counteStopper++
                                                  const pdfA = await PDFDocument.load(fs.readFileSync(value.drawingsListOfObjects[arrDrawing[k]]));
                                                  // const pdfB = await PDFDocument.load(fs.readFileSync('b.pdf'));
                                          
                                                  //  value.filearray[j]= "done"
                                                  
                                                  const copiedPagesA = await mergedPdf.copyPages(pdfA, pdfA.getPageIndices());
                                                  copiedPagesA.forEach((page) => mergedPdf.addPage(page));
                                                  console.log("here333333333333333333333333333333333333333333333333333333333333333")
                                                  arr2[i]= "done"
                                                //  console.log("counteStopper--",counteStopper)
  



                                               } 
                                            
                                          // }
                                       


                                   }

                               }

                      

                       
                   }
                       

           
                   } ;
           }
       }
}




        
      }


 

  
    

}
fs.writeFile( direcmaster+"//"+"FINAL"+'--output.pdf', await mergedPdf.save(),(err) => {
    if (err)
        console.log(err);
    else {
        console.log("mater file writing completed\n");
        console.log("The written has the following contents:");


        let win = new BrowserWindow({
                        webPreferences: {
                          plugins: true
                        }
                      })
        
                      win.loadURL( direcmaster+"//"+"FINAL"+'--output.pdf')
   

                



        
    }
    })




    // value.filearray=[]

    value.filearray =[]
    value.mySet1 =null
    value.drawingsSet=null
   value.drawingsListOfObjects ={}


}

).catch(err=>
    console.log(err)).finally(()=>{

      promiseArray2=[] // resetting the promises to zero
      arr2=[]
    
      combinedRFIArray = []
      arrDrawing =[]
      masterRFIArray  = []
      masterRFISTring =0
      karr =[]
      console.log("arr2 at the end " , arr2)
      console.log("arr2 at the combinedRFIArray " , combinedRFIArray)
      console.log("arr2 at the arrDrawing " , arrDrawing)
      console.log("arr2 at the promiseArray2 " , promiseArray2)
      console.log("arr2 at the masterRFIArray " , masterRFIArray)
      console.log("arr2 at the masterRFISTring " , masterRFISTring)


      mySet1.clear()
  drawingsSet.clear()
  combinedRFISET.clear()
  

      console.log("999999999999999999999999999999999999999999999999999")
    }

    )
    // .finally( atlast=>{
    //         let win = new BrowserWindow({
    //             webPreferences: {
    //               plugins: true
    //             }
    //           })

    //           win.loadURL( direcmaster+"//"+"MASTER"+'--output.pdf')}
    // )




 
  


        // app.once('ready', () => {
            // let win = new BrowserWindow({
            //     webPreferences: {
            //       plugins: true
            //     }
            //   })

            //  await win.loadURL( direcmaster+"//"+"FINAL"+'--output.pdf')
          //   })

 console.log("llllllasssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss")

}










// promiseArray2 = []

mergeeee.addEventListener("click",  combinePDF)
