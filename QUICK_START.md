# Quick Start Guide - Admin Panel

## Accessing the Admin Panel

### Step 1: Go to Admin Login
1. Open the application homepage
2. Look for the **gear icon (⚙️)** in the top-right navigation
3. Click the gear icon to access the admin login page
4. Alternatively, go directly to: `/admin/login`

### Step 2: Login with New Password
- **Password**: value configured in `ADMIN_TOKEN`
- Click "Login" button
- You'll be redirected to the admin dashboard

---

## Admin Dashboard Features

### View Reports Statistics
At the top of the dashboard, you'll see 4 cards showing:
- **Total Reports**: All reports in the system
- **Pending Review**: Reports waiting to be reviewed
- **Investigating**: Reports currently being investigated
- **Resolved**: Reports that have been completed

### Filter & Search Reports
Use the filter section to narrow down reports:

#### Search by Title or Tracking Code
- Type in the "Search Reports" field
- Results update in real-time

#### Filter by Status
- **All Status** (default)
- **Pending Review** - New reports not yet reviewed
- **Investigating** - Reports currently under investigation
- **Resolved** - Reports with findings
- **Closed** - Completed and archived

#### Filter by Category
- Workplace Harassment
- Discrimination
- Safety Violations
- Financial Misconduct

#### Filter by Severity
- Critical - Highest priority
- High - Urgent attention needed
- Medium - Standard priority
- Low - Routine handling

### View Report Details
1. Find the report in the table
2. Click the "View" button at the end of the row
3. You'll see:
   - Full report description
   - Reporter contact information (if provided)
   - Current status
   - Investigation notes area

---

## Managing Individual Reports

### View Report Details Page
When you click "View" on a report, you'll see:

#### Left Side (Main Content)
- **Report Description** - Full text of the report
- **Investigation Notes** - A text area where you can add:
  - Investigation findings
  - Evidence collected
  - Actions taken
  - Next steps

#### Right Sidebar
- **Report Information**
  - Category
  - Department
  - Reporter Email (if provided)
  - Reporter Phone (if provided)

- **Status Selector**
  - Change the current status here
  - Options: Pending Review → Investigating → Resolved → Closed

- **Timeline**
  - Created date and time
  - Last updated date and time

### Update Report Status
1. On the report detail page, scroll to the "Status" section on the right
2. Click the dropdown menu
3. Select new status:
   - **Pending Review** - For new unreviewed reports
   - **Investigating** - When you start investigating
   - **Resolved** - When investigation is complete
   - **Closed** - When case is archived
4. Click "Save" button at the top to save changes

### Add Investigation Notes
1. Scroll to "Investigation Notes" section
2. Click in the text area
3. Type your notes (can be multi-line)
4. Include:
   - Investigation findings
   - Evidence and documentation
   - Actions taken
   - Outcomes
5. Click "Save" button at the top

### Save Changes
- Click the blue "Save" button at the top-right
- Wait for the "Changes saved successfully" message
- Your updates are now stored

---

## Admin Settings

### Access Settings
1. In the admin dashboard, click the blue "Settings" button (top-right)
2. You'll be taken to the Admin Settings page

### Change Admin Password
1. On the Settings page, fill in the three password fields:
   - **Current Password** - Your current admin password
   - **New Password** - Your desired new password (minimum 6 characters)
   - **Confirm New Password** - Re-enter the new password

2. To see/hide passwords, click the eye icon next to each field

3. Click "Update Password" button

4. You'll see a success message

5. **Important**: Use your new password to login next time

### Password Requirements
- Minimum 6 characters
- Passwords must match (Current ≠ New)
- For security, use a mix of:
  - Uppercase letters
  - Lowercase letters
  - Numbers
  - Special characters

---

## Logout
1. Click the red "Logout" button in the top-right
2. You'll be returned to the login page
3. Your session is ended

---

## Mobile Usage

### On Smartphones (< 640px)
- Buttons show as icons only (text hidden)
- Forms stack vertically
- Report table hides non-essential columns:
  - **Visible**: Tracking Code, Title, Severity, Status, Action
  - **Hidden**: Category, Date
