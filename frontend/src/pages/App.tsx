import * as React from "react";

export const App: React.FC = () => {
  return (
    <div style={{ fontFamily: "system-ui", padding: "1rem" }}>
      <h1>DragDropDeploy</h1>
      <p>
        Initial scaffold online. Backend health at /api/health (once compose
        running).
      </p>
    </div>
  );
};

export default App;
