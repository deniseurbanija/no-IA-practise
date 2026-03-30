/**
 * RAMP BACKEND INTERVIEW PRACTICE - TYPESCRIPT
 *
 * Instructions:
 * - No AI tools allowed during practice
 * - Documentation/Google is fair game
 * - Focus on: clarity, testing, communication
 * - Time yourself: 45 minutes per problem
 * - Test frequently as you code
 *
 * Run with: npx ts-node ramp-practice-exercises.ts
 * Or compile: tsc ramp-practice-exercises.ts && node ramp-practice-exercises.js
 */

// ============================================================================
// EXERCISE 1: EXPENSE REPORT GENERATOR (EASY-MEDIUM)
// Time: 45 minutes
// ============================================================================

interface Transaction {
  id: string;
  date: string; // ISO format: "2024-03-15"
  merchant: string;
  amount: number;
  category?: string;
}

interface ExpenseReport {
  totalSpent: number;
  transactionCount: number;
  byCategory: Record<
    string,
    {
      total: number;
      count: number;
      transactions: Transaction[];
    }
  >;
  byMerchant: Record<string, number>;
  dailyTotals: Record<string, number>;
}

/**
 * Generate a comprehensive expense report from a list of transactions.
 *
 * Requirements:
 * - Calculate total spent and transaction count
 * - Group by category (if category is missing, use "Uncategorized")
 * - Sum amounts by merchant
 * - Calculate daily totals
 * - Handle empty arrays
 * - Handle invalid/negative amounts (skip them)
 *
 * Example:
 * const transactions = [
 *   { id: "1", date: "2024-03-15", merchant: "Starbucks", amount: 5.50, category: "Food" },
 *   { id: "2", date: "2024-03-15", merchant: "Uber", amount: 25.00, category: "Travel" },
 *   { id: "3", date: "2024-03-16", merchant: "Starbucks", amount: 6.00, category: "Food" },
 * ];
 */
function generateExpenseReport(transactions: Transaction[]): ExpenseReport {
  //* YOUR CODE HERE
  const report: ExpenseReport = {
    totalSpent: 0,
    transactionCount: 0,
    byCategory: {},
    byMerchant: {},
    dailyTotals: {},
  };

  for (const transaction of transactions) {
    if (transaction.amount <= 0) {
      continue;
    }

    report.totalSpent += transaction.amount;
    report.transactionCount++;

    const category = transaction.category || "Uncategorized";

    if (!report.byCategory[category]) {
      report.byCategory[category] = {
        total: 0,
        count: 0,
        transactions: [],
      };
    }
    report.byCategory[category].total = +transaction.amount;
    report.byCategory[category].count++;
    report.byCategory[category].transactions.push(transaction);

    if (!report.byMerchant[transaction.merchant]) {
      report.byMerchant[transaction.merchant] = 0;
    }
    report.byMerchant[transaction.merchant] = transaction.amount;

    if (!report.dailyTotals[transaction.date]) {
      report.dailyTotals[transaction.date] = 0;
    }
    report.dailyTotals[transaction.date] = transaction.amount;
  }
  return report;
}

// TEST CASES FOR EXERCISE 1
function testExpenseReport() {
  console.log("Testing Exercise 1: Expense Report Generator\n");

  // Test 1: Basic functionality
  const test1: Transaction[] = [
    {
      id: "1",
      date: "2024-03-15",
      merchant: "Starbucks",
      amount: 5.5,
      category: "Food",
    },
    {
      id: "2",
      date: "2024-03-15",
      merchant: "Uber",
      amount: 25.0,
      category: "Travel",
    },
    {
      id: "3",
      date: "2024-03-16",
      merchant: "Starbucks",
      amount: 6.0,
      category: "Food",
    },
  ];

  const result1 = generateExpenseReport(test1);
  console.assert(
    result1.totalSpent === 36.5,
    "Test 1 failed: Total spent incorrect",
  );
  console.assert(
    result1.transactionCount === 3,
    "Test 1 failed: Transaction count incorrect",
  );
  console.assert(
    result1.byCategory["Food"].total === 11.5,
    "Test 1 failed: Food category total incorrect",
  );

  // Test 2: Empty array
  const result2 = generateExpenseReport([]);
  console.assert(
    result2.totalSpent === 0,
    "Test 2 failed: Empty array should return 0",
  );

  // Test 3: Missing category
  const test3: Transaction[] = [
    { id: "1", date: "2024-03-15", merchant: "Unknown", amount: 10.0 },
  ];
  const result3 = generateExpenseReport(test3);
  console.assert(
    result3.byCategory["Uncategorized"] !== undefined,
    "Test 3 failed: Should have Uncategorized",
  );

  // Test 4: Negative amounts (should be skipped)
  const test4: Transaction[] = [
    {
      id: "1",
      date: "2024-03-15",
      merchant: "Store",
      amount: 50.0,
      category: "Shopping",
    },
    {
      id: "2",
      date: "2024-03-15",
      merchant: "Refund",
      amount: -10.0,
      category: "Shopping",
    },
  ];
  const result4 = generateExpenseReport(test4);
  console.assert(
    result4.transactionCount === 1,
    "Test 4 failed: Should skip negative amounts",
  );

  console.log("✓ All Exercise 1 tests passed!\n");
}

