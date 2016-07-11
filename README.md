# AchieJS basic demo - reciept scanning commandline utility

The goal of this demo project is to show how archiejs modules can be piped together
to do a task. In this case, the pipeline is as follows :-

1. Read reciepts from google drive
2. Run OCR on them with google vision
3. Save the results in google docs

This project is also a good way to see how well google vision can handle old washed out
reciepts.


# How to use

## Prerequisites

We will need to create a google app on (https://console.cloud.google.com/)[google cloud]. You will need a credit card to enable the free tier version of google vision APIs used in the project. 

Step 1. Create a google project at (https://console.cloud.google.com/)[google cloud] . My project is called `reciptscanner`.

Step 2. Enable google APIs (go to your project dashboard and find `enable api's` link.

```
a. Google Plus API (for auth)
b. Google drive API (reciepts are stored in drive)
c. Google vision API (OCR scanning of reciepts - needs a credit card)
d. Google Sheets API (*TODO* final result is dumpted into a spreadsheet)
```

Step 3. Create credentials. This is an option on the navigation menu (lefthand) on your project's API manager (accessible from project dashboard).

First, we need to setup `OAuth 2.0` .

```
1. Fill up details for oAuth consent screen (email, product name).
```

Next, we need to create `credetials` to use the APIs.

```
1. Goto `credentials` tab and click on `create credentials` button. 
   Select `OAuth Client ID` from the list.
2. Choose `web application` next (in application type) In the form that opens up,
    1. Provide application name (I choose `recipt scanner local dev` in my case)
    2. Provide origin `http://localhost:3000`
    3. Provide callback URL `http://localhost:3000/google/auth/callback`
3. Click on `create` button (and ok..ok.. next). 
   You are redirected back to application dashboard where you will 
   see newly created OAuth 2.0 Client ID. Click on it (`reciept scanner local dev`) 
   and inside, download the json. 
4. Move/copy the downloaded json to `config/secrets/scanapp-creds.json`
   location (where out app config will be able to access it). 
   NOTE: this is a secret file and should not be published on web.
```

Next, we need to create a (https://developers.google.com/identity/protocols/OAuth2ServiceAccount)[google service account] for using google vision APIs. Here are the steps :-

```
1. From the same API manager screen, click on `Manage service accounts` to go to the
   service account manager.
2. In service account manager, click on `CREATE SERVICE ACCOUNT` on top. Fillup the
   form which pops up :-
   a. Enter name of service account (`reciptscanner` in my case)
   b. Select `Furnish a new private key` checkbox and select `json` sub-option.
   c. Click on `create`
3. Move/copy the downloaded json to `config/secrets/scanapp-pkey.json` .
   NOTE: this is a secret file and should not be published on web.
```

With OAuth 2.0 enabled on google console, and files `config/secrets/scanapp-creds.json` and `config/secrets/scanapp-pkey` placed in our application directories, we are almost ready to run the demo app. 

## Installation

```
npm run setup
```

Installs npm modules in root folder and child modules under `/modules` folder.

## Running the app

The app runs entirely on command line.

```
node app
```

You are prompted following questions on the commandline.

```
Cut-copy the google authorization url here: 
What is the month on the reciepts (1-12) : [7]
What is the name of the google drive folder to scan : [Receipts]
```

For the first prompt (token url), cut-copy-paste the url from browser to the command line prompt and press enter.

For the second prompt (month), hit enter again (this is not currently used).

For the third question prompt (folder name), specify the name of the google drive folder which has your receipts. You can copy test receipts from our test google drive folder [test google drive folder](https://drive.google.com/drive/folders/0B6AH_WUpS8TnQ0pXc3hmZDQxWkk).

See `Output` section below, to see the program output.

## Running testcases

TO BE ADDED

## Output

Currently, the final results are dumped on the screen. I have to still write the module which saves them to google docs spreadsheet (soon).

```
$ node app.js 
Cut-copy the google authorization url here: http://localhost:3000/google/auth/callback?code=4/sOS9woOqyd5AWwP0YFEsBZCeR9cDf6TpaaSQIuSgRuw#
What is the month on the reciepts (1-12) : [7] 
What is the name of the google drive folder to scan : [Receipts] 
downloading file to /tmp/0B6AH_WUpS8TnbGFHaWZuOEtMM2M
downloading file to /tmp/0B6AH_WUpS8TnMVVwQ2NlM3lhbkE
downloading file to /tmp/0B6AH_WUpS8TnN3VDZFg1V0IzS2s
downloading file to /tmp/0B6AH_WUpS8TncXpjQmhud3E3T2c
downloading file to /tmp/0B6AH_WUpS8TnMXhjX1V3WUthU00
downloading file to /tmp/0B6AH_WUpS8TnSEFfamx6MDBkcWs
downloading file to /tmp/0B6AH_WUpS8TnVG4yNlI2dGpQd2M
downloading file to /tmp/0B6AH_WUpS8Tnd0RPMXdwc2M2ZW8
downloading file to /tmp/0B6AH_WUpS8TnRlVtQU1TYzlIelFZTi1paW5OeDllWmdzbXpJ
downloading file to /tmp/0B6AH_WUpS8TndnhLNXZBWTNtM2JlTWJTTjZzR000aDFsZDg0
scanning file /tmp/0B6AH_WUpS8TnbGFHaWZuOEtMM2M
scanning file /tmp/0B6AH_WUpS8TnN3VDZFg1V0IzS2s
scanning file /tmp/0B6AH_WUpS8TnMVVwQ2NlM3lhbkE
scanning file /tmp/0B6AH_WUpS8TncXpjQmhud3E3T2c
scanning file /tmp/0B6AH_WUpS8TnMXhjX1V3WUthU00
scanning file /tmp/0B6AH_WUpS8TnSEFfamx6MDBkcWs
scanning file /tmp/0B6AH_WUpS8TnVG4yNlI2dGpQd2M
scanning file /tmp/0B6AH_WUpS8Tnd0RPMXdwc2M2ZW8
scanning file /tmp/0B6AH_WUpS8TnRlVtQU1TYzlIelFZTi1paW5OeDllWmdzbXpJ
scanning file /tmp/0B6AH_WUpS8TndnhLNXZBWTNtM2JlTWJTTjZzR000aDFsZDg0


Good Scans:-

CHAI POINT
Devatha Plaza Banga 				Rs 70 


NILGIRIS FRR
E
18/1, ngton Str 				Rs 740 


BYRAM HOLDINGS
BLUE FROG
No.3, 				Rs 350 
```

