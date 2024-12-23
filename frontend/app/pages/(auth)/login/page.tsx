'use client';
import { useForm } from 'react-hook-form';
import authApiStore from '@/api/zustand/authApi';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginInput, loginSchema } from '@/validations/authValidation';

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

  const onSubmit = async (data: LoginInput) => {
    try {
      await login(data);
    } catch (error) {
      setError('root', { message: 'Identifiants invalides' });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <input
          {...register('email')}
          type="email"
          placeholder="Email"
          className="input"
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
      </div>

      <div>
        <input
          {...register('password')}
          type="password"
          placeholder="Mot de passe"
          className="input"
        />
        {errors.password && (
          <p className="text-red-500">{errors.password.message}</p>
        )}
      </div>

      <button type="submit" disabled={loading} className="btn-primary w-full">
        {loading ? 'Connexion...' : 'Se connecter'}
      </button>
    </form>
  );
};
export default LoginPage;
