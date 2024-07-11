import Podcast from "../Models/Podcast.js";
import mongoose from 'mongoose';

//get all Podcasts
export const getPodcasts=async (req,res)=>{
    
    const podcasts= await Podcast.find({}).sort({createdAt:-1});
    res.status(200).json(podcasts)
}

//get single Podcast
export const getPodcast=async (req,res)=>{

    const id=req.params.id;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'Invalid id'})
    }


    const podcast=await Podcast.findById(id);

    if(!podcast){
        return res.status(404).json({error: 'No Podcast exists'})
    }

    res.status(200).json(podcast);
}


//create new Podcast
export const createPodcast=async (req,res)=>{
    const {title,description}=req.body;
    
    let emptyFields=[];
    if(!title){
        emptyFields.push('title');
    }
    if(!description){
        emptyFields.push('desc');
    }

    if(emptyFields.length>0){
        return res.status(400).json({error:'Please fill in all the fields',emptyFields});
    }
    try{
        const podcast= await Podcast.create({title,description})
        res.status(200).json(podcast)
    }catch(error){
        res.status(400).json({error: error.message});
    }
}

//delete a Podcast
export const deletePodcast=async (req,res)=>{
    const id=req.params.id;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'Invalid id'})
    }

    const podcast=await Podcast.findOneAndDelete({_id:id});

    if(!podcast){
        return res.status(404).json({error: 'No Podcast exists'})
    }

    res.status(200).json(podcast);
}

