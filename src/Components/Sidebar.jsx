const Sidebar = () => {
    return (
      <aside className="w-64 bg-white text-primary h-screen p-5">
        <h2 className="text-2xl font-bold">Dashboard</h2>
        <nav className="mt-5">
          <ul>
            <li className="p-2 hover:bg-primary/10 rounded">Dashboard</li>
            <li className="p-2 hover:bg-primary/10 rounded">Users</li>
            <li className="p-2 hover:bg-primary/10 rounded">Report</li>
          </ul>
        </nav>
      </aside>
    );
  };
  
  export default Sidebar;
  