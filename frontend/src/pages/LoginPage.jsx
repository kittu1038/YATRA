import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { MapPin, ArrowRight, ShieldCheck, User } from 'lucide-react';
import Input from '../components/ui/Input.jsx';
import Button from '../components/ui/Button.jsx';
import toast from 'react-hot-toast';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login({ email, password });
      toast.success('Welcome back to YATRA');
      navigate('/');
    } catch (err) {
      toast.error(err.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  const fillDemo = async (role) => {
    const creds = role === 'admin'
      ? { email: 'admin@yatra.dev', password: 'Admin@1234' }
      : { email: 'traveller@yatra.dev', password: 'Traveller@1234' };
    setEmail(creds.email);
    setPassword(creds.password);
    setLoading(true);
    try {
      await login(creds);
      toast.success(role === 'admin' ? 'Logged in as Admin (Full Control)!' : 'Logged in as Traveller!');
      navigate('/');
    } catch (err) {
      toast.error('Login error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F2F4F7] flex items-center justify-center py-12 px-4 sm:px-6">
      <div className="w-full max-w-md space-y-6 bg-white border border-gray-200 rounded-2xl p-8 shadow-xl">
        {/* Header */}
        <div className="text-center space-y-2">
          <Link to="/" className="inline-flex items-center gap-2 mb-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-r from-[#53B2FE] to-[#065AF3] flex items-center justify-center font-black text-sm text-white shadow-sm">
              YT
            </div>
            <span className="font-black text-2xl tracking-wider text-gray-900">
              YATRA
            </span>
          </Link>
          <h2 className="text-2xl font-black text-gray-900">
            Sign In to Your Journey
          </h2>
          <p className="text-xs text-gray-500">
            Access your saved multi-stop itineraries and live expense ledgers
          </p>
        </div>

        {/* Demo Fast Login Pills */}
        <div className="p-3 bg-blue-50/70 border border-blue-100 rounded-xl space-y-2">
          <span className="text-[10px] font-bold uppercase text-[#008CFF] block">
            Demo Credentials (1-Click Fill)
          </span>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => fillDemo('traveller')}
              className="flex-1 py-1.5 px-2 bg-white border border-blue-200 text-xs font-semibold text-gray-700 hover:text-[#008CFF] rounded-lg transition-colors cursor-pointer"
            >
              Traveller Account
            </button>
            <button
              type="button"
              onClick={() => fillDemo('admin')}
              className="flex-1 py-1.5 px-2 bg-white border border-blue-200 text-xs font-semibold text-gray-700 hover:text-[#008CFF] rounded-lg transition-colors cursor-pointer"
            >
              Admin Account
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Email Address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="traveller@yatra.dev"
            required
          />

          <Input
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
          />

          <Button
            type="submit"
            variant="primary"
            size="lg"
            loading={loading}
            className="w-full"
          >
            Sign In to YATRA
          </Button>
        </form>

        <div className="text-center pt-2 border-t border-gray-100">
          <span className="text-xs text-gray-500">
            Don't have an account yet?{' '}
            <Link to="/register" className="text-[#008CFF] font-bold hover:underline">
              Create an Account
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
}
