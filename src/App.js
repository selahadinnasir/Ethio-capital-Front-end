import React from "react";
import { Toaster } from "react-hot-toast";
import AppRouter from "./AppRouter";

const App = () => {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <AppRouter />
    </>
  );
  {
    /* <InvestorDashboard/> */
  }
};

export default App;

// import React from "react";
// import InvestorDashboard from "./enterpreners/InvestorDashboard";
// import StartupDetail from "./enterpreners/StartupDetail";

// const App = () => {
// //   return <InvestorDashboard />;
// return <StartupDetail/>
// };

// export default App;
