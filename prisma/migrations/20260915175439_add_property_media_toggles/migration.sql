-- P-04: per-property toggles for the Video / 3D Virtual Tour media tabs.
-- Additive only (nullable/defaulted columns) — safe to run against an
-- existing onoffice_properties table without data loss.
ALTER TABLE `onoffice_properties`
  ADD COLUMN `videoEnabled` BOOLEAN NOT NULL DEFAULT false,
  ADD COLUMN `videoUrl` TEXT NULL,
  ADD COLUMN `virtualTourEnabled` BOOLEAN NOT NULL DEFAULT false,
  ADD COLUMN `virtualTourUrl` TEXT NULL;
