import React, { useState, useEffect, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faLockOpen } from "@fortawesome/free-solid-svg-icons";
import copy from "copy-to-clipboard";

const GeneratePassword = () => {
    const [password, setPassword] = useState('');
    const [length, setLength] = useState(0);
    const [includeLetters, setIncludeLetters] = useState(false);
    const [includeDigits, setIncludeDigits] = useState(false);
    const [includeSpecialCharacters, setIncludeSpecialCharacters] = useState(false);
    const [successMessage, setSuccesMessage] = useState('')
    const [errorMessage, setErrorMessage] = useState('')


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

    const copyPassWord = () => {

        if (password.length === 0) {
            setErrorMessage("Password is empty");
            setTimeout(function () {
                setErrorMessage('');
            }, 3000);
        } else {
            copy(password)
            setSuccesMessage(`successful copy `);
            setTimeout(function () {
                setSuccesMessage('');
            }, 3000);

        }

    }


    const colorPasword = password.length <= 6 ? { color: 'red' } : password.length <= 8 ? { color: "orange" } : { color: 'green' }

    // Determine password strength based on length
    const getPasswordStrength = () => {
        if (password.length === 0) return
        if (password.length <= 6) {
            return <FontAwesomeIcon icon={faLockOpen} color="red" />;
        } else if (password.length <= 8) {
            return <FontAwesomeIcon icon={faLock} color="orange" />;
        } else {
            return <FontAwesomeIcon icon={faLock} color="green" />;
        }
    };
    const generateRandomPassword = useCallback(() => {
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
    }, [length, includeLetters, includeDigits, includeSpecialCharacters]);

    useEffect(() => {
        generateRandomPassword();
    }, [generateRandomPassword]);

    return (
        <div className="container-fluid mt-5">
            {errorMessage && <h6 className="text-danger">{errorMessage}</h6>}
            {successMessage && <h6 className="text-success">{successMessage}</h6>}
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
                                    min="0"
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

                            <div className="text-center mb-3">
                                <button className="btn btn-primary" onClick={generateRandomPassword}>Regenerate Password</button>

                            </div>
                            <div className="text-center mb-3">
                                <button onClick={copyPassWord} id="copyButton" className="btn btn-primary">
                                    copy password
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>


    );
};

export default GeneratePassword;