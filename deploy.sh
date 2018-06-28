npm run prepublish
composer network install -c PeerAdmin@hlfv1 -a dist/ed-grants-alpha.bna
composer network start -A admin -S adminpw -c PeerAdmin@hlfv1 -f admin@ed-grants-alpha.card -n ed-grants-alpha -V 0.0.1
composer card import --file admin@ed-grants-alpha.card
composer network ping -c admin@ed-grants-alpha

#echo "Starting composer rest server... "
#composer-rest-server -c admin@ed-grants-alpha

#if [ "$1" == "-c" ]; then
#	echo "Starting with composer server..."
#	composer-rest-server -p hlfv1 -n ed-grants-alpha -i PeerAdmin -s randomStr -N always
#fi
