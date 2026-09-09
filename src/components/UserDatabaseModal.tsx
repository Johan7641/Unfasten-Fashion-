import React, { useState, useEffect } from 'react';
import {
  X,
  Database,
  ShieldCheck,
  RefreshCw,
  Search,
  UserCheck,
  Calendar,
  Clock,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';
import { DatabaseUserRecord } from '../types';
import { fetchRegisteredUsers } from '../data/blogStore';

interface UserDatabaseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const UserDatabaseModal: React.FC<UserDatabaseModalProps> = ({ isOpen, onClose }) => {
  const [users, setUsers] = useState<DatabaseUserRecord[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [filterProvider, setFilterProvider] = useState<'all' | 'google' | 'email'>('all');
  const [lastRefreshed, setLastRefreshed] = useState<string>('');

  const loadData = async () => {
    setIsLoading(true);
    try {
      const data = await fetchRegisteredUsers();
      setUsers(data);
      setLastRefreshed(new Date().toLocaleTimeString());
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      loadData();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const filteredUsers = users.filter((u) => {
    if (filterProvider !== 'all' && u.provider !== filterProvider) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        u.name.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        u.role.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div
      id="user-database-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#183626]/80 backdrop-blur-xs"
    >
      <div
        id="user-database-modal-container"
        className="w-full max-w-2xl bg-[#FAF8F5] border border-[#D5CEC2] shadow-2xl rounded-none overflow-hidden max-h-[90vh] flex flex-col animate-in fade-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="bg-[#183626] text-white px-5 sm:px-6 py-4 flex items-center justify-between border-b border-[#2D4537] shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 bg-[#224b35] border border-[#3E5246]">
              <Database className="w-5 h-5 text-[#88D4A8]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-editorial-serif text-lg sm:text-xl font-normal text-white">
                  Permanent User Database
                </h2>
                <span className="text-[10px] font-mono text-[#88D4A8] bg-[#122A1E] border border-[#235038] px-1.5 py-0.5 uppercase tracking-wider font-bold">
                  File-Backed Storage
                </span>
              </div>
              <p className="text-[11px] font-mono text-[#A3B8AC]">
                All sign-ups &amp; Google logins are permanently recorded on the server
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-[#A3B8AC] hover:text-white transition-colors cursor-pointer p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Database Status Bar */}
        <div className="bg-[#F2ECE1] border-b border-[#E5DFD4] px-5 py-2.5 flex flex-wrap items-center justify-between gap-3 text-xs shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#15803D] animate-pulse" />
            <span className="font-mono text-[11px] text-[#183626] font-semibold">
              {users.length} {users.length === 1 ? 'account' : 'accounts'} registered permanently
            </span>
            {lastRefreshed && (
              <span className="text-[10px] font-mono text-[#76877D]">
                (Synced {lastRefreshed})
              </span>
            )}
          </div>
          <button
            type="button"
            onClick={loadData}
            disabled={isLoading}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white border border-[#D5CEC2] hover:border-[#183626] text-[#183626] text-[11px] font-mono uppercase font-semibold cursor-pointer disabled:opacity-50 transition-colors shadow-xs"
          >
            <RefreshCw className={`w-3 h-3 ${isLoading ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>
        </div>

        {/* Filter Controls */}
        <div className="p-4 border-b border-[#E5DFD4] bg-[#FAF8F5] flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-1.5">
            {(['all', 'google', 'email'] as const).map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setFilterProvider(p)}
                className={`px-2.5 py-1 text-[11px] font-mono uppercase tracking-wider transition-colors cursor-pointer ${
                  filterProvider === p
                    ? 'bg-[#183626] text-white font-bold'
                    : 'bg-white border border-[#D5CEC2] text-[#5E6F65] hover:bg-[#F2ECE1]'
                }`}
              >
                {p === 'all' ? 'All Providers' : p === 'google' ? 'Google Auth' : 'Email Login'}
              </button>
            ))}
          </div>

          <div className="relative min-w-[180px] sm:min-w-[220px]">
            <Search className="w-3.5 h-3.5 text-[#76877D] absolute left-2.5 top-2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search user database..."
              className="w-full pl-8 pr-2.5 py-1 text-xs bg-white border border-[#D5CEC2] focus:border-[#183626] focus:outline-none"
            />
          </div>
        </div>

        {/* Users List */}
        <div className="p-4 sm:p-5 overflow-y-auto flex-1 space-y-3">
          {isLoading ? (
            <div className="p-8 text-center text-xs font-mono text-[#76877D]">
              <RefreshCw className="w-5 h-5 animate-spin mx-auto mb-2 text-[#183626]" />
              Querying persistent server storage...
            </div>
          ) : filteredUsers.length === 0 ? (
            <div className="p-8 text-center bg-white border border-dashed border-[#D5CEC2] text-xs font-mono text-[#76877D]">
              No user records match the query.
            </div>
          ) : (
            filteredUsers.map((user) => (
              <div
                key={user.id}
                className="bg-white border border-[#D5CEC2] p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-[#183626] transition-colors"
              >
                {/* Left: Avatar and Identity */}
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center text-white font-mono font-bold text-xs shrink-0 shadow-xs"
                    style={{ backgroundColor: user.avatarColor || '#183626' }}
                  >
                    {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-[#183626] truncate">
                        {user.name}
                      </span>

                      {/* Core Editorial Clearance Badge */}
                      {user.isCoreTeam ? (
                        <span className="inline-flex items-center gap-1 text-[9px] font-mono uppercase tracking-wider text-[#BE562C] bg-[#FDF2EC] border border-[#F4DDD2] px-1.5 py-0.5 font-bold">
                          <ShieldCheck className="w-3 h-3 text-[#BE562C]" />
                          CORE EDITORIAL
                        </span>
                      ) : (
                        <span className="text-[9px] font-mono uppercase text-[#3E5246] bg-[#E8F0EC] px-1.5 py-0.5">
                          Community
                        </span>
                      )}
                    </div>

                    {/* Email / Masked Identity */}
                    <div className="text-[11px] font-mono text-[#76877D] truncate mt-0.5">
                      {user.isCoreTeam ? (
                        <span className="text-[#183626] font-medium">
                          Verified Editorial Member (Email Protected)
                        </span>
                      ) : (
                        <span>{user.email}</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right: Provider & Login Metadata */}
                <div className="flex items-center gap-3 sm:gap-4 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-[#E5DFD4] text-[10px] font-mono text-[#5E6F65]">
                  {/* Provider */}
                  <div className="flex items-center gap-1">
                    {user.provider === 'google' ? (
                      <span className="inline-flex items-center gap-1 bg-[#EEF4FE] border border-[#C6DCFA] text-[#1967D2] px-1.5 py-0.5 font-semibold">
                        <svg className="w-3 h-3" viewBox="0 0 24 24">
                          <path
                            fill="#4285F4"
                            d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
                          />
                          <path
                            fill="#34A853"
                            d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
                          />
                          <path
                            fill="#FBBC05"
                            d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.17 0 9.99 0 12s.45 3.83 1.25 5.42l4.03-3.15z"
                          />
                          <path
                            fill="#EA4335"
                            d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                          />
                        </svg>
                        Google
                      </span>
                    ) : (
                      <span className="bg-[#FAF8F5] border border-[#D5CEC2] text-[#3E5246] px-1.5 py-0.5">
                        Email
                      </span>
                    )}
                  </div>

                  {/* Logins count */}
                  <div className="bg-[#F4F1EA] px-2 py-0.5 border border-[#E5DFD4] font-semibold text-[#183626]">
                    {user.loginCount || 1} {user.loginCount === 1 ? 'login' : 'logins'}
                  </div>

                  {/* Registered date */}
                  <div className="hidden sm:block text-[#76877D]">
                    Joined{' '}
                    {user.createdAt
                      ? new Date(user.createdAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                        })
                      : 'Recently'}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="bg-[#FAF8F5] border-t border-[#E5DFD4] px-5 py-3 flex items-center justify-between text-xs text-[#76877D] font-mono shrink-0">
          <div className="flex items-center gap-1.5 text-[11px]">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#15803D]" />
            <span>Encrypted and stored in /data/users.json</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 bg-[#183626] text-white text-xs font-mono uppercase tracking-wider font-semibold cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
