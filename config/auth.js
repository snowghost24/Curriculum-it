// config/auth.js
// changed call back address
// expose our config directly to our application using module.exports
module.exports = {

    'facebookAuth' : {
        'clientID'        : '1541798349241263', // your App ID
        'clientSecret'    : 'dd5489d88cabdaa6e029f5ac4a2f6fd1', // your App Secret
        'callbackURL'     : 'https://whispering-garden-26491.herokuapp.com/profile',
        'profileURL': 'https://graph.facebook.com/v2.5/me?fields=first_name,last_name,email'

    },

    'twitterAuth' : {
        'consumerKey'        : 'o0Q0ZkND9JFAVTh4jBK8lxblA',
        'consumerSecret'     : '4AlJnW6N3UYDEu8wOIM8VeK916zX74tk5rj3nOq5MsAPp0Pkog',
        'callbackURL'        : 'https://whispering-garden-26491.herokuapp.com/profile'
    },

    'googleAuth' : {
        'clientID'         : '979961913374-mcqvdu0dqhmear4r01mbmjgcecuugnm8.apps.googleusercontent.com',
        'clientSecret'     : 'PZftah_shr6ZNe5k-aC-y0eK',
        'callbackURL'      : 'https://whispering-garden-26491.herokuapp.com/profile'
    },
    
    'url' : {"link": "mongodb://josetest:Trinity3@ds149144.mlab.com:49144/nodelogindb"
    }
};
