import SignupForm from "./modules/auth/components/signup-form.tsx";
import SignInForm from "./modules/auth/components/signin-form.tsx";
import { UsersList } from "./modules/auth/components/users-list.tsx";

const App = () => {
  return (
    <div>
      <SignupForm />
      <SignInForm />
      <UsersList />
    </div>
  );
};

export default App;
