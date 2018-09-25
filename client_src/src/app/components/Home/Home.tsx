import * as React from 'react';

interface IProps {
  compiler: string,
  framework: string,
  bundler: string
}

export class Home extends React.Component<IProps, {}> {
  render() {
    return (
      <div>HOME</div>
    )
  }
}