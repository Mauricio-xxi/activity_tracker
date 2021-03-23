import './App.css'
import ActivitiesTable from './features/ActivitiesTable/ActivitiesTable'
import { ToastProvider } from 'react-toast-notifications'

function App() {
    return (
        <div className="App">
            <ToastProvider>
                <h1>My 2020 Activities</h1>
                <ActivitiesTable />
            </ToastProvider>
        </div>
    )
}

export default App
