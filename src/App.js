import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Budget from './component/Budget';
import Remaining from './component/Remaining';
import ExpenseTotal from './component/ExpenseTotal';
import ExpenseList from './component/ExpenseList';
import AddExpenseForm from './component/AddExpenseForm';
import { AppProvider } from './context/AppContext';

const App = () => {
    return (
        <AppProvider>
        <div className='container'>
            <h1 className='mt-3'> My Budget Planner </h1>
                <div className='row mt-3'>
                    <div className='col-sm'>
                         <Budget/>
                     </div>  
                     <div className='col-sm'>
                         <Remaining />
                     </div>
                     <div className='col-sm'>
                         <ExpenseTotal />
                     </div>
                 </div> 
                 <h3 className='mt-3'>Expenses</h3>
                 <div className='row mt-3'>
                     <div className='col-sm'>
                        <ExpenseList />
                     </div>
                 </div>
                 <h3 className='mt-3'>Add Expense</h3>
                 <div className='mt-3'>
                     <div className='col-sm'>
                         <AddExpenseForm />
                     </div>
                 </div>
        </div>

        </AppProvider>

    );
};

export default App;


// column helping with responsing layout = div className='row mt-m-3'> 
  //responsive laypout = div className='col-sm