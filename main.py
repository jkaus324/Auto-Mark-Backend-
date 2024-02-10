import cv2
import numpy as np
import face_recognition
import pickle
import time

cap = cv2.VideoCapture(0)
cap.set(3, 1280)  # Width
cap.set(4, 720)  # Height

name_of_students = ['Jatin', 'Tatin', 'Arryuann']
# Load known face encodings
with open('EncodeFile.p', 'rb') as file:
    encodeList = pickle.load(file)
encodelistknown, student_id = encodeList

matched_names = []  # List to store matched student names

# Set the duration for the script to run (in seconds)
duration = 10  # Example: 60 seconds

start_time = time.time()

while time.time() - start_time < duration:
    success, img = cap.read()
    if not success:
        break

    imgS = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    face_positions = face_recognition.face_locations(imgS)
    encoding_frame = face_recognition.face_encodings(imgS, face_positions)

    for encface, facepos in zip(encoding_frame, face_positions):
        matches = face_recognition.compare_faces(encodelistknown, encface)
        face_dist = face_recognition.face_distance(encodelistknown, encface)
        best_match_index = np.argmin(face_dist)

        if matches[best_match_index]:
            matched_student_id = name_of_students[best_match_index]
            matched_names.append(matched_student_id)

    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()

matched_names = set(matched_names)
# Print or return matched names
print(matched_names)