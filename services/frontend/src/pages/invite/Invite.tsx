import { StoreContext } from '@app/providers/ContextProvider';
import { useContext } from 'react';
import { Contscts } from '@features/Contacts';
import { Details } from '@features/Details';
import { Form } from '@features/Form';
import { Greeting } from '@features/Greeting';
import { Place } from '@features/Place';
import { Program } from '@features/Program';
import { WelcomeImage } from '@shared/ui';

export const InvitePage = () => {
  const store = useContext(StoreContext);

  if (store?.isViewScreen === true) {
    return (
      <>
        <WelcomeImage />
        <Greeting />
        <Program />
        <Place />
        <Details />
        <Form />
        <Contscts />
      </>
    );
  } else {
    return (
      <>
        <WelcomeImage />
      </>
    );
  }
};
