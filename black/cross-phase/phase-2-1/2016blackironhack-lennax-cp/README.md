 --------
 * NOAA 1981-2010 Climate Normals 
     - ftp://ftp.ncdc.noaa.gov/pub/data/normals/1981-2010/products/temperature/mly-cldd-base57.txt
    - Text data
    - The month column corresponding to the date of travel is used
    - Data is available for the entire US

* Zika Cases Reported in the United States
    - http://www.cdc.gov/zika/intheus/maps-zika-us.html 
    - Table data
    - The number of cases for the corresponding state is used
    - Data is available for the entire US

* 2015 American Community Survey Subject Tables
    - http://api.census.gov/data/2015/acs1
    - JSON data
    - The population of the corresponding county or state is used
    - Data is available for the entire US

* Compressed Mortality File 1999-2014 on CDC WONDER Online Database
    - http://wonder.cdc.gov/cmf-icd10.html
    - Table data
    - Annual deaths per 1,000,000 in the USA by several causes is used
     - Data is available for the entire US
 
 * Y The primary dataset "online climate data" from data.gov is used
 
* Y All datasets used are from the US government
 
 Description
 -----------
     2. N The gauge is not interactive (may add interactive chart of multiple risk factors)
 
 * Interaction Form
    1. Y Information about climate, mosquito activity, and cases of Zika in the state is output
     2. y The user will be able to change the date and destination of travel to see how risk is changed
     3. Y The user inputs their date of travel and destination
     4. y If the user changes the date and destination of travel, the map will be updated based on the climate and location
 ----------
 * Dependencies
     - python
    - gunicorn
     - flask
     - flask-cors
    - numpy
    - beautifulsoup4
 
 * Building
     sudo apt-get install python python-flask python-pip
 
 * Usage
     1. Start the flask server with `python server.py`
    2. Open Google Chrome and go to 127.0.0.1:5000
     3. Enter data into the form and click 'Submit'
 
 Testing
