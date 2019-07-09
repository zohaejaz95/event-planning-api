<!DOCTYPE html>
<html>

<head>
        <link href="https://fonts.googleapis.com/css?family=Lato" rel="stylesheet" type="text/css">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <title></title>
    <style >
 html {
            width: 100%;
        }

         ::-moz-selection {
            background: #fefac7;
            color: #4a4a4a;
        }

         ::selection {
            background: #fefac7;
            color: #4a4a4a;
        }

        body {
            margin: 0;
            width: 100%;
            padding: 0;
        }

        .ReadMsgBody {
            width: 100%;
            background-color: #f1f1f1;
        }

        .ExternalClass {
            width: 100%;
            background-color: #f1f1f1;
        }

        a {
            color: #ffcccc;
            text-decoration: none;
            font-weight: normal;
            font-style: normal;
        }
        .button {
  background-color: transparent;
  border: none;
  color:#E28900;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
}
        p,
        div,
        span {
            margin: 0 !important;
        }

        table {
            border-collapse: collapse;
        }

        @media only screen and (max-width: 599px) {
            body {
                width: auto !important;
            }
            table table {
                width: 100% !important;
            }
            td.paddingOuter {
                width: 100% !important;
                padding-right: 20px !important;
                padding-left: 20px !important;
            }
            td.fullWidth {
                width: 100% !important;
                display: block !important;
                float: left;
                margin-bottom: 30px !important;
            }
            td.fullWidthNM {
                width: 100% !important;
                display: block !important;
                float: left;
                margin-bottom: 0px !important;
            }
            td.center {
                text-align: center !important;
            }
            td.right {
                text-align: right !important;
            }
            td.spacer {
                display: none !important;
            }
            img.scaleImg {
                width: 100% !important;
                height: auto;
            }
        }

#send{
    background-color: transparent; 
  border: none;
  color: white;
  float: right;
  padding: 10px;
font-size: 16px;
}

        #textEditor{
margin: 0% auto;
width: 750px;
height: 100%;
        }

        #theRibbon {
border-bottom: none;
padding: 10px;
background-color:  rgb(40,110,89);
color: white;
border-radius: 8px 8px 0px 0px;
        }
        #richTextArea{
border: 2px solid rgb(40,110,89);
height: 100%;
width: 746px;
            }
        #theWYSIWYG{
            height: 100%;
width: 100%;
word-wrap: break-word;
}
#theRibbon > button{
    color: white;
    border: none;
    outline: none;
    background-color: transparent;
    cursor: pointer;
}
#theRibbon > button:hover{
    background-color: rgb(20,90,70);
    transition: all 0.3s linear 0s;
}
input[type="color"]{
    border: none;
    outline: none;
    background-color: transparent;

}
    </style>
<script>
function sendEmail(){
    var emailHTML=document.getElementById("richTextArea");
    console.log(emailHTML);
}
</script>


<script>
window.addEventListener("load",function(){
var editor = theWYSIWYG.document;
editor.designMode = "on";

boldButton.addEventListener("click", function(){
    editor.execCommand("Bold",false, null);
},false);

underlineButton.addEventListener("click", function(){
    editor.execCommand("underline",false, null);
},false);

italicButton.addEventListener("click", function(){
    editor.execCommand("italic",false, null);
},false);

supButton.addEventListener("click", function(){
    editor.execCommand("Superscript",false, null);
},false);

subButton.addEventListener("click", function(){
    editor.execCommand("Subscript",false, null);
},false);

leftalign.addEventListener("click", function(){
    editor.execCommand("justifyleft",false, null);
},false);
centeralign.addEventListener("click", function(){
    editor.execCommand("justifycenter",false, null);
},false);
rightalign.addEventListener("click", function(){
    editor.execCommand("justifyright",false, null);
},false);

fontColorButton.addEventListener("change", function(event){
    editor.execCommand("ForeColor",false, event.target.value);
},false);

highlightButton.addEventListener("change", function(event){
    editor.execCommand("BackColor",false, event.target.value);
},false);

fontChange.addEventListener("change", function(event){
    editor.execCommand("FontName",false, event.target.value);
},false);

fontSizeChanger.addEventListener("change", function(event){
    editor.execCommand("FontSize",false, event.target.value);
},false);


},false);

</script>
</head>

<body>
   <div id="textEditor">
       <div id="theRibbon">
