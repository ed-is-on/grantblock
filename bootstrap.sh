#This will boostrap all the participants, and will also create identities for them
#This is super finnicky;. If you get an error 20, run "composer card delete -c admin@grantblock" and re-deploy everything to fix that issue

# Add a Grantees with an identity for each
echo 'Creating a Grantee named Clark Kent...'
composer participant add -c admin@grantblock -d '{"$class":"com.usgov.grantblock.Grantee", "granteeId":"ckent", "grantBalance": 552580.79, "pocName":"Clark Kent", "pocEmail":"ckent@jla.edu"}'
echo 'Issuing an identity to Clark Kent...'
composer identity issue -c admin@grantblock -f ckent@grantblock.card -u ckent -a resource:com.usgov.grantblock.Grantee#ckent -x false
echo 'Importing ckent@grantblock.card...'
composer card import --file ckent@grantblock.card

echo 'Creating a Grantee named Bruce Wayne...'
composer participant add -c admin@grantblock -d '{"$class":"com.usgov.grantblock.Grantee", "granteeId":"bwayne", "grantBalance": 1059666.61, "pocName":"Bruce Wayne", "pocEmail":"bwayne@jla.edu"}'
echo 'Issuing an identity to Bruce Wayne...'
composer identity issue -c admin@grantblock -f bwayne@grantblock.card -u bwayne -a resource:com.usgov.grantblock.Grantee#bwayne -x false
echo 'Importing bwayne@grantblock.card...'
composer card import --file bwayne@grantblock.card
        
echo 'Creating a Grantee named Diana Prince...'
composer participant add -c admin@grantblock -d '{"$class":"com.usgov.grantblock.Grantee", "granteeId":"dprince", "grantBalance": 3746763.66, "pocName":"Diana Prince", "pocEmail":"dprince@jla.edu"}'
echo 'Issuing an identity to Diana Prince...'
composer identity issue -c admin@grantblock -f dprince@grantblock.card -u dprince -a resource:com.usgov.grantblock.Grantee#dprince -x false
echo 'Importing dprince@grantblock.card...'
composer card import --file dprince@grantblock.card

echo 'Creating a Grantee named Hal Jordan...'
composer participant add -c admin@grantblock -d '{"$class":"com.usgov.grantblock.Grantee", "granteeId":"hjordan", "grantBalance": 1206566.88, "pocName":"Hal Jordan", "pocEmail":"hjordan@jla.edu"}'
echo 'Issuing an identity to Hal Jordan...'
composer identity issue -c admin@grantblock -f hjordan@grantblock.card -u hjordan -a resource:com.usgov.grantblock.Grantee#hjordan -x false
echo 'Importing hjordan@grantblock.card...'
composer card import --file hjordan@grantblock.card

#I only have an initial grantee, three grantee validators, and one education participant active right now to test access functionality

# echo 'Creating a Grantee named John Stewart...'
# composer participant add -c admin@grantblock -d '{"$class":"com.usgov.grantblock.Grantee", "granteeId":"jstewart", "grantBalance": 2305617.51, "pocName":"John Stewart", "pocEmail":"jstewart@jla.edu"}'
# echo 'Issuing an identity to John Stewart...'
# composer identity issue -c admin@grantblock -f jstewart@grantblock.card -u jstewart -a resource:com.usgov.grantblock.Grantee#jstewart -x false
# echo 'Importing jstewart@grantblock.card...'
# composer card import --file jstewart@grantblock.card

# echo 'Creating a Grantee named Arthur Curry...'
# composer participant add -c admin@grantblock -d '{"$class":"com.usgov.grantblock.Grantee", "granteeId":"acurry", "grantBalance": 18890565.56, "pocName":"Arthur Curry", "pocEmail":"acurry@jla.edu"}'
# echo 'Issuing an identity to Arthur Curry...'
# composer identity issue -c admin@grantblock -f acurry@grantblock.card -u acurry -a resource:com.usgov.grantblock.Grantee#acurry -x false
# echo 'Importing acurry@grantblock.card...'
# composer card import --file acurry@grantblock.card

# echo 'Creating a Grantee named Barry Allen...'
# composer participant add -c admin@grantblock -d '{"$class":"com.usgov.grantblock.Grantee", "granteeId":"ballen", "grantBalance": 982191.49, "pocName":"Barry Allen", "pocEmail":"ballen@jla.edu"}'
# echo 'Issuing an identity to Barry Allen...'
# composer identity issue -c admin@grantblock -f ballen@grantblock.card -u ballen -a resource:com.usgov.grantblock.Grantee#ballen -x false
# echo 'Importing ballen@grantblock.card...'
# composer card import --file ballen@grantblock.card

