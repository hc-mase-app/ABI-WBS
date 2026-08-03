# Admin Dashboard Guide

## Accessing the Admin Panel

1. Go to the **Admin** link in the navigation bar or visit: `/admin/login`
2. Enter the admin password (default: `admin-secret-token-change-me`)
3. You'll be redirected to the Dashboard

## Features

### 1. Dashboard Overview
- **Statistics Card**: View total reports, open, investigating, and resolved counts
- **Quick Filters**: Filter reports by status, category, and severity
- **Search**: Find reports by title or tracking code

### 2. Report Management
- **Status View**: See all submitted reports in a table with key information
- **Color Coding**: 
  - 🔵 Blue = Critical/Urgent
  - 🟠 Orange = High Priority  
  - 🟡 Yellow = Medium
  - 🟢 Green = Low Priority

### 3. Report Details Page
Click "Lihat Detail" (View Detail) on any report to:
- View complete report description
- Add or edit investigation notes
- Update report status (Open → Investigating → Resolved → Closed)
- See reporter contact information
- Track timeline of actions

### 4. Status Management
Update report status to track progress:
- **Belum Ditinjau (Open)**: New reports not yet reviewed
- **Sedang Diinvestigasi (Investigating)**: Active investigation in progress
- **Selesai (Resolved)**: Investigation completed and resolved
- **Ditutup (Closed)**: Case closed and documented

## Security Notes

### Token Management
- Admin token is stored in browser localStorage after login
- Token is validated server-side for every API request
- Logout clears the token from storage

### Environment Variables
Update the admin password in production:
```bash
# Set this in your environment
ADMIN_TOKEN=your-secure-password-here
```

Default password (should be changed):
```
admin-secret-token-change-me
```

## API Endpoints

### Get Reports
```
GET /api/admin/reports
Headers: x-admin-token: <token>
Query Params:
  - status: open|investigating|resolved|closed
  - category: <category>
  - severity: critical|high|medium|low
  - limit: (default 50)
  - offset: (default 0)
```

### Update Report
```
PATCH /api/admin/reports
Headers: x-admin-token: <token>
Body: {
  reportId: string,
  status: string,
  adminNotes: string
}
```

## Tips for Admins

1. **Regular Check-ins**: Review dashboard daily for new reports
2. **Investigation Notes**: Add detailed notes as you investigate
3. **Status Updates**: Keep status updated to reflect current progress
4. **Response Time**: Try to acknowledge reports within 24 hours
5. **Documentation**: Maintain thorough records in admin notes

## Troubleshooting

### Can't login?
- Check admin password is correct
- Ensure browser localStorage is enabled
- Try clearing browser cache

### Reports not showing?
- Verify you're authenticated (check localStorage for `adminToken`)
- Check filters aren't too restrictive
- Refresh the page

### Changes not saving?
- Verify network connection
- Check browser console for errors
- Ensure admin token is still valid

## Next Steps

- Customize the admin password in environment variables
- Add email notifications for new reports
- Integrate with your HR/Investigation system
- Set up automated escalation rules
