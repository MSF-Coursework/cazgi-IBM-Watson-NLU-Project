const express = require('express');
const app = new express();

const dotenv = require('dotenv');
dotenv.config();

function getNLUInstance() {
    let api_key = process.env.API_KEY;
    let api_url = process.env.API_URL;

    const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1');
    const { IamAuthenticator } = require('ibm-watson/auth');

    const NaturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
        version: '2020-08-01',
        authenticator: new IamAuthenticator({
            apikey: api_key
        }),
        serviceUrl: api_url,
    });

    return NaturalLanguageUnderstanding;
}

app.use(express.static('client'))

const cors_app = require('cors');
app.use(cors_app());

app.get("/",(req,res)=>{
    res.render('index.html');
  });

app.get("/url/emotion", (req,res) => {
    const nlu = getNLUInstance();

    const params = {
        'url': req.query.url,
        'features': {
            'keywords': {
                'sentiment': true,
                'emotion': true,
                'limit': 5
            }
        }
    };

    let result = nlu.analyze(params)
        .then(analysisResults => {
            console.log(analysisResults.result.keywords[0]);
            if (analysisResults.result.keywords.length >= 1) {
                    return analysisResults["result"]["keywords"][0]["emotion"];
            } else {
                return "unknown";
            }
        })
        .catch(err => {
            console.log(err);
            return "unknown";
        });

    result.then(outstr => {
        return res.send(outstr);
    });
});

app.get("/url/sentiment", (req,res) => {
    const nlu = getNLUInstance();

    const params = {
        'url': req.query.url,
        'features': {
            'keywords': {
                'sentiment': true,
                'emotion': false,
                'limit': 5
            }
        }
    };

    let result = nlu.analyze(params)
        .then(analysisResults => {
           if (analysisResults.result.keywords.length >= 1) {
                if ("label" in analysisResults.result.keywords[0].sentiment) {
                    return analysisResults["result"]["keywords"]["0"]["sentiment"]["label"];
                } else {
                    return "unknown";
                }
            } else {
                return "unknown";
            }
        })
        .catch(err => {
            return "unknown";
        });

    result.then(outstr => {
        return res.send(outstr);
    });
});

app.get("/text/emotion", (req,res) => {
    const nlu = getNLUInstance();

    const params = {
        'text': req.query.text,
        'features': {
            'keywords': {
                'sentiment': true,
                'emotion': true,
                'limit': 5
            }
        }
    };

    let result = nlu.analyze(params)
        .then(analysisResults => {
            console.log(analysisResults.result.keywords[0]);
            if (analysisResults.result.keywords.length >= 1) {
                    return analysisResults["result"]["keywords"][0]["emotion"];
            } else {
                return "unknown";
            }
        })
        .catch(err => {
            console.log(err);
            return "unknown";
        });

    result.then(outstr => {
        return res.send(outstr);
    });
});

app.get("/text/sentiment", (req,res) => {
    const nlu = getNLUInstance();

    const params = {
        'text': req.query.text,
        'features': {
            'keywords': {
                'sentiment': true,
                'emotion': false,
                'limit': 5
            }
        }
    };

    let result = nlu.analyze(params)
        .then(analysisResults => {
           if (analysisResults.result.keywords.length >= 1) {
                if ("label" in analysisResults.result.keywords[0].sentiment) {
                    return analysisResults["result"]["keywords"]["0"]["sentiment"]["label"];
                } else {
                    return "unknown";
                }
            } else {
                return "unknown";
            }
        })
        .catch(err => {
            return "unknown";
        });

    result.then(outstr => {
        return res.send(outstr);
    });
});

let server = app.listen(8080, () => {
    console.log('Listening', server.address().port)
})