# echo "Creating a Grantee named Martian Manhunter..."
# composer participant add -c admin@grantblock -d '{"$class":"com.usgov.grantblock.Grantee", "granteeId":"jjonzz", "grantBalance": 4060225.18, "pocName":"Martian Manhunter", "pocEmail":"jjonzz@jla.edu"}'
# echo 'Issuing an identity to Martian Manhunter...'
# composer identity issue -c admin@grantblock -f jjonzz@grantblock.card -u jjonzz -a resource:com.usgov.grantblock.Grantee#jjonzz -x false
# echo 'Importing jjonzz@grantblock.card...'
# composer card import --file jjonzz@grantblock.card

# echo "Creating a Grantee named Oliver Queen..."
# composer participant add -c admin@grantblock -d '{"$class":"com.usgov.grantblock.Grantee", "granteeId":"oqueen", "grantBalance": 11120974.36, "pocName":"Oliver Queen", "pocEmail":"oqueen@jla.edu"}'
# echo 'Issuing an identity to Oliver Queen...'
# composer identity issue -c admin@grantblock -f oqueen@grantblock.card -u oqueen -a resource:com.usgov.grantblock.Grantee#oqueen -x false
# echo 'Importing oqueen@grantblock.card...'
# composer card import --file oqueen@grantblock.card

# echo "Creating a Grantee named Ray Palmer..."
# composer participant add -c admin@grantblock -d '{"$class":"com.usgov.grantblock.Grantee", "granteeId":"rpalmer", "grantBalance": 9376213.22, "pocName":"Ray Palmer", "pocEmail":"rpalmer@jla.edu"}'
# echo 'Issuing an identity to Ray Palmer...'
# composer identity issue -c admin@grantblock -f rpalmer@grantblock.card -u rpalmer -a resource:com.usgov.grantblock.Grantee#rpalmer -x false
# echo 'Importing rpalmer@grantblock.card...'
# composer card import --file rpalmer@grantblock.card

# echo "Creating a Grantee named Dinah Lance..."
# composer participant add -c admin@grantblock -d '{"$class":"com.usgov.grantblock.Grantee", "granteeId":"dlance", "grantBalance": 6223489.79, "pocName":"Dinah Lance", "pocEmail":"dlance@jla.edu"}'
# echo 'Issuing an identity to Dinah Lance...'
# composer identity issue -c admin@grantblock -f dlance@grantblock.card -u dlance -a resource:com.usgov.grantblock.Grantee#dlance -x false
# echo 'Importing dlance@grantblock.card...'
# composer card import --file dlance@grantblock.card

# echo "Creating a Grantee named Carter Hall..."
# composer participant add -c admin@grantblock -d '{"$class":"com.usgov.grantblock.Grantee", "granteeId":"chall", "grantBalance": 2782661.81, "pocName":"Carter Hall", "pocEmail":"chall@jla.edu"}'
# echo 'Issuing an identity to Carter Hall...'
# composer identity issue -c admin@grantblock -f chall@grantblock.card -u chall -a resource:com.usgov.grantblock.Grantee#chall -x false
# echo 'Importing chall@grantblock.card...'
# composer card import --file chall@grantblock.card

# echo "Creating a Grantee named Kendra Saunders..."
# composer participant add -c admin@grantblock -d '{"$class":"com.usgov.grantblock.Grantee", "granteeId":"ksaunders", "grantBalance": 883738.57, "pocName":"Kendra Saunders", "pocEmail":"ksaunders@jla.edu"}'
# echo 'Issuing an identity to Kendra Saunders...'
# composer identity issue -c admin@grantblock -f ksaunders@grantblock.card -u ksaunders -a resource:com.usgov.grantblock.Grantee#ksaunders -x false
# echo 'Importing ksaunders@grantblock.card...'
# composer card import --file ksaunders@grantblock.card

# echo "Creating a Grantee named Ralph Wright..."
# composer participant add -c admin@grantblock -d '{"$class":"com.usgov.grantblock.Grantee", "granteeId":"rwright", "grantBalance": 453905.38, "pocName":"Ralph Wright", "pocEmail":"rwright@jla.edu"}'
# echo 'Issuing an identity to Ralph Wright...'
# composer identity issue -c admin@grantblock -f rwright@grantblock.card -u rwright -a resource:com.usgov.grantblock.Grantee#rwright -x false
# echo 'Importing rwright@grantblock.card...'
# composer card import --file rwright@grantblock.card

# echo "Creating a Grantee named Cynthia Reynolds..."
# composer participant add -c admin@grantblock -d '{"$class":"com.usgov.grantblock.Grantee", "granteeId":"creynolds", "grantBalance": 2924785.81, "pocName":"Cynthia Reynolds", "pocEmail":"creynolds@jla.edu"}'
# echo 'Issuing an identity to Cynthia Reynolds...'
# composer identity issue -c admin@grantblock -f creynolds@grantblock.card -u creynolds -a resource:com.usgov.grantblock.Grantee#creynolds -x false
# echo 'Importing creynolds@grantblock.card...'
# composer card import --file creynolds@grantblock.card

