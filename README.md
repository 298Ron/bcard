About BCard.

BCard is a cutting-edge B2B / B2P platform designed to revolutionize the way businesses interact and transact.
Our platform leverages the power of React and TypeScript to provide a seamless and dynamic user experience.

Key Features
Intuitive Interface: Our user-friendly interface ensures that businesses of all sizes can easily navigate and utilize the platform.

Real-time Collaboration: Foster collaboration among your team members and partners through real-time communication and document sharing.

Personalized Dashboards: Customize your dashboard to focus on the metrics that matter the most to your business.

Usage

1.INSTALL
Open the terminal and navigate to "BCard-Client" folder root, Run 'npm install' to get all required node_modules for the "BCard-Client".

Open the terminal and navigate to "BCard-Server" folder root, Run 'npm install' to get all required node_modules for the "BCard-Server".

Or Manually:

Install the following components by writting this command in the terminal:

npm i bootstrap axios fontawesome yup react-router-dom react-toastify formik react-switch lodash bcrypt chalk cors joi jsonwebtoken mongoose morgan roating-file-stream

2.Run the server by writing this command in the terminal :
nodemon start

3.
DataBase connections -
DB_LOCAL:

Set the "MongoDB Connection string" in "BCard-Server\index.js" to use "process.env.DB_LOCAL"

DB_ATLAS:

Set the "MongoDB Connection string" in "BCard-Server\index.js" to use "process.env.DB_ATLAS"
Make sure that in "myob-server.env" you update your Atlas connection string of the Atlas db in "DB_ATLAS".

4.Start the development server: npm start

5.Open your browser and navigate to http://localhost:3000 to see the website in action.

Existing Users for test:

1.Default User:

Email: Default@gmail.com

Password: 123123123

2.Business User:

Email: Business@gmail.com

Password: 123123123

3.Admin User:

Email: Admin@gmail.com

Password: 123123123


Screenshots of few examples of pages on the website:
Home page:
![image](https://github.com/298Ron/bcard/assets/132360307/092c8bb2-e5f2-4836-83aa-5f2fbbcf2a8d)
About page:
![image](https://github.com/298Ron/bcard/assets/132360307/e8072aca-5ac4-4f8d-9056-d6c49afdad65)
Login page:
![image](https://github.com/298Ron/bcard/assets/132360307/aa710967-7b61-48de-9a9b-36aaf04c23d2)
Register page:
![image](https://github.com/298Ron/bcard/assets/132360307/3fd2913b-4557-4278-85db-3ba54b932cc6)
Cards page:
![image](https://github.com/298Ron/bcard/assets/132360307/2f32c70b-db21-4659-8a50-110412d9693e)
Card information page(Dark mode):
![image](https://github.com/298Ron/bcard/assets/132360307/f3308e3e-2690-49ad-9935-8e639592a75a)
