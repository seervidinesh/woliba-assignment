# Woliba Backend Engineering Assignment

RSS management system build with Hapi Js, Typescript and PostgresSQL database with test cases written in Chai and Mocha.


# steps to run application
## Backend

1. This application is using postgresSQL as database service. so please make sure to have postgres running in your system.
2. Navigate to backend folder and rename .env.sample file to .env
3. to setup db run `setup-db.sh` file by running `sudo setup-db.sh` command. this will create and run migration.
4. Start application by running `npm run start:dev` command. 
5. now head to localhost 4000 port. You will see the backend is ruuning and swagger can be found.
6. You can execute routes given.
7. This application have test cases written.
8. to run test cases simply run `npm run test` command.

## Frontend 
1. Navigate to frontend folder.
2. run `npm start` command to run the frontend application.
3. naviagte to localhost:3000 port to check frontend application.