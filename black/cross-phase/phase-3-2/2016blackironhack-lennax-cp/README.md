 Travel Risk Evaluation
 ----------------------
 
[REDACTED]
 
 Keywords
 --------
 
 Datasets
 --------
* NOAA Climate Normals Monthly
    - http://www.ncdc.noaa.gov/cdo-web/api/v2/
    - JSON data
    - Normal annual precipitation, temperature, and growing degree day information is used to assess the suitability of the climate for mosquitoes
     - Data is available for the entire US
 
 * Zika Cases Reported in the United States
 
 Description
 -----------
This website provides travelers with information and context about the risk of contracting Zika virus and other mosquito-borne diseases while traveling within the United States.
 The user provides their destination and date of travel.
 The website shows the destination on a map and estimates the disease risk on that date.
    1. Y The page uses a color-coded table to show risk components and a Plot.ly graph to show risk of Zika virus in context of other risks
    2. N The chart has hover but no click interaction
 
 * Interaction Form
     1. Y Information about climate, mosquito activity, and cases of Zika in the state is output
     2. y The user will be able to change the date and destination of travel to see how risk is changed
     3. Y The user inputs their date of travel and destination
    4. Y If the user changes the date and destination of travel, the map is updated based on the location
    5. y If the user changes the date and destination of travel, the charts are be updated based on the risk
 
 Build Case
 ----------
     - beautifulsoup4
 
 * Building

     sudo apt-get install python python-flask python-pip

    sudo pip install -r requirements.txt
 
 * Usage
     1. Start the flask server with `python server.py`
 Additional Information
 ----------------------
 In the description section, items marked with an uppercase Y are functional while items marked with a lowercase y have not been implemented.

The URL provided for climate data online was not detailed enough to easily find the REST API. This is largely due to poor design of the NOAA website. I did not know the REST API existed until I saw it in another participant's README.
