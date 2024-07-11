import express from 'express'
import {createPodcast,getPodcast,getPodcasts,deletePodcast} from '../controller/PodcastController.js'
import { Router } from "express";

const router=Router()

// GET all Podcasts
router.get('/all',getPodcasts)

// GET a single Podcast
router.get('/:id',getPodcast)

// POST a single Podcast
router.post('/',createPodcast);

// DELETE a Podcast
router.delete('/:id',deletePodcast)


export default router;