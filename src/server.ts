import express, { Express, Request, Response } from 'express';
import pug from 'pug';
import url from 'node:url';
import dotenv from 'dotenv';

const app: Express = express();
app.set( 'view engine', 'pug' );
app.set( 'views', './src/views' );

dotenv.config();
const port = process.env.PORT || 3000;

app.get( '/:slug', ( req: Request, res: Response ) => {
	res.render( 'pane', { slug: req.params.slug, count: req.query.count }  );
} );

app.get( '/', ( req: Request, res: Response ) => {
	res.render( 'index' );
	console.log( url.format( {
		protocol: req.protocol,
		host: req.get( 'host' ),
		pathname: req.originalUrl
	} ) );
} );

app.listen( port, () => {
	console.log( `Listening on port ${port}` );
} );

