import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';
import CreatePost from './pages/CreatePost';
import Home from './pages/Home';

function App() {
	return (
		<div className='App'>
			<h1 className='text-center'>CRUD Operation on MySql via React</h1>
			<Router>
				<Header></Header>
				<Switch>
					<Route exact path='/'>
						<Home></Home>
					</Route>
					<Route path='/home'>
						<Home></Home>
					</Route>
					<Route path='/createpost'>
						<CreatePost></CreatePost>
					</Route>
				</Switch>
			</Router>
		</div>
	);
}

export default App;
