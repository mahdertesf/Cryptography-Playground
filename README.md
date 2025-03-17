# Cryptography App

This is a simple web application built with Django and React for encryption and decryption using various algorithms.

## Features

*   **Encryption:** Encrypt text messages using different algorithms.
*   **Decryption:** Decrypt messages back to their original form.
*   **Supported Algorithms:**
    *   One-Time Pad (OTP)
    *   Advanced Encryption Standard (AES)
    *   Triple DES (3DES)

## Technologies Used

*   **Frontend:**
    *   React


*   **Backend:**
    *   Django
    *   djangorestframework (DRF)
    *   PyCryptodome (for AES and 3DES)
    *   onetimepad (for OTP)



## Usage

1.  **Access the application in your browser:** The React app will typically run on `http://localhost:3000`. The Django server is usually on `http://localhost:8000`, but this is relevant mostly for API interaction.

2.  **Encryption:**
    *   Select an algorithm from the "Choose Algorithm" dropdown.
    ![My Image](/readmefiles/image1.png)
    *   Enter the message you want to encrypt in the "Enter Message to Encrypt" text area.
    *   Enter the encryption key in the "Enter Encryption Key" field.  Note the key requirements depending on algorithm - see notes section.
    *   Click the "Encrypt" button.
    *   The encrypted message will be displayed in the "Result" section. You can copy it to the clipboard.
    ![My Image](/readmefiles/image2.png)

3.  **Decryption:**
    *   Select the same algorithm used for encryption.
    ![My Image](/readmefiles/image3.png)
    *   Enter the encrypted message in the "Enter Message to Decrypt" text area.
    *   Enter the *same* encryption key used for encryption in the "Enter Decryption Key" field.
    ![My Image](/readmefiles/image4.png)
    *   Click the "Decrypt" button.
    *   The decrypted message will be displayed in the "Result" section. You can copy it to the clipboard.
    ![My Image](/readmefiles/image5.png)

## API Endpoints (Django)

*   **`/encrypt` (POST):** Encrypts a message.
    *   **Request Body:**

        ```json
        {
            "algorithm": "AES",   // Or "OTP", or "3DES"
            "encinput": "Hello World",
            "encryptionkey": "YourSecretKey"  //Depends on algorithm requirement

        }
        ```

    *   **Response:**

        ```json
        {
            "enc_ciphertext": "Base64EncodedCiphertext" //Or ciphertext, depending on algorithm
        }
        ```

*   **`/decrypt` (POST):** Decrypts a message.
    *   **Request Body:**

        ```json
        {
            "algorithm": "AES",   // Or "OTP", or "3DES"
            "decinput": "Base64EncodedCiphertext",   //Or ciphertext, depending on algorithm
            "decryptionkey": "YourSecretKey"  //Depends on algorithm requirement
        }
        ```

    *   **Response:**

        ```json
        {
            "dec_ciphertext": "Hello World"
        }
        ```

## Key Requirements and Notes

*   **OTP:**  The key *must* be the same length as the message to encrypt/decrypt.  Generate strong, random keys of sufficient length.
*   **AES:**
    *   Key length must be 16, 24, or 32 bytes (128, 192, or 256 bits).
    *   Uses CBC mode with a fixed IV (Initialization Vector).  *Important: For production systems, a randomly generated IV should be used per encryption and either prepended to the ciphertext or transmitted separately*.
*   **3DES:**
    *   Key length must be either 16 or 24 bytes (128 or 192 bits).
    *   Uses CBC mode with a fixed IV. *Important: For production systems, a randomly generated IV should be used per encryption and either prepended to the ciphertext or transmitted separately*.

*   **Error Handling:**  The API provides basic error responses for invalid input or unsupported algorithms.

*   **Security Warning:** This application is intended for educational purposes and simple demonstration.  **Do not use this code in production without addressing critical security concerns**:
    *   Key management: Storing keys in the client-side code or transmitting them in plain text is highly insecure.
    *   IV handling:  Using a fixed IV for AES and 3DES is a major security vulnerability.
    *   Input validation:  Thoroughly validate and sanitize all inputs to prevent injection attacks.
