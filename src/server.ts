import express, { Express, Request, Response } from 'express';
import pug from 'pug';
import url from 'node:url';
import fs from 'node:fs';
import dotenv from 'dotenv';

const app: Express = express();
app.set( 'view engine', 'pug' );

dotenv.config();
const port = process.env.PORT || 3000;

const renderPage = ( options: object ): string => {
	const page = pug.compileFile( './src/views/templates/content.pug' );
	const result = page( options );

	return result;
}

app.get( '/:slug', ( req: Request, res: Response ) => {
	const count = Number( req.query.count ) || 1;
	const slug = req.params.slug;

	const rendered = renderPage( {
		count: count,
		slug: slug
	} );

	res.send( rendered );
} );

app.get( '/', ( req: Request, res: Response ) => {
	const rendered = renderPage( {
		count: 1,
		slug: 'none'
	} );

	res.send( rendered );
} );

app.listen( port, () => {
	console.log( `Listening on port ${port}` );
} );
