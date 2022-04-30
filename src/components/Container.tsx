import React, { FunctionComponent } from 'react';

interface ContainerProps {
    children: React.ReactNode;
}

const Container: FunctionComponent<ContainerProps> = ({ children }) => {
    return <section className="page"></section>;
};

export default Container;
