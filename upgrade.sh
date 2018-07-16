#Disclaimer --these commands do still need to be edited before running to upgrade everything

composer archive create --sourceType dir --sourceName .
composer network install -a grantblock@0.0.24996.bna -c PeerAdmin@hlfv1
composer network upgrade -c PeerAdmin@hlfv1 -n grantblock -V 0.0.24996
