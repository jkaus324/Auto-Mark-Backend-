import cv2
import os
import numpy as np
import cvzone
import face_recognition
import pickle

cap = cv2.VideoCapture(0)
cap.set(3, 1280)  # Width
cap.set(4, 720)  # Height

name_of_students = ['Jatin' , 'Tatin' , 'Arryuann']
# Load known face encodings
with open('EncodeFile.p', 'rb') as file:
    encodeList = pickle.load(file)
encodelistknown, student_id = encodeList
print(student_id)

counter = 0
while True:
    success, img = cap.read()
    if not success:
        break  # If the frame is not successfully captured, break the loop

    # Convert the image from BGR to RGB
    imgS = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)

    # Detect faces and their encodings in the current frame
    face_positions = face_recognition.face_locations(imgS)
    encoding_frame = face_recognition.face_encodings(imgS, face_positions)



    for encface, facepos in zip(encoding_frame, face_positions):
        matches = face_recognition.compare_faces(encodelistknown, encface)
        face_dist = face_recognition.face_distance(encodelistknown, encface)
        best_match_index = np.argmin(face_dist)

        if matches[np.argmin(face_dist)]:
            y1, x2, y2, x1 = facepos
            cv2.rectangle(img, (x1, y1), (x2, y2), (0, 255, 0), 2)
            matched_student_id = name_of_students[best_match_index]

            text_position = (x1, y1 - 10)

            # Choose font, color, and thickness
            font = cv2.FONT_HERSHEY_DUPLEX
            font_scale = 0.5
            font_color = (255, 255, 255)
            font_thickness = 1

            # Put the text (student ID) on the image
            cv2.putText(img, matched_student_id, text_position, font, font_scale, font_color, font_thickness)

        # print(f'At the time of {counter} we have x1->{x1},y1->{y1},x2->{x2},y2->{y2}')

        print(f'At the time of {counter} we have matches - {matches} and face dist - {face_dist}')
        # print(matches)
        # print(face_dist)

    cv2.imshow("face attendance", img)
    counter += 1
    if cv2.waitKey(1) & 0xFF == ord('q'):  # Break the loop if 'q' is pressed
        break


cap.release()
cv2.destroyAllWindows()
