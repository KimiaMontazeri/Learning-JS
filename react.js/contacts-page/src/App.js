import './App.css';
import Card from './components/Card'
import contacts from './contacts.js'


function createCard(contact) {
  return <Card
    name= {contact.name}
    imgURL= {contact.imgURL}
    phone= {contact.phone}
    email= {contact.email}
  />
}

function App() {
  return (
    <div>
      <h1 className='heading'>My Contacts</h1>
      {contacts.map(createCard)}
    </div>
  );
}

export default App;
