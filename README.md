# My 2020 activity tracker

A basic activities tracker, user can perform only COVID friendly activities.

## MVP

-   Activities table - User can see a list of activities with name, covid friendly and timer performed.
-   Activity item - User can select an activity clicking in the checkbox, and the button perform activities should appear.
-   Multiple items - User can select multiple activities.
-   Perform activities - User can click at Perform activities to update the activities times performed counter, only if all activities are covid friendly, in case there are any non covid friendly activity user should be informed and the counter shouldn't be updated

## installation

Start by downloading and building the project. The following commands will do the job on most Debian based Linux distributions.
Using GitHub CLI

```bash
gh repo clone Mauricio-xxi/activity_tracker
cd activity_tracker
npm install
```

## Usage

NPM will start a develop server on port 3000 with `npm run start`, also we need use `npm run server`, the server is a fake backend on port 5000, (json-server).
To start the frontend and the fake backend use `npm run rundevel`

```bash
npm run rundevel
```

## Server

Project uses the json-server to stubbing the future api backend.

## Models

### Activity Model

```
    {
      id: {type: Number, required: true, unique: true},
      name: {type: String, required: true},
      covidFriendly: {type:Boolean, required:true},
      timesPerformed: {type: Number, required: true, unique: true}
    }
```

## API Endpoints

| Description      | Method | Information                      |
| ---------------- | ------ | -------------------------------- |
| /activities      | GET    | returns an array of activities   |
| /activities/{id} | PUT    | updates an activity filter by id |

## Quality code

![alt text](./src/readmeFiles/sonar.png 'Sonar Cloud Quality Gate')

## Tests

![alt text](./src/readmeFiles/coverage.png 'Tests Coverage')
