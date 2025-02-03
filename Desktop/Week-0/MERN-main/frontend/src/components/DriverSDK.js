// Load the HyperVerge Web SDK
<script src="https://sdk.hyperverge.co/hv-sdk-web/hv-sdk.js"></script>

// Initialize the workflow
const hvSdk = new HyperVergeWebSDK({
  appId: 'yvdxyy', // Replace with your actual App ID
  appKey: '9epukpvlpl1asl3bym4j', // Replace with your actual App Key
  workflowConfig: {
    workflowId: 'Easybus Workflow',
    version: '1.0.0',
    language: 'en',
    properties: {
      enforceCameraCheck: true,
      enableResumeWorkflow: true,
    },
  },
});

// Function to launch the workflow
function startDriverOnboarding() {
  hvSdk.launchWorkflow({
    onComplete: function (response) {
      console.log('Workflow completed:', response);
      handleWorkflowResult(response);
    },
    onError: function (error) {
      console.error('Workflow error:', error);
      alert('Something went wrong. Please try again.');
    },
  });
}

// Handle workflow completion
function handleWorkflowResult(response) {
  const finalAction = response?.result?.summary?.action;
  if (finalAction === 'approve') {
    alert('Driver KYC Approved!');
  } else if (finalAction === 'manualReview') {
    alert('Driver KYC requires manual review.');
  } else {
    alert('Driver KYC Declined. Please try again.');
  }
}

// Event listener to start onboarding
document.getElementById('startOnboardingBtn').addEventListener('click', startDriverOnboarding);
