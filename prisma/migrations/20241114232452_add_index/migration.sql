-- This is a custom migration that creates a BM25 index on the `resource` table
-- CALL paradedb.create_bm25(
--   index_name => 'search_idx',
--   table_name => 'resource',
--   key_field => 'id',
--   text_fields => 
--     paradedb.field('description', tokenizer => paradedb.tokenizer('default', stemmer => 'English')) ||
--     paradedb.field('name', tokenizer => paradedb.tokenizer('default', stemmer => 'English'))
-- ); <--- OLD PARADEDB SYNTAX

CREATE INDEX search_idx ON resource
USING bm25 (id, description, name)
WITH (
    key_field='id',
    text_fields= '{"description": {"tokenizer": {"type": "default", "stemmer": "English"}}, 
                   "name":        {"tokenizer": {"type": "default", "stemmer": "English"}}}'
);