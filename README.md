# JobConnect Moçambique - Platform Prototyping

JobConnect Moçambique is a platform designed to connect job seekers with employment opportunities, including both formal and informal work. This platform offers multiple ways for users to access jobs, regardless of their literacy or internet access. The platform includes USSD (Unstructured Supplementary Service Data) options, voice guidance, audio-based profiles, and a website/app for users with internet access.

This README provides details about the features of the JobConnect Moçambique platform prototype, to be developed using React.

## Table of Contents
1. [Features Overview](#features-overview)
2. [Installation](#installation)
3. [Usage](#usage)
4. [Contributing](#contributing)
5. [License](#license)

---

## Features Overview

### 1. **USSD – Platform Without Internet 📱**
   - Simulate a menu-based interaction via USSD (e.g., *"123#" on a phone).
   - Features:
     - Search for Jobs
     - View Available Job Listings
     - Hourly Jobs (Gigs)
     - Create/Update Profile
     - Speak to an Assistant

### 2. **USSD with Voice – For Those Who Can't Read 🎙**
   - Create an interface that guides users through voice commands in Portuguese and local languages.
   - Users interact using simple numeric keypad commands.
   - Display job options with detailed audio instructions.

### 3. **Audio Profiles – Applications Without Text 🎤**
   - Allow users to record audio profiles and submit them as job applications.
   - Job seekers record a message with details such as name, skills, and location.
   - Audio files are available for employers to listen to.

### 4. **Online Platform – Website and Light App 🌐📲**
   - A responsive website designed to work on basic phones and with slow internet connections.
   - Features:
     - Job listings from companies.
     - Candidate profile creation and video interviews.
     - Multilingual support (Portuguese and local languages).

### 5. **Hourly Jobs – Gigs and Informal Market 💼**
   - A section for job seekers to find temporary and freelance work.
   - Allows employers to post gigs (e.g., painters, gardeners, cooks, mototaxistas).
   - Rating system for workers to ensure credibility.

### 6. **Partnerships with Mobile Operators – Free Access 📶**
   - Integration with mobile operators like Movitel, Vodacom, and Tmcel to provide free access to the platform via USSD and the app (without data usage).
   - Reduced call costs to the USSD system.

### 7. **Radio and WhatsApp – Job and Training Announcements 📻💬**
   - Community radio broadcasts job opportunities and training sessions.
   - WhatsApp Business broadcasts job offers via voice messages.
   - Users can respond with voice messages to apply for jobs.

### 8. **Community Agents – Employment Ambassadors 👥**
   - Train community agents to assist people with no internet access or low literacy in using the system.
   - Agents can help users with job applications and system navigation.
   - Collaboration with NGOs, churches, schools, and community organizations.

### 9. **Job Fairs and Physical Employment Centers 🏢**
   - Physical job centers and job fairs to connect candidates with employers in strategic locations like markets, churches, and community centers.

### **Final Summary**
- **Without Internet & Literacy:**
  - USSD (123# with voice and text).
  - Audio profiles.
  - Job announcements via radio and WhatsApp.
  - Physical job fairs and centers.
  
- **With Internet:**
  - Lightweight website and app.
  - Candidate video interviews and evaluations.
  - Informal and gig jobs.
  
- **Inclusive Features:**
  - Free access through partnerships with mobile operators.
  - Community employment ambassadors.
  - Formal and informal job opportunities.

---

## Installation

To set up the development environment, follow the steps below.

### Prerequisites:
1. Node.js and npm installed (Node version 14.x or later recommended).
2. Git installed to manage project version control.

### Steps:
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/jobconnect-mozambique.git
   ```

2. Navigate to the project directory:
   ```bash
   cd jobconnect-mozambique
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm start
   ```

The app will now be running on `http://localhost:3000`. You can open this in your browser to view the prototype.

---

## Usage

This prototype aims to simulate the JobConnect Moçambique platform's user interface and functionality. You can explore:

- USSD-based navigation using buttons to simulate menu-based interaction.
- Record and submit audio profiles.
- Browse job listings, create a profile, and interact with other platform features.

---

## Contributing

We welcome contributions to improve the JobConnect Moçambique prototype. If you'd like to contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature (`git checkout -b feature-name`).
3. Make your changes and commit them (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature-name`).
5. Create a pull request.

---

## License

This project is licensed under the MIT License. See the LICENSE file for details.

---

This README should provide you with everything needed to develop the JobConnect Moçambique prototype. Feel free to customize it further based on your project's specific requirements!