// ============================================================================
// EXERCISE 2: BUDGET TRACKER WITH ALERTS (MEDIUM)
// Time: 45 minutes
// ============================================================================

interface Budget {
  category: string;
  limit: number;
  period: "daily" | "weekly" | "monthly";
}

interface Spending {
  category: string;
  amount: number;
  date: string;
}

interface Alert {
  category: string;
  budgetLimit: number;
  currentSpending: number;
  percentageUsed: number;
  alertLevel: "warning" | "critical" | "exceeded";
  message: string;
}

/**
 * Track spending against budgets and generate alerts.
 *
 * Requirements:
 * - Calculate total spending per category for the current period
 * - Generate alerts at: 75% (warning), 90% (critical), 100%+ (exceeded)
 * - Filter spending by period (daily/weekly/monthly from today)
 * - Only return alerts for categories that need them (≥75%)
 * - Sort alerts by severity (exceeded > critical > warning)
 *
 * Assumptions:
 * - "today" is "2024-03-20"
 * - Weekly period = last 7 days
 * - Monthly period = last 30 days
 *
 * Example alert message: "Warning: 80% of monthly Food budget used ($400/$500)"
 */

// Helper 1
function getMinimumDate(
  today: string,
  period: "daily" | "weekly" | "monthly",
): Date {
  const date = new Date(today);

  const daysToSubtract = {
    daily: 0,
    weekly: 7,
    monthly: 30,
  }[period];

  date.setDate(date.getDate() - daysToSubtract);
  return date;
}
// Helper 2
function getAlertLevel(
  percentage: number,
): "warning" | "critical" | "exceeded" | null {
  if (percentage < 75) return null;
  if (percentage >= 100) return "exceeded";
  if (percentage >= 90) return "critical";
  return "warning";
}
// Helper 3
function createAlert(
  budget: Budget,
  spent: number,
  percentage: number,
  alertLevel: "warning" | "critical" | "exceeded",
): Alert {
  return {
    category: budget.category,
    budgetLimit: budget.limit,
    currentSpending: spent,
    percentageUsed: Math.round(percentage * 100) / 100, // 2 decimales
    alertLevel,
    message: `${alertLevel.charAt(0).toUpperCase() + alertLevel.slice(1)}: ${Math.round(percentage)}% of ${budget.period} ${budget.category} budget used ($${spent}/$${budget.limit})`,
  };
}

// Primary function
function trackBudgets(
  budgets: Budget[],
  spendings: Spending[],
  today: string = "2024-03-20",
): Alert[] {
  const alerts: Alert[] = [];

  // Procesar cada budget
  for (const budget of budgets) {
    // Calcular fecha mínima para este período
    const minimumDate = getMinimumDate(today, budget.period);

    // Filtrar y sumar gastos relevantes
    const spent = spendings
      .filter(
        (spending) =>
          spending.category === budget.category &&
          new Date(spending.date) >= minimumDate,
      )
      .reduce((sum, spending) => sum + spending.amount, 0);

    // Calcular porcentaje usado
    const percentageUsed = (spent / budget.limit) * 100;

    // Determinar si necesita alerta
    const alertLevel = getAlertLevel(percentageUsed);

    if (alertLevel) {
      alerts.push(createAlert(budget, spent, percentageUsed, alertLevel));
    }
  }

  // Sortear por severidad (exceeded > critical > warning)
  const severityOrder = { exceeded: 3, critical: 2, warning: 1 };
  return alerts.sort(
    (a, b) => severityOrder[b.alertLevel] - severityOrder[a.alertLevel],
  );
}

