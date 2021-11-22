import React, { useState, useEffect } from 'react';

const Form = () => {
    // 1. Use the name state variable
    const [name, setName] = useState('Mary');
  
    // 2. Use an effect for persisting the form
    useEffect(function persistForm() {
        localStorage.setItem('formData', name);
    });
  
    // 3. Use the surname state variable
    const [surname, setSurname] = useState('Poppins');
  
    // 4. Use an effect for updating the title
    useEffect(function updateTitle() {
        document.title = name + ' ' + surname;
    });

    return '';
};

// ------------
// First render
// ------------
useState('Mary')           // 1. Initialize the name state variable with 'Mary'
useEffect(persistForm)     // 2. Add an effect for persisting the form
useState('Poppins')        // 3. Initialize the surname state variable with 'Poppins'
useEffect(updateTitle)     // 4. Add an effect for updating the title

// -------------
// Second render
// -------------
useState('Mary')           // 1. Read the name state variable (argument is ignored)
useEffect(persistForm)     // 2. Replace the effect for persisting the form
useState('Poppins')        // 3. Read the surname state variable (argument is ignored)
useEffect(updateTitle)     // 4. Replace the effect for updating the title

/* ---------------------------------------------------------------------------------------- */

const FormWrong = () => {
    const [name, setName] = useState('Mary');

    if (name !== '') {
        useEffect(function persistForm() {
            localStorage.setItem('formData', name);
        });
    }
  
    const [surname, setSurname] = useState('Poppins');
    useEffect(function updateTitle() {
        document.title = name + ' ' + surname;
    });

    return '';
};

useState('Mary')           // 1. Read the name state variable (argument is ignored)
// useEffect(persistForm)  // This Hook was skipped!
useState('Poppins')        // 2 (but was 3). Fail to read the surname state variable
useEffect(updateTitle)     // 3 (but was 4). Fail to replace the effect

/* ---------------------------------------------------------------------------------------- */

const FormFixed = ({ isBorken }) => {
    if (isBorken) return '';

    const [name, setName] = useState('Mary');
    useEffect(function persistForm() {
        // This follows the Hook Rules!
        if (name !== '') {
            localStorage.setItem('formData', name);
        }
    });
  
    const [surname, setSurname] = useState('Poppins');
    useEffect(function updateTitle() {
        document.title = name + ' ' + surname;
    });

    return '';
};