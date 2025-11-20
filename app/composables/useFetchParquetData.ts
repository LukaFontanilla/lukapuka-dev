import { ref } from 'vue';

interface FetchParquetDataOptions {
  url: string;
  rowStart?: number;
  rowEnd?: number;
  filter?: Record<string, string | number | boolean>;
}

function buildParquetFilter(userFilter: Record<string, any> | undefined) {
  if (!userFilter) return undefined;

  const queryFilter: Record<string, any> = {};
  for (const column in userFilter) {
    const filterValue = userFilter[column];

    if (typeof filterValue === 'string') {
      const match = filterValue.match(/^(>=|<=|>|<|=)\s*(.*)/);

      if (match) {
        const operator = match[1];
        const value = match[2].trim();
        const parsedValue = !isNaN(parseFloat(value)) && isFinite(value as any) ? parseFloat(value) : value;

        switch (operator) {
          case '>':
            queryFilter[column] = { $gt: parsedValue };
            break;
          case '<':
            queryFilter[column] = { $lt: parsedValue };
            break;
          case '>=':
            queryFilter[column] = { $gte: parsedValue };
            break;
          case '<=':
            queryFilter[column] = { $lte: parsedValue };
            break;
          case '=':
            queryFilter[column] = { $eq: parsedValue };
            break;
        }
      } else {
        // No operator, default to equality
        const parsedValue = !isNaN(parseFloat(filterValue)) && isFinite(filterValue as any) ? parseFloat(filterValue) : filterValue;
        queryFilter[column] = { $eq: parsedValue };
      }
    } else {
      // Not a string, assume direct equality
      queryFilter[column] = { $eq: filterValue };
    }
  }
  return queryFilter;
}

export function useFetchParquetData() {
  const data = ref<any[] | null>(null);
  const error = ref<Error | null>(null);
  const loading = ref(false);
  const metadata = ref<any | null>(null);

  // --- Caching state ---
  const lastUrl = ref<string | null>(null);
  const fileBuffer = ref<any | null>(null);

  const fetchData = async (options: FetchParquetDataOptions) => {
    const { url, rowStart, rowEnd, filter: userFilter } = options;
    loading.value = true;
    error.value = null;

    try {
      const {
        asyncBufferFromUrl,
        parquetReadObjects,
        parquetQuery,
        parquetMetadataAsync,
        parquetSchema,
      } = await import('https://cdn.jsdelivr.net/npm/hyparquet@1.20.1/+esm');

      // Check if URL has changed or if we don't have a file buffer
      if (url !== lastUrl.value || !fileBuffer.value) {
        // 1. Fetch file and store it
        fileBuffer.value = await asyncBufferFromUrl({ url });

        // 2. Fetch and store metadata
        const md = await parquetMetadataAsync(fileBuffer.value);
        const schema = parquetSchema(md);
        metadata.value = {
          numRows: Number(md.num_rows),
          schema,
          columnNames: schema.children.map((e: any) => e.element.name),
          raw: md,
        };

        // 3. Update the last processed URL
        lastUrl.value = url;
      }

      const file = fileBuffer.value;
      const filter = buildParquetFilter(userFilter);

      if (filter) {
        data.value = await parquetQuery({ file, filter });
      } else {
        data.value = await parquetReadObjects({
          file,
          rowStart: rowStart || 0,
          rowEnd: rowEnd || metadata.value?.numRows,
        });
      }
    } catch (e: any) {
      error.value = e;
    } finally {
      loading.value = false;
    }
  };

  return {
    data,
    error,
    loading,
    metadata,
    fetchData,
  };
}