// TEST CASES FOR EXERCISE 2
function testBudgetTracker() {
  console.log("Testing Exercise 2: Budget Tracker\n");

  const budgets: Budget[] = [
    { category: "Food", limit: 500, period: "monthly" },
    { category: "Travel", limit: 100, period: "weekly" },
  ];

  // Test 1: Warning alert (75%)
  const spendings1: Spending[] = [
    { category: "Food", amount: 375, date: "2024-03-15" },
  ];
  const result1 = trackBudgets(budgets, spendings1);
  console.assert(result1.length === 1, "Test 1 failed: Should have 1 alert");
  console.assert(
    result1[0].alertLevel === "warning",
    "Test 1 failed: Should be warning",
  );
  console.assert(
    result1[0].percentageUsed === 75,
    "Test 1 failed: Should be 75%",
  );

  // Test 2: Multiple alerts, sorted by severity
  const spendings2: Spending[] = [
    { category: "Food", amount: 450, date: "2024-03-15" }, // 90% critical
    { category: "Travel", amount: 110, date: "2024-03-19" }, // 110% exceeded
  ];
  const result2 = trackBudgets(budgets, spendings2);
  console.assert(result2.length === 2, "Test 2 failed: Should have 2 alerts");
  console.assert(
    result2[0].alertLevel === "exceeded",
    "Test 2 failed: First should be exceeded",
  );
  console.assert(
    result2[1].alertLevel === "critical",
    "Test 2 failed: Second should be critical",
  );

  // Test 3: No alerts (under 75%)
  const spendings3: Spending[] = [
    { category: "Food", amount: 300, date: "2024-03-15" },
  ];
  const result3 = trackBudgets(budgets, spendings3);
  console.assert(result3.length === 0, "Test 3 failed: Should have no alerts");

  // Test 4: Period filtering (weekly should only count last 7 days)
  const spendings4: Spending[] = [
    { category: "Travel", amount: 50, date: "2024-03-10" }, // Too old for weekly
    { category: "Travel", amount: 80, date: "2024-03-19" }, // Within weekly
  ];
  const result4 = trackBudgets(budgets, spendings4, "2024-03-20");
  console.assert(
    result4.length === 1,
    "Test 4 failed: Should only count recent spending",
  );
  console.assert(
    result4[0].currentSpending === 80,
    "Test 4 failed: Should exclude old spending",
  );

  console.log("✓ All Exercise 2 tests passed!\n");
}

// ============================================================================
// EXERCISE 3: TRANSACTION RECONCILIATION (MEDIUM-HARD)
// Time: 45 minutes
// ============================================================================

interface SystemTransaction {
  id: string;
  amount: number;
  merchant: string;
  date: string;
  cardLast4: string;
}

interface BankTransaction {
  referenceId: string;
  amount: number;
  description: string;
  postedDate: string;
  card: string;
}

interface ReconciliationResult {
  matched: Array<{
    systemTx: SystemTransaction;
    bankTx: BankTransaction;
    matchConfidence: "exact" | "likely" | "fuzzy";
  }>;
  unmatchedSystem: SystemTransaction[];
  unmatchedBank: BankTransaction[];
  discrepancies: Array<{
    systemTx: SystemTransaction;
    bankTx: BankTransaction;
    issue: string;
  }>;
}

/**
 * Reconcile transactions between internal system and bank feed.
 *
 * Requirements:
 * - Match transactions by: ID match, amount + date + card, or fuzzy matching
 * - Identify unmatched transactions on both sides
 * - Flag discrepancies (matched ID but different amounts)
 * - Match confidence levels:
 *   - "exact": IDs match (referenceId === id)
 *   - "likely": Amount, date, and card match
 *   - "fuzzy": Amount and card match, dates within 2 days
 * - Handle amount matching with 0.01 tolerance (floating point)
 *
 * Edge cases:
 * - One transaction might match multiple on other side (choose best match)
 * - Amounts might differ slightly due to rounding
 * - Dates might differ by a day or two (pending vs posted)
 */
function reconcileTransactions(
  systemTxs: SystemTransaction[],
  bankTxs: BankTransaction[],
): ReconciliationResult {
  // YOUR CODE HERE
  throw new Error("Not implemented");
}

