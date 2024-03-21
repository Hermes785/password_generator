import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faLockOpen } from "@fortawesome/free-solid-svg-icons";

const GeneratePassword = () => {
    const [password, setPassword] = useState('');
    const [length, setLength] = useState(0);
    const [includeLetters, setIncludeLetters] = useState(false);
    const [includeDigits, setIncludeDigits] = useState(false);
    const [includeSpecialCharacters, setIncludeSpecialCharacters] = useState(false);

    const handleChangeLength = (e) => {
        setLength(e.target.value);
    };

    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        if (name === "includeLetters") {
            setIncludeLetters(checked);
        } else if (name === "includeDigits") {
            setIncludeDigits(checked);
        } else if (name === "includeSpecialCharacters") {
            setIncludeSpecialCharacters(checked);
        }
    };


    const colorPasword = password.length <= 6 ? { color: 'red' } : password.length <= 8 ? { color: "orange" } : { color: 'green' }

    // Determine password strength based on length
    const getPasswordStrength = () => {
        if (password.length <= 6) {
            return <FontAwesomeIcon icon={faLockOpen} color="red" />;
        } else if (password.length <= 8) {
            return <FontAwesomeIcon icon={faLock} color="orange" />;
        } else {
            return <FontAwesomeIcon icon={faLock} color="green" />;
        }
    };

    useEffect(() => {
        const generateRandomPassword = () => {
            let characters = '';
            if (includeLetters) characters += 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
            if (includeDigits) characters += '0123456789';
            if (includeSpecialCharacters) characters += '!@#$%^&*()_+~`|}{[]\\:;?><,./-=';
            if (characters === '') return;

            let newPassword = '';
            for (let i = 0; i < length; i++) {
                const randomIndex = Math.floor(Math.random() * characters.length);
                newPassword += characters[randomIndex];
            }
            setPassword(newPassword);
        };
        generateRandomPassword();

    }, [length, includeLetters, includeDigits, includeSpecialCharacters]);

    return (
        <div className="container-fluid mt-5">
            <div className="row justify-content-center">
                <div className="col-md-10">
                    <div className="card border-primary">
                        <div className="card-header bg-primary text-white text-center">
                            <h2>Password Generator</h2>
                        </div>
                        <div className="card-body">
                            <div className="form-group">
                                <label htmlFor="passwordLength">Password Length:</label>
                                <input
                                    className="form-control-range"
                                    type="range"
                                    id="passwordLength"
                                    min="1"
                                    max="50"
                                    value={length}
                                    onChange={handleChangeLength}
                                    style={{ width: "100%" }}
                                />
                                <span className="mt-2">Length: {length}</span>
                            </div>

                            <div className="form-group">
                                <label htmlFor="generatedPassword">Generated Password:</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    id="generatedPassword"
                                    value={password}
                                    readOnly
                                    style={{ ...colorPasword, fontSize: '24px' }}
                                />
                            </div>
                            <div className="text-center mb-3">
                                <span>Password Strength: {getPasswordStrength()}</span>
                            </div>

                            <div className="form-group">
                                <div className="form-check form-check-inline">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        id="includeLetters"
                                        name="includeLetters"
                                        checked={includeLetters}
                                        onChange={handleCheckboxChange}
                                    />
                                    <label className="form-check-label" htmlFor="includeLetters">Letters (A-Z, a-z)</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        id="includeDigits"
                                        name="includeDigits"
                                        checked={includeDigits}
                                        onChange={handleCheckboxChange}
                                    />
                                    <label className="form-check-label" htmlFor="includeDigits">Digits (0-9)</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        id="includeSpecialCharacters"
                                        name="includeSpecialCharacters"
                                        checked={includeSpecialCharacters}
                                        onChange={handleCheckboxChange}
                                    />
                                    <label className="form-check-label" htmlFor="includeSpecialCharacters">Special Characters (!@#$%^&()?";\|")</label>
                                </div>
                            </div>


                        </div>
                    </div>
                </div>
            </div>
        </div>


    );
};

export default GeneratePassword;