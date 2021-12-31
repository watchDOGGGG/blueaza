
import './App.css';
import './mobileview.css'
import Layout from './pages/layout';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import { QueryClient,QueryClientProvider } from 'react-query';
// import {ReactQueryDevtools} from 'react-query-devtools';

const queryClient = new QueryClient()
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Layout/>
      {/* <ReactQueryDevtools initialIsOpen={false}/> */}
    </QueryClientProvider>
  );
}

export default App;
