#There are two parameters that this file takes:
#the first one is the name of the business network
#the second is the version of the business network as defined in the package.json

npm run prepublish
composer network install -c PeerAdmin@hlfv1 -a dist/$1.bna
composer network start -A admin -S adminpw -c PeerAdmin@hlfv1 -f admin@$1.card -n $1 -V $2
composer card import --file admin@$1.card
composer network ping -c admin@$1

#echo "Starting composer rest server... "
#composer-rest-server -c admin@$1

#if [ "$1" == "-c" ]; then
#	echo "Starting with composer server..."
#	composer-rest-server -p hlfv1 -n $1 -i PeerAdmin -s randomStr -N always
#fi
