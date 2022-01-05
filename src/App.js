import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Budget from "./component/Budget";
import Remaining from "./component/Remaining";
import ExpenseTotal from "./component/ExpenseTotal";
import ExpenseList from "./component/ExpenseList";
import AddExpenseForm from "./component/AddExpenseForm";
import { AppProvider } from "./context/AppContext";
import { auth } from "./firebase";
// import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { signInWithEmailAndPassword, signOut, onAuthStateChanged, createUserWithEmailAndPassword } from "firebase/auth";

function App() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState([]);
    const [isSignUp, setIsSignUp] = useState(false);

    useEffect(() => {
        auth.onAuthStateChanged(user => {
            setUser(user);
        })
    })



    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const signIn = async() => {
        await signInWithEmailAndPassword(auth, email, password)
        .then(() =>{
            setEmail("");
            setPassword("");
        })
        .catch((error) => { 
            alert(error.message);
        });
    }

    const register = async() => {
        await createUserWithEmailAndPassword(auth, email, password).catch((error) =>
         console.log(error.message)
            );
            setPassword("");
            setEmail("");
    };

    const logout = () => {
        signOut(auth).catch((error) => {
          console.log(error);
        });
      };

    return (
        <div className="App">
            {auth.currentUser ? (
            <div>
                <h1>{auth.currentUser.email} is signed in</h1>
                <button onClick={logout}>sign out</button>
            </div> 
            ) : (
                <>
             {isSignUp ? (
            <>
             <h1>registering</h1> 
            <input type="email" value={email} onChange={handleEmailChange} />
            <input 
             type="password" 
             value={password} 
             onChange={handlePasswordChange} 
             />
            <button onClick={register}>Sign up</button>
            <button onClick={() => setIsSignUp(false)}>X</button>
            </> 
            ) : (
                <>
                <h1>loggin in </h1>
            <input type="email" value={email} onChange={handleEmailChange} />
            <input 
             type="password" 
             value={password} 
             onChange={handlePasswordChange} 
             />
            <button onClick={signIn}>login</button>
            <button onClick={() => setIsSignUp(true)}>register</button>
            </>
            )}
            </>   
            )}
            </div>
    );
}
export default App;

/* const App = () => {
  const register = async () => {
    await createUserWithEmailAndPassword(auth, "email4@email.com", "password")
      .then(() => {
        console.log("Successfully created user");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  useEffect(() => {
    register();
  }, []);

  return (
    <AppProvider>
      <div className="container">
        <h1 className="mt-3"> My Budget Planner </h1>
        <div className="row mt-3">
          <div className="col-sm">
            <Budget />
          </div>
          <div className="col-sm">
            <Remaining />
          </div>
          <div className="col-sm">
            <ExpenseTotal />
          </div>
        </div>
        <h3 className="mt-3">Expenses</h3>
        <div className="row mt-3">
          <div className="col-sm">
            <ExpenseList />
          </div>
        </div>
        <h3 className="mt-3">Add Expense</h3>
        <div className="mt-3">
          <div className="col-sm">
            <AddExpenseForm />
          </div>
        </div>
      </div>
    </AppProvider>
  );
};

export default App;

// column helping with responsing layout = div className='row mt-m-3'>
//responsive laypout = div className='col-sm */