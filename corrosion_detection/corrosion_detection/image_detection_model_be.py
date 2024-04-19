import tensorflow as tf
from tensorflow.keras.preprocessing import image
import numpy as np
import io

class gen:
    @staticmethod
    def image_gen(image_data):
        model = tf.keras.models.load_model('CorrisionDetection.h5')

        img = image.load_img(io.BytesIO(image_data), target_size=(64, 64))
        img_array = image.img_to_array(img)
        img_array = np.expand_dims(img_array, axis=0)
        img_array = img_array / 255.0  # Normalize pixel values

        predictions = model.predict(img_array)
        class_labels = ['Atmospheric Corrosion', 'Erosion Corrosion', 'Fatigue Corrosion', 'Pitting Corrosion', 'Stress Corrossion']  # Replace with your actual class labels

        # Interpret the predictions
        predicted_class_index = np.argmax(predictions)
        predicted_class_label = class_labels[predicted_class_index]

        print("The image is detected as", predicted_class_label)
        return predicted_class_label
