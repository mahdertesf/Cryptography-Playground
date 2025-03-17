from django.shortcuts import render
from rest_framework.decorators import api_view
from django.http import JsonResponse
import onetimepad
from Crypto.Cipher import AES, DES3
from Crypto.Util.Padding import pad, unpad
import base64



@api_view(["POST"])
def encryptorView(request):
    data = request.data
    try:
        if data.get("algorithm") == "OTP":
            plaintext = data.get("encinput")
            custom_key = data.get("encryptionkey")
            ciphertext = onetimepad.encrypt(plaintext, custom_key)
            return JsonResponse({"enc_ciphertext": ciphertext})

        elif data.get("algorithm") == "AES":
            key = (data.get("encryptionkey")).encode('utf-8')
            if len(key) not in (16, 24, 32):
                raise ValueError("AES key must be either 16, 24, or 32 bytes long")
            plaintext = data.get("encinput").encode()
            iv = b'1234567890123456'
            cipher = AES.new(key, AES.MODE_CBC, iv)
            padded_plaintext = pad(plaintext, AES.block_size)
            ciphertext = cipher.encrypt(padded_plaintext)
            ciphertext_base64 = base64.b64encode(ciphertext).decode('utf-8')
            return JsonResponse({"enc_ciphertext": ciphertext_base64})

        elif data.get("algorithm") == "3DES":
            key = (data.get("encryptionkey")).encode('utf-8')
            if len(key) not in (16, 24):
                raise ValueError("3DES key must be either 16 or 24 bytes long")
            plaintext = data.get("encinput").encode()
            iv = b'12345678'
            cipher = DES3.new(key, DES3.MODE_CBC, iv)
            padded_plaintext = pad(plaintext, DES3.block_size)
            ciphertext = cipher.encrypt(padded_plaintext)
            ciphertext_base64 = base64.b64encode(ciphertext).decode('utf-8')
            return JsonResponse({"enc_ciphertext": ciphertext_base64})

        else:
            raise ValueError("Unsupported algorithm")

    except Exception as e:
        return JsonResponse({"error": str(e)}, status=400)

@api_view(["POST"])
def decryptorView(request):
    data = request.data
    try:
        if data.get("algorithm") == "AES":
            decryption_key = data.get("decryptionkey")
            if not decryption_key:
                raise ValueError("Decryption key is missing")
            key = decryption_key.encode('utf-8')
            if len(key) not in (16, 24, 32):
                raise ValueError("AES key must be either 16, 24, or 32 bytes long")
            ciphertext_base64 = data.get("decinput")
            if not ciphertext_base64:
                raise ValueError("Ciphertext is missing")
            try:
                ciphertext = base64.b64decode(ciphertext_base64)
            except base64.binascii.Error:
                raise ValueError("Invalid Base64 ciphertext")
            iv = b'1234567890123456'
            cipher = AES.new(key, AES.MODE_CBC, iv)
            decrypted_padded_plaintext = cipher.decrypt(ciphertext)
            decrypted_plaintext = unpad(decrypted_padded_plaintext, AES.block_size).decode('utf-8')
            return JsonResponse({"dec_ciphertext": decrypted_plaintext})

        elif data.get("algorithm") == "OTP":
            ciphertext = data.get("decinput")
            custom_key = data.get("decryptionkey")
            if not ciphertext or not custom_key:
                raise ValueError("Ciphertext or decryption key is missing")
            plaintext = onetimepad.decrypt(ciphertext, custom_key)
            return JsonResponse({"dec_ciphertext": plaintext})

        elif data.get("algorithm") == "3DES":
            decryption_key = data.get("decryptionkey")
            if not decryption_key:
                raise ValueError("Decryption key is missing")
            key = decryption_key.encode('utf-8')
            if len(key) not in (16, 24):
                raise ValueError("3DES key must be either 16 or 24 bytes long")
            ciphertext_base64 = data.get("decinput")
            if not ciphertext_base64:
                raise ValueError("Ciphertext is missing")
            try:
                ciphertext = base64.b64decode(ciphertext_base64)
            except base64.binascii.Error:
                raise ValueError("Invalid Base64 ciphertext")
            iv = b'12345678'  # 8-byte IV for 3DES
            cipher = DES3.new(key, DES3.MODE_CBC, iv)
            decrypted_padded_plaintext = cipher.decrypt(ciphertext)
            decrypted_plaintext = unpad(decrypted_padded_plaintext, DES3.block_size).decode('utf-8')
            return JsonResponse({"dec_ciphertext": decrypted_plaintext})

        else:
            raise ValueError("Unsupported algorithm")

    except Exception as e:
        return JsonResponse({"error": str(e)}, status=400)