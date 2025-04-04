# Cryptography App

This is a simple web application built with Django and React for encryption and decryption using various algorithms.

## Features

*   **Encryption:** Encrypt text messages using different algorithms.
*   **Decryption:** Decrypt messages back to their original form.
*   **Supported Algorithms:**
    *   One-Time Pad (OTP)
    *   Advanced Encryption Standard (AES)
    *   Triple DES (3DES)
    *   RSA (Rivest-Shamir-Adleman)

## Technologies Used

*   **Frontend:**
    *   React

*   **Backend:**
    *   Django
    *   djangorestframework (DRF)
    *   PyCryptodome (for AES, 3DES, and RSA)
    *   onetimepad (for OTP)

## Setup

1.  **Install Dependencies:**
    *   For the Django backend, navigate to your project directory and run:

        ```bash
        pip install djangorestframework pycryptodome onetimepad
        ```
    *   For the React frontend, navigate to your frontend directory and run:

        ```bash
        npm install
        ```

2.  **Generate RSA Keys (if you plan to use RSA):**
    *   Use OpenSSL to generate a 2048-bit RSA key pair:

        ```bash
        openssl genpkey -algorithm RSA -out private_key.pem -pkeyopt rsa_keygen_bits:2048
        openssl rsa -in private_key.pem -pubout -out public_key.pem
        ```
    *   Keep `private_key.pem` secure. The *contents* of `public_key.pem` will be used for encryption. The *contents* of `private_key.pem` will be used for decryption.

## Usage

1.  **Access the application in your browser:** The React app will typically run on `http://localhost:3000`. The Django server is usually on `http://localhost:8000`, but this is relevant mostly for API interaction.

2.  **General Encryption and Decryption Steps:**
    *   Select an algorithm from the "Choose Algorithm" dropdown.
        ![My Image](/readmefiles/image1.png)
    *   Enter the message you want to encrypt or decrypt in the corresponding text area.
    *   Enter the appropriate key in the "Enter Encryption Key" or "Enter Decryption Key" field. Note the key requirements depending on the algorithm - see the "Key Requirements and Notes" section below.
    *   Click the "Encrypt" or "Decrypt" button.
    *   The result will be displayed in the "Result" section. You can copy it to the clipboard.
        ![My Image](/readmefiles/image2.png)

## RSA-Specific Procedure

*This section details how to use the RSA algorithm within the application.*

1.  **Generating the Key Pair:**
    *   Use the OpenSSL command to generate the private key:

        ```bash
        openssl genpkey -algorithm RSA -out private_key.pem -pkeyopt rsa_keygen_bits:2048
        ```

    *   Select "RSA" from the algorithms dropdown in the encryption section.
        ![My Image](/readmefiles/image6.png)

2.  **Entering the Plaintext:**
    *   Enter the message "Hello Mahder" (or any message you want to encrypt) into the "Enter Message to Encrypt" text area in the React frontend.
        ![My Image](/readmefiles/image7.png)

3.  **Extracting the Public Key:**
    *   Use the OpenSSL command to extract the public key from the private key:

        ```bash
        openssl rsa -in private_key.pem -pubout -out public_key.pem
        ```

    *   The keys are generated as separate `.pem` files.
        ![My Image](/readmefiles/image8.png)

4.  **Copying the Public Key:**
    *   Copy the *entire* content of the `public_key.pem` file, including the `-----BEGIN PUBLIC KEY-----` and `-----END PUBLIC KEY-----` lines.

    ```
    -----BEGIN PUBLIC KEY-----
    MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAlyDls2Z3lLfBcAOV+NSq
    VcTMC5LZRqhWroW+VGhlfzvL8GJNwg3RspuTvieM1h9U+vjCI2Ybexn2tDgp4LML
    LlznXQseYWFyFb5zneNj36roIH+bB820qxneHimmWMsEZVJWHo7Vs1M1b2wxiweL
    rxVNrFgrnVfLn+5wd4pnmJ615mNOi5h9FG81Rbud962AQ6WW69hSClQPFhARu58j
    HkkjgCCkAX5REiO4TWucR8qdnMHBlaYeqCZDTWe3USvCpslSgKdkiFqhwN9/q3s5
    gtvAacui0X04iNsiif/pdS/XNvqY3FAHKM4A1pk8ctrtTRVBKhNQoXPqMrNLvSgI
    jQIDAQAB
    -----END PUBLIC KEY-----
    ```

