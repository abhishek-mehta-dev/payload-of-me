'use client';

import { useState } from 'react';
import { loginAction } from './actions';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function LoginForm() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsPending(true);
    setError(null);

    try {
      const result = await loginAction(password);
      if (result?.error) {
        setError(result.error);
      } else {
        router.refresh();
      }
    } catch {
      setError('An unexpected error occurred.');
    } finally {
      setIsPending(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-sm flex flex-col gap-4 p-6 border border-neutral-800 rounded-2xl bg-neutral-900/50"
    >
      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-neutral-400 mb-2"
        >
          Password
        </label>
        <input
          id="password"
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full px-4 py-2 bg-neutral-950 border border-neutral-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-700 text-neutral-100"
          placeholder="Enter admin password"
        />
      </div>

      {error && <p className="text-red-400 text-sm">{error}</p>}

      <button
        type="submit"
        disabled={isPending}
        className="w-full flex justify-center items-center py-2 px-4 bg-neutral-100 text-neutral-900 rounded-lg font-medium hover:bg-neutral-200 transition disabled:opacity-50"
      >
        {isPending ? <Loader2 className="animate-spin mr-2" size={18} /> : null}
        {isPending ? 'Authenticating...' : 'Login'}
      </button>
    </form>
  );
}
