const start = document.getElementById("start")
var fs = require('fs');
// var pdf = require('html-pdf');
const { degrees,grayscale, PDFDocument, rgb, StandardFonts , ImageAlignment, values } = require('pdf-lib');
const cheerio = require('cheerio');
const path = require("path")
const app = require('electron').remote
// const { resolve } = require('path');
// const { doesNotMatch } = require('assert');
// const { compareDocumentPosition } = require('domutils');
// const { defaultMaxListeners } = require('events');
// const phantomPath = require('witch')('phantomjs-prebuilt', 'phantomjs');
// const puppeteer = require('puppeteer');
 //const puppeteer = require('puppeteer-core');
//  const chromium = require('chrome-aws-lambda');
 const chromium = require('chromium');
 const PCR = require("puppeteer-chromium-resolver");

 const {BrowserWindow } = require("electron").remote
 const pie = require("puppeteer-in-electron")
 const puppeteer = require("puppeteer-core");


 const convertFactory = require('electron-html-to');
 
 var ElectronPDF = require('electron-pdf')
 var exporter = new ElectronPDF()




 const os = require('os')

// async function removeImage() { 
// var images = document.getElementsByTagName('IMG'); 
//   console.log("images : ",images )

//  var l = images.length; 
//  console.log("length of images : ",l )
//  for (var i = 0; i < l; i++) { 
//  images[0].parentNode.removeChild(images[0]); }
// }

// removeImage()

let localHTML=""
let direcmaster =""

var hadi = document.getElementById("hadi")
var info = document.getElementById("info")

hadi.innerText="loading hadees description"
// console.log(JSON.parse(bukhari))


 async function loadHaddes(){
         await   fs.readFile (__dirname+'//bukhari.json',(err, jsonString) => {
              if (err) {
                console.log("File read failed:", err);
                return;
              }
              // console.log("File data:", jsonString);


              try {

                async function jParse(){
                          let data = await JSON.parse( jsonString)
                          let randarry = [0,1,2,3,6,7,8]
                          let randval =  Math.floor((Math.random() * 7) );
                          let rand = randarry[randval]
                          
                          // console.log("randomvalue  :", rand)
                       
                          // console.log("first item name address is:", 
                          // data[rand].name, data[rand].books[rand].name, 
                          // data[rand].books[rand].hadiths, 
                          // data[rand].books[rand].hadiths[rand].info, 
                          // data[rand].books[rand].hadiths[rand].text, 
                          // );
                       
                            // while( data[rand].books[rand].hadiths.length !== 0 )

                              // {
                                //  rand =  Math.floor((Math.random() * 9) );
                                let lenHad =  data[rand].books[rand].hadiths.length
                              // console.log("lengthof hadith :",lenHad)
                              let HadithRand = Math.floor((Math.random() * lenHad) );
                              // console.log("ramdom hadith in array  :",HadithRand)
                              // const lenHad = 
                              hadi.innerText =   data[rand].books[rand].hadiths[HadithRand].text
                              info.innerText =  data[rand].books[rand].hadiths[HadithRand].info
                            // }
                }
                jParse()

              } catch (err) {
                console.log("Error parsing JSON string:", err);
              }

            })

          }

          loadHaddes()

const hadRepeat = setInterval ( ()=>{
  loadHaddes()
} , 15000)
//  setInterval ( console.log("heeeeeeeeeeee"),3000 )



const dialog = app.dialog

const filePath = " "
const fileName = " "

let promises = [];
let promisesHTMLArray =[]
// let name =""
// let dirr = ""

const delarr =[]

