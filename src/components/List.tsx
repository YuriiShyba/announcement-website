import React from 'react';

interface ListProps<T> {
    items: T[];
    renderItem: (item: T) => React.ReactNode;
}

export default function List<T>({ items, renderItem }: ListProps<T>) {
    return <React.Fragment>{items.map(renderItem)}</React.Fragment>;
}
