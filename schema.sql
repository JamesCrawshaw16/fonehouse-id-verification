CREATE TABLE IF NOT EXISTS verification_links (
 token_hash TEXT PRIMARY KEY,
 email TEXT NOT NULL,
 status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','confirmed','declined','completed')),
 created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
 expires_at TIMESTAMPTZ NOT NULL,
 confirmed_at TIMESTAMPTZ,
 completed_at TIMESTAMPTZ,
 idmission_reference TEXT
);
CREATE INDEX IF NOT EXISTS verification_links_expiry_idx ON verification_links (expires_at);