const vv = async function createPdf() {
  // const pdfDoc = await PDFDocument.create()
  // const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman)

//   dialog.showOpenDialog((fileName) => {
//     if(fileName !== undefined) {
//         readWallet(fileName[0])
//     }   
// });
// function readWallet(filePath) {
//   fs.readFile(filePath, 'utf-8', (err, data) => {
//       if(err) {
//           alert('An error occured while importing your wallet', err)
//           return
//       }
//   })
// }

// console.log(promises)

 await dialog.showOpenDialog( {
  properties: ['openFile',   "multiSelections" ,],
  filters :[
    { name: 'htm', extensions: ['htm', "html"] },

  ],
  title :"Select html or htm files only", 
  defaultPath :"desktop",
  buttonLabel :"select HTML for Htm files",

}).then(result => {
  // console.log(result.canceled)
  // console.log(result.filePaths)
  // const delarr =[]
  for(let i=0; i<result.filePaths.length; i++){
    // console.log(result.filePaths[i])
     
    const prom1 = new Promise(function(resolve, reject) {

     



    //  if(result.filePaths.length === i+1){
    //   sajdel(delarr)
    //   console.log("Dsajdel activated")
    //  }


    const filestr =  result.filePaths[i]
    // const existingPdfBytes =  fetch(url).then(res => res.arrayBuffer())
    
    const regexPath = /^(.*[\\\/])(.*)$/;
    const match = regexPath.exec(filestr);
if (match !== null) {
    // we ignore the match[0] because it's the match for the hole path string
    const filePath = match[1];
    const fileName = match[2];
//     console.log("filestr :"+ filestr)
//     console.log("filePath :"+ filePath)
// console.log("fileName :"+ fileName)
// console.log("file path when jined" + path.join(filePath, fileName))
}

 const name = path.parse(filestr).name;
 const dirr = path.parse(filestr).dir;
 direcmaster = dirr

 delarr.push(dirr+"\\"+name+'xxx.pdf')
 const $ =cheerio.load(fs.readFileSync(filestr));




 const promHTML = new Promise(function(resolve, reject) {

//  async function removeImage() { 
   
  //  localHTML = fs.readFile(filestr, function(err, res){
  //    if (err) throw err
  //    else{
  //     //  console.log(res)
  //      console.log($.html())
  //      var images = $.html().getElementsByTagName('IMG'); 
  //      console.log("images : ",images )
     
  //     var l = images.length; 
  //     console.log("length of images : ",l )
  //     for (var i = 0; i < l; i++) { 
  //     images[0].parentNode.removeChild(images[0]); }
  //    }
  //  })


  // $("img").each(async function(){
  //   // imgs.push(this)
  // // console.log(this.attribs.src)
  //   //  $(this).remove()
  //   $(this).replaceWith(" ")
  //  })

   fs.writeFile(filestr, $.html(), (err, res) => {
    if (err)
      console.log(err);
    else {
      console.log(filestr)
      resolve(filestr)
      reject("file has been rejected  :", filestr)
      console.log("File written successfully\n");
      console.log("The written has the following contents:");
      // console.log(fs.readFileSync(filestr) );
      // return $.html()

      file_descriptor = fs.openSync(filestr);
      console.log("The file descriptor is:", file_descriptor);

      fs.close(file_descriptor, (err) => {
        if (err)
          console.error('Failed to close file', err);
        else {
          console.log("\n> File Closed successfully");
        }
      });

    }
  })



  
  // }

  })
promisesHTMLArray.push(promHTML)
  







// $("img").each( function(){
//   // imgs.push(this)
// // console.log(this.attribs.src)
//    $(this).remove()
//  })

//  var options = { format: 'Letter',
//  orientation: 'portrait',
//   phantomPath: '/usr/local/bin/phantomjs'

// };



// ///////////////////////////////////////////
//  let prom1 = new Promise(function(resolve, reject) {
//   // Do Stuff
//   // resolve(dirr+"//"+name+'xxx.pdf');
//   // array.push('two');
// resolve(name + "approved")
// reject(name+ "rejected")
// })
// promises.push(prom1)

// ////////////////////////////////////////////



    try{
    //   pdf.create( $.html(), options).toFile(dirr+"\\"+name+'xxx.pdf',  function(err, res) {
    //    if (err) return console.log(err);
    //    console.log(res); // { filename: '/app/businesscard.pdf' }
    //  modifyPdf() 
  //   const option = {
  //     revision: "",
  //     detectionPath: "",
  //     folderName: ".chromium-browser-snapshots",
  //     defaultHosts: ["https://storage.googleapis.com", "https://npm.taobao.org/mirrors"],
  //     hosts: [],
  //     cacheRevisions: 2,
  //     retry: 3,
  //     silent: false
  // };


    async function ppdf()  {
    //   const browser = await puppeteer.launch({
    //     ignoreDefaultArgs: ['--disable-extensions'],
    //     args: ['--no-sandbox', '--disable-setuid-sandbox'], 
    
    //   // args: chromium.args,
    //   // // defaultViewport: chromium.defaultViewport,
    //   // executablePath: await chromium.executablePath,
    //   // headless: chromium.headless,
    //   // ignoreHTTPSErrors: true,
    //   // dumpio: true,
    //   // headless: true,
    //   // executablePath:__dirname +"\\node_modules\\puppeteer\\.local-chromium\\win64-901912"
    
    // })

  //   const stats = await PCR(option);
  //   const browser = await stats.puppeteer.launch({
  //     headless: false,
  //     args: ["--no-sandbox"],
  //     executablePath: stats.executablePath
  // }).catch(function(error) {
  //     console.log(error);
  // });

  // await pie.initialize(app);
   
  // const browser = await pie.connect(app, puppeteer);
    
  // const window = new BrowserWindow();
  // const url = filestr;
  // await window.loadURL(url);
 
  // const page = await pie.getPage(browser, window);
  // // await page.pdf({ path: dirr+"\\"+name+'xxx.pdf', format: 'Letter' });
  // console.log(page.url());
  // window.destroy();

              // await pie.initialize(app);
            
              // const browser = await pie.connect(app, puppeteer);
            
              // const window = new BrowserWindow();
              // const url = "https://www.npmjs.com/package/puppeteer-in-electron";
              // await window.loadURL(url);
            
              // const page = await pie.getPage(browser, window);
              // console.log(page.url());
              // window.destroy();
        //  async function convert(){
        //    console.log("enterer covert function")
        //       var conversion = convertFactory({
        //         converterPath: convertFactory.converters.PDF
        //       });
        //       await conversion({ html: $.html() }, function(err, result) {
        //        if (err) {
        //          return console.error(err);
        //        }
              
        //        console.log(result.numberOfPages);
        //        console.log(result.logs);
        //        result.stream.pipe(fs.writeFile(dirr+"\\"+name+'xxx.pdf', result, function(err, res){
        //          if (err) throw err
        //           else{
        //             console.log(res);
        //          }
                 
        //        }));
              
        //        conversion.kill(); // necessary if you use the electron-server strategy, see bellow for details
        //      });

        //      await  modifyPdf()
        //     }
            // convert()

                    //   console.log("enterer covert function 11111" )
                    //   const conversion = convertFactory({
                    //     converterPath: convertFactory.converters.PDF, 
                    //     allowLocalFilesAccess: true
                    //   });
                    //   console.log("enterer covert function 2222")


                    //   conversion({ html: "kkkk" }, function(err, result) {
                    //     console.log("enterer covert function 3333333")
                    //     if (err) {
                    //       return console.error(err);
                    //     }
                      
                    //     console.log(result.numberOfPages);
                    //     console.log(result.logs);
                    //     result.stream.pipe(fs.createWriteStream('./index.pdf'));
                    //     conversion.kill(); // necessary if you use the electron-server strategy, see bellow for details
                    //   });
                    // console.log("enterer covert function 4444")

  console.log(__dirname+'\\index.html')
          // fs.readFile(__dirname+'\\index.html', 'utf8', (err, htmlString) => {
          //   // add local path in case your HTML has relative paths
          //   htmlString = htmlString.replace(/href="|src="/g, match => {
          //     return match + __dirname;
          //   });
          //   const conversion = convertFactory({
          //     converterPath: convertFactory.converters.PDF,
          //     allowLocalFilesAccess: true
          //   });
          //   console.log("enterer covert function 4444")
          //   conversion({ html: htmlString , waitForJS: true}, (err, result) => {
          //     if (err) return console.error(err);
          //     result.stream.pipe(fs.createWriteStream(__dirname+"\\index.pdf"));
          //     conversion.kill(); // necessary if you use the electron-server strategy, see bellow for details
          //   });
          // });

//  async function ele_pdf(){
//           const jobOptions = {
//             /**
//               r.results[] will contain the following based on inMemory
//                   false: the fully qualified path to a PDF file on disk
//                   true: The Buffer Object as returned by Electron
              
//               Note: the default is false, this can not be set using the CLI
//              */
//             inMemory: false 
//           }
//           const options = {
//               pageSize : "A4"
//           }
//           const source = filestr
//           const target = dirr+"\\"+name+'xxx.pdf'
//           exporter.on('charged', () => {
         
//           })
//           exporter.start()
//           console.log("start chareed")

//           exporter.createJob(source, target, options, jobOptions).then( job => {
//           job.on('job-complete', (r) => {
//                 console.log('pdf files:', r.results)
//                 // Process the PDF file(s) here
//               })
//               // job.render()
//           })
//         }


        // ele_pdf()
        

    
















      // const page = await browser.newPage();
      // await page.goto(filestr, {
      //   waitUntil: 'networkidle2',
      // });
      // await page.pdf({ path: dirr+"\\"+name+'xxx.pdf', format: 'Letter' });
    
      // await browser.close();

      // await  modifyPdf()
    }
     
    // ppdf()





    
  //  })
     

  async function wineer() {
    // await removeImage().then(res=>{
        const win = new BrowserWindow({ width: 800, height: 600 })
        win.loadURL(filestr)
        // win.loadURL($)
      console.log("herrrrrr")
        win.webContents.on('did-finish-load', () => {
          // Use default printing options
          const pdfPath = path.join(dirr+"\\"+name+'xxx.pdf')
          win.webContents.printToPDF({}).then( data => {
            fs.promises.writeFile(pdfPath, data, (error) => {
              if (error) throw error
              // console.log(`Wrote PDF successfully to ${pdfPath}`)
        
              // win.close()
            
           
            }).then(()=>{
            console.log(`Wrote PDF successfully to ${pdfPath}`)
              win.close()
              modifyPdf()
            })
          }).catch(error => {
            console.log(`Failed to write PDF to ${pdfPath}: `, error)
          })
        })
      
      // })
  
      }

      // wineer()
     console.log(promisesHTMLArray)
      Promise.all(promisesHTMLArray).then(async values => {

        await wineer().then(async ()=>{
          console.log("calling mofiy pdf here")
          //  await modifyPdf()
        })
        //  await modifyPdf()

      })







       }catch(err){
           console.log(err)
       }
   
     
 
      //  console.log(promises)





      
 
 async function modifyPdf() {
  const url = dirr+"\\"+name+'xxx.pdf'

  // const existingPdfBytes = await fetch(url).then(res => res.arrayBuffer())
  const existingPdfBytes = await fs.readFileSync(url)
  //    function(err, res){
  //   if (err) throw err
  //   else{
  //     console.log(res)
  //   }
  // })
  // fs.closeSync()

  const pdfDoc = await PDFDocument.load(existingPdfBytes)
  const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica)

  const pages = pdfDoc.getPages()
  const firstPage = pages[0]
  console.log("numner of pdf pages  :",pages.length)

 const lastpage = pages.length-1
 pdfDoc.removePage(lastpage)
  async function rrrr(){ 
   for(let i= 1;i<=pages.length-2;i++){
    
    console.log(`pages :${i} :`,pages[i])
   await pdfDoc.removePage(i)
  }
}
await rrrr()

//  pdfDoc.removePage(1)
//  pdfDoc.removePage(2)
  const { width, height } = firstPage.getSize()
  firstPage.drawText("QMIS NO :"+name, {
    x: 300,
    y:  760,
    size: 30,
    font: helveticaFont,
    color: rgb(0, 0, 0),
    rotate: degrees(0),
  })

  firstPage.drawRectangle({
    x: 290,
    y: 750,
    width: 160+((name.length)*17.5),

    height: 40,
    rotate: degrees(0),
    borderWidth: 5,
    borderColor: rgb(0, 0, 0),
    color: rgb(0, 0, 0),
    opacity: 0,
    borderOpacity: 1,
  })

  // const pdfBytes = await pdfDoc.save()
  // file_descriptor = fs.writeFileSync( dirr+"//"+name+'output.pdf', await pdfDoc.save());

  // fs.writeFileSync( dirr+"//"+name+'output.pdf', await pdfDoc.save());


  try {
    // fs.writeFileSync( dirr+"//"+name+'output.pdf', await pdfDoc.save())
    
    fs.writeFile( dirr+"//"+name+'--output.pdf', await pdfDoc.save(),(err) => {
      if (err)
        console.log(err);
      else {
        console.log("File written successfully\n");
        console.log("The written has the following contents:");
        // console.log(fs.readFileSync("books.txt", "utf8"));

        //oooooooooooooooooooooo+
        resolve(dirr+"\\"+name+'xxx.pdf')
       reject(name+ "rejected")


        // const prom1 = new Promise(function(resolve, reject) {
          // Do Stuff
     
          // resolve(dirr+"//"+name+'xxx.pdf');
          // array.push('two');

        // resolve(dirr+"\\"+name+'xxx.pdf')
        // reject(name+ "rejected")
        // })
        //  promises.push(prom1)
        //  console.log(promises)





      }
    }
      )



  
    //file written successfully
    console.log("nameeeeeeeeeeee : "+name)

 
 



  } catch (err) {
    console.error(err)
  }finally{

    
      

  }
 

// fs.closeSync()

  // try {
  //   fs.closeSync(file_descriptor);
  //   console.log("\n> File Closed successfully");
  // } catch (err) {
  //   console.error('Failed to close file', err);
  // }





} // end of modify pdf



// resolve(dirr+"\\"+name+'xxx.pdf')
// reject(name+ "rejected")
})
 promises.push(prom1)
//  console.log(promises)




  }// forlopp 




  // return ("this is res one ")
    
}).then((res1) =>{ // first then


  // console.log("second res--- :"+ res1)
 
}







)

