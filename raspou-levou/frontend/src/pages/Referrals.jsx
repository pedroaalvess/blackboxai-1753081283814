import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';

const Referrals = () => {
  const { user } = useAuth();
  const [referralData, setReferralData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copySuccess, setCopySuccess] = useState(false);

  useEffect(() => {
    fetchReferralData();
  }, []);

  const fetchReferralData = async () => {
    try {
      const response = await axios.get('/api/referrals');
      setReferralData(response.data.referralStats);
    } catch (error) {
      console.error('Erro ao buscar dados de indicação:', error);
    } finally {
      setLoading(false);
    }
  };

  const copyReferralLink = () => {
    if (referralData?.referralLink) {
      navigator.clipboard.writeText(referralData.referralLink);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 3000);
    }
  };

  const copyReferralCode = () => {
    if (referralData?.referralCode) {
      navigator.clipboard.writeText(referralData.referralCode);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 3000);
    }
  };

  const shareWhatsApp = () => {
    const message = `🎯 Venha jogar raspadinhas online comigo no Raspou, Levou! 

🎲 Ganhe prêmios incríveis de até R$ 25.000
💰 PIX na conta instantâneo
🎁 Use meu código de indicação: ${referralData?.referralCode}

Cadastre-se aqui: ${referralData?.referralLink}`;
    
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const shareTelegram = () => {
    const message = `🎯 Venha jogar raspadinhas online comigo no Raspou, Levou! 

🎲 Ganhe prêmios incríveis de até R$ 25.000
💰 PIX na conta instantâneo
🎁 Use meu código: ${referralData?.referralCode}

${referralData?.referralLink}`;
    
    const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(referralData?.referralLink)}&text=${encodeURIComponent(message)}`;
    window.open(telegramUrl, '_blank');
  };

  const formatCurrency = (value) => {
    return `R$ ${value.toFixed(2).replace('.', ',')}`;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="spinner w-8 h-8"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-white mb-4">Indique e Ganhe</h1>
        <p className="text-gray-400">
          Convide amigos e ganhe bônus por cada indicação ativa
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-br from-primary-600 to-primary-700 rounded-lg p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Total de Ganhos</h3>
            <span className="text-2xl">💰</span>
          </div>
          <p className="text-3xl font-bold">
            {formatCurrency(referralData?.totalEarnings || 0)}
          </p>
          <p className="text-primary-200 text-sm mt-2">
            Ganhos com indicações
          </p>
        </div>

        <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Amigos Indicados</h3>
            <span className="text-2xl">👥</span>
          </div>
          <p className="text-3xl font-bold text-white">
            {referralData?.totalReferred || 0}
          </p>
          <p className="text-gray-400 text-sm mt-2">
            Total de indicações
          </p>
        </div>

        <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Amigos Ativos</h3>
            <span className="text-2xl">⭐</span>
          </div>
          <p className="text-3xl font-bold text-green-400">
            {referralData?.activeReferred || 0}
          </p>
          <p className="text-gray-400 text-sm mt-2">
            Que fizeram depósito
          </p>
        </div>
      </div>

      {/* Referral Link Section */}
      <div className="bg-gray-900 rounded-lg p-8 border border-gray-800 mb-8">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          Seu Link de Indicação
        </h2>
        
        {/* Referral Code */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Seu Código de Indicação:
          </label>
          <div className="flex items-center bg-gray-800 rounded-lg p-4">
            <input
              type="text"
              value={referralData?.referralCode || ''}
              readOnly
              className="flex-1 bg-transparent text-white text-lg font-mono"
            />
            <button
              onClick={copyReferralCode}
              className="ml-4 bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors duration-200"
            >
              📋 Copiar Código
            </button>
          </div>
        </div>

        {/* Referral Link */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Seu Link de Indicação:
          </label>
          <div className="flex items-center bg-gray-800 rounded-lg p-4">
            <input
              type="text"
              value={referralData?.referralLink || ''}
              readOnly
              className="flex-1 bg-transparent text-white text-sm"
            />
            <button
              onClick={copyReferralLink}
              className="ml-4 bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors duration-200"
            >
              📋 Copiar Link
            </button>
          </div>
        </div>

        {copySuccess && (
          <div className="bg-green-900 border border-green-700 text-green-300 px-4 py-3 rounded-lg mb-6">
            ✅ Copiado com sucesso!
          </div>
        )}

        {/* Share Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            onClick={shareWhatsApp}
            className="bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center"
          >
            📱 Compartilhar no WhatsApp
          </button>
          <button
            onClick={shareTelegram}
            className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center"
          >
            ✈️ Compartilhar no Telegram
          </button>
        </div>
      </div>

      {/* How it Works */}
      <div className="bg-gray-900 rounded-lg p-8 border border-gray-800 mb-8">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          Como Funciona o Sistema de Indicações
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-primary-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-2xl font-bold">1</span>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">
              Compartilhe seu Link
            </h3>
            <p className="text-gray-400 text-sm">
              Envie seu link de indicação para amigos e familiares
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-primary-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-2xl font-bold">2</span>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">
              Amigo se Cadastra
            </h3>
            <p className="text-gray-400 text-sm">
              Seu amigo cria uma conta usando seu código de indicação
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-primary-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-2xl font-bold">3</span>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">
              Você Ganha Bônus
            </h3>
            <p className="text-gray-400 text-sm">
              Receba R$ 10 quando seu amigo fizer o primeiro depósito
            </p>
          </div>
        </div>
      </div>

      {/* Referred Users List */}
      {referralData?.referredUsers?.length > 0 && (
        <div className="bg-gray-900 rounded-lg p-8 border border-gray-800">
          <h2 className="text-2xl font-bold text-white mb-6">
            Seus Amigos Indicados
          </h2>
          
          <div className="space-y-4">
            {referralData.referredUsers.map((referredUser) => (
              <div key={referredUser.id} className="bg-gray-800 rounded-lg p-4 flex items-center justify-between">
                <div>
                  <h3 className="text-white font-semibold">
                    {referredUser.name}
                  </h3>
                  <p className="text-gray-400 text-sm">
                    Indicado em: {formatDate(referredUser.dateReferred)}
                  </p>
                </div>
                <div className="text-right">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    referredUser.isActive 
                      ? 'bg-green-900 text-green-300'
                      : 'bg-gray-700 text-gray-300'
                  }`}>
                    {referredUser.isActive ? '✅ Ativo' : '⏳ Pendente'}
                  </span>
                  {referredUser.isActive && (
                    <p className="text-green-400 text-sm mt-1">
                      +R$ 10,00
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Terms and Conditions */}
      <div className="mt-8 bg-gray-900 rounded-lg p-6 border border-gray-800">
        <h3 className="text-lg font-semibold text-white mb-4">
          📋 Termos e Condições
        </h3>
        <div className="text-sm text-gray-400 space-y-2">
          <p>• Você ganha R$ 10,00 para cada amigo que se cadastrar com seu código e fizer o primeiro depósito</p>
          <p>• O bônus é creditado automaticamente quando o amigo indicado ativa sua conta</p>
          <p>• Não há limite para o número de indicações</p>
          <p>• Os ganhos com indicações ficam disponíveis no seu saldo de bônus</p>
          <p>• É proibido criar contas falsas ou usar métodos fraudulentos</p>
          <p>• A Raspou, Levou se reserva o direito de cancelar bônus obtidos de forma irregular</p>
        </div>
      </div>
    </div>
  );
};

export default Referrals;
