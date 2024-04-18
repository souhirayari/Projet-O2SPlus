import Alert from 'react-bootstrap/Alert';

function Unauthorized() {
    return (
      <Alert variant="danger" dismissible>
        <Alert.Heading>Vous n'est pas autoriser </Alert.Heading>
        <p>
          Change this and that and try again. Duis mollis, est non commodo
          luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit.
          Cras mattis consectetur purus sit amet fermentum.
        </p>
        
      </Alert>
    );
  }


export default Unauthorized;