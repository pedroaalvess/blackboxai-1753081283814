import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';

const Settings = () => {
  const { user, updateUser, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // Profile form state
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || ''
  });

  // Password form state
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // Theme state
  const [selectedTheme, setSelectedTheme] = useState(user?.theme || 'dark');

  const handleProfileChange = (e) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value
    });
    setMessage('');
    setError('');
  };

  const handlePasswordChange = (e) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value
    });
    setMessage('');
    setError('');
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');

    try {
      const response = await axios.put('/api/user/profile', profileData);
      updateUser(response.data.user);
      setMessage('Perfil atualizado com sucesso!');
    } catch (error) {
      setError(error.response?.data?.message || 'Erro ao atualizar perfil');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setError('As senhas não coincidem');
      setLoading(false);
      return;
    }

    if (passwordData.newPassword.length < 6) {
      setError('A nova senha deve ter pelo menos 6 caracteres');
      setLoading(false);
      return;
    }

    try {
      await axios.put('/api/user/password', {
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword
      });
      setMessage('Senha alterada com sucesso!');
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    } catch (error) {
      setError(error.response?.data?.message || 'Erro ao alterar senha');
    } finally {
      setLoading(false);
    }
  };

  const handleThemeChange = async (theme) => {
    setSelectedTheme(theme);
    setLoading(true);
    setMessage('');
    setError('');

    try {
      await axios.put('/api/user/theme', { theme });
      updateUser({ theme });
      setMessage('Tema atualizado com sucesso!');
      
      // Apply theme to document
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else if (theme === 'light') {
        document.documentElement.classList.remove('dark');
      } else {
        // System theme
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (prefersDark) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Erro ao atualizar tema');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    if (confirm('Tem certeza que deseja sair da sua conta?')) {
      logout();
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-white mb-4">Configurações</h1>
        <p className="text-gray-400">
          Gerencie suas configurações de perfil e conta
        </p>
      </div>

      {/* Tabs */}
      <div className="bg-gray-900 rounded-lg border border-gray-800">
        <div className="flex border-b border-gray-800">
          <button
            onClick={() => setActiveTab('profile')}
            className={`px-6 py-4 font-semibold transition-colors duration-200 ${
              activeTab === 'profile'
                ? 'text-primary-400 border-b-2 border-primary-400'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            👤 Perfil
          </button>
          <button
            onClick={() => setActiveTab('security')}
            className={`px-6 py-4 font-semibold transition-colors duration-200 ${
              activeTab === 'security'
                ? 'text-primary-400 border-b-2 border-primary-400'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            🔒 Segurança
          </button>
          <button
            onClick={() => setActiveTab('appearance')}
            className={`px-6 py-4 font-semibold transition-colors duration-200 ${
              activeTab === 'appearance'
                ? 'text-primary-400 border-b-2 border-primary-400'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            🎨 Aparência
          </button>
        </div>

        <div className="p-8">
          {/* Messages */}
          {message && (
            <div className="bg-green-900 border border-green-700 text-green-300 px-4 py-3 rounded-lg mb-6">
              ✅ {message}
            </div>
          )}

          {error && (
            <div className="bg-red-900 border border-red-700 text-red-300 px-4 py-3 rounded-lg mb-6">
              ❌ {error}
            </div>
          )}

          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div>
              <h2 className="text-xl font-bold text-white mb-6">
                Informações do Perfil
              </h2>
              
              <form onSubmit={handleProfileSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Nome Completo
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={profileData.name}
                    onChange={handleProfileChange}
                    className="input-field"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    E-mail
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={profileData.email}
                    onChange={handleProfileChange}
                    className="input-field"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Telefone
                  </label>
                  <input
                    type="tel"
                    value={user?.phone || ''}
                    className="input-field opacity-50"
                    disabled
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    O telefone não pode ser alterado por questões de segurança
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Código de Indicação
                  </label>
                  <input
                    type="text"
                    value={user?.referralCode || ''}
                    className="input-field opacity-50"
                    disabled
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Use este código para indicar amigos
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary disabled:opacity-50"
                >
                  {loading ? 'Salvando...' : 'Salvar Alterações'}
                </button>
              </form>
            </div>
          )}

          {/* Security Tab */}
          {activeTab === 'security' && (
            <div>
              <h2 className="text-xl font-bold text-white mb-6">
                Segurança da Conta
              </h2>
              
              <form onSubmit={handlePasswordSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Senha Atual
                  </label>
                  <input
                    type="password"
                    name="currentPassword"
                    value={passwordData.currentPassword}
                    onChange={handlePasswordChange}
                    className="input-field"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Nova Senha
                  </label>
                  <input
                    type="password"
                    name="newPassword"
                    value={passwordData.newPassword}
                    onChange={handlePasswordChange}
                    className="input-field"
                    minLength={6}
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Mínimo de 6 caracteres
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Confirmar Nova Senha
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={passwordData.confirmPassword}
                    onChange={handlePasswordChange}
                    className="input-field"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary disabled:opacity-50"
                >
                  {loading ? 'Alterando...' : 'Alterar Senha'}
                </button>
              </form>

              {/* Account Info */}
              <div className="mt-8 pt-8 border-t border-gray-800">
                <h3 className="text-lg font-semibold text-white mb-4">
                  Informações da Conta
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Membro desde:</span>
                    <span className="text-white">
                      {user?.createdAt ? new Date(user.createdAt).toLocaleDateString('pt-BR') : 'N/A'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Último login:</span>
                    <span className="text-white">
                      {user?.lastLogin ? new Date(user.lastLogin).toLocaleDateString('pt-BR') : 'N/A'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Status da conta:</span>
                    <span className="text-green-400">✅ Ativa</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Appearance Tab */}
          {activeTab === 'appearance' && (
            <div>
              <h2 className="text-xl font-bold text-white mb-6">
                Configurações de Aparência
              </h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">
                    Escolha seu tema
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <button
                      onClick={() => handleThemeChange('light')}
                      className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                        selectedTheme === 'light'
                          ? 'border-primary-500 bg-primary-500 bg-opacity-20'
                          : 'border-gray-700 bg-gray-800 hover:border-gray-600'
                      }`}
                    >
                      <div className="text-center">
                        <div className="text-2xl mb-2">☀️</div>
                        <h4 className="text-white font-semibold">Claro</h4>
                        <p className="text-gray-400 text-sm">Tema claro</p>
                      </div>
                    </button>

                    <button
                      onClick={() => handleThemeChange('dark')}
                      className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                        selectedTheme === 'dark'
                          ? 'border-primary-500 bg-primary-500 bg-opacity-20'
                          : 'border-gray-700 bg-gray-800 hover:border-gray-600'
                      }`}
                    >
                      <div className="text-center">
                        <div className="text-2xl mb-2">🌙</div>
                        <h4 className="text-white font-semibold">Escuro</h4>
                        <p className="text-gray-400 text-sm">Tema escuro</p>
                      </div>
                    </button>

                    <button
                      onClick={() => handleThemeChange('system')}
                      className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                        selectedTheme === 'system'
                          ? 'border-primary-500 bg-primary-500 bg-opacity-20'
                          : 'border-gray-700 bg-gray-800 hover:border-gray-600'
                      }`}
                    >
                      <div className="text-center">
                        <div className="text-2xl mb-2">💻</div>
                        <h4 className="text-white font-semibold">Sistema</h4>
                        <p className="text-gray-400 text-sm">Seguir sistema</p>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Danger Zone */}
      <div className="mt-8 bg-red-900 bg-opacity-20 border border-red-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-red-400 mb-4">
          ⚠️ Zona de Perigo
        </h3>
        <p className="text-gray-400 mb-4">
          Ações irreversíveis que afetam sua conta
        </p>
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors duration-200"
        >
          🚪 Sair da Conta
        </button>
      </div>
    </div>
  );
};

export default Settings;
