# ntvphotohunt
A simple bot built in node js to download photos from photo.ntvbd.com - a popular news/tv site of Bangladesh

## Prerequisite
You need nodejs and npm installed in your system.

## Install
- Download the repository
- Extract
- Using Terminal go inside the extracted folder
```
npm install
```
 
## Usage
- Create a file named "links.txt" inside the extracted folder
- Paste single link from ntvbd.com (which contains photo page) in each line
- URL should be like: http://photo.ntvbd.com/bangladesh/others/boishakhi-mela-at-bangla-academy/1460908587.ntv
- In the terminal:
```
node bot
```
- Now Files will be downloaded in "assets" folder. 
- For each link, a seperate directory will be created
- If file already exists, it will be skipped