# Backend Interview Practice - TypeScript

Practice exercises tailored for Ramp's backend engineering interview.

## 🎯 Quick Start

### Setup (5 minutes)

```bash
# Install dependencies
npm install

# Run tests
npm test

# Or run with auto-reload during development
npm run watch
```

### Without npm (alternative)

```bash
# Install TypeScript globally
npm install -g typescript ts-node

# Run directly
ts-node ramp-practice-exercises.ts

# Or compile and run
tsc ramp-practice-exercises.ts
node ramp-practice-exercises.js
```

## 📋 Exercises

### Exercise 1: Expense Report Generator (Easy-Medium, 45 min)
**Real-world scenario**: Generate comprehensive expense reports from transaction data.

**Skills tested**:
- Data aggregation and grouping
- Object/Map manipulation
- Edge case handling
- Test-driven development

**Key challenges**:
- Handle missing categories
- Filter invalid data
- Multiple grouping dimensions (category, merchant, date)

---

### Exercise 2: Budget Tracker with Alerts (Medium, 45 min)
**Real-world scenario**: Monitor spending against budgets and alert users.

**Skills tested**:
- Date calculations and period filtering
- Threshold-based alerting
- Sorting and prioritization
- Business logic implementation

**Key challenges**:
- Different time periods (daily/weekly/monthly)
- Alert level determination (75%, 90%, 100%+)
- Alert sorting by severity

---

### Exercise 3: Transaction Reconciliation (Medium-Hard, 45 min)
**Real-world scenario**: Match internal transactions with bank feed data.

**Skills tested**:
- Multi-criteria matching algorithms
- Fuzzy matching logic
- Discrepancy detection
- Complex data transformation

**Key challenges**:
- Multiple matching strategies (exact, likely, fuzzy)
- Handling one-to-many matches
- Floating-point comparison
- Date tolerance

---

### Exercise 4: Spending Pattern Analyzer (Hard, 45 min)
**Real-world scenario**: Identify recurring payments and unusual spending.

**Skills tested**:
- Statistical analysis
- Pattern recognition
- Confidence scoring
- Actionable recommendations

**Key challenges**:
- Detecting regularity in noisy data
- Calculating meaningful averages and deviations
- Confidence calculation
- User-facing recommendations

---

### Exercise 5: Fraud Detection (Bonus - Hard, 45-60 min)
**Real-world scenario**: Flag potentially fraudulent transactions.

**Skills tested**:
- Risk scoring algorithms
- Time-series analysis
- Anomaly detection
- Decision rule engines

**Key challenges**:
- Multi-factor risk assessment
- Time-based pattern detection
- Weighted scoring system

## 🎓 Practice Strategy

### Before Starting
1. **Read the problem carefully** - Note requirements, edge cases, examples
2. **Plan your approach** - Pseudocode or outline (5 minutes)
3. **Set a timer** - 45 minutes per exercise
4. **No AI tools** - Documentation/Google OK, ChatGPT/Copilot NOT OK

### During Practice
1. **Write tests first** - Or at least think through test cases
2. **Start simple** - Get basic case working, then handle edge cases
3. **Test frequently** - Run tests after each major change
4. **Think out loud** - Practice explaining your approach
5. **Refactor** - Make it clean and modular

### After Each Exercise
1. **Review your solution** - Could it be clearer? More efficient?
2. **Check edge cases** - Did you handle all of them?
3. **Time reflection** - What took longest? What was easiest?
4. **Compare approaches** - Could you solve it differently?

## 🔑 What Ramp Evaluates

Based on the interview guide:

| Competency | What They Look For |
|------------|-------------------|
| **Planning & Problem Solving** | Structured thinking, tradeoffs, clarifying questions |
| **Code Execution** | Clarity, modularity, fluency in chosen language |
| **Debugging & Testing** | Frequent testing, efficient problem-solving |
| **Speed & Execution** | Ability to move fast to find great solution |
| **Communication** | Clear thinking, technical dialogue, steady cadence |

## 💡 Tips from the Ramp Interview Guide

✅ **DO:**
- Use TypeScript/Python/whatever you're strongest in
- Look up documentation and syntax
- Ask clarifying questions
- Test frequently
- Communicate your thought process
- Move quickly but deliberately

❌ **DON'T:**
- Use AI code generation tools (ChatGPT, Copilot, etc.)
- Expect LeetCode-style algorithmic puzzles
- Stay silent - explain your thinking
- Skip testing until the end
- Overcomplicate the solution

## 📚 Useful TypeScript References

While practicing, you might need to look up:

- Array methods: `map`, `filter`, `reduce`, `find`, `some`, `every`
- Object methods: `Object.keys`, `Object.values`, `Object.entries`
- Date manipulation: `new Date()`, date arithmetic
- Set operations: `new Set()`, `has`, `add`, `delete`
- Map operations: `new Map()`, `get`, `set`, `has`
- String methods: `split`, `toLowerCase`, `includes`, `trim`
- Number methods: `toFixed`, `parseInt`, `parseFloat`
- Sort with custom comparators: `array.sort((a, b) => ...)`

## 🤝 Good Luck!

Remember: Ramp wants to see how you think and solve real problems. Focus on:
- Clear communication
- Practical solutions
- Good testing habits
- Moving efficiently

The goal isn't perfection - it's demonstrating strong problem-solving and coding fundamentals.
