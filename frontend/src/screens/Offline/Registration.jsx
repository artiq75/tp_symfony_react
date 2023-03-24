import axios from 'axios';
import React, { useState } from 'react'
import { redirect } from 'react-router-dom';
import { apiRoot } from '../../constants/apiConstant';
import { useAuthContext } from '../../tools/AuthContext';

const Registration = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');

  const { signIn } = useAuthContext();

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post(`${apiRoot}/register`, {
        email,
        password,
        nickname,
      })
      .then((response) => {
        console.log(response);
        if (response.data.email) {
          const user = {
            userId: response.data.id,
            email: response.data.email,
            isGuest: "standard"
          }
          try {
            signIn(user);
            redirect('/')

          } catch (error) {
            console.log('error: ', error)
          }

        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className='flex flex-1 h-screen flex-col justify-start items-center bg-black'>
      <h2 className='text-white font-bold text-xl pb-5'>INSCRIVEZ VOUS </h2>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <div className="mb-4">
          <label htmlFor="email" className="block text-green_06 font-bold mb-2">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-green_06 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-green_06 font-bold mb-2">
            Mot de passe
          </label>
          <input
            type="password"
            name="password"
            id="password"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-green_06 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Mot de passe"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <div className="mb-6">
          <label htmlFor="nickname" className="block text-green_06 font-bold mb-2">
            Pseudo
          </label>
          <input
            type="text"
            name="nickname"
            id="nickname"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-green_06 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Pseudo"
            value={nickname}
            onChange={(event) => setNickname(event.target.value)}
          />
        </div>
        <div className="flex items-center justify-center pt-5">
          <button
            className="bg-green_06 hover:bg-green_top w-full text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            S'inscrire
          </button>
        </div>
      </form>
    </div>
  );
};




export default Registration