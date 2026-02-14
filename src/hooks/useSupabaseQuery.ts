import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import type { PostgrestError } from '@supabase/supabase-js';

interface UseSupabaseQueryOptions<T> {
  table: string;
  select?: string;
  filter?: Record<string, any>;
  orderBy?: { column: string; ascending?: boolean };
  limit?: number;
  enabled?: boolean;
}

interface UseSupabaseQueryResult<T> {
  data: T[] | null;
  loading: boolean;
  error: PostgrestError | null;
  refetch: () => Promise<void>;
}

export function useSupabaseQuery<T = any>(
  options: UseSupabaseQueryOptions<T>
): UseSupabaseQueryResult<T> {
  const [data, setData] = useState<T[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<PostgrestError | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      let query = supabase
        .from(options.table)
        .select(options.select || '*');

      // Apply filters
      if (options.filter) {
        Object.entries(options.filter).forEach(([key, value]) => {
          query = query.eq(key, value);
        });
      }

      // Apply ordering
      if (options.orderBy) {
        query = query.order(options.orderBy.column, {
          ascending: options.orderBy.ascending ?? true,
        });
      }

      // Apply limit
      if (options.limit) {
        query = query.limit(options.limit);
      }

      const { data: result, error: queryError } = await query;

      if (queryError) {
        setError(queryError);
      } else {
        setData(result as T[]);
      }
    } catch (err) {
      console.error('Query error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (options.enabled !== false) {
      fetchData();
    }
  }, [
    options.table,
    options.select,
    JSON.stringify(options.filter),
    JSON.stringify(options.orderBy),
    options.limit,
    options.enabled,
  ]);

  return { data, loading, error, refetch: fetchData };
}

// Hook for single record
export function useSupabaseRecord<T = any>(
  table: string,
  id: string | null,
  select?: string
): UseSupabaseQueryResult<T> & { record: T | null } {
  const { data, loading, error, refetch } = useSupabaseQuery<T>({
    table,
    select,
    filter: id ? { id } : undefined,
    limit: 1,
    enabled: !!id,
  });

  return {
    data,
    record: data?.[0] || null,
    loading,
    error,
    refetch,
  };
}

// Hook for mutations
export function useSupabaseMutation<T = any>() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<PostgrestError | null>(null);

  const insert = async (table: string, data: Partial<T>) => {
    setLoading(true);
    setError(null);

    const { data: result, error: insertError } = await supabase
      .from(table)
      .insert(data)
      .select()
      .single();

    setLoading(false);

    if (insertError) {
      setError(insertError);
      return { data: null, error: insertError };
    }

    return { data: result as T, error: null };
  };

  const update = async (table: string, id: string, data: Partial<T>) => {
    setLoading(true);
    setError(null);

    const { data: result, error: updateError } = await supabase
      .from(table)
      .update(data)
      .eq('id', id)
      .select()
      .single();

    setLoading(false);

    if (updateError) {
      setError(updateError);
      return { data: null, error: updateError };
    }

    return { data: result as T, error: null };
  };

  const remove = async (table: string, id: string) => {
    setLoading(true);
    setError(null);

    const { error: deleteError } = await supabase
      .from(table)
      .delete()
      .eq('id', id);

    setLoading(false);

    if (deleteError) {
      setError(deleteError);
      return { error: deleteError };
    }

    return { error: null };
  };

  return { insert, update, remove, loading, error };
}