// TEST CASES FOR EXERCISE 3
function testReconciliation() {
  console.log("Testing Exercise 3: Transaction Reconciliation\n");

  // Test 1: Exact match by ID
  const systemTxs1: SystemTransaction[] = [
    {
      id: "tx123",
      amount: 100.0,
      merchant: "Coffee Shop",
      date: "2024-03-15",
      cardLast4: "1234",
    },
  ];
  const bankTxs1: BankTransaction[] = [
    {
      referenceId: "tx123",
      amount: 100.0,
      description: "COFFEE SHOP",
      postedDate: "2024-03-15",
      card: "1234",
    },
  ];
  const result1 = reconcileTransactions(systemTxs1, bankTxs1);
  console.assert(
    result1.matched.length === 1,
    "Test 1 failed: Should have 1 match",
  );
  console.assert(
    result1.matched[0].matchConfidence === "exact",
    "Test 1 failed: Should be exact match",
  );

  // Test 2: Likely match (amount + date + card, no ID match)
  const systemTxs2: SystemTransaction[] = [
    {
      id: "sys1",
      amount: 50.0,
      merchant: "Gas Station",
      date: "2024-03-15",
      cardLast4: "5678",
    },
  ];
  const bankTxs2: BankTransaction[] = [
    {
      referenceId: "bank1",
      amount: 50.0,
      description: "GAS STATION",
      postedDate: "2024-03-15",
      card: "5678",
    },
  ];
  const result2 = reconcileTransactions(systemTxs2, bankTxs2);
  console.assert(
    result2.matched.length === 1,
    "Test 2 failed: Should have 1 match",
  );
  console.assert(
    result2.matched[0].matchConfidence === "likely",
    "Test 2 failed: Should be likely match",
  );

  // Test 3: Unmatched transactions
  const systemTxs3: SystemTransaction[] = [
    {
      id: "sys1",
      amount: 100.0,
      merchant: "Store",
      date: "2024-03-15",
      cardLast4: "1234",
    },
  ];
  const bankTxs3: BankTransaction[] = [
    {
      referenceId: "bank1",
      amount: 200.0,
      description: "Different Store",
      postedDate: "2024-03-15",
      card: "5678",
    },
  ];
  const result3 = reconcileTransactions(systemTxs3, bankTxs3);
  console.assert(
    result3.unmatchedSystem.length === 1,
    "Test 3 failed: Should have unmatched system tx",
  );
  console.assert(
    result3.unmatchedBank.length === 1,
    "Test 3 failed: Should have unmatched bank tx",
  );

  // Test 4: Discrepancy (same ID, different amounts)
  const systemTxs4: SystemTransaction[] = [
    {
      id: "tx123",
      amount: 100.0,
      merchant: "Store",
      date: "2024-03-15",
      cardLast4: "1234",
    },
  ];
  const bankTxs4: BankTransaction[] = [
    {
      referenceId: "tx123",
      amount: 105.0,
      description: "STORE",
      postedDate: "2024-03-15",
      card: "1234",
    },
  ];
  const result4 = reconcileTransactions(systemTxs4, bankTxs4);
  console.assert(
    result4.discrepancies.length === 1,
    "Test 4 failed: Should flag discrepancy",
  );

  console.log("✓ All Exercise 3 tests passed!\n");
}

// ============================================================================
// EXERCISE 4: SPENDING PATTERN ANALYZER (HARD)
// Time: 45 minutes
// ============================================================================

interface SpendingPattern {
  pattern: "recurring" | "seasonal" | "unusual" | "normal";
  confidence: number; // 0-100
  details: {
    merchant?: string;
    category?: string;
    averageAmount?: number;
    frequency?: string; // "daily", "weekly", "monthly"
    deviation?: number; // How much this differs from normal
  };
  recommendation?: string;
}

/**
 * Analyze spending patterns and identify interesting behaviors.
 *
 * Requirements:
 * - Identify recurring transactions (same merchant, similar amount, regular interval)
 * - Detect seasonal spending (category spikes in certain periods)
 * - Flag unusual transactions (amount >> average for category)
 * - Provide actionable recommendations
 *
 * Pattern detection rules:
 * - Recurring: 3+ transactions to same merchant, amounts within 10%, similar intervals
 * - Seasonal: Category spending 50%+ above average for that day-of-month
 * - Unusual: Transaction amount > 3x category average
 * - Normal: Everything else
 *
 * Confidence scoring:
 * - Based on sample size and consistency
 * - More data points = higher confidence
 * - Lower variance = higher confidence
 *
 * Example recommendation:
 * - Recurring: "Set up autopay for Netflix ($15.99/month)"
 * - Unusual: "Large purchase at Electronics Store ($1,500) - 5x your usual"
 */
