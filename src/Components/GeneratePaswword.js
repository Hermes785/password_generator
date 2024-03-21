import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faLockOpen } from "@fortawesome/free-solid-svg-icons";

const GeneratePassword = () => {
    const [password, setPassword] = useState('');
    const [length, setLength] = useState('');

    const handleChangeLength = (e) => {
        setLength(e.target.value);
    };

    // Function to generate a random password with all characters
    const generateRandomPasswordWithAll = () => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+~`|}{[]\\:;?><,./-=';
        generatePassword(characters);
    };

    // Function to generate a random password with only letters
    const generateRandomPasswordWithOnlyLetters = () => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        generatePassword(characters);
    };

    // Function to generate a random password with only digits
    const generateRandomPasswordWithOnlyDigits = () => {
        const characters = '0123456789';
        generatePassword(characters);
    };

    // Function to generate a random password with only Letters and  digits
    const generateRandomPasswordWithOnlyLettersAndDigits = () => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        generatePassword(characters);
    };

    // Function to generate password based on provided characters
    const generatePassword = (characters) => {
        const passwordLength = length;
        let newPassword = '';
        for (let i = 0; i < passwordLength; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            newPassword += characters[randomIndex];
        }
        setPassword(newPassword);
    };
    const colorPasword = password.length <= 7 ? { color: 'red' } : password.length <= 8 ? { color: "orange" } : { color: 'green' }
    // Determine password strength based on length
    const getPasswordStrength = () => {
        if (password.length <= 7) {
            return <FontAwesomeIcon icon={faLockOpen} color="red" />;
        } else if (password.length <= 8) {
            return <FontAwesomeIcon icon={faLock} color="orange" />;
        } else {
            return <FontAwesomeIcon icon={faLock} color="green" />;
        }
    };

    useEffect(() => {

    }, [password]);

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-header bg-primary text-white text-center">
                            <h2>Password Generator</h2>
                        </div>
                        <div className="card-body">
                            <div className="form-group">
                                <label htmlFor="passwordLength">Enter Password Length:</label>
                                <input
                                    className="form-control"
                                    type="number"
                                    id="passwordLength"
                                    value={length}
                                    onChange={handleChangeLength}
                                    placeholder="Enter password length"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="generatedPassword">Generated Password:</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    id="generatedPassword"
                                    value={password}
                                    style={colorPasword}
                                    readOnly
                                />
                            </div>
                            <div className="text-center mb-3">
                                <span>Password Strength: {getPasswordStrength()}</span>
                            </div>
                            <div className="text-center mb-2">
                                <button className="btn btn-primary btn-block mb-3" onClick={generateRandomPasswordWithAll}>
                                    Generate with all characters
                                </button>
                            </div>
                            <button className="btn btn-primary btn-block mb-2" onClick={generateRandomPasswordWithOnlyLettersAndDigits}>
                                Generate with digits and letters
                            </button>
                            <div className="mb-2"></div>
                            <button className="btn btn-primary btn-block mb-2" onClick={generateRandomPasswordWithOnlyLetters}>
                                Generate with only letters
                            </button>
                            <div className="mb-2"></div>
                            <button className="btn btn-primary btn-block" onClick={generateRandomPasswordWithOnlyDigits}>
                                Generate with only digits
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GeneratePassword;
