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
	const page = pug.compileFile( './src/views/layout.pug', { doctype: 'html' } );
	const result = page( options );

	return result;
}

const renderPartial = ( options: object ): string => {
	const partial = pug.compileFile( './src/views/partials/pane.pug', { doctype: 'html' } );
	const result = partial( options );

	return result;
}

app.get( '/:slug', ( req: Request, res: Response ) => {
	let rendered;
	const count = Number( req.query.count ) || 1;
	const slug = req.params.slug;

	if ( count === 1 ) {
		rendered = renderPage( {
			count: count,
			slug: slug
		} );
	} else {
		rendered = renderPartial( {
			count: count,
			slug: 'Joey'
		} );

		console.log( rendered );
	}

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
