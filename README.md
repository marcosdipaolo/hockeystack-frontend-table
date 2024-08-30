# Hockeystack Front End Table Challenge
```
npm i
npm run dev
```
## Data route URL
If port `3000` is not available NextJS goes to the following `3001` and so on.  
Please in that case edit the hardcoded url at `src/app/page.tsx:7` to de desired port, thanks.
## Possible Improvements

Generally speaking this project could be improved with server side pagination and making the table more agnostic from the data shape. 
Both things were trade-offs I made to finish the project on time. 

I think with more time I could also find a more attractive desing keeping the same formal touch it has now.

Also the native version is missing some features form the material-ui version like the possibility of modifying the column's width by dragging it. 
