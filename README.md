# Abhitech Speak Up System

A secure, confidential whistleblowing and employee feedback platform built with Next.js, Neon Postgres, Drizzle ORM, and Better Auth.

## Overview

The Abhitech Speak Up System provides employees with a safe, anonymous channel to report concerns, grievances, and misconduct. The platform prioritizes privacy, confidentiality, and protection against retaliation.

## Key Features

- **Secure Anonymous Reporting**: Submit reports with full anonymity protection
- **Encrypted Communication**: End-to-end encrypted data transmission
- **Report Tracking**: Real-time status updates on submitted reports
- **Multiple Report Categories**: 
  - Workplace Harassment
  - Discrimination
  - Safety Violations
  - Financial Misconduct
  - Code of Conduct Violations
  - Management Abuse
  - And more...
- **Severity Classification**: Low, Medium, High, Critical
- **Department Tracking**: Categorize reports by department
- **Anti-Retaliation Policy**: Strictly enforced zero-tolerance policy
- **User Authentication**: Secure email and password authentication with Better Auth
- **Responsive Design**: Mobile-first design with Tailwind CSS

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Database**: Neon Postgres with Drizzle ORM
- **Authentication**: Better Auth
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **Database Pooling**: pg (Node.js driver)
- **Utilities**: nanoid (ID generation)

## Project Structure

```
├── app/
│   ├── api/
│   │   └── auth/[...all]/         # Better Auth API handler
│   ├── actions/
│   │   └── reports.ts             # Server actions for reports
│   ├── dashboard/
│   │   └── page.tsx               # User dashboard
│   ├── submit/
│   │   └── page.tsx               # Report submission page
│   ├── reports/
│   │   └── [id]/page.tsx          # Report detail view
│   ├── sign-in/page.tsx           # Sign-in page
│   ├── sign-up/page.tsx           # Sign-up page
│   ├── page.tsx                   # Landing page
│   ├── layout.tsx                 # Root layout
│   └── globals.css                # Global styles
├── components/
│   ├── auth-form.tsx              # Shared auth form
│   ├── report-form.tsx            # Report submission form
│   └── ui/                        # shadcn components
├── lib/
│   ├── auth.ts                    # Better Auth configuration
│   ├── auth-client.ts             # Client-side auth
│   ├── db/
│   │   ├── index.ts               # Drizzle client
│   │   └── schema.ts              # Database schema
├── data/
│   └── Kuesioner-*.docx           # Original questionnaire
├── package.json
├── tsconfig.json
├── next.config.mjs
└── tailwind.config.ts
```

## Database Schema

### User Tables (Better Auth)
- `user`: User profiles
- `session`: Active sessions
- `account`: OAuth accounts
- `verification`: Email verification

### Application Tables
- `reports`: Main report submissions
- `report_responses`: Follow-up responses from administrators
- `report_attachments`: File attachments for reports
- `report_comments`: Comments and updates on reports
- `admin_settings`: System configuration

## Setup & Installation

### Prerequisites
- Node.js 18+
- pnpm (or npm/yarn)
- Neon Postgres database account
- Environment variables configured

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd speak-up-system
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file with:
   ```
   DATABASE_URL=<your-neon-database-url>
   DATABASE_URL_UNPOOLED=<your-unpooled-database-url>
   BETTER_AUTH_SECRET=<generate-with-openssl-rand-base64-32>
   BETTER_AUTH_URL=http://localhost:3000
   ADMIN_TOKEN=<your-strong-admin-password>
   ```

   **Generate BETTER_AUTH_SECRET:**
   ```bash
   openssl rand -base64 32
   ```

