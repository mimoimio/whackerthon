import React from 'react';

const Header = () => {
  return (
    <header className="bg-gray-800 text-white py-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="text-xl font-bold">HealthAI</div>
        <nav>
          <ul className="flex space-x-4">
            <li><a href="/" className="hover:text-gray-300">Home</a></li>
            <li><a href="/symptomchecker" className="hover:text-gray-300">Symptom Checker</a></li>
            <li><a href="/mentalchecker" className="hover:text-gray-300">Mental Health</a></li>
            <li><a href="/userlogin" className="hover:text-gray-300">login</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
