/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable  @typescript-eslint/no-explicit-any */
'use client';
import { useForm } from 'react-hook-form';
import authApiStore from '@/api/zustand/authApi';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginInput, loginSchema } from '@/validations/authValidation';
import Link from 'next/link';
import { FcGoogle } from 'react-icons/fc';
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';

const LoginPage = () => {
  const { login, loading } = authApiStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });
  const router = useRouter();

  const onSubmit = async (data: LoginInput) => {
    try {
      await login(data);
      toast.success('Connexion réussie');
      router.push('/');
    } catch (error) {
      toast.error('Identifiants invalides');
      console.error('inscription echouee');
      setError('root', { message: 'Identifiants invalides' });
    }
  };

  const handleGoogleLogin = () => {
    // Implémenter la connexion Google ici
  };

  return (
    <div className="min-h-screen flex">
      <Toaster position="top-right" />
      <div className="max-w-md mx-auto p-6 space-y-6 w-1/2 flex items-center justify-center flex-col ">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-semibold">Welcome</h1>
          <p className="text-gray-500">
            Get started for a seamless shopping experience
          </p>
        </div>

        <div className="space-y-4">
          <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-2 border rounded-lg py-2.5 hover:bg-gray-50 transition-colors"
          >
            <FcGoogle size={20} />
            <span>Continue with Google</span>
          </button>

          <div className="flex items-center gap-2">
            <div className="h-px bg-gray-200 flex-1"></div>
            <span className="text-gray-500 text-sm">OR</span>
            <div className="h-px bg-gray-200 flex-1"></div>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <input
              {...register('email')}
              type="email"
              placeholder="Email"
              className="w-full px-4 py-2.5 rounded-lg border focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-colors"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <input
              {...register('password')}
              type="password"
              placeholder="Password"
              className="w-full px-4 py-2.5 rounded-lg border focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-colors"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="text-right">
            <Link
              href="/forgot-password"
              className="text-pink-500 hover:text-pink-600 text-sm"
            >
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-pink-500 text-white py-2.5 rounded-lg hover:bg-pink-600 transition-colors disabled:opacity-50"
          >
            {loading ? 'Connecting...' : 'Login'}
          </button>

          <p className="text-center text-gray-600 text-sm">
            Don’t have an account?{' '}
            <Link
              href="/pages/register"
              className="text-pink-500 hover:text-pink-600"
            >
              Register
            </Link>
          </p>
        </form>
      </div>
      <div className="w-1/2 flex items-center justify-center bg-black">
        <h1 className="text-6xl font-bold text-white">Zayma</h1>
      </div>
    </div>
  );
};

export default LoginPage;
