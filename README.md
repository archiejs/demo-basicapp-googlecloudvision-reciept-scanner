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

Create a google app with following details :-

TO BE ADDED

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

For the first, cut-copy-paste the url from browser to the command line prompt and press enter.

For the second, hit enter again (this is not currently used).

For the third, specify the name of the google drive folder which has your receipts. My receipts are store here https://drive.google.com/drive/folders/0B6AH_WUpS8TnQ0pXc3hmZDQxWkk (and you are free to use the same).

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