- Tap the gear icon to access admin panel
- Tap Settings/Logout icons in dashboard

### On Tablets (640px - 1024px)
- Layout adjusts to 2-column grid
- Some text labels show/hide based on space
- Report table shows more columns
- More comfortable for landscape viewing

### On Desktop (> 1024px)
- Full multi-column layouts
- All text labels visible
- Complete report table with all columns
- Optimal viewing and management

---

## Common Tasks

### Task: Review a New Report
1. Go to Admin Dashboard
2. Filter Status = "Pending Review"
3. Find the report in the table
4. Click "View"
5. Read the description
6. Change Status to "Investigating"
7. Add a note: "Received and under investigation"
8. Click "Save"

### Task: Update Investigation Progress
1. Find the report in dashboard or use search
2. Click "View"
3. Go to "Investigation Notes" section
4. Add your findings and next steps
5. If investigation is complete, change Status to "Resolved"
6. Click "Save"

### Task: Close a Case
1. Open the report
2. Change Status to "Resolved" or "Closed"
3. Add final notes summarizing the outcome
4. Click "Save"
5. Report will no longer appear in "Pending" or "Investigating" filters

### Task: Search for Specific Report
1. On dashboard, go to "Search Reports" field
2. Type tracking code or report title
3. Results filter automatically
4. Click "View" on the report you need

### Task: Export Report Data
- Currently reports are viewed in the dashboard table
- You can take screenshots or use browser developer tools to export data
- Contact support for bulk export capabilities

---

## Important Notes

⚠️ **Security Reminders**:
1. Never share your admin password with anyone
2. Always logout when finished managing reports
3. Change your password regularly (at least quarterly)
4. Never discuss report details publicly
5. Maintain confidentiality of reporter identity

⚠️ **Data Protection**:
1. Reporter information is sensitive - handle carefully
2. Investigation notes should be professional
3. Keep detailed but concise records
4. Document all actions taken
5. Follow company confidentiality policies

---

## Troubleshooting

### Issue: Can't login with the password
- **Solution**: Use the password configured in `ADMIN_TOKEN`
- Make sure you're not using the old password
- Clear your browser cache and try again
- Check that Caps Lock is OFF

### Issue: Report table is slow or not loading
- **Solution**: Try refreshing the page
- Reduce filters to show fewer reports
- Check your internet connection
- Try in a different browser

### Issue: Text in form fields is hard to read
- **Solution**: This has been fixed!
- If still an issue, try:
  - Zoom in with browser zoom (Ctrl/Cmd + Plus)
  - Use a different browser
  - Clear browser cache

### Issue: Mobile layout looks broken
- **Solution**: This has been optimized!
- Try rotating your device
- Zoom to 100% (reset zoom if changed)
- Refresh the page

### Issue: Password change not working
- **Solution**:
  - Ensure current password is correct
  - Ensure new passwords match
  - Ensure new password is at least 6 characters
  - Try logging out and logging back in

### Issue: Settings page won't load
- **Solution**:
  - Make sure you're logged in
  - Check browser console for errors
  - Try clearing browser cache
  - Contact support if issue persists

---

## Getting Help

### Contact Support
- **Email**: speakup@abhitech.com
- **Department**: HR / Internal Compliance
- **Hours**: Monday-Friday, 9AM-5PM
- **Response Time**: Within 1 business day

### Report a Bug
Include in your report:
1. What you were trying to do
2. What happened instead
3. Your browser and device
4. Screenshots if applicable

---

## Tips for Effective Report Management

✓ **Best Practices**:
1. Review new reports within 24 hours
2. Update status regularly to reflect progress
3. Keep detailed investigation notes
4. Close cases promptly when resolved
5. Maintain all required documentation
6. Follow up with reporters when appropriate
7. Use consistent status labels
8. Archive old cases regularly

✓ **Documentation Standards**:
1. Be clear and specific
2. Use professional language
3. Record all evidence
4. Date your entries
5. Sign off on completed investigations
6. Include next steps when applicable

---

**Version**: 1.0  
**Last Updated**: August 3, 2024  
**Status**: All features fully implemented and tested
