ALTER TABLE report_comments
ADD COLUMN IF NOT EXISTS sender text NOT NULL DEFAULT 'admin';

ALTER TABLE report_attachments
ADD COLUMN IF NOT EXISTS filesize integer NOT NULL DEFAULT 0;

INSERT INTO report_comments (id, reportid, comment, sender, createdat, updatedat)
SELECT
  'legacy-note-' || id,
  id,
  adminnotes,
  'admin',
  updatedat,
  updatedat
FROM reports
WHERE adminnotes IS NOT NULL
  AND btrim(adminnotes) <> ''
ON CONFLICT (id) DO NOTHING;
