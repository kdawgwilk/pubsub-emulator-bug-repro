# PubSub Emulator Memory Leak Reproduction

This repository demonstrates a memory leak issue with the Firebase PubSub emulator where new node processes are created for each event and aren't properly terminated.

## Issue Description

When running Firebase Functions with PubSub triggers in the emulator, each published message creates a new node process that persists even after the function execution completes. This leads to memory exhaustion as more messages are processed.

## Steps to Reproduce

1. Clone this repository:
```bash
git clone https://github.com/kdawgwilk/pubsub-emulator-bug-repro
cd pubsub-emulator-bug-repro
```

2. Install dependencies:
```bash
cd functions
npm install
```

3. Start the Firebase emulators:
```bash
npm run serve -- --project <your-firebase-project-id>
```

4. In a separate terminal, run the test script:
```bash
GCLOUD_PROJECT=<your-firebase-project-id> \
FIREBASE_AUTH_EMULATOR_HOST=localhost:9099 \
FIRESTORE_EMULATOR_HOST=localhost:8080 \
PUBSUB_EMULATOR_HOST=localhost:8085 \
npx tsx ./functions/scripts/test_pubsub.ts
```

5. Open Activity Monitor (macOS) or Task Manager (Windows) to observe the growing number of node processes.

## Expected Behavior

Node processes should terminate after each function execution completes.

## Actual Behavior

Node processes persist after function execution, accumulating with each new PubSub message and consuming system memory.

## Environment

- firebase-tools: 13.29.1
- Platform: macOS
- Node.js: [Your Node.js version]

## Related Issues

- Issue: https://github.com/firebase/firebase-tools/issues/8113

## Repository Structure

- `functions/src/index.ts` - Contains the PubSub trigger function
- `functions/scripts/test_pubsub.ts` - Test script to publish messages
