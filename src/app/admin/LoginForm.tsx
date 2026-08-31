'use client';

import { useState } from 'react';
import { loginAction } from './actions';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { adminInputClass, adminPanelClass } from './admin-ui';

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
      className={`w-full max-w-sm flex flex-col gap-4 p-5 sm:p-6 ${adminPanelClass}`}
    >
      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-muted-foreground mb-2"
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
          className={adminInputClass}
          placeholder="Enter admin password"
          autoComplete="current-password"
        />
      </div>

      {error && (
        <p className="text-sm text-red-400 bg-red-400/10 border border-red-400/20 rounded-lg px-3 py-2">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="btn-brand w-full justify-center !py-2.5 disabled:opacity-50"
      >
        {isPending ? <Loader2 className="animate-spin mr-2" size={18} /> : null}
        {isPending ? 'Authenticating...' : 'Login'}
      </button>
    </form>
  );
}
