# STRUCTURE DES DONNEES

USER
  id
  username
  password
  role
  status
  createdAt

Member
  id
  userId
  memberNumber
  firstName
  lastName
  phone
  initialDeposit
  createdAt

Loan
  id
  memberId
  type
  amount
  interestRate
  interestAmount
  totalAmount
  startDate
  dueDate
  status

Payment
  id
  loanId
  amount
  capitalAmount
  InterestAmount
  paymentDate

Transaction
  id
  memberId
  type
  amount
  reference
  description
  createdAt

TRANSACTION_TYPE
  INITIAL_DEPOSIT
  ACTION
  DEPOSIT
  WITHDRAWAL
  LOAN_DISBURSEMENT
  LOAN_PAYMENT
  INTEREST
  DISTRIBUTION

InterestDistribution
  id
  memberId
  period
  amount
  calculationBasis

# AUTHENTIFICATION/GESTION MEMBRE
  Auth
  User
  Member
  Roles
  Database 

# TRANSACTIONS/ACTIONS/DEPOTS/RETRAITS
  Action
  Depot
  Balance
  Historique

# PRET
  WORKFLOW (demande de pret)
  Validation admin
  Calcul 10%/15%
  Limite 2x Actions
  verification 1 pret actif

# REMBOURSEMENT
  Paiement
  Capital restant
  Interet restant
  Echeance
  Overdue 

# REPARTITION DES INTERETS

# DASHBOARD
  DASHBOARD_MEMBRE
  DASHBOARD_ADMIN
  STATISTIQUES
  MENU ADMIN

# SECURITE
  Audit logs
  Permissions
  Validation
  Protection API
  Historique immutable