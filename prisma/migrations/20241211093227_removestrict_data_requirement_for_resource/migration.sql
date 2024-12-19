-- AlterTable
ALTER TABLE "resource" ALTER COLUMN "eligibility" SET DEFAULT 'N/A',
ALTER COLUMN "externalLink" DROP NOT NULL;
