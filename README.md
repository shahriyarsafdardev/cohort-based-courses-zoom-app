This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

run command `yarn install` to install the dependencies
To start the development server:
```bash
npm run dev
# or
yarn dev
```
To run the server on other port 
```bash
npm run dev -p 3001
# or
yarn dev -p 3001
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Add ngrok in mac

Head to https://ngrok.com/ in browser and Signup for an account
Once your account setup is completed, It will redirect you to setup page https://dashboard.ngrok.com/get-started/setup
Download Ngrok for mac
run this in terminal `unzip /path/to/ngrok.zip` (path of the downloaded zip file)
Once this step is completed now head to the setup page of ngrok and you will see a command with token `ngrok config add-authtoken your-token`. Copy that command and run it in terminal
Now your ngrok setup is completed

## Setup Zoom App

Create a .env file in root directory of your project: 

Setup with staging backend 
Add this in .env file `NEXT_PUBLIC_ROOT_URL=https://sphere-rails-app-staging.herokuapp.com/api/v1`(This url is the link to the backend API on staging).

Setup with local backend
Run rails project with `rails s ` command.
Run `ngrok http 3000`
Hit this url in a browser. It will give you a line of code. Copy that line and paster it in the end of development.rb file in rails project
You will have to stop the rails server and start it again (Only rails server. Ngrok url will be same)
Now copy ngrok url and change it in .env file of your next.js project `NEXT_PUBLIC_ROOT_URL=https://123.ngrok.io/api/v1`

Follow these steps to setup zoom

1. Run App on 3000 port with `yarn dev -p 3001`
2. Run `ngrok http 3001`
3. Once ngrok in running, copy the https ngrok url under Forwarding
4. Go to the browser and open Zoom app marketplace
5. On top of the page click on Manage
6. Find an app with name `Testing app 1` and open it
7. Under Activation click on Add to add the zoom app in your Zoom Client (It will ask for Auth/Permissions). App will be added to your zoom account and can be seen from APPs in Zoom
8. Now click on `App credentials` in Zoom app marketplace
9. Paste the copied ngrok url in `Home URL` i.e. https://129dadae1ec8.ngrok.io (Yours will be different)
10. Paster the copied url in `Redirect URL for OAuth` and append /auth at the end. So final url will look like this https://129dadae1ec8.ngrok.io/auth (Your's will be different)
11. Under the `OAuth allow list` section. Paste the same url in `Add allow lists` with /auth at the end
12. Head to the `Domain allow list` section and add paste ngrok url without https://. It will look like this 129dadae1ec8.ngrok.io. Add another domain appssdk.zoom.us in it

Now your zoom app is all set up

# Run this app in Zoom
- Head to your Zoom Client on desktop
- Under Apps section you will be able to see an app you just added
- Click on it and it will load in the Zoom
- If you see the Login page. Congratulations! your zoom app is working

