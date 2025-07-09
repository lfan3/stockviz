- add more indicator for cn stockes: to see the coelation with price and some other thing

## 14/07/2025
- calculate more intrigue value and PE/Growth ratio
- editing feature
## 13/07/2025
- show the ratio according to its category on the frontend
## 12/07/2025
- create manually the montly average price for 603989
- reorganise the fundamental ratio
## 11/07/2025
- show the last 10 visited company's ticker and name on the frontend
## 10/07/2025
- when i search a company, and i have the data, stock the com in the list
- implement new service for company group
## 09/07/2025
- make http request when enter a chinese stock companiy's ticker,if i have no data yet, show on the front that i need to collect the csv to my back -done
## 08/07/2025
- create two tables for duckdb, one for track the imported csv list another for the future grouping usage
## 07/07/2025
- install duckdb
## 05/07/2025
- keep trace the last 10 recently visited company

## 04/07/2025
- add year/season choiser -done
- show the data on frontend -done
## 02/07/2025
- make csv client and returned the data - done
## 01/07/2025
- make csv client -done
## 27/06/2025
- make a api call to yahoo and store in json local file to moke frontend data - done
- show the mock data and improve the charts's funcionalities - done
## 26/06/2025
- show the price on the graphe -done
- convert the donner to the frontend need format and show it
- add more feature to the chart

## 25/06/2025
- the ticker is updated, and the view change automatically, it should not like this, it should only change when i click the button -done
- handle angular 19 and apexchart compabilities problems - done
- create a notificationService with MatSnackBar -done. (ALHPI.PA, ALNEV.PA)
- make the chart more clear, remove the filedownload feature
- create a database to stock the list
- check the calculation

## before 25/06/2025
### done
1 create an input component -done
2 create a call ticker service -done
3 make a service to call the fastapi -done
4 choise the graphe libary and make the graphe -done
5 parse the roe data to the graphe - done
### learn
npm dependancys check: npm list @angular/core @angular/common ng-apexcharts
npm dependancies confilts: npm install @swimlane/ngx-charts --legacy-peer-deps
use openApi to generate quickly the interface
- understood dataframe.reset_index inplace, understand the 
- understand multiple levels colums
- df.to_dict('records') very pratical 