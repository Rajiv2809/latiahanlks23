import React, { useState } from 'react'
import { useStateContext } from '../contexts/contexts'
import axiosClient from '../axios';

export default function login() {
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const{ setToken, showToast } = useStateContext();


    const onSubmit = (e) => {
        e.preventDefault()
        axiosClient.post('/v1/auth/login',{
            username,
            password
        }).then(({data}) => {
            setToken(data.token)
            showToast('login success')
        }).catch((err)=>{
            showToast(err.response.data.message, 'red')
        })

    }

  return (
    <div>
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
       
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 import">
            Sign in to your account  
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={onSubmit} className="space-y-6"  method="POST">
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                value={username}
                    onInput={e => setUserName(e.target.value)}
                  id="email"
                  name="email"
                
                
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
               
              </div>
              <div className="mt-2">
                <input
                value={password}
                onInput={e => setPassword(e.target.value)}
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>

         
        </div>
      </div>






    </div>
  )
}
