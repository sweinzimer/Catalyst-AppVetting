# Volunteer Developer Onboarding Information

### Thank You
for your willingness to use your skills and talents developing software for **Catalyst Partnerships NW**.  This brief document is intended to step you through the onboarding process:
* Install necessary tools
* Clone the repository
* Install the MongoDB database locally
* Interact with the codebase/make changes
* Explain the Git workflow we use

As you work through this process, suggestions are always welcome.  [Email Mike](mailto:mikehainespdx@gmail.com) with any ideas, tools, or suggestions that could make things better, and especially if you'd like to contribute needed changes to this codebase.

#### Install Necessary Tools:
**IDE/Text Editor:** This web application is written entirely in javascript and runs in an internet browser. **[Notepad++](https://notepad-plus-plus.org/)** works nicely, but if you own IntelliJ, ATOM, etc...go for it.

**Command Line Interface/Console:** There are many tools one may use - git Bash, Windows PowerShell, Mac Terminal, cygwin, etc...use whatever you are comfortable using.  For the purposes of this readMe, we will use the word **console** for this type of application.

**Install Git: [git-scm.com](https://git-scm.com/)** - If you don't already have it loaded, download the latest release from that page.  All default options are fine, although you may wish to choose your text editor.  Git Bash comes with this download (at least it does for Windows), and comes highly recommended.

**Install Node.js** 
* Check to see if you have node installed by typing `node -v` into a console.
* If no node, [download it here](https://nodejs.org/en/download/).
* Installing it with default settings is fine.
* If you have any consoles running, you'll have to restart them for node to be recognized.

**MongoDB Community version 3.4 Download and Installation:**
* [Version 3.4 Download](https://www.mongodb.com/download-center#previous)
	* Community Server should be highlighted at the top
	* Pick your operating system from the tabs under that
	* Choose 3.4.10, and Download.
* Open the .msi file (or whatever it is on a Mac), and do a Complete Install

**Clone the Catalyst Repo**
* Create or select a folder where you want to store the repo
* Open a git-enabled console and make sure the current working directory is that folder.
* Type `git clone https://github.com/dandahle/Catalyst-AppVetting.git` to clone the repo to that folder.
* Type `cd Catalyst-AppVetting/` to change to the folder where the files are located. You will be on the master branch.
* *If you have a console that does NOT tell you what folder you are in and what branch you are on, it is recommended you find one that does.*
* Type `git checkout develop` to get to the working development branch.

We'll come back to how to name branches and merge changes later.

For future reference (but do it now):
* Head over to [The Catalyst GitHub Repo](https://github.com/dandahle/Catalyst-AppVetting)
* Bookmark that page for future use

**Setting up Mongo for use with the Catalyst Appvetting App**
* On your root C:\ drive, Create a folder `data`
* Inside that, create a folder `db` so `C:\data\db` exists.
* (This is where the Catalyst app stores the data for the MongoDB)
* Go to the mongodb.exe folder: `C:\Program Files\MongoDB\Server\3.4\bin` (we'll call this the *mongo bin* as we refer to that folder from here on.)
* Open a console pointed to the mongo bin
* Type `./mongod` (that should start the server locally - if firewall comes up, you can choose the local option)

To be sure it is working, and further configuration:
* Open a new console from the mongo bin folder
* Type `./mongo` (prompt disappears after Mongo Shell info appears - you are now in the *Mongo Shell*.)
* Type `show dbs` (should be admin and local)
* Type `use admin` (should reply *switched to db admin*)
* Because the Mongo Shell doesn't like to insert text, we recommend, for the next step, that you
* *Copy the next line into a text editor:*
	* `db.createUser({user:'', pwd: '', roles: [ { role: 'userAdmin', db:'admin'} ] })`
* Create a user name and password and insert them in between the ''s, then paste that into the console. It should look like this:
* `db.createUser({user:'myUserName', pwd: 'myPassword123!%', roles:<...etc...>`
* You should receive a message back that looks like 
``` 
Successfully added user: {
	"user" : "yourUserNameHere",
    "roles" : [
    	{
    		"role" : "userAdmin",
            "db" : "admin"
        }
   	]
}
```        
* If it doesn't give you the above success message within a few seconds, close the console window, open another one and repeat all steps from *Type `./mongo`*
* KEEP TRACK of this userName and Password, you'll need it in a minute (then you can forget it).

So far, the database is set up and running properly with all the folder configurations necessary.  We can now close the Mongo Shell console (keep the mongod server running in the other bash window). Time to configure the Catalyst Appvetting software.

**Configure the Appvetting Software**
* Head back to the catalyst repo folder.
* Rename the `RENAME_THIS_TO_config.js` file you received from Mike to `config.js`. 
* Open `config.js` in text editor or IDE of choice, and follow the instructions given.
* Once you have saved your personal config.js, open a console in the AppVetting root, and 
* Type `node createAdminUser`  
* At this point, you have used the config.js file to connect the MongoDB to the mongo username and password, and you have created a user you will need once we open the app in a browser window.  So, we're all set!


#### Starting the Software 

If your mongod instance is still running, skip to step 3. Otherwise, these are the steps you'll need to take every time you restart your computer or shut down the mongod server.
1. Double Click mongod (found at `C:\Program Files\MongoDB\Server\3.4\bin` on Windows, not sure on mac.  It's the Mongo Bin from earlier...you should be familiar with where it is installed.
	* You may also open a console from the mongo bin folder and type `./mongod` if you prefer
	* A console window should be open saying *waiting for connection on port 27017*
2. Open another console window in the Catalyst repo folder
3. Type `npm install` (definitely the first time for each branch, or if you've made serious changes, otherwise, it's optional)
4. Type `npm start`
5. Open a browser (like Chrome, Safari, (anything but IE))
6. At the url, type `localhost:8000` - - you're in!

#### Using the Software

Now that you're in, you can mess around with the software.  You'll want a completed application form in order to observe the features of the software.  From `localhost:8000`...
* Upper right corner - click Blue `Log In` button.
* Enter the credentials you used in the createUserAdmin section of config.js - Save them to your browser (it's only a local instance) for convenience.
* Click `Apply` tab to fill out an application (fill in, like ALL the fields, and be sure to click "Yes" radio buttons to fill in more information) and click Submit.  This will save the application information in your local database, so you only have to do this once.
* From the success page, click on the `Vetting` tab (if it is there.  If not, navigate back to `localhost:8000`).  Click around, change data, enter data, etc.
* **Users and Roles:** Click on the `Users` button - you should see yourself as an ADMIN.  Click `Add New User` to add a user with different roles to see what permissions they have to see what they see.  For instance, Site Assessor roles cannot see the `Vetting` tab.  There are certain places Vetting agents can't enter information in the Site Assessment views, and so on. 

#### If You're Interested in helping Catalyst...read on...

**Contact Mike** and he'll share the Open Issues Spreadsheet Google Document with you.

#### Submitting changes to the codebase

Summary: We begin by branching off develop.  We recommend you commit and push to your remote branch often.  When you are finished, we ask that developers submit Merge Requests to the develop branch.  We are currently working out the details of this, and will update this file accordingly.  

**Begin Your Branch - open a console from your local catalyst repo folder:**
* `git checkout develop`
* Use the "Issue Code" from the google doc spreadsheet to name your branch.  If you must test, please use TST-##.
* For Example: `git branch TST-02` (01 has been used pushing this document...)
* Then check out the branch: `git checkout TST-02`

**During Development**
* Make your code changes, committing them to your local branch as so:

	`git commit -am "insert commit message here, saying what you did"`
* We also encourage you to commit your local branch to the remote repository often using the following command:

	`git push -u origin <localBranchName>` 
    
	(Don't worry - this doesn't merge it into the master branch or anything - it just saves your work remotely on a branch of the same name, so you have a backup in case something goes wrong...)

**Before the final pull request.  Go to your branch and...**
* `git status` - - if there is anything to commit, be sure to
	`git commit -am "commit message here"   THEN:
* `git checkout develop` 
* `git pull` -- pulls any changes from other developers
* `git checkout <yourBranch>`
* `git merge develop` -- merges those changes into your branch
* `git push -u origin <yourBranch>` - - should push your local branch to the remote branch of the same name along with any changes made in develop to the remote repository.  NOW...

**Create a Pull Request**
After pushing your local changes to the gitHub repo branch:
* point your browser to the repository on github.com.
* Make sure you are signed in to GitHub
* Click the `Pull Requests` tab.
* Click `New Pull Request`.
* In the **base:** dropdown, **select develop. <-- IMPORTANT**
* In the **compare:** dropdown, select the branch you recently pushed to the repository.
* Be sure the changes you have made are reflected in the commits and code comparison below.
* Click `Create pull request`.
* Modify the Title: use code and description title from the spreadsheet, like `TST-01: Fix the ReadMe file`
* Modify the Description (be as brief as you want) - basically be sure to identify the changes this Pull Request is introducing to the develop branch.

And that should create a Pull Request.  If there are any issues with this process, please let Mike know.

**Properly Shutting Down MongoDb** (when you're finished for the day)
* Open bash from the Mongo bin folder
* Type `./mongo`
* Type `use admin`
* Type `db.shutdownServer()`

	Failure to do this will result in some sort of error upon next open.  It usually still works, though.

###Thanks Again
for helping out.  Contact Mike with any questions you may have.
