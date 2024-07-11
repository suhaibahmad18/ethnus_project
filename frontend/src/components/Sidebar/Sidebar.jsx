import React from 'react';
import { BiLibrary, BiSolidHome } from "react-icons/bi";
import { FiSearch } from "react-icons/fi";
import { FaPlus } from "react-icons/fa";
import { TbWorld } from "react-icons/tb";
import Signup from './Signup';
import "./Sidebar.css";

const Sidebar = () => {
    return (
        <div className='w-1/4 sidebar fixed left-0 top-0 mt-5'>
            {/* Home and Search */}
            <div className="nav bg-pink-100 rounded-lg p-6">
                <div className='flex items-center gap-4 text-black'>
                    <BiSolidHome className='font-bold text-xl' />
                    <span>Home</span>
                </div>
                <div className='mt-4 flex items-center gap-4 text-black'>
                    <FiSearch className='font-bold text-xl' />
                    <span>Search</span>
                </div>
            </div>

            {/* Your Library div */}
            <div className="mt-2 bg-pink-200 rounded-lg px-2 py-2">
                <div className='flex justify-between items-center gap-4 mb-4 px-4 text-black'>
                    <div className="flex gap-4 items-center">
                        <BiLibrary className='font-bold text-xl' />
                        <span>Your library</span>
                    </div>
                    <button className='hover:bg-pink-300 rounded-[50%] p-2'>
                        <FaPlus className='font-bold text-xl' />
                    </button>
                </div>

                {/* Create Playlist */}
                <div className="your_library h-64 overflow-y-scroll">
                    <div className="mt-2 bg-pink-100 rounded-lg py-6 px-4 leading-6">
                        <p className='font-bold text-black'>Create your first playlist</p>
                        <p className='font-semibold text-black'>It's easy, we'll help you</p>
                        <button className="rounded-full px-4 py-1 bg-white text-black mt-4 font-semibold">
                            Create Playlist
                        </button>
                    </div>
                
                    {/* Podcasts section */}
                    <div className="mt-4 bg-pink-100 rounded-lg py-6 px-4 leading-6">
                        <p className='font-bold text-black'>Let's find some podcasts to follow</p>
                        <p className='font-semibold text-black'>We'll keep you updated on new episodes</p>
                        <button className="rounded-full px-4 py-1 bg-white text-black mt-4 font-semibold">
                            Browse Podcasts
                        </button>
                    </div>
                </div>
            </div>

            {/* Legal section */}
            <div className="mt-4 px-4 flex flex-wrap gap-4">
                <a className='text-xs text-black mx-4' href="#">Legal</a>
                <a className='text-xs text-black mx-4' href="#">Privacy Center</a>
                {/* <a className='text-xs text-black mx-4' href="#">Privacy Policy</a>
                <a className='text-xs text-black mx-4' href="#">Cookies</a>
                <a className='text-xs text-black mx-4' href="#">About Ads</a>
                <a className='text-xs text-black mx-4' href="#">Accessibility</a> */}
            </div>
            <button className="mx-4 mt-12 text-black text-sm flex items-center border border-black gap-2 rounded-full py-2 px-4">
                <TbWorld />
                <span className='text-black font-bold'>English</span>
            </button>
            {/* <Signup /> */}
        </div>
    );
}

export default Sidebar;
