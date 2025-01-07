/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable  @typescript-eslint/no-explicit-any */
'use client';
import { useForm } from 'react-hook-form';
import authApiStore from '@/api/zustand/authApi';
import { zodResolver } from '@hookform/resolvers/zod';
import { RegisterInput, registerSchema } from '@/validations/authValidation';
import Link from 'next/link';
import { Input } from '@headlessui/react';
import { FcGoogle } from 'react-icons/fc';
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';

const RegisterPage = () => {
  const { register: registerUser, loading } = authApiStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  });
  const router = useRouter();

  const onSubmit = async (data: RegisterInput) => {
    try {
      await registerUser(data);
      router.push('/');
      toast.success('Inscription reussie');
    } catch (error) {
      toast.error('Inscription echouee');
      console.error('inscription echouee');
      setError('root', { message: "Échec de l'inscription" });
    }
  };

  const handleGoogleRegister = () => {
    // Implémenter la connexion/inscription Google ici
  };

  return (
    <div className="min-h-screen flex">
      {/* Partie gauche - Formulaire d'inscription */}
      <Toaster position="top-right" />
      <div className="w-1/2 flex items-center justify-center p-6">
        <div className="max-w-md w-full space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-semibold">Create Account</h1>
            <p className="text-gray-500">
              Start your shopping journey with Zayma
            </p>
          </div>

          <div className="space-y-4">
            <button
              onClick={handleGoogleRegister}
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
              <Input
                {...register('firstName')}
                type="text"
                placeholder="type your first name"
                className="w-full px-4 py-2.5 rounded-lg border focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-colors"
              />
              {errors.firstName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.firstName.message}
                </p>
              )}
            </div>

            <div>
              <Input
                {...register('lastName')}
                type="text"
                placeholder="type your last name"
                className="w-full px-4 py-2.5 rounded-lg border focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-colors"
              />
              {errors.lastName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.lastName.message}
                </p>
              )}
            </div>

            <div>
              <Input
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
              <Input
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

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-pink-500 text-white py-2.5 rounded-lg hover:bg-pink-600 transition-colors disabled:opacity-50"
            >
              {loading ? 'Creating Account...' : 'Register'}
            </button>

            <p className="text-center text-gray-600 text-sm">
              Already have an account?{' '}
              <Link href="/login" className="text-pink-500 hover:text-pink-600">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>

      {/* Partie droite - Illustration */}
      <div className="w-1/2 flex items-center justify-center bg-black">
        <h1 className="text-6xl font-bold text-white">Zayma</h1>
      </div>
    </div>
  );
};

export default RegisterPage;