4. **Run the development server**
   ```bash
   pnpm dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

## Usage

### For Employees
1. **Sign Up**: Create an account with email and password
2. **Submit Report**: Navigate to "Submit a Report" or "/submit"
3. **Fill Form**: Complete all required fields
4. **Choose Privacy**: Select anonymous submission if desired
5. **Track Status**: View your reports on the dashboard

### Report Categories
- **Workplace Harassment**: Inappropriate behavior or hostile environment
- **Discrimination**: Unfair treatment based on protected characteristics
- **Safety Violations**: Unsafe working conditions or practices
- **Financial Misconduct**: Fraud, embezzlement, or improper accounting
- **Code of Conduct Violations**: Breaches of company policies
- **Management Abuse**: Improper supervisor behavior
- **Other**: Additional concerns

### Severity Levels
- **Low**: Minor issues requiring attention
- **Medium**: Moderate concerns needing investigation
- **High**: Serious matters requiring urgent action
- **Critical**: Severe issues with immediate safety/compliance impact

## API Routes

### Authentication
- `POST /api/auth/sign-up` - Create new account
- `POST /api/auth/sign-in` - Sign in user
- `POST /api/auth/sign-out` - Sign out user
- `GET /api/auth/session` - Get current session

### Server Actions
- `createReport()` - Submit new report
- `getMyReports()` - Retrieve user's reports
- `getReportById()` - Get specific report details
- `updateReportStatus()` - Update report status
- `addReportResponse()` - Add response to report
- `addReportComment()` - Add comment to report
- `deleteReport()` - Delete report

## Pages

### Public Pages
- `/` - Landing page
- `/sign-in` - User login
- `/sign-up` - User registration

### Protected Pages
- `/dashboard` - User dashboard with report summary
- `/submit` - Submit new report with guidelines
- `/reports/[id]` - View specific report details

## Security Features

- **End-to-End Encryption**: All communication is encrypted
- **Anonymous Submission**: Option to hide user identity
- **Anti-Retaliation Policy**: Strict enforcement and protection
- **Session Management**: Secure cookie-based sessions
- **Input Validation**: All user inputs are validated
- **SQL Injection Prevention**: Parameterized queries via Drizzle
- **CSRF Protection**: Built-in by Better Auth
- **Row-Level Security**: Per-user data isolation

## Deployment

### Deploy to Vercel

1. **Push to GitHub**
   ```bash
   git push origin main
   ```

2. **Import to Vercel**
   - Go to vercel.com
   - Click "Import Project"
   - Select your GitHub repository

3. **Configure Environment Variables**
   - Add all `.env.local` variables to Vercel project settings
   - Ensure `BETTER_AUTH_SECRET` is set

4. **Deploy**
   - Vercel automatically deploys on push
   - Update `BETTER_AUTH_URL` to your production domain

## Development

### Hot Module Replacement
The app uses Next.js Fast Refresh for instant updates during development.

### Database Migrations
Run schema updates directly through Neon MCP or SQL commands.

### Adding New Components
```bash
pnpm exec shadcn add <component-name>
```

## Testing

### Manual Testing Checklist
- [ ] Landing page loads correctly
- [ ] Sign-up creates account
- [ ] Sign-in authenticates user
- [ ] Can submit report
- [ ] Anonymous toggle works
- [ ] Dashboard displays reports
- [ ] Report detail page works
- [ ] Status updates persist
- [ ] Mobile responsive

## Troubleshooting

### Database Connection Issues
- Verify `DATABASE_URL` is correct
- Check Neon firewall settings
- Ensure connection pooling is enabled

### Authentication Not Working
- Verify `BETTER_AUTH_SECRET` is set
- Check session cookie settings
- Clear browser cookies and retry

### Build Errors
- Run `pnpm install` to update dependencies
- Clear `.next` directory: `rm -rf .next`
- Rebuild: `pnpm dev`

## Support & Contact

For issues or support:
- **Email**: speakup@abhitech.com
- **Phone**: +62 XXX-XXXX-XXXX
- **Hours**: Monday-Friday, 9 AM - 5 PM

## Privacy Policy

Your privacy is our priority. All reports are:
- Encrypted in transit and at rest
- Accessible only to authorized personnel
- Protected under anti-retaliation policies
- Never shared without your consent

## Anti-Retaliation Policy

Abhitech is committed to:
- Zero tolerance for retaliation
- Confidentiality of reporters
- Fair investigation processes
- Protection of whistleblowers
- Compliance with applicable laws

## Contributing

To contribute to this project:
1. Create a feature branch
2. Make your changes
3. Submit a pull request
4. Ensure all tests pass

## License

This project is proprietary to Abhitech and is not available for public use.

## Version History

- **v1.0.0** (Initial Release)
  - User authentication
  - Report submission
  - Report tracking
  - Anonymous reporting
  - Dashboard with statistics

---

Built with ❤️ for employee protection and organizational integrity.
