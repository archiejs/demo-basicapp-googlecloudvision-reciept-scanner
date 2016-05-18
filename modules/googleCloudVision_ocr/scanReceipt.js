// Your service object below.
const vision = require('node-cloud-vision-api');

// constructor
var ScanReceipt = module.exports = function(options, imports){
    if (options.googleClientID) {
      this.googleClientID = options.googleClientID;
      this.googleSecret = options.googleSecret;
      this.googleCallbackURL = options.googleCallbackURL;

      this.userOCRClients = {};
    }
};

// ScanReceipt.staticVariable = "value";

// your public members ( ie. ScanReceipt.prototype.XXX below )

(function() {

    /* setupScannerWithUserAuth
     * This function setups scanner with user auth.
     *
     * @param userid - app userid
     * @param refreshToken - refreshToken granted by google
     */

    this.setupScannerWithUserAuth = function(userid, refreshToken){
      //const oauth2Client = imports.google;
      //vision.init({auth: oauth2Client});
      //this.userOCRClients[userid] = vision;
    };

    /* setupScannerWithAPIKey
     * This function sets up scanner for use in debug environment.
     *
     * @param apiKey - 
     */

}).function(ScanReceipt.prototype);
