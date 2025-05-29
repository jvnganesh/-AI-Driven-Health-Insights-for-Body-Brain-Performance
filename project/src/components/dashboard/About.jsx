import React from 'react';
import { motion } from 'framer-motion';
import { FaLinkedin } from 'react-icons/fa';


const developers = [
  {
    name: 'Pranavsrihas Allu',
    email: 'pranavsrihasallu@gmail.com',
    image: 'https://i.postimg.cc/pTnP07pP/pranav-photo.png',
    linkedin: 'https://www.linkedin.com/in/pranavsrihas/',
    description: 'An aspiring AI/ML Engineer with a foundation in data science, generative AI using LLMs, and basic web development, published five research papers, completed an internship at Orom Corp, an externship at SmartInternz, holds an AWS certification, and is currently studying at VIT Vellore.' ,
  },
  {
    name: 'JVN Ganesh',
    email: 'jvnganesh@gmail.com',
    image: 'https://i.postimg.cc/7Pn3PYH8/ganesh-photo.jpg',
    linkedin: 'https://www.linkedin.com/in/jvn-ganesh-30504477/',
    description:
      'With over 3 years of experience in data science, AI, ML, computer vision, and data analysis, skilled in developing intelligent systems using CNN and advanced analytics. Worked as a Data Analyst intern at IBM, DevOps Engineer intern at Mphasis, and Data Scientist intern at Celebal Technologies. Currently pursuing studies at VIT Vellore.',
  },
  {
    name: 'Sadhna Mall',
    email: 'sadhnamall1010@gmail.com',
    image: 'https://i.postimg.cc/m2DW8khT/Sadhna-Photo.png',
    linkedin: 'https://www.linkedin.com/in/sadhna-mall-786m/',
    description: 'An aspiring full-stack developer currently pursuing MCA at VIT Chennai, with expertise in frontend development using HTML, CSS, and React, and backend development with Spring Boot. Skilled in API development, machine learning integration, and certified in Oracle SQL. Outside academics, engaged in sports to maintain balance and discipline.',
  },
];

const About = () => {
  return (
    <motion.div
      className="max-w-5xl mx-auto p-6 mt-8 bg-white rounded-2xl shadow-md border border-gray-200"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-4xl font-extrabold text-center mb-10 bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 text-transparent bg-clip-text drop-shadow-lg">
  Meet the Developers
</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {developers.map((dev, index) => (
        <motion.div
  key={index}
  className="flex flex-col items-center text-center p-4 bg-gray-50 rounded-xl shadow-sm cursor-pointer"
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: index * 0.2 + 0.4, ease: 'easeOut', duration: 0.6 }}
  whileHover={{
    scale: 1.07,
    boxShadow: '0 15px 30px rgba(0, 0, 0, 0.2)',
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 20,
    },
  }}
>

            <img
              src={dev.image}
              alt={dev.name}
              className="w-24 h-24 rounded-full object-cover mb-4 border-4 border-blue-500"
            />
            <h3 className="text-xl font-semibold text-gray-800">{dev.name}</h3>
            <p className="text-sm text-gray-500">{dev.email}</p>
            <a
  href={dev.linkedin}
  target="_blank"
  rel="noopener noreferrer"
  className="text-blue-600 flex items-center gap-1 mt-1 text-sm hover:underline"
>
  <FaLinkedin className="text-blue-700" />
  LinkedIn
</a>

            <p className="text-sm text-gray-600 mt-3">{dev.description}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default About;