.catch(err => {            // of then in dialog  ).catch
  console.log(err)
})


// // return new Promise(resolve => {
// //   // setTimeout(() => {
// //   //   resolve('resolved');
// //   // }, 1000);

// //   resolve('resolved')
// });








// const url = 'https://pdf-lib.js.org/assets/with_update_sections.pdf'
// const existingPdfBytes = await fetch(url).then(res => res.arrayBuffer())







//   const page = pdfDoc.addPage()
//   const { width, height } = page.getSize()
//   const fontSize = 30
//   page.drawText('QMIS NO ', {
//     x: 400,
//     y: height - 4 * fontSize,
//     size: fontSize,
//     font: timesRomanFont,
//     color: rgb(0, 0.53, 0.71),
//   })

//   const pdfBytes = await pdfDoc.save()

//   fs.writeFileSync('./test33.pdf', await pdfDoc.save());
//   console.log("done")
// }


///////////////////////////////////////////////// output files created upto here
// console.log("file listing started ")
// fs.readdir(filePath, function (err, files) {
//   //handling error
//   if (err) {
//       return console.log('Unable to scan directory: ' + err);
//   } 
//   //listing all files using forEach
//   files.forEach(function (file) {
//       // Do whatever you want to do with the file
//       console.log(file); 
//       console.log("file listing completed")
//   });
// });
// console.log("file listing complete22222222d")

