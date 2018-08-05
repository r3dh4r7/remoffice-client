# Remoffice Client

> A client for [Remoffice Server](https://github.com/r3dh4r7/remoffice-server)

### Building Remoffice Client

 1. Install Node and Git CLI
    
    - Linux (Debian-based distros)

          curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
          
          sudo apt install -y nodejs git

 2. Configure as needed in *./src/config/index.js*

 3. Build Remoffice Client from the console/terminal

         # grab the latest version of Remoffice Client
         git clone https://github.com/r3dh4r7/remoffice-client

         # navigate to Remoffice Client root
         cd remoffice-client

         # install dependencies
         npm install

         # build Remoffice Client
         npm run build

         # exit Remoffice Client root
         cd ../

 4. Grab the contents of *./dist* and deploy as needed.