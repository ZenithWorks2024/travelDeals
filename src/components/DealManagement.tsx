import React, { useState } from 'react';
import { Table, Filter, Edit, Trash2, MoreVertical, Check, X, Archive } from 'lucide-react';
import { cities } from '../data/cities';
import { airlines } from '../data/airlines';

interface Deal {
  id: string;
  destination: string;
  origin: string;
  airline: string;
  price: number;
  originalPrice: number;
  departureDate: string;
  status: 'active' | 'draft' | 'expired';
  createdAt: string;
}

export default function DealManagement() {
  const [deals, setDeals] = useState<Deal[]>([
    {
      id: '1',
      destination: 'Dubai',
      origin: 'Mumbai',
      airline: 'Emirates',
      price: 55000,
      originalPrice: 75000,
      departureDate: '2024-05',
      status: 'active',
      createdAt: '2024-03-15'
    },
    {
      id: '2',
      destination: 'Singapore',
      origin: 'Mumbai',
      airline: 'Singapore Airlines',
      price: 45000,
      originalPrice: 65000,
      departureDate: '2024-06',
      status: 'draft',
      createdAt: '2024-03-14'
    }
  ]);

  const [selectedDeals, setSelectedDeals] = useState<string[]>([]);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('createdAt');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const handleStatusChange = (dealId: string, newStatus: 'active' | 'draft' | 'expired') => {
    setDeals(deals.map(deal => 
      deal.id === dealId ? { ...deal, status: newStatus } : deal
    ));
  };

  const handleDelete = (dealId: string) => {
    if (window.confirm('Are you sure you want to delete this deal?')) {
      setDeals(deals.filter(deal => deal.id !== dealId));
    }
  };

  const handleBulkDelete = () => {
    if (window.confirm(`Are you sure you want to delete ${selectedDeals.length} deals?`)) {
      setDeals(deals.filter(deal => !selectedDeals.includes(deal.id)));
      setSelectedDeals([]);
    }
  };

  const handleBulkStatusChange = (newStatus: 'active' | 'draft' | 'expired') => {
    setDeals(deals.map(deal => 
      selectedDeals.includes(deal.id) ? { ...deal, status: newStatus } : deal
    ));
    setSelectedDeals([]);
  };

  const filteredDeals = deals.filter(deal => 
    filterStatus === 'all' ? true : deal.status === filterStatus
  ).sort((a, b) => {
    const compareValue = sortOrder === 'asc' ? 1 : -1;
    if (sortBy === 'price') {
      return (a.price - b.price) * compareValue;
    }
    return a[sortBy].localeCompare(b[sortBy]) * compareValue;
  });

  const statusColors = {
    active: 'bg-green-100 text-green-800',
    draft: 'bg-yellow-100 text-yellow-800',
    expired: 'bg-red-100 text-red-800'
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Deal Management</h1>
          <p className="mt-2 text-sm text-gray-700">
            Manage your travel deals, update status, and monitor performance.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            onClick={() => {}} // Will implement in next iteration
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-primary-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-700"
          >
            Add Deal
          </button>
        </div>
      </div>

      <div className="mt-8 flex flex-col">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg">
              {/* Filters and Bulk Actions */}
              <div className="bg-white border-b border-gray-200 px-4 py-3 sm:flex sm:items-center sm:justify-between">
                <div className="flex items-center space-x-4">
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="rounded-md border-gray-300 text-sm"
                  >
                    <option value="all">All Status</option>
                    <option value="active">Active</option>
                    <option value="draft">Draft</option>
                    <option value="expired">Expired</option>
                  </select>

                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="rounded-md border-gray-300 text-sm"
                  >
                    <option value="createdAt">Sort by Date</option>
                    <option value="destination">Sort by Destination</option>
                    <option value="price">Sort by Price</option>
                  </select>

                  <button
                    onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                    className="p-2 hover:bg-gray-100 rounded-md"
                  >
                    {sortOrder === 'asc' ? '↑' : '↓'}
                  </button>
                </div>

                {selectedDeals.length > 0 && (
                  <div className="mt-3 sm:mt-0 flex items-center space-x-3">
                    <button
                      onClick={() => handleBulkStatusChange('active')}
                      className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-green-700 bg-green-100 hover:bg-green-200"
                    >
                      <Check className="w-4 h-4 mr-1" />
                      Activate
                    </button>
                    <button
                      onClick={() => handleBulkStatusChange('draft')}
                      className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-yellow-700 bg-yellow-100 hover:bg-yellow-200"
                    >
                      <Archive className="w-4 h-4 mr-1" />
                      Draft
                    </button>
                    <button
                      onClick={handleBulkDelete}
                      className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200"
                    >
                      <Trash2 className="w-4 h-4 mr-1" />
                      Delete
                    </button>
                  </div>
                )}
              </div>

              {/* Table */}
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="relative w-12 px-6 sm:w-16 sm:px-8">
                      <input
                        type="checkbox"
                        className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300"
                        checked={selectedDeals.length === deals.length}
                        onChange={(e) => {
                          setSelectedDeals(
                            e.target.checked ? deals.map(deal => deal.id) : []
                          );
                        }}
                      />
                    </th>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">
                      Destination
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Origin
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Airline
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Price
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Status
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Created
                    </th>
                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {filteredDeals.map((deal) => (
                    <tr key={deal.id} className={selectedDeals.includes(deal.id) ? 'bg-gray-50' : undefined}>
                      <td className="relative w-12 px-6 sm:w-16 sm:px-8">
                        <input
                          type="checkbox"
                          className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300"
                          checked={selectedDeals.includes(deal.id)}
                          onChange={(e) => {
                            setSelectedDeals(
                              e.target.checked
                                ? [...selectedDeals, deal.id]
                                : selectedDeals.filter(id => id !== deal.id)
                            );
                          }}
                        />
                      </td>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900">
                        {deal.destination}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {deal.origin}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {deal.airline}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        ${Math.round(deal.price / 83).toLocaleString()}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm">
                        <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${statusColors[deal.status]}`}>
                          {deal.status.charAt(0).toUpperCase() + deal.status.slice(1)}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {new Date(deal.createdAt).toLocaleDateString()}
                      </td>
                      <td className="whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <div className="flex items-center justify-end space-x-2">
                          <button
                            onClick={() => {}} // Will implement edit in next iteration
                            className="text-primary-600 hover:text-primary-900"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(deal.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                          <div className="relative group">
                            <button className="text-gray-400 hover:text-gray-500">
                              <MoreVertical className="w-4 h-4" />
                            </button>
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 hidden group-hover:block">
                              <button
                                onClick={() => handleStatusChange(deal.id, 'active')}
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                              >
                                Set as Active
                              </button>
                              <button
                                onClick={() => handleStatusChange(deal.id, 'draft')}
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                              >
                                Move to Draft
                              </button>
                              <button
                                onClick={() => handleStatusChange(deal.id, 'expired')}
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                              >
                                Mark as Expired
                              </button>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}