<button id="boldButton" title="bold"><b>B</b></button>
<button id="underlineButton" title="Underline"><u>U</u></button>
<button id="italicButton" title="italic"><em>I</em></button>
<button id="supButton" title="Superscript">X<sup>2</sup></button>
<button id="subButton" title="Subscript">X<sub>2</sub></button>
<button class="fa fa-align-left" id="leftalign" title="leftalign"></button>
<button class="fa fa-align-center" id="centeralign" title="centeralign"></button>
<button class="fa fa-align-right" id="rightalign" title="rightalign"></button>
<input type="color" id="fontColorButton" title="Change Font Color">
<input type="color" id="highlightButton" title="Highlight Text">
<select id="fontChange">
    <option value="Times New Roman">Times New Roman</option>
    <option value="Consolas">Consolas</option>
    <option value="Tahoma">Tahoma</option>
    <option value="monospace">Monospace</option>
    <option value="cursive">Cursive</option>
    <option value="sans-serif">Sans-serif</option>
    <option value="Calibri">Calibri</option>

</select>
<select id="fontSizeChanger">
    <script>
    for(var i=1; i<10; i++){
        document.write("<option value='"+i+"'>"+i+"</option>");
    }
    </script>

</select>


<button id="send" title="send as Email" onclick="sendEmail()">Send Invites</button>

       </div>
       
       <div id="richTextArea">
        <table width="100%" border="0" align="center" cellpadding="0" cellspacing="0" bgcolor="#eee7e7" style="padding: 0; margin: 0;">
            <tr>
                <td align="center" width="700" valign="top">
                   
    
                    <!--Header-->
                    <table width="700" border="0" align="center" cellpadding="0" cellspacing="0" bgcolor="#474747" style="padding: 0; margin: 0; ">
                        <tr>
                            <td class="paddingOuter" valign="top" align="center" style="padding: 0px;">
                                <table class="tableWrap" width="640" border="0" align="center" cellpadding="0" cellspacing="0"; >
                                    <tr>
                                        <td style="padding: 40px 0px; border-bottom: 1px solid #585757;">
                                            <table class="tableInner" width="640" border="0" align="center" cellpadding="0" cellspacing="0";>
                                                <tr>
                                                    <td class="fullWidth" width="640" align="center" valign="top" style="padding: 0;margin: 0; padding-top: 0; font-size:13px; font-weight: normal; color:#868686; font-family: Garamond, Baskerville, 'Baskerville Old Face', 'Hoefler Text', 'Times New Roman', serif; line-height: 23px;  mso-line-height-rule: exactly;">
                                                        <span>
                                                    <h1 style="text-decoration: underline; font-style: normal; font-size: 300%; color:#E28900;">WEDDING INVITATION</H1>  <br />
                                                    </span>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>
                    
                    <!-- Single column blog post-->
                    <table width="700" border="0" align="center" cellpadding="0" cellspacing="0" bgcolor="#ffffff" style="padding: 0; margin: 0; ">
                        <tr>
                            <td class="paddingOuter" valign="top" align="center">
                                <table class="tableWrap" width="640" border="0" align="center" cellpadding="0" cellspacing="0" style="">
                                    <tr>
                                        <td style="padding: 0px;">
                                            <table class="tableInner" width="640" border="0" align="center" cellpadding="0" cellspacing="0">
                                                <tr>
                                                    <td class="fullWidthNM" width="640" align="left" valign="top" style="padding: 0;">
                                                        <table width="100%" align="left" border="0" align="center" cellpadding="0" cellspacing="0">
                                                            <!--Image section-->
                                                            <tr>
                                                                <td align="left" valign="top" style="margin: 0; padding-bottom: 15px; font-size:14px ; font-weight: normal; color:#9a9a9a; font-family: Lato, Helvetica Neue, Helvetica, Arial, sans-serif; line-height: 100%;">
                                                                    <span>
                                    <a href="#" style="text-decoration: none; font-style: normal; font-weight: normal;">
                                    <img class="scaleImg" src="{{asset('/image/1.png')}}"  alt="Graph" width="640" height="250" style="display: block;" />
                                    </a>
                                  </span>
                                                                </td>
                                                            </tr>
                                                            <!--Image section end-->
    
                                                            <!--Blog heading-->
                                                            <tr>
                                                                <td align="center" valign="top" style="margin: 0; padding-bottom: 2px; font-size:18px ; font-weight: 500; height: 370px;">
                                                                    <span>
                                                                        <iframe  scroll="no" scrolling="no" id="theWYSIWYG" name="theWYSIWYG" frameborder="0">
                                                                         <p></p>
                                                                    </iframe>  
                                                                  
                                                                  
                               
                               
                               
                                   
                             </span>
                                  <span>
                                    <button class="button" >Accept</button>
                                    <button class="button" >Reject</button>
                                </span>
                                                                </td>
                                                            </tr>
                                                            <!--Blog heading end-->
    
                                                           
                                                           
                                                        </table>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>
                    <!-- Single column blog post end-->
    
                   
                   
                   
                </td>
            </tr>
        </table>
       </div>
       
   </div>
   <script>
   var fonts = document.querySelectorAll("select#fontChange > option");
   for(var i=0; i<fonts.length; i++){
       fonts[i].style.fontFamily = fonts[i].value;
   }
   </script>
   
   
</body>

</html>
