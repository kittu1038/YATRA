import { Link } from 'react-router-dom';
import { Compass, ArrowLeft } from 'lucide-react';
import Button from '../components/ui/Button.jsx';

export default function NotFoundPage() {
  return (
    <div className="min-h-[70vh] bg-[#F2F4F7] flex flex-col items-center justify-center p-6 text-center">
      <div className="w-16 h-16 rounded-2xl bg-white border border-gray-200 shadow-md flex items-center justify-center mb-6 text-[#008CFF]">
        <Compass size={32} />
      </div>
      <span className="font-mono text-xs uppercase tracking-wider text-[#008CFF] font-bold mb-2">
        ERROR 404 // UNMAPPED REGION
      </span>
      <h1 className="text-3xl sm:text-5xl font-black text-gray-900 mb-3">
        Waypoint Not Found
      </h1>
      <p className="text-sm text-gray-500 max-w-md mb-8">
        This route or destination does not exist on our map coordinates. Return to the homepage to explore Indian destinations.
      </p>
      <Link
        to="/"
        className="px-6 py-3 rounded-full bg-gradient-to-r from-[#53B2FE] to-[#065AF3] text-white text-xs font-bold uppercase tracking-wider shadow-md hover:shadow-lg transition-all flex items-center gap-2"
      >
        <ArrowLeft size={16} />
        <span>Return to Home</span>
      </Link>
    </div>
  );
}
