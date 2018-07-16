npm run prepublish
composer network install -c PeerAdmin@hlfv1 -a dist/grantblock.bna
composer network start -A admin -S adminpw -c PeerAdmin@hlfv1 -f admin@grantblock.card -n grantblock -V 0.0.24996
composer card import --file admin@grantblock.card
composer network ping -c admin@grantblock

#echo "Starting composer rest server... "
#composer-rest-server -c admin@grantblock

#if [ "$1" == "-c" ]; then
#	echo "Starting with composer server..."
#	composer-rest-server -p hlfv1 -n grantblock -i PeerAdmin -s randomStr -N always
#fi
