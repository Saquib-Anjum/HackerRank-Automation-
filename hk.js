const puppeteer = require("puppeteer");
const codeObj = require('./codes');
const loginLink ="https://www.hackerrank.com/auth/login";
const email = "vofylyzo@cyclelove.cc";
const password = "Vofylyzo@123"

let browserOpen = puppeteer.launch({
    headless:false,
    args:[" --start-maximized"],
   defaultViewport:null
});

let page ;

browserOpen.then(function(browserObj){
let BrowserOpenPromise = browserObj.newPage();
return BrowserOpenPromise;
}).then(function(newTab){
    page = newTab;
    let hackerRankPromise = newTab.goto(loginLink);
    return hackerRankPromise;
}).then(function(){
    let emailIsEntered = page.type("input[ type='text']",email,{delay:50});
    return emailIsEntered;
}).then(function(){
    let passwordIsEntered = page.type("input[type='password']",password,{delay:50});
    return passwordIsEntered;
}).then(function(){
    let loginBtnClicked=page.click('button[type="submit"]', {delay:50});
    return loginBtnClicked;
}).then(function(){
    let ClickOnAlgoPromise = waitAndClick('.topic-card a[data-attr1="algorithms"]',page)
    return ClickOnAlgoPromise;
}).then(function(){
    let getToWarmup =waitAndClick('input[value="warmup"]',page) ;
    return getToWarmup;

}).then(function(){
    let allQuestionsPromise = page.$$('.challenge-submit-btn')
    return allQuestionsPromise;
}).then(function(allQuestionArr){
   console.log("Total number of questtion : ",allQuestionArr.length);
   let questionWillBeSolves = questionSolver(page,allQuestionArr[0],codeObj.answer[0]);
   return questionWillBeSolves; 
})


.then(function () {
    console.log("`````````````");
}).catch(function (err) {
    console.error("Error occurred: ", err);
});




function waitAndClick(selector,cPage){
    return new Promise(function(resolve,reject){
        let waitForModalPromise = cPage.waitForSelector(selector)
        waitForModalPromise.then(function(){
            let clickModal =cPage.click(selector);
            return clickModal
        }).then(function(){
        resolve();
        }).catch(function (err) {
            console.error("Error in waitAndClick: ", err);
            reject(err);
        });
    })
}

function questionSolver(page , question,answer){
return new Promise(function(resolve,reject){
    let questionWillBeCilcked = question.click();
 questionWillBeCilcked.then(function(){
    let EditorInFocusPromise = waitAndClick('.monaco-editor.no-user-select.vs',page);
    
    return EditorInFocusPromise;
 })
 .then(function(){
    return waitAndClick('.checkbox-input',page)
 }).then(function(){
    return page.waitForSelector('textarea.input.text-area.custominput.auto-width',page);
 }).then(function(){
   let typeInTextbox = page.type('textarea.input.text-area.custominput.auto-width',answer,{delay:20});
    return typeInTextbox;
 }).then(function(){
    let CTRLPrassed = page.keyboard.down("Control");
    return CTRLPrassed;
 }).then(function(){
    let pressA =page.keyboard.press('A',{delay:100});
    return pressA;
 }).then(function(){
    let pressX = page.keyboard.press('X', {delay:20});
    return pressX;
 }).then(function(){
    let CTRLIsUnpressed = page.keyboard.up('Control');
    return CTRLIsUnpressed;
 }).then(function(){
    let mainEditorInFocusPromise = waitAndClick('.monaco-editor.no-user-select.vs',page)
    return mainEditorInFocusPromise;
 }).then(function(){
    let CTRLPrassed = page.keyboard.down('Control');
    return CTRLPrassed;
 }).then(function(){
    let pressA =page.keyboard.press('A',{delay:100});
    return pressA;
 }).then(function(){
    let pressV =page.keyboard.press('V',{delay:100});
    return pressV;
    // return page.type('textarea.input.text-area.custominput.auto-width',answer,{delay:20});
 }).then(function(){
    let CTRLIsUnpressed = page.keyboard.up('Control');
    return CTRLIsUnpressed;
 }).then(function(){
   let runTheCodePromise = page.click(".hr-monaco__run-code",{delay:100});
   return runTheCodePromise;
 }).then(function(){
   let SubmitTheCodePromise = page.click(".hr-monaco-submit",{delay:50});
   return SubmitTheCodePromise;
 }) .then(function(){
   resolve();
 }).catch(function(err){
   reject();
   console.log(err);
 })
})
}