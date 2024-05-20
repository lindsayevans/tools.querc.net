import React from 'react';

export const Homepage = () => {
  const hello = `main( ) {
    printf("hello, world");
}`;

  return (
    <pre
      className="hello"
      contentEditable
      spellCheck={false}
      suppressContentEditableWarning={true}
    >
      {hello}
    </pre>
  );
};
