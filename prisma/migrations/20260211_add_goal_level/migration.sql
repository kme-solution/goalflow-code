-- Add goal level support
ALTER TYPE "GoalLevel" ADD VALUE IF NOT EXISTS 'personal';
ALTER TYPE "GoalLevel" ADD VALUE IF NOT EXISTS 'team';
ALTER TYPE "GoalLevel" ADD VALUE IF NOT EXISTS 'company';

-- Add level column to goals table (optional, can be calculated from department/team)
ALTER TABLE "goals" ADD COLUMN "level" "GoalLevel" NOT NULL DEFAULT 'personal';

-- Add teamId column to support team goals
ALTER TABLE "goals" ADD COLUMN "teamId" TEXT;

-- Add foreign key constraint for team
ALTER TABLE "goals" ADD CONSTRAINT "goals_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "teams"("id") ON DELETE SET NULL ON UPDATE CASCADE;
