
import { useCallback } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
    
const ReCaptchaComponent = () => {
  const { executeRecaptcha } = useGoogleReCaptcha();

  // Create an event handler so you can call the verification on button click event or form submit
  const handleReCaptchaVerify = useCallback(async () => {
    if (!executeRecaptcha) {
      console.log('Execute recaptcha not yet available');
      return;
    }

    const token = await executeRecaptcha();

    return token;
  }, [executeRecaptcha]);
    
  return { handleReCaptchaVerify };
};

export default ReCaptchaComponent;