////////////////////////
//  return ("done inide creadte pdf")
// return ("thsis is the last output of create pdf  loop")

////////////////////// //////////
// console.log(promises)
// Promise.all(promises).then(values => {
//   // do stuff with values here
//   console.log("value from promise 1"+values[0]);
//   console.log(values[1]);
  
// })







// promises=[1,2,3,]

let uniprom= []
  Promise.all(promises).then(values => {
   // do stuff with values here
 
 
   
  async function defi(values){
 
    console.log(values)
     try{
       values.forEach(async value=>{
      await fs.unlink(value, (err => {
         if (err) console.log(err);
         else {
           console.log("delete file in path", value);
          //  let uni = new Promise(function(resolve, reject) {
          //    resolve(dirr+"//"+name+'--output.pdf')
          //    reject (dirr+"//"+name+'--output.pdf', "in uniprom")
          //  })

          //  uniprom.push(uni)
         }
       }));
     })
     }catch(err){
       console.log(err)
     }
   
   }
 
 
   defi(values)
 
   console.log(promises)
   console.log("value from promise 1::"+values[0]);
   console.log(values[1]);
 







 
 })


 Promise.all(   promises).then(async(values) =>  {
console.log(values)
const mergedPdf = await PDFDocument.create();
for (let i = 0; i < values.length; i++) {
  const pdfA = await PDFDocument.load(fs.readFileSync(values[i].replace("xxx.pdf","--output.pdf")));
  const copiedPagesA = await mergedPdf.copyPages(pdfA, pdfA.getPageIndices());
  copiedPagesA.forEach((page) => mergedPdf.addPage(page));
  
}
console.log("mater file writing started\n");
fs.writeFile( direcmaster+"//"+"MASTER"+'--output.pdf', await mergedPdf.save(),(err) => {
  if (err)
    console.log(err);
  else {
    console.log("mater file writing completed\n");
    console.log("The written has the following contents:");
  }
})





 })

 //const mergedPdfFile = await mergedPdf.save();







   function sajdel(values){
// console.log("inside sajdel")
// console.log(values)
//     try{
      
//       values.forEach(async value=>{
//      await fs.unlink(value, (err => {
//         if (err) console.log(err);
//         else {
//           console.log("delete file sajdelllllllllll path", value);
//         }
//       }));
//     })
//     }catch(err){
//       console.log(err)
//     }
  
  }






