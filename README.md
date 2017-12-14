# Volunteer Developer Onboarding Information

### Thank You
for your willingness to use your skills and talents developing software for **Catalyst Partnerships NW**.  This brief document is intended to step you through the onboarding process:
* Install necessary tools
* Clone the repository
* Install the MongoDB database locally
* Interact with the codebase/make changes
* Explain the Git workflow we use

As you work through this process, suggestions are always welcome.  [Email Mike](mailto:mikehainespdx@gmail.com) with any ideas, tools, or suggestions that could make things better.

#### Before we begin:
 [Email Mike](mailto:mikehainespdx@gmail.com) to request a config.js file for the software.  You'll need it later.  If you have his cell number, call or text him.  That would be even better.

#### Install Necessary Tools:
**IDE/Text Editor:** This web application is written entirely in javascript and runs in an internet browser. **[Notepad++](https://notepad-plus-plus.org/)** works nicely, but if you own IntelliJ, go for it.

**Command Line Interface/Console:** There are many tools one may use - git Bash, Windows PowerShell, cygwin, etc...use whatever you are comfortable using.

**Install Git: [git-scm.com](https://git-scm.com/)** - If you don't already have it loaded, download the latest release from that page.  All default options are fine, although you may wish to choose your text editor.  Git Bash comes with this download.

**Install Node.js** 
* Check to see if you have node installed by typing `node -v` into a console.
* If no node, [download it here](https://nodejs.org/en/download/).
* Installing it with default settings is fine.
* If you have any bash shells running, you'll have to restart them for node to be recognized.

**MongoDB Community version 3.4 Download and Installation:**
* [Version 3.4 Download](https://www.mongodb.com/download-center#previous)
	* Community Server should be highlighted at the top
	* Pick your operating system from the tabs under that
	* Choose 3.4.10, and Download.
* Open the .msi file (or whatever it is on a Mac), and do a Complete Install

**Clone the Catalyst Repo**
* Create a folder where you want to store the repo
* Open Git Bash or any git-enabled console, making sure the current working directory is that folder.
* Type `git clone https://github.com/dandahle/Catalyst-AppVetting.git` to clone the repo.
* Type `cd Catalyst-AppVetting/` where the files are located. You will be on the master branch.
* Type `git checkout develop` to get to the working development branch 
* Type `git branch <whateverBranchNameYouWant>` to create your own branch.

We'll come back to how to merge changes later.

For future reference (but do it now):
* Head over to [The Catalyst GitHub Repo](https://github.com/dandahle/Catalyst-AppVetting)
* Bookmark that page for future use

**Setting up Mongo for use with the Catalyst Appvetting App**
* On your root C:\ drive, Create a folder `data`
* Inside that, create a folder `db` so `C:\data\db` exists.
* (This is where the Catalyst app stores the data)
* Go to the mongodb.exe folder: `C:\Program Files\MongoDB\Server\3.4\bin`
* Open git bash from that folder
* Type `./mongod` (that should start the server locally - if firewall comes up, choose the local option)

To be sure it is working, and further configuration:
* Open a new git bash from that folder
* Type `./mongo` (prompt disappears after Mongo Shell info appears)
* Type `show dbs` (should be admin and local)
* Type `use admin` (should reply switched to db admin)
* *Copy this line into a text editor:*
	* `db.createUser({user:'', pwd: '', roles: [ { role: 'userAdmin', db:'admin'} ] })`
* Create a user name and password and insert them in between the ''s, then paste that into the console.
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
* If it doesn't work within a few seconds, close the git bash window, open another one and repeat all steps from *Type `./mongo`*
* KEEP TRACK of this userName and Password, you'll need it in a minute (then you can forget it).

So far, the database is set up and running properly with all the folder configurations necessary.  We can now close the mongo setup shell (keep the mongod server running in the other bash windwo). Time to configure the Catalyst Appvetting software.

**Configure the Appvetting Software**
* Head back to the catalyst repo folder.
* Insert `RENAME_THIS_TO config.js` you received from Mike into the Catalyst-Appvetting root (in the same folder as app.js)
* Ummm...rename it to `config.js`.
* Open `config.js` in text editor or IDE of choice.
* In the mongo: section, replace the userName and Password to the same ones you used in the `db.createUser` section above.
* In the createAdminUser: section, change the username and password to something you'll remember.  You'll need these to log in to the software once it is up and running.  First and last name are nice as well.
* Open bash here, and 
* Type `./config.js`
* Type `node createAdminUser`  (Be sure config file is set up properly)

All set?  That's the last of the setup!

#### Starting the Software 

If your mongod instance is still running, skip to step 3. Otherwise, these are the steps you'll need to take every time you restart your computer or shut down the mongod server.
1. Double Click mongod (found at `C:\Program Files\MongoDB\Server\3.4\bin` on Windows, ??? on mac.
	* You may also open bash from the bin folder and type `./mongod` if you prefer
2. Open Bash in the Catalyst repo folder
3. Type `npm install` (definitely the first time for each branch, or if you've made serious changes, otherwise, it's optional)
4. Type `npm start`
5. Open a browser (like Chrome, Safari, (anything but IE)
6. At the url, type `localhost:8000` - - you're in!

#### Using the Software

Now that you're in, you can mess around with the software.  You'll want a completed application in order to observe the features of the software.  From `localhost:8000`...
* Upper right corner - click Blue `Log In` button.
* Enter the credentials you used in the createUserAdmin section of config.js - Save them to your browser (it's only a local instance) for convenience.
* Click `Apply` tab to fill out an application (fill in, like ALL the fields, and be sure to click "Yes" radio buttons to fill in more information) and click Submit.  This will save the application information in your local database, so you only have to do this once.
* Navigate back to `localhost:8000` and click the `Vetting` tab.  Click around, change data, enter data, etc.
* **Users and Roles:** Click on the `Users` button - you should see yourself as an ADMIN.  Click `Add New User` to add a user with different roles to see what permissions they have to see what they see.  For instance, Site Assessor roles cannot see the `Vetting` tab.  There are certain places Vetting agents can't enter information in the Site Assessment views, and so on. 

#### Submitting changes to the codebase

We began by branching off develop.  We ask that developers merge to the develop branch.  We are currently working out the details of this, and will update this file accordingly.  Pretty sure you'll go something like this:

From Your Branch - 
* `git commit -am "commit message here" 
* `git checkout develop` 
* `git pull` - - pulls any changes from other developers
* `git checkout <yourBranch>`
* `git merge develop` -- merges those changes into your branch
* `git push -u develop <yourBranch>` - - should push your branch with changes into develop

**Create a Pull Request**
After pushing your local changes to your remote repository:
* point your browser to your repository on Github.com.
* Click the Pull Requests tab.
* Click New pull request.
* In the base: dropdown, select develop.
* In the compare: dropdown, select the branch you recently pushed to the repository.
* Click Create pull request.
* Modify the Title and Description of the Pull Request to identify the changes this Pull Request is introducing to the develop branch and your repository.

And that should create a merge request.  But we'll test that and see...not exactly sure how gitHub handles these things.

**Properly Shutting Down MongoDb** (when you're finished for the day)
* Open bash from the Mongo bin folder
* Type `./mongo`
* Type `use admin`
* Type `db.shutdownServer()`

	Failure to do this will result in some sort of error upon next open.  It usually still works, though.

# kohn-catalyst
hello :)

**Website live pages:**
* http://54.69.62.47:8000/
* http://54.69.62.47:8000/test/show
  * Log into EC2 to see the console output when you test this page
* http://54.69.62.47:8000/test/show-all
  * This returns a JSON formatted text wall
* http://54.69.62.47:8000/test/new
  * Sample form using rest-new.hbs, and partials footer.html, header.html
  * Submitting should call route '/insert_user', but we don't do restaurants so it returns 404

## Structure
* **format** 
* **me** 
* **pretty** 
  * **please** 

## Good reads
* Anatomy of an HTTP Transaction - https://nodejs.org/en/docs/guides/anatomy-of-an-http-transaction/
* Using express, handlebars, and mongoDB - https://sites.google.com/site/redmahbub/development/hbs-mongo-with-express4

## Documentation
* mongoDB - https://docs.mongodb.com/manual/introduction/
* mongoDB Node.js driver quick reference - http://mongodb.github.io/node-mongodb-native/2.2/
* mongoDB Node.js driver API - http://mongodb.github.io/node-mongodb-native/2.2/api/

## Packages
*Package* | *Description* | *Documentation*
--- | --- | ---
Bluebird | Full feature promise library with ES6 support | www.http://bluebirdjs.com/docs/
body-parser | Parse incoming request bodies in a middleware before your handlers, availabe under the `req.body` property | www.ewiggin.gitbooks.io/expressjs-middleware/content/body-parser.html
bootstrap | HTML, CSS, and JS framework for developing responsive, mobile first projects on the web | www.http://getbootstrap.com/getting-started/
cookie-parser | Parse Cookie header and populate `req.cookies` with an object keyed by the cookie names. Optionally you may enable signed cookie support by passing a `secret` string, which assigns `req.secret` so it may be used by other middleware | www.github.com/expressjs/cookie-parser
debug | tiny node.js debugging utility modelled after node core's debugging technique | www.npmjs.com/package/debug
express | Web framework for Node.js | www.expressjs.com
forever | Tool used to ensure a node script runs uninterrupted | www.npmjs.com/package/forever
jquery | jQuery is a fast, small, and feature-rich JavaScript library | http://api.jquery.com/
hbs | HTML semantic template builder | www.handlebarsjs.com
mongodb | official MongoDB driver for Node.js, needed for mongoose | www.docs.mongodb.com/getting-started/node/client/
mongoose | An object modeling tool used with mongoDB designed to work in an asynchronous environment | www.mongoosejs.com/docs/guide.html
morgan | HTTP request logger middleware for node.js | www.npmjs.com/package/morgan
request | Wrapper to use basica HTTP request functions | www.npmjs.com/package/request#http-authentication
serve-favicon | favicon serving middleware with caching | www.npmjs.com/package/serve-favicon
X-editable | Libray for inline editing | https://vitalets.github.io/x-editable/
