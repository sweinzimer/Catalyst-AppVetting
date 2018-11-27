// ***  HANDLE-IT FORM - Using pdfmake from github.com/bpampuch/pdfmake - MIT License.
// ***  BELOW CODE BY ROHIN ADALJA (github.com/rohinadalja), USING CLIENT-SIZE PDF TOOL (pdfmake).
// ***     Use Dependant on the following: (1) cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.39/pdfmake.min.js
// ***                                     (2) cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.39/vfs_fonts.js
// ***     TESTED WORKING IN: Safari 12.0, Chrome 70.0.3538.102

function exportHandletoPDF() {
     pdfMake.createPdf(handleDefinition).open();
}

var handleDefinition = {  content: [           // BEGIN PRINT LAYOUT! ***********
{ text: 'CATALYST PARTNERSHIPS                                                         HANDLE-IT REPORT', style: 'h2b' },

{ text: [ "\n\n\nRECIPIENT NAME: ", {text: dataPAF.fullName, style:'inText' } ], style:'eachLine'},

{ text: [ "APPL. ADDRESS:   ", {text: dataPAF.addr1, style:'inText' }], style:'eachLine'},
{text: dataPAF.addr2, margin:[101,0,0,0], style:'inText'},   //margin:58
{text: dataPAF.addr3, margin:[101,0,0,0], style:'inText' },

{ text: [ "\n\nBIO/Project Summary: ", {text: apple, style:'inText' } ], style:'eachLine'},  // <new text field to be added>

"\n\nWORK ITEMS / MATERIALS OVERVIEWS / COST ESTIMATES:",           //WORK ITEM AND COST
    { ul: [
            { text: [ "WORK ITEM #1 TITLE: ", {text: apple, style:'inText' } ], style:'eachBullet'},
            { text: [ "WORK ITEM #2 TITLE: ", {text: apple, style:'inText' } ], style:'eachBullet'}
          ],
      style: 'list'
    },

//     "\n\nHAZARD / SAFETY TESTING",
//     { ul: [
//             { text: [ "LEAD?: ", {text: apple, style:'inText' } ], style:'eachBullet'},         //yes or no
//             { text: [ "ASBESTOS?: ", {text: apple, style:'inText' } ], style:'eachBullet'},     //yes or no
//             { text: [ "   If Yes on either, plan & cost estimate: ", {text: apple, style:'inText' } ], style:'eachBullet'}
//           ],
//       style: 'list'
//     },
// "\nPARTNERS: ",                   //<name, in-kind materials description>

// { text: [ "\nSUBCONTRACTOR(S): "], style:'eachLine'},           //<n/a or name, cost>

"\nOTHER COSTS:",
    { ul: [
            { text: [ "TOOL RENTALS: ", {text: apple, style:'inText' } ], style:'eachBullet'},      //<y/n, description & cost if “yes”>
            { text: [ "PERMIT Needed: ", {text: apple, style:'inText' } ], style:'eachBullet'},     //<y/n, description & cost if “yes”>
            { text: [ "PORTAPOTTIE: ", {text: apple, style:'inText' } ], style:'eachBullet'},       //<y/n, description & cost if “yes”>
            { text: [ "WASTE: ", {text: apple, style:'inText' } ], style:'eachBullet'}              //<y/n, description & cost if “yes”>
          ],
      style: 'list'
    },

{ text: [ "\nTOTAL COST ESTIMATE: ", {text: apple, style:'inText' } ], style:'eachLine'},   //<sum of cost fields> 

{ text: [ "\nPROPOSED DATES: ", {text: apple, style:'inText' } ], style:'eachLine'},         //<start date, end date>

// { text: [ "\nVOLUNTEERS NEEDED: ", {text: apple, style:'inText' } ], style:'eachLine'},      //< # >

{ text: [ "\n\nNOTES: ", {text: apple, style:'inText' } ], style:'eachLine'},                    //<text field>


{ text: '\n\n*****', style: 'center' }
], //END CONTENT ***************************************************
defaultStyle: { //START STYLES
        fontSize: 12,
        bold: true,
        underline: true
                                    // decorationStyle: 'dashed' decorationType: 'underline'
    },
styles: {      
    eachLine: { 
        margin:[0,0,0,8]
        },
    inText: { 
            decorationStyle: 'dashed',
            decoration: 'underline',
            bold: false,
        },
    question: { 
            fontSize: 12,
            bold: true,
            underline: true
                                    // decorationStyle: 'dashed' decorationType: 'underline'
    },
    h2b: {
        fontSize: 15,
        // bold: true,
        alignment: 'center'

    },
    eachBullet: {
    },
    b: {
        fontSize: 12,
        // bold: true
    },
    center: {
        fontSize: 14,
        alignment: 'center'
    },
    left: {
        fontSize: 14,
        // bold: true,
        alignment: 'left'
    },
    right: {
        fontSize: 14,
        // bold: true,
        alignment: 'right'
    },
    list: {
        // bold: false,
        margin: [12, 0, 0, 0],
    }
}, //END STYLES

pageSize: 'LETTER',
info: {
    title: 'PAF Form Catalyst',
    author: 'Catalyst',
    subject: 'Project Assessment Form',
    keywords: 'PAF Catalyst Corvus',
      }
// pageMargins: [ 40, 60, 40, 60 ],
};        // END PRINT LAYOUT