return  delarr 


} // end of create pdf function 




// function thirdFunc(){
//   console.log("i am the thrid functon")
// }

async function delFiles(){
  // const result = await createPdf()
  // const result = await vv()
  // console.log(result)
  // const oo= "Masha Allah"
  // console.log("file listing ccccccccccccc "+oo)
 
await  vv().then(resout=>{
    // console.log("outside  pdf" +resout)
   
    //  console.log("output array--------------------",resout )
   
          // try{
          //   resout.forEach(async value=>{
          // await fs.unlink(value, (err => {
          //     if (err) console.log(err);
          //     else {
          //       console.log("delete file in path", value);
          //     }
          //   }));
          // })
          // }catch(err){
          //   console.log(err)
          // }


  }

  ).catch(err=>{
    console.log("errror"+ err)
  })

 


// if  (promises.length !== 0) {
//  Promise.all(promises).then(values => {
//   // do stuff with values here

  
//   function defi(values){

//     try{
//       values.forEach(async value=>{
//      await fs.unlink(value, (err => {
//         if (err) console.log(err);
//         else {
//           console.log("delete file in path", value);
//         }
//       }));
//     })
//     }catch(err){
//       console.log(err)
//     }
  
//   }


//   defi(values)

//   console.log(promises)
//   console.log("value from promise 1"+values[0]);
//   console.log(values[1]);


// })
// } // end of if 



}











start.addEventListener("click",  delFiles

// function(){
//     console.log("clicked")
//     var html = fs.readFileSync(__dirname+"/sample/1166.htm", 'utf8');
//     var options = { format: 'Letter' };
    
//     pdf.create(html, options).toFile('./businesscard.pdf', function(err, res) {
//       if (err) return console.log(err);
//       console.log(res); // { filename: '/app/businesscard.pdf' }
//     }
    
  
    );

    













