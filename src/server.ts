import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';

const app: Express = express();
app.set( 'view engine', 'pug' );
app.set( 'views', './src/views' );

dotenv.config();
const port = process.env.PORT || 3000;

app.get( '/', ( req: Request, res: Response ) => {
	res.render( 'index' );
} );

app.get( '/click', ( req: Request, res: Response ) => {
	console.log( req.query );
	res.render( 'pane', { count: req.query.count }  );
} );

app.listen( port, () => {
	console.log( `Listening on port ${port}` );
} );

