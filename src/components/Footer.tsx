export default function Footer() {
  return (
    <footer className="bg-primary text-white py-2">
      <div className="container-custom">
        <div className="text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} Powered by Retirement</p>
        </div>
      </div>
    </footer>
  );
}
