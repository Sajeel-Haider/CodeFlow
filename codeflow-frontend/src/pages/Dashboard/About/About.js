import React from "react";
import "./About.css";

const About = () => {
  return (
    <div className="bg-theme_black text-white min-h-screen flex flex-col items-center justify-center p-5">
      <div className="max-w-4xl text-center">
        <h1 className="text-4xl font-bold mb-6">About CodeFlow</h1>
        <p className="text-lg mb-4">
          CodeFlow is an online coding platform offering users a comprehensive
          environment for collaborative coding, problem-solving, and project
          management. With CodeFlow, users can create, save, and collaborate on
          code projects in real-time, leveraging a range of programming
          languages and tools.
        </p>
        <p className="text-lg mb-4">
          The platform features a user-friendly interface with real-time
          compilation feedback to enhance the coding experience. Users can
          participate in coding challenges, solve problems, and track their
          progress through a personalized dashboard and ranking system.
        </p>
        <p className="text-lg mb-4">
          Additionally, CodeFlow provides a repository for users to create and
          manage their coding projects, allowing for seamless organization and
          sharing of code repositories. The ranking system adds a competitive
          edge, motivating users to improve their coding skills and climb the
          leaderboard.
        </p>
        <p className="text-lg mb-4">
          For those seeking even more assistance and advanced features, CodeFlow
          offers a premium subscription option. Premium subscribers gain access
          to expertly solved answers to coding problems, providing valuable
          insights and learning resources. Whether you're a beginner honing your
          coding skills or an experienced developer looking to collaborate on
          projects, CodeFlow offers a dynamic and engaging platform to code,
          learn, and grow.
        </p>
      </div>
      <div className="lines-background"></div> {/* Background lines */}
    </div>
  );
};

export default About;
