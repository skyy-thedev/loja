// src/components/ProductFilter.jsx
import { useState, useEffect, useCallback } from 'react';
import './ProductFilter.css';

export default function ProductFilter({ onFilter }) {
  const [filters, setFilters] = useState({
    search: '',
    color: '',
    sort: '',
    type: '',
    priceRange: '',
    saleOnly: false,
  });

  const updateFilter = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleClearFilters = () => {
    setFilters({
      search: '',
      color: '',
      sort: '',
      type: '',
      priceRange: '',
      saleOnly: false,
    });
  };

  // Use useCallback para evitar re-renderizações desnecessárias
  const emitFilters = useCallback(() => {
    onFilter(filters);
  }, [onFilter, filters]);

  useEffect(() => {
    emitFilters();
  }, [emitFilters]);

  return (
    <div className="filter-container">
      <input
        type="text"
        placeholder="Buscar por nome..."
        value={filters.search}
        onChange={(e) => updateFilter('search', e.target.value)}
      />

      <select value={filters.type} onChange={(e) => updateFilter('type', e.target.value)}>
        <option value="">Todos os tipos</option>
        <option value="camiseta">Camisetas</option>
        <option value="bermuda">Bermudas</option>
        <option value="cap">Bonés</option>
      </select>

      <select value={filters.color} onChange={(e) => updateFilter('color', e.target.value)}>
        <option value="">Todas as cores</option>
        <option value="branco">Branco</option>
        <option value="preto">Preto</option>
        <option value="vermelho">Vermelho</option>
      </select>

      <select value={filters.priceRange} onChange={e => updateFilter('priceRange', e.target.value)}>
        <option value="">Todas as faixas de preço</option>
        <option value="0-100">Até R$100</option>
        <option value="100-200">R$100 a R$200</option>
        <option value="200-9999">Acima de R$200</option>
      </select>

      <select value={filters.sort} onChange={(e) => updateFilter('sort', e.target.value)}>
        <option value="">Ordenar por</option>
        <option value="asc">Menor valor</option>
        <option value="desc">Maior valor</option>
      </select>

      <label className="promo-label">
        <input
          type="checkbox"
          checked={filters.saleOnly}
          onChange={(e) => updateFilter('saleOnly', e.target.checked)}
        />
        <span>Somente promoções</span>
      </label>

      <button className="clear-button" onClick={handleClearFilters}>
        Limpar filtros
      </button>
    </div>
  );
}