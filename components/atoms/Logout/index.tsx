import React from 'react';
import { Button } from '@ui-kitten/components';
import { Auth } from 'aws-amplify';

const Logout = () => (
  <Button
    status="warning"
    size="small"
    onPress={() => Auth.signOut()}
    style={{ marginRight: 16 }}
  >
    Logout
  </Button>
);

export default Logout;
