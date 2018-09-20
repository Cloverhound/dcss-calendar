import * as React from 'react';

interface IProps {
    compiler: string,
    framework: string,
    bundler: string
}

export class Hello extends React.Component<IProps, {}> {
    render() {
        return <h1>Harry Otter</h1>
    }
}