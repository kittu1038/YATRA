import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { ArrowRight } from 'lucide-react';
import Input from '../components/ui/Input.jsx';
import Button from '../components/ui/Button.jsx';
import toast from 'react-hot-toast';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }
    setLoading(true);
    try {
      await register({ name, email, password });
      toast.success('Traveller account created successfully');
      navigate('/');
    } catch (err) {
      toast.error(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F2F4F7] flex items-center justify-center py-12 px-4 sm:px-6">
      <div className="w-full max-w-md space-y-6 bg-white border border-gray-200 rounded-2xl p-8 shadow-xl">
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
            Join YATRA Travel
          </h2>
          <p className="text-xs text-gray-500">
            Plan seamless circuits across Rajasthan and the sacred Himalayas
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Full Name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Aarav Sharma"
            required
          />

          <Input
            label="Email Address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="aarav@yatra.dev"
            required
          />

          <Input
            label="Password (min 6 chars)"
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
            Create YATRA Account
          </Button>
        </form>

        <div className="text-center pt-2 border-t border-gray-100">
          <span className="text-xs text-gray-500">
            Already registered?{' '}
            <Link to="/login" className="text-[#008CFF] font-bold hover:underline">
              Sign In Instead
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
}
