import { Switch, Route } from 'react-router-dom';

import './App.css';
import Header from './components/header/header.component';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import { auth, createUserProfileDocument } from './firebase/firebase.utils.js';
import React from 'react';

// const HatsPage = () => (
//   <div>
//     <h1>Hats Page </h1>
//   </div>
// )

// function App() {
//   return (
//     <div>
//       <Header />
//       <Switch>
//         <Route exact path='/' component={HomePage} />
//         {/* <Route path='/hats' component={HatsPage} /> */}
//         <Route path='/shop' component={ShopPage} />
//         <Route path='/signin' component={SignInAndSignUpPage} />
//       </Switch>
      
//     </div>
//   );
// }

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      currentUser: null
    }
  }
  unsubscribeFromAuth = null;

  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if(userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot((snapShot) => {
          console.log(snapShot, snapShot.data());
          this.setState({
            currentUser: {
              id: snapShot.id,
              ...snapShot.data()
            }
          }, () => {
            console.log(this.state);
          })
        });
        
      }

      this.setState({ currentUser: userAuth })
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
          <div>
            <Header currentUser={this.state.currentUser} />
            <Switch>
              <Route exact path='/' component={HomePage} />
              <Route path='/shop' component={ShopPage} />
              <Route path='/signin' component={SignInAndSignUpPage} />
            </Switch>
            
          </div>
        );
  }
}

export default App;
