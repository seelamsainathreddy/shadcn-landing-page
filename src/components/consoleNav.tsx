

interface NavbarProps {
  children?: React.ReactNode;
}

export function ConsoleNavbar({ children }: NavbarProps) {
  return (
    <nav className="flex items-center justify-between p-4 bg-white border-b">
      <div className="flex items-center">
        {children}
        <h1 className="text-xl font-bold ml-4">Nutritional AI</h1>
      </div>
      <div className="flex items-center space-x-4">
        {/* Add any additional navbar items here */}
      </div>
    </nav>
  )
}

