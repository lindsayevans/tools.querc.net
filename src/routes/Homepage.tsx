import React from 'react';

export const Homepage = () => {
  const hello = `main( ) {
    printf("hello, world");
}`;

  return (
    <pre
      className="hello"
      contentEditable
      suppressContentEditableWarning={true}
    >
      {hello}
    </pre>
  );
};
