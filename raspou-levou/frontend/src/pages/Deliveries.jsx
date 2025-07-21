import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Deliveries = () => {
  const [deliveries, setDeliveries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [filters, setFilters] = useState({
    all: 0,
    pending: 0,
    shipped: 0,
    delivered: 0
  });

  useEffect(() => {
    fetchDeliveries();
  }, []);

  const fetchDeliveries = async () => {
    try {
      const response = await axios.get('/api/user/deliveries');
      setDeliveries(response.data.deliveries);
      setFilters(response.data.filters);
    } catch (error) {
      console.error('Erro ao buscar entregas:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-900 text-yellow-300 border-yellow-600';
      case 'shipped':
        return 'bg-blue-900 text-blue-300 border-blue-600';
      case 'delivered':
        return 'bg-green-900 text-green-300 border-green-600';
      default:
        return 'bg-gray-900 text-gray-300 border-gray-600';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'pending':
        return 'Pendente';
      case 'shipped':
        return 'Enviado';
      case 'delivered':
        return 'Entregue';
      default:
        return 'Desconhecido';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return '⏳';
      case 'shipped':
        return '🚚';
      case 'delivered':
        return '✅';
      default:
        return '📦';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const filteredDeliveries = selectedFilter === 'all' 
    ? deliveries 
    : deliveries.filter(delivery => delivery.status === selectedFilter);

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
        <h1 className="text-3xl font-bold text-white mb-4">Minhas Entregas</h1>
        <p className="text-gray-400">
          Acompanhe o status das suas solicitações de entrega
        </p>
      </div>

      {/* Filter Buttons */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-4 justify-center">
          <button
            onClick={() => setSelectedFilter('all')}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              selectedFilter === 'all'
                ? 'bg-primary-500 text-white shadow-glow'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            📦 Todos ({filters.all})
          </button>
          <button
            onClick={() => setSelectedFilter('pending')}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              selectedFilter === 'pending'
                ? 'bg-yellow-500 text-white'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            ⏳ Pendente ({filters.pending})
          </button>
          <button
            onClick={() => setSelectedFilter('shipped')}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              selectedFilter === 'shipped'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            🚚 Enviado ({filters.shipped})
          </button>
          <button
            onClick={() => setSelectedFilter('delivered')}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              selectedFilter === 'delivered'
                ? 'bg-green-500 text-white'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            ✅ Entregue ({filters.delivered})
          </button>
        </div>
      </div>

      {/* Deliveries List */}
      {filteredDeliveries.length > 0 ? (
        <div className="space-y-6">
          {filteredDeliveries.map((delivery) => (
            <div key={delivery._id} className="bg-gray-900 rounded-lg p-6 border border-gray-800">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    <h3 className="text-lg font-semibold text-white mr-3">
                      {delivery.product.name}
                    </h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(delivery.status)}`}>
                      {getStatusIcon(delivery.status)} {getStatusText(delivery.status)}
                    </span>
                  </div>
                  <p className="text-gray-400 mb-3">
                    {delivery.product.description}
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-400">Pedido em: </span>
                      <span className="text-white">{formatDate(delivery.createdAt)}</span>
                    </div>
                    {delivery.shippedAt && (
                      <div>
                        <span className="text-gray-400">Enviado em: </span>
                        <span className="text-white">{formatDate(delivery.shippedAt)}</span>
                      </div>
                    )}
                    {delivery.deliveredAt && (
                      <div>
                        <span className="text-gray-400">Entregue em: </span>
                        <span className="text-white">{formatDate(delivery.deliveredAt)}</span>
                      </div>
                    )}
                    {delivery.trackingCode && (
                      <div>
                        <span className="text-gray-400">Código de rastreamento: </span>
                        <span className="text-primary-400 font-mono">{delivery.trackingCode}</span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="ml-4">
                  <div className="w-16 h-16 bg-gray-800 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">
                      {delivery.product.category === 'electronics' && '📱'}
                      {delivery.product.category === 'cosmetics' && '💄'}
                      {delivery.product.category === 'vehicle' && '🏍️'}
                      {!delivery.product.category && '📦'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Delivery Address */}
              {delivery.address && (
                <div className="bg-gray-800 rounded-lg p-4 mt-4">
                  <h4 className="text-white font-semibold mb-2">Endereço de Entrega:</h4>
                  <p className="text-gray-300 text-sm">
                    {delivery.address.street}, {delivery.address.number}
                    {delivery.address.complement && `, ${delivery.address.complement}`}
                  </p>
                  <p className="text-gray-300 text-sm">
                    {delivery.address.neighborhood} - {delivery.address.city}/{delivery.address.state}
                  </p>
                  <p className="text-gray-300 text-sm">
                    CEP: {delivery.address.zipCode}
                  </p>
                </div>
              )}

              {/* Tracking Button */}
              {delivery.trackingCode && delivery.status === 'shipped' && (
                <div className="mt-4">
                  <button className="btn-primary text-sm">
                    🔍 Rastrear Pedido
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📦</div>
          <h3 className="text-xl font-semibold text-gray-300 mb-2">
            Nenhuma entrega encontrada
          </h3>
          <p className="text-gray-500 mb-6">
            {selectedFilter === 'all' 
              ? 'Você ainda não possui solicitações de entrega. Ganhe prêmios nas raspadinhas para solicitar entregas!'
              : `Nenhuma entrega com status "${getStatusText(selectedFilter)}" encontrada.`
            }
          </p>
          
          {selectedFilter === 'all' && (
            <div className="bg-gray-900 rounded-lg p-6 max-w-md mx-auto border border-gray-800">
              <h4 className="text-lg font-semibold text-white mb-3">
                Como solicitar entregas?
              </h4>
              <ul className="text-left text-gray-400 space-y-2">
                <li>• Ganhe prêmios físicos nas raspadinhas</li>
                <li>• Acesse a área de prêmios ganhos</li>
                <li>• Preencha seu endereço de entrega</li>
                <li>• Acompanhe o status da entrega aqui</li>
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Info Section */}
      <div className="mt-8 bg-gray-900 rounded-lg p-6 border border-gray-800">
        <h3 className="text-lg font-semibold text-white mb-4">
          ℹ️ Informações sobre Entregas
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-400">
          <div>
            <h4 className="text-white font-semibold mb-2">Prazos de Entrega</h4>
            <ul className="space-y-1">
              <li>• Processamento: 1-2 dias úteis</li>
              <li>• Envio: 5-10 dias úteis</li>
              <li>• Rastreamento disponível após envio</li>
              <li>• Entrega via Correios ou transportadora</li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-2">Status das Entregas</h4>
            <ul className="space-y-1">
              <li>• <span className="text-yellow-400">Pendente:</span> Aguardando processamento</li>
              <li>• <span className="text-blue-400">Enviado:</span> Em trânsito para entrega</li>
              <li>• <span className="text-green-400">Entregue:</span> Recebido com sucesso</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Deliveries;
