import { Box } from '@mui/system';
import { Formik } from 'formik';
import React, { useState } from 'react';

function StepperFormik() {
  const [steps, setSteps] = useState(0);
  const totalSteps = 3;

  return <Box>StepperFormik</Box>;
}

const FormikStepper = ({ children }) => {
  <Formik>{children}</Formik>;
};

export default StepperFormik;