# echo "Creating a Grantee named Billy Batson..."
# composer participant add -c admin@grantblock -d '{"$class":"com.usgov.grantblock.Grantee", "granteeId":"bbatson", "grantBalance": 780058.94, "pocName":"Billy Batson", "pocEmail":"bbatson@jla.edu"}'
# echo 'Issuing an identity to Billy Batson...'
# composer identity issue -c admin@grantblock -f bbatson@grantblock.card -u bbatson -a resource:com.usgov.grantblock.Grantee#bbatson -x false
# echo 'Importing bbatson@grantblock.card...'
# composer card import --file bbatson@grantblock.card

# echo "Creating a Grantee named Helena Bertinelli..."
# composer participant add -c admin@grantblock -d '{"$class":"com.usgov.grantblock.Grantee", "granteeId":"hbertinelli", "grantBalance": 715296.56, "pocName":"Helena Bertinelli", "pocEmail":"hbertinelli@jla.edu"}'
# echo 'Issuing an identity to Helena Bertinelli...'
# composer identity issue -c admin@grantblock -f hbertinelli@grantblock.card -u hbertinelli -a resource:com.usgov.grantblock.Grantee#hbertinelli -x false
# echo 'Importing hbertinelli@grantblock.card...'
# composer card import --file hbertinelli@grantblock.card

# echo "Creating a Grantee named John Henry..."
# composer participant add -c admin@grantblock -d '{"$class":"com.usgov.grantblock.Grantee", "granteeId":"jhenry", "grantBalance": 4388182.29, "pocName":"John Henry", "pocEmail":"jhenry@jla.edu"}'
# echo 'Issuing an identity to John Henry...'
# composer identity issue -c admin@grantblock -f jhenry@grantblock.card -u jhenry -a resource:com.usgov.grantblock.Grantee#jhenry -x false
# echo 'Importing jhenry@grantblock.card...'
# composer card import --file jhenry@grantblock.card

# echo "Creating a Grantee named Barbara Gordon..."
# composer participant add -c admin@grantblock -d '{"$class":"com.usgov.grantblock.Grantee", "granteeId":"bgordon", "grantBalance": 974080.14, "pocName":"Barbara Gordon", "pocEmail":"bgordon@jla.edu"}'
# echo 'Issuing an identity to Barbara Gordon...'
# composer identity issue -c admin@grantblock -f bgordon@grantblock.card -u bgordon -a resource:com.usgov.grantblock.Grantee#bgordon -x false
# echo 'Importing bgordon@grantblock.card...'
# composer card import --file bgordon@grantblock.card

# echo "Creating a Grantee named Dick Grayson..."
# composer participant add -c admin@grantblock -d '{"$class":"com.usgov.grantblock.Grantee", "granteeId":"dgrayson", "grantBalance": 1131859.12, "pocName":"Dick Grayson", "pocEmail":"dgrayson@jla.edu"}'
# echo 'Issuing an identity to Dick Grayson...'
# composer identity issue -c admin@grantblock -f dgrayson@grantblock.card -u dgrayson -a resource:com.usgov.grantblock.Grantee#dgrayson -x false
# echo 'Importing dgrayson@grantblock.card...'
# composer card import --file dgrayson@grantblock.card

# echo "Creating a Grantee named Jefferson Pierce..."
# composer participant add -c admin@grantblock -d '{"$class":"com.usgov.grantblock.Grantee", "granteeId":"jpierce", "grantBalance": 331334.34, "pocName":"Jefferson Pierce", "pocEmail":"jpierce@jla.edu"}'
# echo 'Issuing an identity to Jefferson Pierce...'
# composer identity issue -c admin@grantblock -f jpierce@grantblock.card -u jpierce -a resource:com.usgov.grantblock.Grantee#jpierce -x false
# echo 'Importing jpierce@grantblock.card...'
# composer card import --file jpierce@grantblock.card

# Add an education Identity with card
echo "Creating a Department of Education user named Maria Hill..."
composer participant add -c admin@grantblock -d '{"$class":"com.usgov.grantblock.Education", "userId":"mhill", "pocName":"Maria Hill", "pocEmail":"mhill@shield.gov"}'
echo 'Issuing an identity to Maria Hill...'
composer identity issue -c admin@grantblock -f mhill@grantblock.card -u mhill -a resource:com.usgov.grantblock.Education#mhill -x false
echo 'Importing mhill@grantblock.card...'
composer card import --file mhill@grantblock.card

echo 'Listing all entities on the network...'
composer network list -c admin@grantblock

echo 'Doing the list in another way...'
composer identity list -c admin@grantblock