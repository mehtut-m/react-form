import React from 'react';
import { isEmpty } from 'validator';

import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Grid from '@mui/material/Grid';

import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';

import { Formik, Field, Form, FieldArray } from 'formik';
import {
  Container,
  FormControl,
  FormLabel,
  Paper,
  Typography,
} from '@mui/material';

export const WithField = () => {
  const validation = (values) => {
    const error = {};
    const { name, pets } = values;

    if (isEmpty(name)) {
      error.name = 'Please Enter Your Name';
    }

    if (pets) {
      pets.forEach((pet) => {
        if (isEmpty(pet.name)) {
          error.pets = 'Please Enter Your Pet Name';
        }
      });
    }
    return error;
  };

  const title = [
    { titleName: 'นาย', gender: 'MALE' },
    { titleName: 'นาง', gender: 'FEMALE' },
    { titleName: 'นางสาว', gender: 'FEMALE' },
  ];

  const petTypes = ['Cat', 'Dog', 'Hamster'];

  return (
    <Paper elevation={3} sx={{ maxWidth: '30rem', margin: 'auto', mt: '3rem' }}>
      <Formik
        initialValues={{
          gender: '',
          title: '',
          name: '',
          pets: null,
        }}
        validate={validation}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          isValid,
          dirty,
          setFieldValue,
        }) => (
          <>
            <Container
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ py: '1rem' }}
            >
              <Grid container rowSpacing={2}>
                <Grid item xs={12} fontSize="20px">
                  <Typography variant="h5">Pet Registration</Typography>
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <Select
                      onChange={handleChange}
                      onBlur={handleBlur}
                      name="gender"
                      value={values.gender}
                      sx={{ textAlign: 'start' }}
                    >
                      <MenuItem value={''} disabled>
                        Select Gender
                      </MenuItem>
                      <MenuItem value="MALE">Male</MenuItem>
                      <MenuItem value="FEMALE">Female</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <Select
                      onChange={handleChange}
                      onBlur={handleBlur}
                      name="title"
                      value={values.title}
                      sx={{ textAlign: 'start' }}
                    >
                      <MenuItem value="" disabled>
                        Select Title
                      </MenuItem>
                      {title
                        .filter(({ gender }) => gender === values.gender)
                        .map((item, index) => (
                          <MenuItem value={item.titleName} key={index}>
                            {item.titleName}
                          </MenuItem>
                        ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <TextField
                      name="name"
                      label="Enter Your Name"
                      variant="outlined"
                      value={values.name}
                      required
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                  </FormControl>
                </Grid>

                <FieldArray name="pets">
                  {({ push, remove }) => (
                    <>
                      <Grid item xs={12}>
                        <FormControl fullWidth>
                          <FormLabel>
                            <Checkbox
                              onClick={(e) => {
                                const checked = e.target.checked;
                                if (checked) {
                                  push({
                                    id: Math.random(),
                                    name: '',
                                    lastName: '',
                                  });
                                } else {
                                  setFieldValue('pets', null);
                                }
                              }}
                              name="havePet"
                            />
                            Have Pet
                          </FormLabel>
                        </FormControl>
                      </Grid>

                      {values.pets && (
                        <>
                          {values.pets.map((item, index) => (
                            <Grid item xs={12} key={`pets[${index}]`}>
                              <Grid container spacing={1}>
                                <Grid item xs={12}>
                                  <FormControl fullWidth>
                                    <Select
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      name={`pets[${index}].type`}
                                      value={item.type + ''}
                                      sx={{
                                        textAlign: 'start',
                                      }}
                                    >
                                      <MenuItem value="" disabled>
                                        Select Type
                                      </MenuItem>
                                      {petTypes.map((item, index) => (
                                        <MenuItem
                                          value={String(item)}
                                          key={index}
                                          sx={{ textTransform: 'capitalize' }}
                                        >
                                          {item}
                                        </MenuItem>
                                      ))}
                                    </Select>
                                  </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                  <FormControl fullWidth>
                                    <TextField
                                      variant="outlined"
                                      label="Enter your pet name"
                                      name={`pets[${index}].name`}
                                      value={item.petName}
                                      required
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                    />
                                  </FormControl>
                                </Grid>
                              </Grid>
                            </Grid>
                          ))}
                          <FormControl fullWidth>
                            <Button
                              type="button"
                              color="primary"
                              variant="outlined"
                              onClick={() =>
                                push({
                                  id: Math.random(),
                                  name: '',
                                  type: '',
                                })
                              }
                              sx={{
                                mt: '2rem',
                                width: '100%',
                                textAlign: 'center',
                              }}
                            >
                              Add
                            </Button>
                          </FormControl>
                        </>
                      )}
                    </>
                  )}
                </FieldArray>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <Button
                      type="submit"
                      variant="contained"
                      fullWidth
                      disabled={!dirty || !isValid}
                    >
                      Submit
                    </Button>
                  </FormControl>
                </Grid>
              </Grid>
            </Container>
          </>
        )}
      </Formik>
    </Paper>
  );
};

export default WithField;
