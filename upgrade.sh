#Disclaimer --these commands do still need to be edited before running to upgrade everything

composer archive create --sourceType dir --sourceName .
composer network install -a $1@$2.bna -c PeerAdmin@hlfv1
composer network upgrade -c PeerAdmin@hlfv1 -n $1 -V $2
