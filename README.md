# troology_be
In this we are using Database Name as troopology and also we have 4 types of collections:
State: {state_code,state_name}
District : { district_code,district_name,state_id}
Block: { block_code,block_name,state_id,district_id}
Village :{village_code,vilage_name,state_id,district_id,block_id}

STATE:
API Name: /state
Method: Post
Description : To Add the State list

API Name: /state
Method: Get
Description : To get all the State list

API Name: /stateById
Method: get
Description : To get the State value with the id


API Name: /stateById
Method: put
Description : To update the State value with the id

API Name: /state
Method: delete
Description : Delete the state By Id.

District :
API Name: /district
Method: Post
Description : To Add the District list

API Name: /district
Method: Get
Description : To get all the  district  list

API Name: /districtById
Method: get
Description : To get the district value with the id


API Name: / districtById
Method: put
Description : To update the district value with the id

API Name: /district
Method: delete
Description : Delete the District By Id.


BLOCK :
API Name: /block
Method: Post
Description : To Add the Block  list

API Name: /block
Method: Get
Description : To get all the block list

API Name: /blockById
Method: get
Description : To get the block value with the id


API Name: /blockById
Method: put
Description : To update the block value with the id

API Name: /block
Method: delete
Description : Delete the block By Id.

VILLAGE
API Name: /village
Method: Post
Description : To Add the Village list

API Name: /village
Method: Get
Description : To get all the village list

API Name: /villageById
Method: get
Description : To get the village value with the id


API Name: /villageById
Method: put
Description : To update the village value with the id


API Name: /village
Method: delete
Description : Delete the village By Id.
