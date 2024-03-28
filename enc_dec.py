import base64
from Crypto.Cipher import AES
from Crypto.Util.Padding import pad,unpad

from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv()
if load_dotenv():
    pass
else:
    print("env file is missing !!!!")


secret_key = os.getenv("SECRET_KEY") # configure it in .env file
iv = os.getenv("SECRET_IV")  # configure it in .env file

#AES ECB mode without IV

def encryptData(data):
        data = pad(data.encode(),16)
        cipher = AES.new(secret_key.encode('utf-8'), AES.MODE_ECB)
        return base64.b64encode(cipher.encrypt(data)).decode("utf-8", "ignore")

def decryptData(encrypted_data):
        encrypted_data = base64.b64decode(encrypted_data)
        cipher = AES.new(secret_key.encode('utf-8'), AES.MODE_ECB)
        return unpad(cipher.decrypt(encrypted_data),16).decode("utf-8", "ignore")



#AES CBC mode with IV

def encryptDataWithIv(data):
    Iv =  iv.encode('utf-8')
    data= pad(data.encode(),16)
    cipher = AES.new(secret_key.encode('utf-8'),AES.MODE_CBC,Iv)
    return base64.b64encode(cipher.encrypt(data)).decode("utf-8", "ignore")

def decryptDataWithIv(encrypted_data):   
    Iv =  iv.encode('utf-8')
    encrypted_data = base64.b64decode(encrypted_data)
    cipher = AES.new(secret_key.encode('utf-8'), AES.MODE_CBC, Iv)
    return unpad(cipher.decrypt(encrypted_data),16).decode("utf-8", "ignore")



'''
# message = 'Hi this is Encrypt Data Without Iv from Python'
# message2 = 'Hi this is Encrypt Data With Iv from python'

encrypted = encryptData(message)
print('encrypted ',encrypted)
 
decrypted = decryptData(encrypted)
print('data: ',decrypted)


print("\n\n")

encrypted = encryptDataWithIv(message2)
print('encrypted ',encrypted)

decrypted = decryptDataWithIv(encrypted)
print('data: ',decrypted)

'''