function analyzeSpendingPatterns(
  transactions: Transaction[],
): SpendingPattern[] {
  // YOUR CODE HERE
  throw new Error("Not implemented");
}

// TEST CASES FOR EXERCISE 4
function testSpendingAnalyzer() {
  console.log("Testing Exercise 4: Spending Pattern Analyzer\n");

  // Test 1: Recurring pattern
  const recurring: Transaction[] = [
    {
      id: "1",
      date: "2024-01-15",
      merchant: "Netflix",
      amount: 15.99,
      category: "Entertainment",
    },
    {
      id: "2",
      date: "2024-02-15",
      merchant: "Netflix",
      amount: 15.99,
      category: "Entertainment",
    },
    {
      id: "3",
      date: "2024-03-15",
      merchant: "Netflix",
      amount: 15.99,
      category: "Entertainment",
    },
  ];
  const result1 = analyzeSpendingPatterns(recurring);
  const recurringPattern = result1.find((p) => p.pattern === "recurring");
  console.assert(
    recurringPattern !== undefined,
    "Test 1 failed: Should detect recurring pattern",
  );
  console.assert(
    recurringPattern?.details.merchant === "Netflix",
    "Test 1 failed: Should identify merchant",
  );

  // Test 2: Unusual transaction
  const unusual: Transaction[] = [
    {
      id: "1",
      date: "2024-03-01",
      merchant: "Store",
      amount: 50,
      category: "Shopping",
    },
    {
      id: "2",
      date: "2024-03-05",
      merchant: "Store",
      amount: 60,
      category: "Shopping",
    },
    {
      id: "3",
      date: "2024-03-10",
      merchant: "Store",
      amount: 55,
      category: "Shopping",
    },
    {
      id: "4",
      date: "2024-03-15",
      merchant: "Store",
      amount: 500,
      category: "Shopping",
    }, // Unusual!
  ];
  const result2 = analyzeSpendingPatterns(unusual);
  const unusualPattern = result2.find((p) => p.pattern === "unusual");
  console.assert(
    unusualPattern !== undefined,
    "Test 2 failed: Should detect unusual transaction",
  );
  console.assert(
    unusualPattern?.details.deviation !== undefined,
    "Test 2 failed: Should calculate deviation",
  );

  console.log("✓ All Exercise 4 tests passed!\n");
}

// ============================================================================
// BONUS EXERCISE 5: FRAUD DETECTION (HARD)
// Time: 45-60 minutes
// ============================================================================

interface FraudFlag {
  transactionId: string;
  riskScore: number; // 0-100
  flags: string[];
  recommendation: "approve" | "review" | "block";
  reason: string;
}

/**
 * Detect potentially fraudulent transactions.
 *
 * Risk factors (each adds to risk score):
 * - Multiple transactions in short time (+20 points if 3+ in 1 hour)
 * - Large amount compared to history (+30 points if >5x average)
 * - First time merchant (+10 points)
 * - Unusual location/time (+15 points if transaction at 2-5am)
 * - Round amounts over $100 (+10 points, e.g., $500.00 exactly)
 * - Rapid sequential small transactions (+25 points if 5+ under $10 in 10min)
 *
 * Recommendations:
 * - 0-30: approve
 * - 31-60: review
 * - 61+: block
 */
function detectFraud(
  transaction: Transaction,
  recentHistory: Transaction[],
): FraudFlag {
  // YOUR CODE HERE
  throw new Error("Not implemented");
}

// ============================================================================
// RUN ALL TESTS
// ============================================================================

function runAllTests() {
  console.log("=".repeat(60));
  console.log("RAMP BACKEND INTERVIEW PRACTICE - TYPESCRIPT");
  console.log("=".repeat(60) + "\n");

  try {
    testExpenseReport();
  } catch (e) {
    console.log("❌ Exercise 1 not yet implemented or has errors\n");
  }

  try {
    testBudgetTracker();
  } catch (e) {
    console.log("❌ Exercise 2 not yet implemented or has errors\n");
  }

  try {
    testReconciliation();
  } catch (e) {
    console.log("❌ Exercise 3 not yet implemented or has errors\n");
  }

  try {
    testSpendingAnalyzer();
  } catch (e) {
    console.log("❌ Exercise 4 not yet implemented or has errors\n");
  }

  console.log("=".repeat(60));
  console.log("Practice complete! Review your solutions and refactor.");
  console.log("=".repeat(60));
}

// Uncomment to run tests
runAllTests();
