# SEF academix-frontend

## Setup Development Environment

### Prerequisites
1. Tomcat 9
2. Maven
3. MySQL 8
4. sef-core

### Building the SEF-Core

- Sef core includes APIs and the admin dashboard for the academic application.
  In order to work with academix-frontend, you need to build sef-core and deploy it on tomcat (core.war and dashboard.war).
  Follow instructions in [sef-core](https://github.com/sef-global/sef-core/blob/master/Readme.md) to build it.  
  
### Building the academix frontend

1. Clone your forked academix-frontend repository
    ```
    git clone https://github.com/USERNAME/academix-frontend
    cd academix-frontend
    ```
2. Build the project using maven
   ```
   mvn install
   ```
    
3. Copy the generated `.war` file to the tomcat's webapp directory.  
   ```
   cp target/academix.war /path/to/tomcat/webapps
   ```
3. You can access the UI with http://localhost:8080/academix

#### Creating Symlinks (important)

1. [Build the project](#Building the project) and deploy it to the tomcat. 
2. Navigate to the app's dist directory
   ```
   cd app/dist
   ``` 
3. Remove the contents of the dist directory. 
   ```
   rm -rf *
   ```
4. Create the symlinks as follows.
    ```
   ln -s /path/to/symlinks/tomcat/webapps/academix/index.html
   ln -s /path/to/symlinks/tomcat/webapps/academix/main.js
   ln -s /path/to/symlinks/tomcat/webapps/academix/main.js.map
   ln -s /path/to/symlinks/tomcat/webapps/academix/main.css
   ln -s /path/to/symlinks/tomcat/webapps/academix/main.css.map
   ```

#### Rebuild using npm
This will rebuild the app and update the deployed application on the tomcat because it has been linked with symlinks.

   ```
   cd app/
   npm run build
   ```
(You should create the symlinks first)

#### Auto update while developing application
Run the watch command,

  ```
  cd app/
  npm run watch
  ```
This will watch files and recompile whenever they change.

(You should create the symlinks first)
