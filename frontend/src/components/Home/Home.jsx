import React, { useEffect } from 'react';
import Layout from '../../Layout/Layout';
import { FaAngleLeft, FaAngleRight, FaSearch, FaUser } from 'react-icons/fa';
import Card from '../Card/Card';
import { Link, Navigate } from 'react-router-dom';
import SongBar from '../MasterBar/SongBar';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { userActor } from '../../states/actors/userActor';

export const songs = [
  {
    id: 1,
    title: "Podcast-1",
    img: "/assets/podcast.jpg",
    artist: "Artist1",
    mp3: new Audio("/assets/podcast1.mp3")
  },
  {
    id: 2,
    title: "Podcast-2",
    img: "/assets/podcast.jpg",
    artist: "Oppenheimier",
    mp3: new Audio("/assets/podcast2.mp3")
  },
];

const Home = () => {
  const { user, isAuthenticated } = useSelector((state) => state.account);
  const dispatch = useDispatch();

  const getUser = async () => {
    const token = JSON.parse(localStorage.getItem("token"));
    if (token) {
      const res = await fetch("http://localhost:5001/api/user/me", {
        method: "GET",
        headers: {
          'Content-Type': "application/json",
          token,
        },
      });

      const d = await res.json();
      if (d.success) {
        //toast.success(d.message);
        dispatch(userActor(d.user));
      }
      else {
        toast.error(d.message);
      }
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <Layout>
      <div className="flex justify-between mx-4 items-center my-5 border-b-2 border-pink-200 rounded-md">
        <div className='flex items-center gap-2 w-1/2'>
          <FaAngleLeft className='bg-pink-100 text-pink-500 rounded-full text-4xl p-1' />
          <FaAngleRight className='bg-pink-100 text-pink-500 rounded-full text-4xl p-1' />
          <div className='w-full text-left py-4 relative ml-3'>
            <input type="text" id='username' name='username' placeholder='Search for a song' className='block w-full rounded-full border-0 text-pink-500 shadow-sm placeholder:text-pink-300 focus:ring-[1px] focus:ring-inset focus:ring-pink-500 outline-none p-3 bg-pink-50 pl-12' />
            <FaSearch className='absolute top-8 left-3 text-pink-500'/>
          </div>
        </div>
        <div>
          {!isAuthenticated ? (
            <div>
              <Link to={'/signup'} className="rounded-full px-8 py-2 text-pink-500 mt-4 text-base font-semibold">
                Sign up
              </Link>
              <Link to={'/login'} className="rounded-full px-8 py-3 bg-pink-500 text-white mt-4 text-base font-semibold">
                Log in
              </Link>
            </div>
          ) : <FaUser className="text-2xl text-pink-500 mr-5" />}
        </div>
      </div>

      <div className='p-4 mx-4 rounded-lg bg-pink-50'>
        <div className="flex justify-between items-center px-2 py-1 mt-5 my-4">
          <span className='text-2xl font-semibold text-pink-500 hover:underline'>Focus</span>
          <span className='text-pink-300 font-semibold hover:underline'>Show all</span>
        </div>
        <div className='grid grid-cols-5 gap-5'>
          {songs.map((song, i) => (
            <Card key={song.id} idx={i} song={song} />
          ))}
        </div>

        <div className="flex justify-between items-center px-2 py-1 mt-5 my-4">
          <span className='text-2xl font-semibold text-pink-500 hover:underline'>Podcast Playlists</span>
          <span className='text-pink-300 font-semibold hover:underline'>Show all</span>
        </div>
        <div className='grid grid-cols-5 gap-5'>
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
        </div>
      </div>
      <SongBar />
    </Layout>
  );
};

export default Home;
