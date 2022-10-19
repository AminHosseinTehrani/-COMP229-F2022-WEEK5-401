import movieModel from '../models/movies.js';
import { UserDisplayName } from "../utils/index.js";


export function DisplayMoviesList(req, res, next){
    movieModel.find(function(err, moviesCollection) {
        if(err){
            console.error(err);
            res.end(err);
        }

        res.render('index', {title: 'Business Contacts', page: 'movies/list', movies: moviesCollection, displayName: UserDisplayName(req)});
    })
}

export function DisplayMoviesAddPage(req, res, next){
    res.render('index', { title: 'Add Contact', page: 'movies/edit', contact: {} , displayName: UserDisplayName(req)});
}

export function ProcessMoviesAddPage(req, res, next){
    
    let newMovie = movieModel({
        name: req.body.name,
        number: req.body.number,
        email: req.body.email
    });

    movieModel.create(newMovie, (err, Movie) => {
        if(err){
            console.error(err);
            res.end(err);
        };

        res.redirect('/movie-list')
    } )
}

export function DisplayMoviesEditPage(req, res, next){
    let id = req.params.id;

    movieModel.findById(id, (err, contact) => {
        if(err){
            console.error(err);
            res.end(err);
        }

        res.render('index', { title: 'Edit Contact', page: 'movies/edit', contact: contact, displayName: UserDisplayName(req) });
    });    
}

export function ProcessMoviesEditPage(req, res, next){

    let id = req.params.id;
    
    let newMovie = movieModel({
        _id: req.body.id,
        name: req.body.name,
        number: req.body.number,
        email: req.body.email
    });

    movieModel.updateOne({_id: id }, newMovie, (err, Movie) => {
        if(err){
            console.error(err);
            res.end(err);
        };

        res.redirect('/movie-list')
    } )
}

export function ProcessMoviesDelete(req, res, next){
    let id = req.params.id;

    movieModel.remove({_id: id}, (err) => {
        if (err){
            console.error(err);
            res.end(err);
        }

        res.redirect('/movie-list');
    })
}

