import * as React from 'react';
import EnhancedTable from '../Table/EnhancedTable/EnhancedTable';

interface AppProps {
  selected?: any
}

class Queues extends React.Component<AppProps> {
  render() {
    return (
      <div>
        <EnhancedTable />
      </div>
    )
  }
}

export default Queues