import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-5">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="w-full md:w-1/4 mb-8 md:mb-0">
            <h1
              onClick={() => navigate('/')}
              className='text-3xl font-semibold text-slate-50 cursor-pointer mb-5'>
              Crypto<span className='text-orange-700'>X</span>
            </h1>
            <div className="flex space-x-4">
              <a href="https://twitter.com" className="text-gray-400 hover:text-blue-500">
                <i className="fab fa-twitter fa-2x"></i>
              </a>
              <a href="https://facebook.com" className="text-gray-400 hover:text-blue-600">
                <i className="fab fa-facebook fa-2x"></i>
              </a>
              <a href="https://instagram.com" className="text-gray-400 hover:text-pink-500">
                <i className="fab fa-instagram fa-2x"></i>
              </a>
            </div>
          </div>
          <div className="w-full md:w-1/4 mb-8 md:mb-0">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-300 hover:text-orange-500">Home</Link></li>
              <li><Link to="/market" className="text-gray-300 hover:text-orange-500">Market</Link></li>
            </ul>
          </div>
          <div className="w-full md:w-1/4">
            <h3 className="text-lg font-semibold mb-4">Subscribe</h3>
            <form className="flex flex-col">
              <input
                type="email"
                placeholder="Your email"
                className="w-full p-2 mb-4 border border-gray-700 bg-gray-900 text-white placeholder-gray-400 rounded-md"
              />
              <button
                type="submit"
                className="w-full bg-orange-500 text-white p-2 rounded-md hover:bg-orange-600"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        <div className="text-center mt-6 text-gray-400">
          <p>&copy; {new Date().getFullYear()} CryptoX. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