5.  **Pasting the Public Key:**
    *   Paste the public key (copied from the `public_key.pem` file) into the encryption key field in the React frontend.
        ![My Image](/readmefiles/image9.png)

6.  **Encrypting:**
    *   Click the "Encrypt" button to send an API request to the `/encryptor/` endpoint in Django.
        ![My Image](/readmefiles/image10.png)

7.  **Decrypting:**
    *   Copy the ciphertext from the "Result" section of the encryption panel.
    *   Select "RSA" from the algorithms dropdown in the *decryption* section.
    *   Paste the ciphertext into the decryption input field.
    *   Paste the *entire* content of the `private_key.pem` file into the decryption key field.
        ![My Image](/readmefiles/image11.png)

8.  **Viewing the Decrypted Result:**
    *   Click the "Decrypt" button to send an API request to the `/decryptor/` endpoint in Django and see the decrypted result in the corresponding "Result" section. The decrypted text should match the original "Hello Mahder" message.
        ![My Image](/readmefiles/image12.png)

## API Endpoints (Django)

*   **`/encrypt` (POST):** Encrypts a message.

    *   **Request Body:**

        ```json
        {
            "algorithm": "AES",   // Or "OTP", "3DES", or "RSA"
            "encinput": "Hello World",
            "encryptionkey": "YourSecretKey"  // Depends on algorithm requirement - see notes below
        }
        ```

    *   **Response:**

        ```json
        {
            "enc_ciphertext": "Base64EncodedCiphertext" // Or ciphertext, depending on algorithm
        }
        ```

*   **`/decrypt` (POST):** Decrypts a message.

    *   **Request Body:**

        ```json
        {
            "algorithm": "AES",   // Or "OTP", "3DES", or "RSA"
            "decinput": "Base64EncodedCiphertext",   // Or ciphertext, depending on algorithm
            "decryptionkey": "YourSecretKey"  // Depends on algorithm requirement - see notes below
        }
        ```

    *   **Response:**

        ```json
        {
            "dec_ciphertext": "Hello World"
        }
        ```

## Key Requirements and Notes

*   **OTP:** The key *must* be the same length as the message to encrypt/decrypt. Generate strong, random keys of sufficient length.
*   **AES:**
    *   Key length must be 16, 24, or 32 bytes (128, 192, or 256 bits).
    *   Uses CBC mode with a fixed IV (Initialization Vector). *Important: For production systems, a randomly generated IV should be used per encryption and either prepended to the ciphertext or transmitted separately*.
*   **3DES:**
    *   Key length must be either 16 or 24 bytes (128 or 192 bits).
    *   Uses CBC mode with a fixed IV. *Important: For production systems, a randomly generated IV should be used per encryption and either prepended to the ciphertext or transmitted separately*.
*   **RSA:**
    *   The `encryptionkey` for encryption should be the *content* of the `public_key.pem` file.
    *   The `decryptionkey` for decryption should be the *content* of the `private_key.pem` file.
    *   *Important Security Note:* This example transmits the private key from the client to the server. **This is highly insecure and should NEVER be done in a real application!** The private key should be securely stored on the server and only accessed by the server-side code.

*   **Error Handling:** The API provides basic error responses for invalid input or unsupported algorithms.

*   **Security Warning:** This application is intended for educational purposes and simple demonstration. **Do not use this code in production without addressing critical security concerns**:
    *   Key management: Storing keys in the client-side code or transmitting them in plain text is highly insecure. *Especially for RSA private keys!*
    *   IV handling: Using a fixed IV for AES and 3DES is a major security vulnerability.
    *   Input validation: Thoroughly validate and sanitize all inputs to prevent injection attacks.
    *   **RSA Private Key Handling:** The RSA implementation in this example is vulnerable because it transmits the private key. A secure implementation would store the private key securely on the server and only allow the server to perform decryption operations.

---

**Disclaimer:** This application is provided for educational purposes only. The encryption implementations are simplified and may not be suitable for real-world security applications.