#There are two parameters that this file takes:
#the first one is the name of the business network
#the second is the version of the business network as defined in the package.json

#This will remove the admin card if it currently exists and then create a new instance
#This has to be done for the issuing identities to work for some reason
echo "Removing old admin card..."
composer card delete -c admin@grantblock

echo "Installing node modules..."
echo "Creating dist directory..."
npm run prepublish
echo "Compressing files into a business network archive (BNA)..."
composer network install -c PeerAdmin@hlfv1 -a dist/$1.bna
echo "Starting network [$1] version [$2] on your local instance of Fabric..."
composer network start -A admin -S adminpw -c PeerAdmin@hlfv1 -f admin@$1.card -n $1 -V $2
echo "Importing admin card for network use..."
composer card import --file admin@$1.card
echo "Checking to make sure the network can be reached..."
composer network ping -c admin@$1

#echo "Starting composer rest server... "
#composer-rest-server -c admin@$1

#if [ "$1" == "-c" ]; then
#	echo "Starting with composer server..."
#	composer-rest-server -p hlfv1 -n $1 -i PeerAdmin -s randomStr -N always
#fi
