import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'
import bcrypt from 'bcryptjs'
import { config } from 'dotenv'

// Load environment variables
config()

const connectionString = process.env.DATABASE_URL

// Create a connection pool
const pool = new Pool({ connectionString })

// Create the Prisma Client with the adapter
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

async function main() {
    console.log('🌱 Seeding database...')

    // Create organization
    const organization = await prisma.organization.upsert({
        where: { id: 'org-001' },
        update: {},
        create: {
            id: 'org-001',
            name: 'GoalFlow Inc.',
            legalName: 'GoalFlow Incorporated',
            industry: 'Technology',
            size: '51-200',
            structureType: 'Hierarchical',
            description: 'Modern performance management platform',
            mission: 'To empower teams to achieve their goals together',
            vision: 'A world where every team member knows their impact',
            website: 'https://goalflow.com',
            fiscalYearStart: '01-01',
            timezone: 'America/New_York',
        },
    })

    // Create organization settings
    await prisma.organizationSettings.upsert({
        where: { organizationId: organization.id },
        update: {},
        create: {
            organizationId: organization.id,
        },
    })

    // Create departments
    const engineering = await prisma.department.upsert({
        where: { id: 'dept-eng' },
        update: {},
        create: {
            id: 'dept-eng',
            organizationId: organization.id,
            name: 'Engineering',
            code: 'ENG',
            description: 'Software development and engineering',
            level: 1,
            order: 1,
        },
    })

    const sales = await prisma.department.upsert({
        where: { id: 'dept-sales' },
        update: {},
        create: {
            id: 'dept-sales',
            organizationId: organization.id,
            name: 'Sales',
            code: 'SALES',
            description: 'Sales and business development',
            level: 1,
            order: 2,
        },
    })

    const marketing = await prisma.department.upsert({
        where: { id: 'dept-marketing' },
        update: {},
        create: {
            id: 'dept-marketing',
            organizationId: organization.id,
            name: 'Marketing',
            code: 'MKT',
            description: 'Marketing and brand management',
            level: 1,
            order: 3,
        },
    })

    // Hash password
    const hashedPassword = await bcrypt.hash('password123', 10)

    // Create users
    const ceo = await prisma.user.upsert({
        where: { email: 'ceo@goalflow.com' },
        update: {},
        create: {
            id: 'user-ceo',
            email: 'ceo@goalflow.com',
            password: hashedPassword,
            name: 'David Williams',
            role: 'ceo',
            departmentId: null,
            organizationId: organization.id,
        },
    })

    const hrAdmin = await prisma.user.upsert({
        where: { email: 'hr@goalflow.com' },
        update: {},
        create: {
            id: 'user-hr',
            email: 'hr@goalflow.com',
            password: hashedPassword,
            name: 'Sarah Johnson',
            role: 'hr_admin',
            departmentId: null,
            organizationId: organization.id,
        },
    })

    const engineeringManager = await prisma.user.upsert({
        where: { email: 'manager@goalflow.com' },
        update: {},
        create: {
            id: 'user-manager',
            email: 'manager@goalflow.com',
            password: hashedPassword,
            name: 'Emily Chen',
            role: 'manager',
            departmentId: engineering.id,
            organizationId: organization.id,
        },
    })

    const employee = await prisma.user.upsert({
        where: { email: 'employee@goalflow.com' },
        update: {},
        create: {
            id: 'user-employee',
            email: 'employee@goalflow.com',
            password: hashedPassword,
            name: 'John Doe',
            role: 'employee',
            departmentId: engineering.id,
            managerId: engineeringManager.id,
            organizationId: organization.id,
        },
    })

    // Update department head
    await prisma.department.update({
        where: { id: engineering.id },
        data: { headId: engineeringManager.id },
    })

    // Create some sample goals
    const companyGoal = await prisma.goal.upsert({
        where: { id: 'goal-company-001' },
        update: {},
        create: {
            id: 'goal-company-001',
            organizationId: organization.id,
            title: 'Achieve 100% team engagement',
            description: 'Increase employee engagement scores across all departments',
            type: 'objective',
            targetValue: 100,
            currentValue: 75,
            confidence: 8,
            startDate: new Date('2025-01-01'),
            endDate: new Date('2025-12-31'),
            status: 'active',
            ownerId: ceo.id,
        },
    })

    const teamGoal = await prisma.goal.upsert({
        where: { id: 'goal-team-001' },
        update: {},
        create: {
            id: 'goal-team-001',
            organizationId: organization.id,
            title: 'Launch new product feature',
            description: 'Complete development and launch of the new analytics dashboard',
            type: 'objective',
            targetValue: 1,
            currentValue: 0.6,
            confidence: 7,
            startDate: new Date('2025-01-01'),
            endDate: new Date('2025-06-30'),
            status: 'active',
            ownerId: engineeringManager.id,
            parentGoalId: companyGoal.id,
            departmentId: engineering.id,
        },
    })

    const personalGoal = await prisma.goal.upsert({
        where: { id: 'goal-personal-001' },
        update: {},
        create: {
            id: 'goal-personal-001',
            organizationId: organization.id,
            title: 'Complete React certification',
            description: 'Obtain React Developer certification',
            type: 'objective',
            targetValue: 1,
            currentValue: 0,
            confidence: 9,
            startDate: new Date('2025-01-01'),
            endDate: new Date('2025-03-31'),
            status: 'active',
            ownerId: employee.id,
            parentGoalId: teamGoal.id,
        },
    })

    console.log('✅ Database seeded successfully!')
    console.log('👤 Created users:')
    console.log('   CEO: ceo@goalflow.com / password123')
    console.log('   HR Admin: hr@goalflow.com / password123')
    console.log('   Manager: manager@goalflow.com / password123')
    console.log('   Employee: employee@goalflow.com / password123')
}

main()
    .catch((e) => {
        console.error('❌ Error seeding database:', e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })