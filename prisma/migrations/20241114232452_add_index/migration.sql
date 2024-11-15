-- This is a custom migration that creates a BM25 index on the `resource` table
CALL paradedb.create_bm25(
  index_name => 'search_idx',
  table_name => 'resource',
  key_field => 'id',
  text_fields => paradedb.field('description') || paradedb.field('name')
);