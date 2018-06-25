var mongoose = require('mongoose');
var movieSchema = require('./movie.schema.server');
var movieModel = mongoose.model('MovieModel', movieSchema);

function createMovie(movie) {
    movie.likes = 0;
    movie.reviews = 0;
    movie.poster_path = 'https://image.tmdb.org/t/p/w500/' + movie.poster_path;
    return movieModel.create(movie);
}

function findMovieByApiId(movieId) {
    return movieModel.findOne({id: movieId});
}

function findAllMovies(){
    return movieModel.find();
}

function findMoviesLikedByUser(userId) {
    return movieModel.find({userId: userId});
}

function incrementMovieLikes(movieId) {
    return movieModel.update({_id: movieId}, {
        $inc: {likes: 1}
    });
}

function decrementMovieLikes(movieId) {
    return movieModel.update({_id: movieId}, {
        $inc: {likes: -1}
    });
}


function incrementMovieReviews(movieId) {
    return  movieModel.update({_id: movieId}, {
        $inc: {reviews: 1}
    });
}

function decrementMovieReviews(movieId) {
    return  movieModel.update({_id: movieId}, {
        $inc: {reviews: -1}
    });
}


function deleteMovie(id) {
    return movieModel.remove({_id: id});
}

function updateMovie(movieId, movie) {
    // if (user.img_path === '' || user.img_path === undefined) {
    //     user.img_path = "https://i1.wp.com/www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png?fit=256%2C256&quality=100"
    // }
    // if (user.role === ''|| user.role === undefined ) {
    //     user.role = 'user';
    // }
    return movieModel.update({_id: movieId}, {
        $set: {
            title: movie.title,
            poster_path: movie.poster_path,
            overview: movie.overview,
        },
    })
}





module.exports = {
    createMovie: createMovie,
    findAllMovies: findAllMovies,
    findMoviesLikedByUser: findMoviesLikedByUser,
    incrementMovieLikes: incrementMovieLikes,
    decrementMovieLikes: decrementMovieLikes,
    findMovieByApiId: findMovieByApiId,
    incrementMovieReviews: incrementMovieReviews,
    decrementMovieReviews: decrementMovieReviews,
    deleteMovie: deleteMovie,
    updateMovie: updateMovie
};