import csv;
import sys;
statesData = {};
f = open('States.kml', 'r');
csv.field_size_limit(sys.maxsize);
dataReader = csv.reader(f, delimiter=',', quotechar='"');
for line in dataReader:
    stateName = line[0].replace(' ', '_').lower()+'.kml';
    stateKML = line[2];
    print "'" + stateName + "',",
#    g = open(stateName, 'w');
#    g.write(stateKML);
#    g.close();
#print statesData
f.close();
