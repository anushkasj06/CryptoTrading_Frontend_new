import { Button } from '@/components/ui/button';
import { useState } from 'react';
import heroBgVideo from "../Home/vecteezy_glowing-bitcoin-emblem-within-a-digital-network_52140322.mp4";

const LoginWithGoogle = () => {
  const [error, setError] = useState(null);

  const handleGoogleLogin = async () => {
    try {
      const response = await fetch('http://localhost:5454/login/google');
      const data = await response.json();
      // Check if token exists in response
      if (data.token) {
        // Store JWT token in local storage
        // localStorage.setItem('token', data.token);
        // Redirect user to dashboard or any other protected route
        // Example: history.push('/dashboard');
        console.log("Redirect user to dashboard",data)
      } else {
        setError('Authentication failed');
      }
    } catch (error) {
      setError('Error logging in with Google');
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-black via-slate-950 via-slate-900 to-black text-slate-50">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 h-full w-full object-cover opacity-70"
        src={heroBgVideo}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-slate-950/60 to-black/85 pointer-events-none" />
      <div className="relative z-10 flex h-screen justify-center items-center px-4">
        <div className="authCardShell max-w-md w-full">
          <div className="authCard p-8 sm:p-9 flex flex-col items-center space-y-6">
            <h2 className="text-xl font-bold text-slate-50">
              Continue with Google
            </h2>
            <p className="text-sm text-slate-400 text-center">
              Use your Google account to quickly access your CryptoTrading
              workspace.
            </p>
            <Button
              onClick={handleGoogleLogin}
              className="w-full py-4 text-sm font-medium authPrimaryButton border-0"
            >
              Login with Google
            </Button>
            {error && <p className="text-sm text-rose-400 text-center">{error}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginWithGoogle;
